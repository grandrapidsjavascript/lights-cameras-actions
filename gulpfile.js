// # [GRJS...](/lights-cameras-actions/)gulpfile.js
// ## gulpfile
//
// A [gulpfile](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles) is an implementation description file for **Gulp**.
//
// #### Dependency Documentation
// * Gulp - [documentation](https://gulpjs.com/) / [package](https://www.npmjs.com/package/gulp)
// 
// ---
// Notes:

require('colors');
const { src, dest, watch, series, parallel } = require('gulp');
const { exec } = require('child_process');

function gulpSettings(){
  // * This will tell gulp to generate documentation using [docco]() for:

  // > Utilities
  generateDocumentation('./gulpfile.js');

  // > Files
  generateDocumentation('./index.js');
  generateDocumentation('./lights/index.js');
  generateDocumentation('./cameras/index.js');
  generateDocumentation('./actions/index.js');
  
  // > Step Definitions
  generateDocumentation('./features/step_definitions/utilities.js');
  generateDocumentation('./features/step_definitions/lights.js');
  generateDocumentation('./features/step_definitions/cameras.js');
  generateDocumentation('./features/step_definitions/actions.js');
}

/**
 * A general use function to generate documentation using a command executer.
 * @param {string} source A path to a file to watch and generate documentation for.
 */
function generateDocumentation(source){
  function runExec(){
    console.log(`Generating Docs :: ${source}`.green);
    return new Promise((resolve, reject) => {
      exec(`docco ${source}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Generating Docs Error ::`.red, error);
          reject();
          return;
        }
        resolve();
      });
    })
  }

  watch(source, function documentation(done) {
    runExec().then(done);
  })
}

exports.default = gulpSettings