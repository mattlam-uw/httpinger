/**
 * This module contains all methods required for URL model CRUD operations
 * using urls.json as the model. If urls.json is replaced with a database
 * or other model storage mechanism in the future, you should only need
 * to replace this module with a new one that exposes the same methods to
 * the client code but interfaces with the new storage technology of choice
 * to provide model data continuity.
 */

// Constants
const ROOT_DIR = '/rc00/d51/mattlam/httpinger/';

// Node.js Module Dependencies
var fs = require('fs');     // Used for reading and writing to local system files

// Retrieve all URL data from urls.json
exports.getUrls = function(callback) {
     var urlsDir = ROOT_DIR + 'data/urls.json';
	 fs.readFile(urlsDir, 'utf8', function(err, data) {
	    if (err) throw err;
	    callback(JSON.parse(data));
	});
}

	
