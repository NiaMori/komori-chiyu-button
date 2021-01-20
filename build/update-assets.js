const fs = require('fs')
const path = require("path")
const { exec } = require('child_process')

async function* walk (dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield* walk(entry)
    else if (d.isFile()) yield entry
  }
}

const run = async (cmd) => {
  return new Promise(resolve => {
    exec(cmd, (error, stdout) => resolve(stdout))
  })
}

const getOID = async (file) => {
  const pointer = await run(`git lfs pointer --file ${file}`)
  const { oid } = /oid (?<oid>sha256:\w+)/.exec(pointer).groups
  return oid
}

const getLastestVersion = async (name) => {
  return (await run(`npm info ${name} version`)).trim()
}

const deploy = async (assets) => {
  const lastVersion = await getLastestVersion('komori-chiyu-button-assets')

  await run('rm -rf .temp')
  await run('mkdir -p .temp/dist')

  fs.writeFileSync('.temp/README.md', `# komori-chiyu-button-assets
Assets for website [komori-chiyu-button](https://github.com/NiaMori/komori-chiyu-button)
`)

  fs.writeFileSync('.temp/package.json', JSON.stringify({
    name: 'komori-chiyu-button-assets',
    author: 'niamori',
    description: 'komori-chiyu-button-assets',
    main: 'index.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1'
    },
    version: lastVersion
  }, null, 2))

  const { version } = /v(?<version>\S+)/.exec(await run('bash -c "cd .temp && npm version patch"')).groups

  for (const { file } of assets) {
    await run(`cp ${file} .temp/dist/`)
  }

  const info = {}
  for (const { path: assetsPath, oid } of assets) {
    const filename = path.basename(assetsPath)

    info[assetsPath] = {
      src: `https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@${version}/dist/${filename}`,
      OID: oid
    }
  }

  fs.writeFileSync('.temp/index.js', '' +
`export default ${JSON.stringify(info, null, 2)}
`)

  return [version, info]
}

const ignore = new Set(['@images/komori-hat.svg'])

const main = async () => {
  const data = JSON.parse(fs.readFileSync('./assets/assets-provider.json').toLocaleString())

  const newAssets = []

  for await (const file of walk('./assets')) {
    if (!/\.(wav)|(mp3)|(svg)|(jpg)|(png)|(webp)$/.test(file)) {
      continue
    }

    const path = file.replace(/^assets\//, '@')

    if (ignore.has(path)) {
      continue
    }

    const oid = await getOID(file)

    if (!data[path] || data[path].OID != oid) {
      data[path] = {
        OID: oid,
        provider: []
      }

      newAssets.push({
        file, path, oid
      })
    }
  }

  if (!newAssets.length) {
    console.log('already up to date')
    return
  }

  for (const { path, oid } of newAssets) {
    console.log(`updating ${path}-${oid}...`)
  }

  const [version, info] = await deploy(newAssets)

  for (const { path } of newAssets) {
    data[path].version = version
    data[path].provider.push(info[path].src)
  }

  fs.writeFileSync('./assets/assets-provider.json', JSON.stringify(data, null, 2))
}

main()
