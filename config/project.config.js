/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path');
const debug = require('debug')('app:config:project');
const argv = require('yargs').argv;
const ip = require('ip');

debug('Creating default configuration.');
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_public : 'public',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : 'app.redh.io', //ip.address(), // use string 'localhost' to prevent exposure on local network
  server_port : process.env.PORT || 8081,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true,
    plugins        : ['transform-runtime'],
    presets        : ['es2015', 'react', 'stage-0']
  },
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendors : [
    'react',
    'react-redux',
    'react-router',
    'redux'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'lcov', dir : 'coverage' }
  ]
};

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'                   : config.env,
  '__DEV__'                    : config.env === 'development',
  '__PROD__'                   : config.env === 'production',
  '__TEST__'                   : config.env === 'test',
  '__COVERAGE__'               : !argv.watch && config.env === 'test',
  '__BASENAME__'               : JSON.stringify(process.env.BASENAME || ''),
  '__WEB3_PROVIDER_URL__'      : JSON.stringify(config.env === 'production' ? 'https://ropsten.infura.io/' : 'https://ropsten.infura.io/'),
  '__REDHIO_API_URL__'         : JSON.stringify(config.env === 'production' ? 'http://api.redh.io:8000/api/' : 'http://api.redh.io:8000/api/'),
  '__REDHIO_API_KEY__'         : JSON.stringify(config.env === 'production' ? '0x298ad6b60Bf73Aca4EbF83bD32c721Eec35FDaC5' : '0x298ad6b60Bf73Aca4EbF83bD32c721Eec35FDaC5'),
  '__AWS_API_URL__'         : JSON.stringify(config.env === 'production' ? 'http://api.redh.io:8000/api/' : 'http://api.redh.io:8000/api/'),
  '__AWS_API_KEY__'         : JSON.stringify(config.env === 'production' ? '0x298ad6b60Bf73Aca4EbF83bD32c721Eec35FDaC5' : '0x298ad6b60Bf73Aca4EbF83bD32c721Eec35FDaC5'),
  '__SHOPIFY_API_URL__'         : JSON.stringify(config.env === 'production' ? 'http://api.redh.io:8000/api/' : 'http://api.redh.io:8000/api/'),
  '__SHOPIFY_API_KEY__'         : JSON.stringify(config.env === 'production' ? '0x298ad6b60Bf73Aca4EbF83bD32c721Eec35FDaC5' : '0x298ad6b60Bf73Aca4EbF83bD32c721Eec35FDaC5'),
  '__USER_CONTRACT_ADDRESS__'  : JSON.stringify(config.env === 'production' ? '0x298ad6b60Bf73Aca4EbF83bD32c721Eec35FDaC5' : '0x298ad6b60Bf73Aca4EbF83bD32c721Eec35FDaC5'),
  '__MODEL_CONTRACT_ADDRESS__' : JSON.stringify(config.env === 'production' ? '0xcf646dbfa012273bb4f75988435a334776cc06e3' : '0xcf646dbfa012273bb4f75988435a334776cc06e3'),
  '__ENGINE_CONTRACT_ADDRESS__' : JSON.stringify(config.env === 'production' ? '0xcf646dbfa012273bb4f75988435a334776cc06e3' : '0xcf646dbfa012273bb4f75988435a334776cc06e3')
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json');

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true;

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from \`compiler_vendors\` in ~/config/index.js`
    );
  });

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

config.paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  public : base.bind(null, config.dir_public),
  dist   : base.bind(null, config.dir_dist)
};

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`);
const environments = require('./environments.config');
const overrides = environments[config.env];
if (overrides) {
  debug('Found overrides, applying to default configuration.');
  Object.assign(config, overrides(config));
  debug(config);
} else {
  debug('No environment overrides found, defaults will be used.');
}

module.exports = config;
