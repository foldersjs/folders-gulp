/*
 *
 * Provide translation layers and compatibility for the popular gulpjs ecosystem.
 *
 */
var path = require('path');
var gulp = require('gulp');
var LsTo = require('./helpers/LsTo');
var LsFrom = require('./helpers/LsFrom');
var CatTo = require('./helpers/CatTo');
var CatFrom = require('./helpers/CatFrom');



var FoldersGulp = function (provider, options) {

    var self = this;
    self.options = options;
    self.provider = provider || 'ftp';

};


module.exports = FoldersGulp;

/*
 * This method returns   
 * gulp object stream  from provider.ls()
 */

FoldersGulp.prototype.lsTo = function (path) {
    var self = this;
    return new LsTo(path, self.provider, self.options);

};

/*
 * This method returns   
 * provider object stream object from gulp 
 */
FoldersGulp.prototype.lsFrom = function () {
    var self = this;
    return new LsFrom(self.options);

};

/*
 * This method returns   
 * gulp object stream object from  provider
 */
FoldersGulp.prototype.catTo = function (path) {
    var self = this;
    return new CatTo(path, self.provider, self.options);
};

/*
 * This method returns   
 * provider object stream object from gulp object
 */
FoldersGulp.prototype.catFrom = function () {
    var self = this;
    return new CatFrom(self.options);

};