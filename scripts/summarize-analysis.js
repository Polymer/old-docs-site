/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// @ts-check
const fs = require('fs');
const analyzer = require('polymer-analyzer');
const analysisFormat = require('polymer-analyzer/lib/analysis-format/analysis-format');
const util = require('util');

class Logger {
  constructor() {
    this.indentationLevel = 0;
  }

  indent(f) {
    this.indentationLevel += 2;
    f();
    this.indentationLevel -= 2;
  }

  log(value) {
    let indentation = '';
    for (let i = 0; i < this.indentationLevel; i++) {
      indentation += ' ';
    }
    console.log(indentation + value);
  }
}

const logger = new Logger();

/** @param {analysisFormat.Analysis|analysisFormat.Namespace} analysis */
function summarizeByFile(analysis) {
  /** @type {Map<string, Array<analysisFormat.Element|analysisFormat.Class|analysisFormat.Function>>} */
  const map = new Map();
  /** @param {analysisFormat.Element|analysisFormat.Class|analysisFormat.Function} feature */
  function index(feature) {
    const filename = getFilename(feature);
    if (!filename) {
      throw new Error(
          `Could not get filename for feature: ${util.inspect(feature)}`);
    }
    let arr = map.get(filename);
    if (arr === undefined) {
      arr = [];
      map.set(filename, arr);
    }
    arr.push(feature);
  }
  (analysis.elements || []).map(index);
  (analysis.classes || []).map(index);
  (analysis.functions || []).map(index);
  (analysis.mixins || []).map(index);
  // (analysis.namespaces || []).map(index);
  const keys = [...map.keys()].sort();
  for (const key of keys) {
    logger.log(`${key}`);
    logger.indent(() => {
      const features = map.get(key).sort((a, b) => {
        if (a.sourceRange === undefined && b.sourceRange === undefined) {
          return 0;
        }
        if (a.sourceRange === undefined) {
          return -1;
        }
        if  (b.sourceRange === undefined) {
          return 1;
        }
        return analyzer.comparePosition(
            a.sourceRange.start, b.sourceRange.start);
      });
      for (const feature of features) {
        logger.log(`${feature.name} - ${loc(feature)}`);
      }
    });
  }
}

/** @param {analysisFormat.Analysis|analysisFormat.Namespace} analysis */
function summarizeContainer(analysis) {
  if (analysis.elements) {
    logger.log('Elements:');
    logger.indent(() => {
      for (const element of analysis.elements) {
        logger.log(`${element.tagname} (${element.name}) - ${loc(element)}`);
      }
    });
  }
  if (analysis.classes) {
    logger.log('Classes:');
    logger.indent(() => {
      for (const class_ of analysis.classes) {
        logger.log(`${class_.name} - ${loc(class_)}`);
      }
    });
  }
  if (analysis.functions) {
    logger.log('Functions:');
    logger.indent(() => {
      for (const function_ of analysis.functions) {
        logger.log(`${function_.name} - ${loc(function_)}`);
      }
    });
  }
  if (analysis.namespaces) {
    for (const namespace of analysis.namespaces) {
      logger.log(`Namespace ${namespace.name}:`);
      logger.indent(() => {
        summarizeContainer(namespace);
      });
    }
  }
}

/** @param {analysisFormat.Element|analysisFormat.Class|analysisFormat.Function} feature */
function loc(feature) {
  let filename = getFilename(feature) || '???';
  if (feature.sourceRange) {
    const location = feature.sourceRange.start;
    return `${filename}[${location.line}:${location.column}]`;
  }
  return filename;
}

/** @param {analysisFormat.Element|analysisFormat.Class|analysisFormat.Function} feature */
function getFilename(feature) {
  if (feature.sourceRange && feature.sourceRange.file) {
    return feature.sourceRange.file;
  }
  if ('path' in feature && feature.path) {
    return feature.path;
  }
  return undefined;
}

exports.summarizeContainer = summarizeContainer;
exports.summarizeByFile = summarizeByFile;

async function main() {
  /** @type {analyzer.AnalysisFormat} */
  const analysis = JSON.parse(
      fs.readFileSync(process.argv[2] || 'analysis.json', 'utf-8'));
  // analyzer.validateAnalysis(analysis);
  summarizeContainer(analysis);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e ? (e.stack || e.message || e) : `Unknown error`);
    process.exitCode = 1;
  });
}
