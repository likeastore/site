module.exports = function (grunt) {

	grunt.initConfig({
		cssmin: {
			combine: {
				options: {
					report: 'gzip'
				},
				files: {
					'public/build/homepage_merge.min.css': ['public/css/merge/homepage_merge.css'],
					'public/build/register_merge.min.css': ['public/css/merge/register_merge.css'],
					'public/build/terms_merge.min.css': ['public/css/merge/terms_merge.css']
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