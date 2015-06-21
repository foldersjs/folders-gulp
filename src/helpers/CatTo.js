/*
 *
 * Provide translation layers and compatibility for the popular gulpjs ecosystem.
 *
 */
var path = require('path');
var Vinyl = require('vinyl');
var Readable = require('stream').Readable;
var util = require('util');


var CatTo = function (path, provider, options) {
    this.path = path;
    options = options || {};
    options.objectMode = true;
    provider = provider || 'ftp';
    Readable.call(this, options);
    this.waiting = false;
    var Provider = require('folders-' + provider);
    this.provider = new Provider(provider, options);

};

util.inherits(CatTo, Readable);


CatTo.prototype._read = function () {

    var self = this;
    var output;

    if (self.waiting == false) {

        self.provider.cat(self.path, function (result) {
            output = catToVinyl(result);
            self.push(output);

        });

        self.waiting = true;

    } else {
        if (this.waiting != true)
            self.push();
    }

};


// this will work on output of ftp.cat.

var catToVinyl = function (blobStream, base) {
    // Headers ain't so nice!

    var headers = {};
    var headerMap = blobStream.headers;
    if (headerMap)
        for (var i = 0; i < headerMap.length; i++) {
            var x = headerMap[i].split(':', 2);
            headers[x[0]] = x[1];
        }
    var size = headers['X-File-Size'];
    var name = headers['X-File-Name'];
    var stream = blobStream.data;
    if (typeof (stream) == "string") stream = new Buffer(stream);
    var output = new Vinyl({
        stat: {
            size: size
        },
        cwd: "/",
        base: "/",
        path: "/" + name,
        contents: stream,
    });
    return output;
};

module.exports = CatTo;