/*
 *
 * Provide translation layers and compatibility for the popular gulpjs ecosystem.
 * This must be implemented as Writable stream 
 */
var path = require('path');
var Writable = require('stream').Writable;
var util = require('util');
var gulp = require('gulp');


var WriteFrom = function (path, provider, options,cb) {
    this.path = path;
	this.cb = cb || function(err,result){console.log(result)};
    options = options || {};
    options.objectMode = true;
    provider = provider || 'ftp';
    if (!(this instanceof WriteFrom))
        return new WriteFrom(options);
    Writable.call(this, options);
    var Provider = require('folders-' + provider);
    this.provider = new Provider(provider, options);

};

module.exports = WriteFrom;

util.inherits(WriteFrom, Writable);



WriteFrom.prototype._write = function (chunk, encoding, callback) {
    var self = this,
        path, data;
    var output;
    output = vinylToWrite(chunk);
    path = self.path;
    data = output.data;
    self.provider.write(path, data, self.cb)
    callback();
};


vinylToWrite = function (vinylObj) {
    var result = vinylObj.stat;
    var name = path.basename(vinylObj.path);
    var data = vinylObj.contents;
    var headers = {
        "Content-Length": result.size,
        "Content-Type": "application/octet-stream",
        "X-File-Type": "application/octet-stream",
        "X-File-Size": result.size,
        "X-File-Name": name
    };
    var output = {
        data: data,
        headers: headers
    };
    return output;
};

