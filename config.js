/*
 * Create and export configuration variables
 */

var environments = {};

// Staging (default) environment
environments.staging = {
    'httpPort': 4000,
    'httpsPort': 4001,
    'envName': 'staging'
};

// Production environment
environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production'
};

// Determine which environment was passed as a command-line argument
var currEnv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging
var envToExport = environments[currEnv] || environments.staging;

// Export the module
module.exports = envToExport;
