var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';
var packageRoot = 'jspm_packages/';
var typingsRoot = 'typings/';

module.exports = {
  root: appRoot,
  tsSource: appRoot + '**/*.ts',
  tsxSource: appRoot + '**/*.tsx',
  jspmDefinitions: packageRoot + '**/*.d.ts',
  typings: typingsRoot + '**/*.d.ts',
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: outputRoot,
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
