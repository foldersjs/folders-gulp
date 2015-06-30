/*
 *
 * Provide translation layers and compatibility for the popular gulpjs ecosystem.
 *
 */
 
// FIXME: This class is not yet workable 
 
var path = require('path');
var Vinyl = require('vinyl');
var Readable = require('stream').Readable;
var util = require('util');


var WriteTo = function (path, provider, options) {
    
// FIXME: implement this function. function
   // prototyoe may be wrong
   // no valid design yet  for writeTo 
	
};

util.inherits(WriteTo, Readable);


WriteTo.prototype._read = function () {

   // FIXME: implement this function. function
   // prototyoe may be wrong
   // no valid design yet  for writeTo 
   

};




var catToVinyl = function (blobStream, base) {
    // FIXME: implement this function
};

module.exports = WriteTo;