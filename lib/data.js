/*
 * This library for storing and editing data
 */

// Dependencies
var fs = require('fs');
var path = require('path');

// Container for the module (to be exported)
var lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.update = function(dir, file, data, callback) {
    // Open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // Convert data to string
            var stringData = JSON.stringify(data);

            // Truncate the file
            fs.ftruncate(fileDescriptor, function(err) {
                if (!err) {
                    // Write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, function(err) {
                        if (!err) {
                            fs.close(fileDescriptor, function(err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing existing file');
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('Could not open the file for updating, it may not exist yet');
        }
    });
};

// Delete a file 
lib.delete = function(dir, file, callback) { 
    // Unlinking the file
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', function(err) {
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    });
};

// Read data from a file
lib.read = function(dir, file, callback) {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(err, data) {
        callback(err, data);
    });
};

// Export the module
module.exports = lib;
