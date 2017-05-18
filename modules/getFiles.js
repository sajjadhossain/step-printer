'use strict';
// Dependancies
const fs = require( 'fs' );
const finalPath = require( '../config/locations.conf' );
const getFiles = ( path, callback ) => fs.readdir( path, ( error, files ) => {
  const stepDefinitionFiles = [];

  files.forEach( ( file ) => {
    stepDefinitionFiles.push( finalPath + file );
  } );

  return callback( stepDefinitionFiles );
} );

module.exports = getFiles;

// Usage
// getFiles( finalPath, ( stepDefinitionFiles ) => {
//   console.log( stepDefinitionFiles );
// } );
