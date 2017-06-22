/**
 * Run from `npm run generate-api-docs`
 */

const {Analyzer, FSUrlLoader, PackageUrlResolver, generateAnalysis} = require('polymer-analyzer');

const clone = require('clone');
const fs = require('fs');
const {exec} = require('child_process');
const escape = require('html-escape');
const path = require('path');

const apiDocsPath = '../app/1.0/docs/api/';
const rootNamespace = 'Polymer';

// TODO: Check out an actual release SHA to generate docs off of.
const releaseSha = '1.x';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

cleanUp(installPolymer);
// installPolymer();
// checkoutRef();
// generateDocs();

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
      const metadata = generateAnalysis(_package, '', isNotTest);
      const json = JSON.stringify(metadata, null, 2);
      fs.writeFileSync('analysis.json', json);

      function generateNamespace(namespace) {
        console.log(`generating namespace ${namespace && namespace.name}`);

        const overview = {
          name: namespace.name,
          description: namespace.description,
          summary: namespace.summary,
          namespaces: [],
          elements: [],
          classes: [],
          mixins: [],
          behaviors: [],
          functions: namespace.functions, // already summarized
        };

        console.log(`Processing ${namespace.elements && namespace.elements.length} elements`);
        if (namespace.elements) {
          for (const element of namespace.elements) {
            console.log(`adding ${getElementName(element)} to ${namespace.name}`);
            const summary = {
              name: element.name,
              tagname: element.tagname,
              summary: element.summary,
            };
            overview.elements.push(summary);
            const fileContents = elementPage(element);
            const filename = path.join(apiDocsPath, getElementUrl(element) + '.html');
            console.log('Writing', filename);
            fs.writeFileSync(filename, fileContents);
          }
        }

        console.log(`Processing ${namespace.classes && namespace.classes.length} classes`);
        if (namespace.classes) {
          for (const klass of namespace.classes) {
            if (!klass.name) {
              continue;
            }
            console.log(`adding ${klass.name} to ${namespace.name}`);
            const summary = {
              name: klass.name,
              summary: klass.summary,
            };
            overview.classes.push(summary);
            const fileContents = classPage(klass);
            const filename = path.join(apiDocsPath, getClassUrl(klass) + '.html');
            console.log('Writing', filename);
            fs.writeFileSync(filename, fileContents);
          }
        }

        console.log(`Processing ${namespace.mixins && namespace.mixins.length} mixins`);
        if (namespace.mixins) {
          for (const mixin of namespace.mixins) {
            console.log(`adding ${mixin.name} to ${namespace.name}`);
            const summary = {
              name: mixin.name,
              summary: mixin.summary,
            };
            overview.mixins.push(summary);

            const fileContents = mixinPage(mixin);
            const filename = path.join(apiDocsPath, getMixinUrl(mixin) + '.html');
            console.log('Writing', filename);
            fs.writeFileSync(filename, fileContents);
          }
        }

        const behaviors = ((namespace.metadata || {}).polymer || {}).behaviors || [];
        console.log(`Processing ${behaviors.length} behaviors`);
        for (const behavior of behaviors) {
          console.log(`adding ${behavior.name} to ${namespace.name}`);
          const summary = {
            name: behavior.name,
            summary: behavior.summary,
          };
          overview.behaviors.push(summary);

          const fileContents = behaviorPage(behavior);
          const filename = path.join(apiDocsPath, getBehaviorUrl(behavior) + '.html');
          console.log('Writing', filename);
          fs.writeFileSync(filename, fileContents);
        }

        console.log(`Processing ${namespace.namespaces && namespace.namespaces.length} namespaces`);
        if (namespace.namespaces) {
          for (const nestedNamespace of namespace.namespaces) {
            console.log(`adding ${nestedNamespace.name} to ${namespace.name}`);
            const summary = {
              name: nestedNamespace.name,
              summary: nestedNamespace.summary,
            };
            overview.namespaces.push(summary);
            generateNamespace(nestedNamespace);
          }
        }

        const fileContents = namespacePage(overview);
        let filename;
        if (namespace.name === 'Polymer' || !namespace.name) {
          filename = 'index.html';
        } else {
          filename = getNamespaceUrl(namespace) + '.html';
        }
        const filepath = path.join(apiDocsPath, filename);
        console.log('Writing', filepath);
        fs.writeFileSync(filepath, fileContents);
      }

      fs.mkdirSync(path.join(apiDocsPath, 'elements'));
      fs.mkdirSync(path.join(apiDocsPath, 'classes'));
      fs.mkdirSync(path.join(apiDocsPath, 'mixins'));
      fs.mkdirSync(path.join(apiDocsPath, 'behaviors'));
      fs.mkdirSync(path.join(apiDocsPath, 'namespaces'));

      // We know we just have 1 namespace: Polymer
      generateNamespace(metadata);

      cleanUp(function() {
        console.log('Done.');
        console.log('\nAPI docs completed with great success');
      });
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
<iron-doc-element base-href="/1.0/docs/api" descriptor="${jsonString}"></iron-doc-element>
{% endblock %}`;
}

function classPage(klass) {
  const name = klass.name;
  const jsonString = escape(JSON.stringify(klass));
  return `{% set markdown = "true" %}
{% set title = "${name}" %}
{% extends "templates/base-devguide.html" %}
{% block title %} API Reference - ${name}{% endblock %}
{% block content %}
<iron-doc-class base-href="/1.0/docs/api" descriptor="${jsonString}"></iron-doc-class>
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
<iron-doc-mixin base-href="/1.0/docs/api" descriptor="${jsonString}"></iron-doc-mixin>
{% endblock %}`;
}

function behaviorPage(behavior) {
  const name = behavior.name;
  const jsonString = escape(JSON.stringify(behavior));
  return `{% set markdown = "true" %}
{% set title = "${name}" %}
{% extends "templates/base-devguide.html" %}
{% block title %} API Reference - ${name}{% endblock %}
{% block content %}
<iron-doc-behavior base-href="/1.0/docs/api" descriptor="${jsonString}"></iron-doc-behavior>
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
<iron-doc-namespace base-href="/1.0/docs/api" descriptor="${jsonString}"></iron-doc-namespace>
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
    if (element.name) {
      name += ` (${element.name})`;
    }
  } else if (element.name) {
    name += element.name;
  }
  return name;
}

function getElementUrl(element) {
  return `/elements/${element.name || element.tagname}`;
}

function getClassUrl(klass) {
  return `/classes/${klass.name}`;
}

function getMixinUrl(mixin) {
  return `/mixins/${mixin.name}`;
}

function getBehaviorUrl(behavior) {
  return `/behaviors/${behavior.name}`;
}

function getNamespaceUrl(namespace) {
  return `/namespaces/${namespace.name}`;
}
