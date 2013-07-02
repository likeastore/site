module.exports = function (grunt) {

	grunt.initConfig({
		cssmin: {
			combine: {
				files: {
					'public/build/styles.min.css': ['public/css/main.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['cssmin']);
};