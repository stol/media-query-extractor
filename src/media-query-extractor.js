'use strict';

var parse      = require('css-parse'),
    stringify  = require('css-stringify'),
    fs         = require('fs')
;

/**
 * @param string inputFileName : path of the input file
 * @param string outputFileName : path of the main input file
 * @param array breakpoints : array of strings : breakpoints & filenames
 */
function extractor(inputFileName, outputFileName, breakpoints) {

    // Normalize breakpoints & output file names
    var outputFiles = {
        'all': {
            fileName: outputFileName,
            rules: []
        }
    };

    if (breakpoints && breakpoints.length){
        for( var i=0; i<breakpoints.length; i++) {

            var parts = breakpoints[i].split('|');

            if (parts.length === 2) {
                outputFiles[parts[0]] = {
                    fileName   : parts[1],
                    rules      : []
                };
            }
            else {
                outputFiles[parts[0]] = {
                    fileName   : parts[0] + ".css",
                    rules      : []
                };
            }
        }
    }

    // Read css input file
    var css = fs.readFileSync(inputFileName, {
        encoding: "utf8"
    });

    var tree = parse(css);
    var rulesByMediaQuery = {};
    var rulesOfMediaQuery;

    for( var i=0; i<tree.stylesheet.rules.length; i++) {
        var rule = tree.stylesheet.rules[i];

        if (rule.type === 'media') {
            rulesByMediaQuery[rule.media] = rulesByMediaQuery[rule.media] || [];
            rulesOfMediaQuery = rulesByMediaQuery[rule.media];
          
            rulesOfMediaQuery.push.apply(rulesOfMediaQuery, rule.rules);
        }
        else{
            rulesByMediaQuery['all'] = rulesByMediaQuery['all'] || [];
            rulesOfMediaQuery = rulesByMediaQuery['all'];
            rulesOfMediaQuery.push(rule);
        }
    }

    // Dispatch rules to different files
    for (var mediaQuery in rulesByMediaQuery) {

      if (!outputFiles[mediaQuery]){
            if (mediaQuery === 'all'){
                outputFiles['all'].rules.push.apply(outputFiles['all'].rules,
                                                  rulesByMediaQuery[mediaQuery]);
            }
            else{
                outputFiles['all'].rules.push({
                    type: "media",
                    media: mediaQuery,
                    rules: rulesByMediaQuery[mediaQuery],
                });
            }
        }
        else{
            outputFiles[mediaQuery].rules.push.apply(outputFiles[mediaQuery].rules,
                                                   rulesByMediaQuery[mediaQuery]);        
        }
    }


    // Loop on each asked file, and write it
    for (mediaQuery in outputFiles) {
        writeFromRules(outputFiles[mediaQuery].fileName,
                         outputFiles[mediaQuery].rules,
                         mediaQuery);
    }
}

function writeFromRules(fileName, rules, mediaQuery) {

    // Compose the css tree to be stringified
    var tree = {
        type: "stylesheet",
        stylesheet: {
            rules: []
        }
    };

    // Global file ?
    if (mediaQuery === 'all') {
        tree.stylesheet.rules = rules;
    }
    // Or spécific file ?
    else{
        tree.stylesheet.rules.push({
            type: "media",
            media: mediaQuery,
            rules: rules,
        });
    }

    fs.writeFileSync(fileName, stringify(tree));
}


module.exports = extractor;
