module.exports = function (grunt) {

	grunt.initConfig({
		cssmin: {
			combine: {
				files: {
					'public/build/welcome_merge.min.css': ['public/css/merge/welcome_main.css'],
					'public/build/register_merge.min.css': ['public/css/merge/register_main.css']
				}
			}
		},

		jshint: {
			js: ['public/js/**/*.js', 'source/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('build', ['cssmin']);
	grunt.registerTask('default', ['cssmin', 'jshint']);
};