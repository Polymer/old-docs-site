var hyd = require('hydrolysis');
var fs = require('fs');
var exec = require('child_process').exec;
var escape = require("html-escape");

var apiDocsPath = '../app/1.0/devguide/api/';
var releaseSha = 'master'; //'27d90bfaeb13f1d1a822f8a5e6e26a5403f5ed2c';

/**
 * Everything is chained, so running this will do the following:
 * - delete ./temp
 * - install polymer in ./temp
 * - delete all the html files in ../app/1.0/devguide/api/
 * - run hydrolysis on polymer
 * - generate the files in ../app/1.0/devguide/api/
 */

deleteBowerTempDirectory(bowerInstallPolymer);

function deleteBowerTempDirectory(callback) {
  var command = 'rm -rf ./temp';
  console.log('Running ' + command + '...');

  exec(command, callback);
}

function bowerInstallPolymer() {
  console.log('Done.');
  var command = 'bower cache clean --config.cwd=./temp && bower install polymer/polymer --config.cwd=./temp';
  console.log('Running ' + command + '...');

  exec(command, generateDocs);
}

function generateDocs() {
  console.log('Done.');
  var command = 'rm ' + apiDocsPath + '*.html';
  console.log('Running ' + command + '...');
  exec(command, runHydrolysis);
}

function runHydrolysis() {
  console.log('Done.');

  hyd.Analyzer.analyze('./temp/bower_components/polymer/polymer.html')
    .then(function(analyzer) {
      console.log('Analyzer done');
      // Polymer has both elements and behaviours, so get both.
      var sections = analyzer.elements;
      sections = sections.concat(analyzer.behaviors);

      for (var i = 0; i < sections.length; i++) {
        var sectionName = sections[i]['is'];
        var filename = apiDocsPath + sectionName + '.html';
        console.log('Generating ' + filename);

        var section = cleanUpSectionDocs(sections[i]);
        var json = escape(JSON.stringify(section));

        var fileContents =
            '{% extends "templates/base-devguide.html" %}' +
            '{% block title %} API Reference - ' + sectionName + '{% endblock %}' +
            '{% block content %}' +
            '<iron-doc-viewer>' + json + '</iron-doc-viewer>' +
            '{% endblock %}';

        fs.writeFileSync(filename, fileContents);
        console.log('Done.');
      }

      // Clean up
      deleteBowerTempDirectory(function() {
        console.log('Done.');
        console.log('\nAPI docs completed with great success');
      });
    }, function(e) {
      console.log('Could not run hydrolysis', e);
    });
}

function cleanUpSectionDocs(section) {
  section.scriptElement = undefined;
  section.behaviors && section.behaviors.forEach(function(behavior){
    behavior.javascriptNode = undefined;
  });
  section.properties && section.properties.forEach(function(property){
    property.javascriptNode = undefined;
  });
  return section;
}
