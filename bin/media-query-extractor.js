#!/usr/bin/env node

var minimist   = require('minimist'),
    extractor  = require('../src/media-query-extractor')
;

var argv = minimist(process.argv.slice(2));

if (argv.V || argv.version){
    console.log('0.1.0');
    process.exit(0);
}

if (argv.help || argv.h || !argv._[0] || !argv._[1]){
    console.log('  Usage: media-query-extractor [options] <input file> <output file>');
    console.log('');
    console.log('  Options:');
    console.log('');
    console.log('    -h, --help        Output usage information');
    console.log('    -V, --version     Output the version number');
    console.log('    -b, --breakpoint  Add a breakpoint to be extracted. Model: --breakpoint "media query string[|output file name]"');
    console.log('');
    console.log('  Example:');
    console.log('');
    console.log('    $ media-query-extractor --help');
    console.log('    $ media-query-extractor \\');
    console.log('        --breakpoint "screen and (min-width: 480px)|tablet.css" \\');
    console.log('        --breakpoint "screen and (min-width: 660px)|big-tablet.css" \\');
    console.log('        --breakpoint "screen and (min-width: 990px)|desktop.css" \\');
    console.log('        styles.css remaining.css');
    console.log('');
    process.exit(0);
}

var inputFileName = argv._[0];

var outputFileName = argv._[1];

var breakpoints = argv.breakpoint || argv.b;
if (typeof breakpoints === "string"){
    breakpoints = [breakpoints];
}

extractor(inputFileName, outputFileName, breakpoints);
