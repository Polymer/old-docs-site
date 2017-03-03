/**
 * Run this script from inside the scripts/ directory because hydrolysis gets grumpy
 * about relative paths and Mercury being in retrograde.
 *
 * Usage:
 * cd scripts && node generate_api_docs.js
 */

const {Analyzer} = require('polymer-analyzer');
const {FSUrlLoader} = require('polymer-analyzer/lib/url-loader/fs-url-loader');
const {PackageUrlResolver} = require('polymer-analyzer/lib/url-loader/package-url-resolver');
const {generateElementMetadata} = require('polymer-analyzer/lib/generate-elements');

const clone = require('clone');
const fs = require('fs');
const {exec} = require('child_process');
const escape = require('html-escape');
const path = require('path');

const apiDocsPath = '../app/2.0/docs/api/';
const rootNamespace = 'Polymer';

// TODO: Check out an actual release SHA to generate docs off of.g
const releaseSha = 'da3fd0fbde869738ea167a8d6d095a716ea029a5';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

/**
 * Everything is chained, so running this will do the following:
 * - delete ./temp
 * - install polymer in ./temp
 * - delete all the html files in ../app/1.0/devguide/api/
 * - run hydrolysis on polymer
 * - generate the files in ../app/1.0/devguide/api/
 */

// cleanUp(installPolymer);
// installPolymer();
// checkoutRef();
generateDocs();

function cleanUp(callback) {
  const command = 'rm -rf ./temp';
  console.log(`Running ${command}...`);

  exec(command, callback);
}

function installPolymer() {
  console.log('Done.');
  const command = 'git clone https://github.com/Polymer/polymer.git temp';
  console.log(`Running ${command}...`);

  exec(command, checkoutRef);
}

function checkoutRef() {
  console.log('Done.');
  const command = `cd temp && git checkout ${releaseSha} && cd ..`;
  console.log(`Running ${command}...`);
  exec(command, generateDocs);
}

function generateDocs() {
  console.log('Done.');
  const command = `rm -r ${apiDocsPath}*`;
  console.log(`Running ${command}...`);
  exec(command, runAnalyzer);
}

function runAnalyzer() {
  console.log('Done.');

  const isInTests = /(\b|\/|\\)(test)(\/|\\)/;
  const isNotTest = (f) => !isInTests.test(f.sourceRange.file);

  const analyzer = new Analyzer({
    urlLoader: new FSUrlLoader(path.resolve('temp')),
    urlResolver: new PackageUrlResolver(),
  });

  analyzer.analyzePackage()
    .then((_package) => {
      console.log('Analyzer done');
      const metadata = generateElementMetadata(_package, '', isNotTest);
      const json = JSON.stringify(metadata, null, 2);
      fs.writeFileSync('elements.json', json);

      const namespaceSummaries = new Map();

      // Build mapping of namespaces
      if (metadata.namespaces) {
        // Create summaries objects
        for (const namespace of metadata.namespaces) {
          namespaceSummaries.set(namespace.name, {
            namespaces: [],
            elements: [],
            mixins: [],
          });
        }
        // Add nested namespaces to parents
        for (const namespace of metadata.namespaces) {
          if (namespace.name === rootNamespace) {
            continue;
          }
          const parentName = getNamespaceName(namespace.name);
          const parent = namespaceSummaries.get(parentName);
          if (parent) {
            parent.namespaces.push({
              name: namespace.name,
              summary: namespace.summary,
            });
          }
        }
      }

      console.log(`Processing ${metadata.elements && metadata.elements.length} elements`);
      if (metadata.elements) {
        fs.mkdirSync(path.join(apiDocsPath, 'elements'));
        for (const element of metadata.elements) {
          // Add a summary to the namespace
          const namespaceName = getNamespaceName(element.classname);
          console.log(`adding ${getElementName(element)} to ${namespaceName}`);
          if (namespaceName) {
            const summaries = namespaceSummaries.get(namespaceName);
            if (summaries) {
              const summary = {
                classname: element.classname,
                tagname: element.tagname,
                summary: element.summary,
              };
              console.log('adding element summary to ', namespaceName, summary);
              summaries.elements.push(summary);
            }
          }

          const fileContents = elementPage(element);
          const filename = path.join(apiDocsPath, getElementUrl(element) + '.html');
          console.log('Writing', filename);
          fs.writeFileSync(filename, fileContents);
        }
      }

      console.log(`Processing ${metadata.mixins && metadata.mixins.length} mixins`);
      if (metadata.mixins) {
        fs.mkdirSync(path.join(apiDocsPath, 'mixins'));
        for (const mixin of metadata.mixins) {
          // Add a summary to the namespace
          const namespaceName = getNamespaceName(mixin.name);
          if (namespaceName) {
            const summaries = namespaceSummaries.get(namespaceName);
            if (summaries) {
              const summary = {
                name: mixin.name,
                summary: mixin.summary,
              };
              summaries.mixins.push(summary);
            }
          }

          const fileContents = mixinPage(mixin);
          const filename = path.join(apiDocsPath, getMixinUrl(mixin) + '.html');
          console.log('Writing', filename);
          fs.writeFileSync(filename, fileContents);
        }
      }

      console.log(`Processing ${metadata.namespaces && metadata.namespaces.length} namespaces`);
      if (metadata.namespaces) {
        fs.mkdirSync(path.join(apiDocsPath, 'namespaces'));
        for (const namespace of metadata.namespaces) {
          // Clone the namespace so we can replace members with summaries
          const namespaceClone = clone(namespace);
          const summaries = namespaceSummaries.get(namespace.name);
          namespaceClone.elements = Array.from(summaries.elements);
          // console.log('namespace elements', namespace.name, summaries.elements);
          console.log('namespace sub-namespaces', namespace.name, summaries.namespaces);
          namespaceClone.mixins = Array.from(summaries.mixins);
          namespaceClone.namespaces = Array.from(summaries.namespaces);

          const fileContents = namespacePage(namespaceClone);
          const filename = (namespace.name === rootNamespace)
            ? 'index.html'
            : `namespaces/${namespace.name}.html`;
          console.log('Writing', filename);
          fs.writeFileSync(path.join(apiDocsPath, filename), fileContents);
        }
      }

//       cleanUp(function() {
//         console.log('Done.');
//         console.log('\nAPI docs completed with great success');
      // });
    }, (e) => {
      console.error('Error running analyzePackage()', e);
    });
}

