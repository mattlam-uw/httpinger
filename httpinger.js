/**
 * Main application file
 *
 * Node.js Module Dependencies
 *  + fs
 *
 * Internal Module Dependencies
 *  + ./modules/httping.js
 *  + ./modules/urlsIO.js
 *
 */
// Constants
const ROOT_DIR = '~/httpinger/';

// Node.js Module Dependencies
var fs = require('fs');     // Used for reading and writing to local system files

// Require local modules
var httping = require(ROOT_DIR + 'modules/httping.js');
var urlsIO = require(ROOT_DIR + 'modules/urlsIO.js');

// Define the urls variables outside of the functions that use the variable so
// we can ensure it is asynchronously assigned data before we attempt to use
// the data
var urls;

/**
 * Callback function to be passed with call to getUrls(). This function will
 * assign the url data retrieved by getUrls() to the urls variable and then
 * send a batch of requests to the urls. We need to kick off the requests from
 * within the callback in order to ensure that the url data that has all been
 * retrieved via asynchronous calls to retrieve the data.
 **/
var cbGetUrlData = function(urlData) {
    // Assign the retrieved url data to the urls variable
    urls = urlData;

    // Kick off a set of HTTP requests
    httping.pingUrls(urls);
};

// Call getUrls() with the above callback in order to get the URLs and kick
// off the requests
urlsIO.getUrls(cbGetUrlData);
