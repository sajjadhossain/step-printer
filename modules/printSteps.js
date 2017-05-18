'use strict';
// Dependancies
const fs = require( 'fs' );
const finalPath = require( '../config/locations.conf' );
const getFiles = require( './getFiles' );
const filterFilesForSteps = require( './filterFilesForSteps' );
const printSteps = getFiles( finalPath, ( stepDefinitionFiles ) => {
  stepDefinitionFiles.forEach( ( stepDefinitionFile ) => {
    filterFilesForSteps( stepDefinitionFile, ( stepDefinitions ) => {
      console.log( JSON.stringify( stepDefinitions, null, 2 ) )
    } );
  } );
} );

module.exports = printSteps;
