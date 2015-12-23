/**
 * IO Interface for MongoDB collection defined and supported by Mongoose Schema
 * outlined in ErrorsMongo.js model
 **/

// Dependencies:
// -- Express Router
var express = require('express');
var router = express.Router();
// -- ErrorsMongo mongoose model
var mongoose = require('mongoose');
var Errors = require('../../models/ErrorsMongo');


/* GET (retrieve all) errors */
router.get('/', function(req, res, next) {
    Errors.find(function(err, returnVal) {
        if (err) return next(err);
        res.json(returnVal);
    });
});

/* GET (retrive all) errors by user_id */

/* POST (create new) error */
router.post('/', function(req, res, next) {
    Errors.create(req.body, function(err, returnVal) {
        if (err) return next(err);
        res.json(returnVal);
    })
});

// Create new MongoDB doc in Errors collection for a request error occurrence

exports.writeErrLogEntry = function(statusCode, resourceName, resourceUrl, requestDateTime, responseData) {
    // Create a new error log entry from data passed to this function
    // +++++ DEBUG CODE START +++++++++++++++++++++++++++++++++++++
    console.log('Creating the new error log entry Mongoose Schema object');
    // +++++ DEBUG CODE END +++++++++++++++++++++++++++++++++++++++
    var newErrLogEntry = Errors({
        status_code: statusCode,
        resource_name: resourceName,
        resource_url: resourceUrl,
        response: responseData,
        request_datetime: requestDateTime
    });
    // Save the new error log entry to MongoDB
    // +++++ DEBUG CODE START +++++++++++++++++++++++++++++++++++++
    console.log('Saving the new error log entry to MongoDB');
    // +++++ DEBUG CODE END +++++++++++++++++++++++++++++++++++++++
    newErrLogEntry.save(function(err) {
        console.log('Saving . . . ');
        if (err) console.err(err);
        console.log('Error Log Entry Added!');
    });
}
