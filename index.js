const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const yargs = require('yargs');

const Sha1Generator = require('./sha1');

//Instantiate SHA generator
const sha1Service = new Sha1Generator();

yargs.command({
    command: 'file',
    describe: 'Read the message from a specified file.',
    builder: {
        filePath: {
            describe: 'The path to the specified file',
            demandOption: true,
            type: 'string'
        },
    },
    handler: argv => {
        try {
            const filePath = path.join(__dirname, argv.filePath);
            const messageFromFile = fs.readFileSync(filePath).toString();
            const sha1Hash = sha1Service.generateSha1(messageFromFile);
            console.log(`${chalk.blue('SHA-1: ')} ${chalk.green(sha1Hash)}`);

        } catch (e) {
            console.log(chalk.red('Cannot find the specified file.'));
        }
    }
});

yargs.command({
    command: 'sha1',
    describe: 'Generate SHA-1 from a message.',
    builder: {
        text: {
            describe: 'The plain text',
            demandOption: true,
            type: 'string'
        },
    },
    handler: argv => {
        const sha1Hash = sha1Service.generateSha1(argv.text);
        console.log(`${chalk.blue('Plain Text: ')} ${chalk.yellow(argv.text)}`);
        console.log(`${chalk.blue('SHA-1: ')} ${chalk.green(sha1Hash)}`);
    }
});


yargs.parse();

