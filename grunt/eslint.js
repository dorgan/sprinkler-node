module.exports = function () {
    return {
        options: {
            configFile: './eslint.json',
            extends: ['eslint:recommended', 'google']
        },
        validate: [
            'src/**/*.js',
            'grunt/**/*.js'
        ]
    };
};