module.exports = function (grunt) {
    return {
        options: {
            transform: [
                [
                    'babelify', {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                ]
            ]
        },
        dev: {
            src: ['src/client/*.jsx', 'src/client/*.js'],
            dest: 'dist/client/app.js',
            options: {
                watch: true,
                debug: true
            }
        }
    };
};