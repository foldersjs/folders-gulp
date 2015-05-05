/*
 *
 * Provide translation layers and compatibility for the popular gulpjs ecosystem.
 *
 */

var path = require('path');
var Vinyl = require('vinyl');

var cat = {};
cat.prototype.to = function(blobStream, base) {
	var size = blobStream.headers['X-File-Size'];
	var name = blobStream.headers['X-File-Name'];
	var stream = blobStream.data;
	var output = new Vinyl({
		stat: { size: size },
		cwd: "/",
		base: "/",
		path: "/" + name,
		contents: stream,
	});
	return output;
};

cat.prototype.from = function(vinylObj) {
	var result = vinylObj.stat;
	var name = path.basename(vinylObj.name);
	var data = vinlyObj.contents;
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

var ls = {};
var toLs
ls.prototype.to = function(listObj) {
	var size = listObj.size;
	var mtime = new Date(parseFloat(listObj.modificationTime));
	var stream = function() {}; // FIXME: Stream accesses parent server.
	var base = listObj.uri; // NOTES: May want to clean up this path.
	var output = new Vinyl({
		stat: { size: size, mtime: mtime },
		cwd: "/",
		base: path.dirname(base),
		path: uri,
		contents: stream,
	});
	return output;
};
ls.prototype.from = function(vinlyObj) {
	var modificationTime = vinlyObj.stat.mtime.getTime() + "";
	var name = path.basename(vinlyObj.path);
	var size = vinlyObj.size; 
	var uri = vinlyObj.base;
	var output = {
		"name": name,
		"uri": uri,
		"modificationTime": modificationTime,
		"fullPath": "/" + name,
		"size": size,
		"extension": "txt",
		"type":"text/plain"
	};
	return output;
};


