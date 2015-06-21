/*
 *
 * Provide translation layers and compatibility for the popular gulpjs ecosystem.
 *
 */
var path = require('path');
var Vinyl = require('vinyl');
var Readable = require('stream').Readable;
var util = require('util');


var LsTo = function (path, provider, options) {
    this.path = path || '.';
    options = options || {};
    options.objectMode = true;
    provider = provider || 'ftp';
    var prefix = provider;
    Readable.call(this, options);
    provider = require('folders-' + provider);
    this.item = 0;
    this.provider = new provider(prefix, options);

};

util.inherits(LsTo, Readable);

LsTo.prototype._read = function () {

    var self = this;
    var output;
    self.provider.ls(self.path, function (result) {
        for (; self.item < result.length; self.item = self.item + 1) {

            output = listToVinyl(result[self.item]);
            self.push(output);


        }

        self.push(null);

    });

};



// this will work on output of ftp.ls.

var listToVinyl = function (listObj) {
    var size = listObj.size;
    var mtime = new Date(parseFloat(listObj.modificationTime));
    var stream = Buffer(JSON.stringify(listObj));
    var base = listObj.uri; // NOTES: May want to clean up this path.
    var output = new Vinyl({
        stat: {
            size: size,
            mtime: mtime
        },
        cwd: "/",
        base: path.dirname(base),
        path: base,
        contents: stream,
    });

    return output;
};

module.exports = LsTo;
/*
 *
 * Provide translation layers and compatibility for the popular gulpjs ecosystem.
 *
 */
var path = require('path');
var Vinyl = require('vinyl');
var Readable = require('stream').Readable;
var util = require('util');


var LsTo = function (path, provider, options) {
    this.path = path || '.';
    options = options || {};
    options.objectMode = true;
    provider = provider || 'ftp';
    var prefix = provider;
    Readable.call(this, options);
    provider = require('folders-' + provider);
    this.item = 0;
    this.provider = new provider(prefix, options);

};

util.inherits(LsTo, Readable);

LsTo.prototype._read = function () {

    var self = this;
    var output;
    self.provider.ls(self.path, function (result) {
        for (; self.item < result.length; self.item = self.item + 1) {

            output = listToVinyl(result[self.item]);
            self.push(output);


        }

        self.push(null);

    });

};



// this will work on output of ftp.ls.

var listToVinyl = function (listObj) {
    var size = listObj.size;
    var mtime = new Date(parseFloat(listObj.modificationTime));
    var stream = Buffer(JSON.stringify(listObj));
    var base = listObj.uri; // NOTES: May want to clean up this path.
    var output = new Vinyl({
        stat: {
            size: size,
            mtime: mtime
        },
        cwd: "/",
        base: path.dirname(base),
        path: base,
        contents: stream,
    });

    return output;
};

module.exports = LsTo;