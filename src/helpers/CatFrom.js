/*
 *
 * Provide translation layers and compatibility for the popular gulpjs ecosystem.
 * This must be implemented as  duplex transform stream 
 */
var path = require('path');
var Transform = require('stream').Transform;
var util = require('util');


var CatFolders = function (options) {

    options = options || {};
    options.objectMode = true;

    if (!(this instanceof CatFolders))
        return new CatFolders(options);
    Transform.call(this, options);

};

module.exports = CatFolders;

util.inherits(CatFolders, Transform);



CatFolders.prototype._transform = function (chunk, encoding, callback) {
    var self = this;
    var output;
    output = vinylToCat(chunk);
    self.push(output);
    callback();
};


vinylToCat = function (vinylObj) {
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


/*
 * Basic test for this 
 * transformation stream which transform 
 * from gulp vinyl stream objects to folders.io objects 
 */
/*
var t = new CatFolders();

require('gulp').src('./somefile.txt').pipe(t).on('data',function(data){
	
	console.log(data);
	
})
*/

