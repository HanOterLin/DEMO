Dropzone.options.upload = {
    paramName: 'file',
    // maxFilesize: 2, // MB
    // maxFiles: 1,
    dictDefaultMessage: 'Drag a file here to upload, or click to select one',
    // acceptedFiles: '*/*',
    init: function() {
        this.on('success', function( file, resp ){
            console.log( file );
            console.log( resp );
        });
        // this.on('thumbnail', function(file) {
        // });
    }
    // accept: function(file, done) {
    //   file.acceptDimensions = done;
    //   file.rejectDimensions = function() {
    //   };
    // }
};
