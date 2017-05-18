'use strict';
// Dependancies
const fs = require( 'fs' );
const getSteps = ( path, callback ) => fs.readFile( path, 'utf8', ( err, contents ) => {
  // Givens
  const Given = [];
  // Thens
  const Then = [];
  // Whens
  const When = [];

  // Step Definitions
  const StepDefinitions = {
    path: path,
    Given,
    When,
    Then
  };

  // First round of filtering
  const filterSteps = /@[A-z]{1,}\(\"\^[A-z\s\\\"\(\)\.\*\?\$\:\+\-\',]{1,}\n/g;
  const filterStepDefintions = contents.match( filterSteps );

  if ( filterStepDefintions ) {
    filterStepDefintions.forEach( ( stepDefinition ) => {
      const filterTrailingText = /\n\tpublic\svoid\s[A-z\_\(\)\s\n]{1,}/g;
      const filterStepDefintionsAgain = stepDefinition.replace( filterTrailingText, '' );
      const filteredFinal = filterStepDefintionsAgain.replace( '\n', '' );

      // Prettify Final String for Console Output
      // Numbers
      const filterNumbersInStepDefinitions = /\(\\\\d\+\)/g;
      const containsNumbers = filteredFinal.replace( filterNumbersInStepDefinitions, '<Integer>' );
      // Variables
      const filterVariablesInStepDefinitions = /\\\"\(\.\*\?\)\\\"|\\\"\(\[\^\\\"\]\*\)\\\"|\(\.\*\)/g;
      const containsVariables = containsNumbers.replace( filterVariablesInStepDefinitions, '<Variable>');
      // @, (), $, ^
      const replaceAtSymbol = containsVariables.replace( '@', '' );
      const replaceOpenParenthesisPlusWithSpace = replaceAtSymbol.replace( '("^', ' ' );
      const theFinalStepDefinition = replaceOpenParenthesisPlusWithSpace.replace( '$")', '' );

      // Find Givens
      const filterGivens = /Given/g;
      const filterForGivens = theFinalStepDefinition.match( filterGivens );
      // Find Thens
      const filterThens = /Then/g;
      const filterForThens = theFinalStepDefinition.match( filterThens );
      // Find Whens
      const filterWhens = /When/g;
      const filterForWhens = theFinalStepDefinition.match( filterWhens );

      if ( filterForGivens != null ) {
        Given.push( theFinalStepDefinition.replace( 'Given ', '' ) );
      }
      if ( filterForThens != null ) {
        Then.push( theFinalStepDefinition.replace( 'Then ', '' ) );
      }
      if ( filterForWhens != null ) {
        When.push( theFinalStepDefinition.replace( 'When ', '' ) );
      }
    } );

    return callback( StepDefinitions );
  }
} );

module.exports = getSteps;
