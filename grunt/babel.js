module.exports = function (grunt) {
    return {
        options: {
            sourceMap: true,
            plugins: ['transform-react-jsx'],
			presets: ['env', 'react']
		},
        jsx: {
            files: [{
                expand: true,
                cwd: 'src/client/',
                src: ['*.jsx'],
                dest: 'dist/client',
                ext: '.js'
            }]
        }
    };
}