folders-gulp
=============

This package adds a compatibility layer between folders objects and common gulp semantics.
This package provides translation layers and compatibility for the popular gulpjs ecosystem.
This must be used with  folders.io synthetic file system like  'folders-ftp'
'folders-aws' ,'folders-pkgcloud' ,'folders-local' etc

Basic Usage

### Installation 

Example:

To use 'folders-gulp' with  a devDependency 'folders-ftp'


Installation (use --save to save to package.json)

```sh
npm install folders-gulp
```


Install 'folders-ftp' (use --save-dev to  add devDependency to package.json)

```sh
npm install folders-ftp 
```



### Constructor

Constructor, could pass the special option/param in the config param. For example in our case
it is 'ftp'. 
 

```js
var FoldersGulp = require('folders-gulp');

var config = {
         
		provider : 'ftp'
		 
};

var gulp = new FoldersGulp("localhost-gulp", config);
```



Note:  **folders.io** synthetic  file system module must be installed before using it with 'folders-gulp'.

###lsTo

Convert provider.ls() records to gulp objects stream  

```js
/**
 * @param uri, the uri to ls
 * lsTo(uri)
 */
 
gulp.lsTo(uri).pipe(someGulpPlugin());
```


###lsFrom

Convert gulp objects to provider.ls() record 

```js
/**
 * 
 * lsFrom()
 */
 
someGulpPlugin('/*.js').pipe(gulp.lsFrom()).on('data',function(data){
	
	// 'Data' contains  folders.io ls records
		console.log(data);
	
});
```


###catTo

Convert provider.cat() read stream to gulp object stream  

```js

/**
 * @param uri, the file uri to cat 
 * catTo(uri) 
 */

gulp.catTo(uri).pipe(someGulpPlugin());
```

###catFrom

Convert gulp object to provider.cat() object 
```js

/** 
 * catFrom() 
 */

someGulpPlugin('somefile.ext').pipe(gulp.catFrom()).on('data',function(data){
	
	// 'data.data' contains  folders.io compatible read stream
	console.log(data.data);
	
});
 
```

### writeFrom

Writes to a file specified by 'path' from a gulp stream 


```js

/**
 * @param path, string, the path 
 * @param cb, the callback function
 * writeFrom(path,cb)
 */


someGulpPlugin('somefile.ext').pipe(gulp.writeFrom(path));
```

### writeTo

```js
 
 /*
  * Not implemented yet 
  *
  */
  
```


