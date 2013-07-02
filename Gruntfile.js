module.exports = function (grunt) {

	grunt.initConfig({
		cssmin: {
			combine: {
				files: {
					'public/build/styles.min.css': ['public/css/main.css']
				}
			}
		},

		jshint: {
			js: ['public/js/**/*.js', 'source/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['cssmin', 'jshint']);
};