module.exports = function (grunt) {
    return {
        scripts: {
            files: [
                'src/client/**/*.js',
                'src/client/***.jsx'
            ],
            tasks: 'browserify',
            options: {
                spawn: false
            }
        }
    }
}