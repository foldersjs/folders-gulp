/*
 *
 * Provide translation layers and compatibility for the popular gulpjs ecosystem.
 * This can be implemented as  duplex transform stream 
 */
var path = require('path');
var Transform = require('stream').Transform;
var util = require('util');


var LsFrom = function (options) {
    options = options || {};
    options.objectMode = true;

    if (!(this instanceof LsFrom))
        return new LsFrom(options);


    Transform.call(this, options);

};


module.exports = LsFrom;

util.inherits(LsFrom, Transform);

LsFrom.prototype._transform = function (chunk, encoding, callback) {
    var output;
    var self = this;
    output = vinylToList(chunk);
    self.push(output);
    callback();
    return true;

};



vinylToList = function (vinlyObj) {
    var modificationTime = vinlyObj.stat.mtime.getTime() + "";
    var name = path.basename(vinlyObj.path);
    var size = vinlyObj.stat.size;
    var uri = vinlyObj.base + "/" + name;
    var output = {
        "name": name,
        "uri": uri,
        "modificationTime": modificationTime,
        "fullPath": "/" + name,
        "size": size,
        "extension": "txt",
        "type": "text/plain"
    };
    return output;
};

/*
 * Basic test for this 
 * transformation stream which transform 
 * from gulp vinyl stream objects to folders.io objects 
 */
/*
var t = new LsFrom();

require('gulp').src('./*.js').pipe(t).on('data',function(data){
	
	console.log(data);
	
})
*/
