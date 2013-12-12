module.exports = function (grunt) {

	grunt.initConfig({
		cssmin: {
			combine: {
				files: {
					'public/build/common_merge.min.css': ['public/css/merge/common_merge.css']
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