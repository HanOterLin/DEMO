Dropzone.options.upload = {
    paramName: 'file',
    maxFilesize: 4096, // MB
    // maxFiles: 1,
    dictDefaultMessage: '拖动图片到此处，或者点击此处选择图片',
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
