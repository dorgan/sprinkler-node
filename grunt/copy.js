module.exports = function (grunt) {
    return {
        all: {
            files: [
                {expand: true, flatten: true, src: 'src/server/**', dest: 'dist/server/'},
                {expand: true, flatten: true, src: 'src/server/config/*', dest: 'dist/server/config/'},
                {expand: true, flatten: true, src: 'src/client/*.html', dest: 'dist/client/'}
            ]
        }
    };
}
