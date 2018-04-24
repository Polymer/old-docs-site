// @ts-check

const {Analyzer, FsUrlLoader, PackageUrlResolver, generateAnalysis} =
    require('polymer-analyzer');

const fs = require('fs');
const childProcess = require('child_process');
const escape = require('html-escape');
const path = require('path');
const globby = require('globby');
const {summarizeContainer, summarizeByFile} = require('./summarize-analysis');

async function main() {
  const rootDir = process.argv[2];
  const isInTests = /(\b|\/|\\)(test)(\/|\\)/;

  const analyzer = new Analyzer({
    urlLoader : new FsUrlLoader(rootDir),
    urlResolver : new PackageUrlResolver({packageDir : rootDir}),
  });
  const globs = ['*.js', 'lib/**/*'].map(f => path.join(rootDir, f));
  const inputs = (await globby(globs)).filter(f => !f.endsWith('gulpfile.js')).map(f => path.relative(rootDir, f));
  const analysis = await analyzer.analyze(inputs);
  const metadata = generateAnalysis(analysis, analyzer.urlResolver);
  summarizeByFile(metadata);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e ? e.stack || e.message || e: `Unknown error`);
    process.exitCode = 1;
  });
}
