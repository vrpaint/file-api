const ghPages = require('gh-pages');
const npm = require('npm');
const { promisify } = require('util');

run()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .then(() => process.exit());

async function run() {
    const version = process.argv[2];
    await promisify(npm.load)({loaded: false});
    const npmRunAsync = promisify(npm.commands.run);
    await npmRunAsync(['prebuild']);
    if (version) {
        await promisify(npm.commands.version)([version]);
    }
    await uploadRelease();
}

function uploadRelease() {
    const packageJSON = require('./package');
    const tag = `v${packageJSON.version}`;
    const options = {
        branch: 'dist',
        src: [
            'typings/schema.ts',
            'package.json',
        ],
        message: tag,
        tag,
    };
    return promisify(ghPages.publish)(__dirname, options);
}