function elementPage(element) {
  const name = getElementName(element);
  const jsonString = escape(JSON.stringify(element));
  return `{% set markdown = "true" %}
{% set title = "${name}" %}
{% extends "templates/base-devguide.html" %}
{% block title %} API Reference - ${name}{% endblock %}
{% block content %}
<iron-doc-element base-href="/2.0/docs/api" descriptor="${jsonString}"></iron-doc-element>
{% endblock %}`;
}

function mixinPage(mixin) {
  const name = mixin.name;
  const jsonString = escape(JSON.stringify(mixin));
  return `{% set markdown = "true" %}
{% set title = "${name}" %}
{% extends "templates/base-devguide.html" %}
{% block title %} API Reference - ${name}{% endblock %}
{% block content %}
<iron-doc-mixin base-href="/2.0/docs/api" descriptor="${jsonString}"></iron-doc-mixin>
{% endblock %}`;
}

function namespacePage(namespace) {
  const name = namespace.name;
  const jsonString = escape(JSON.stringify(namespace));
  return `{% set markdown = "true" %}
{% set title = "${name}" %}
{% extends "templates/base-devguide.html" %}
{% block title %} API Reference - ${name}{% endblock %}
{% block content %}
<iron-doc-namespace base-href="/2.0/docs/api" descriptor="${jsonString}"></iron-doc-namespace>
{% endblock %}`;
}

function getNamespaceName(name) {
  if (typeof name === 'string') {
    const parts = name.split('.');
    console.log(name, ':', parts);
    if (parts.length > 1) {
      return parts.slice(0, parts.length - 1).join('.');
    }
  }
  return rootNamespace;
}

function getElementName(element) {
  let name = '';
  if (element.tagname) {
    name += `<${element.tagname}>`;
    if (element.classname) {
      name += ` (${element.classname})`;
    }
  } else if (element.classname) {
    name += element.classname;
  }
  return name;
}

function getElementUrl(element) {
  return element.tagname ? `/elements/${element.tagname}` : `/elements/${element.classname}`;
}

function getMixinUrl(mixin) {
  return `/mixins/${mixin.name}`;
}
