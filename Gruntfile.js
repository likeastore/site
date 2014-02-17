module.exports = function (grunt) {

	grunt.initConfig({
		myth: {
			all: {
				files: {
					'public/css/developers.css': 'myth/developers.css',
					'public/css/general.css': 'myth/general.css',
					'public/css/icons.css': 'myth/icons.css',
					'public/css/forms.css': 'myth/forms.css'
				}
			}
		},

		cssmin: {
			combine: {
				options: {
					keepSpecialComments: 0,
					report: 'gzip'
				},
				files: {
					'public/build/base_merge.min.css': ['public/css/merge/base_merge.css'],

					// old ones
					'public/build/common_merge.min.css': ['public/css/merge/common_merge.css'],
					'public/build/homepage_merge.min.css': ['public/css/merge/homepage_merge.css'],
					'public/build/register_merge.min.css': ['public/css/merge/register_merge.css'],
					'public/build/share_merge.min.css': ['public/css/merge/share_merge.css']
				}
			}
		},

		jshint: {
			js: ['public/js/**/*.js', 'source/**/*.js']
		},

		concat: {
			options: {
				stripBanners: true
			},
			base: {
				src: [
					'public/components/modernizr/modernizr.js',
					'public/components/vue/dist/vue.js'
				],
				dest: 'public/build/base_merge.js'
			},
			base_jquery: {
				src: [
					'public/components/modernizr/modernizr.js',
					'public/components/jquery/jquery.js',
					'public/js/jquery.helpers.js',
					'public/js/formular.js'
				],
				dest: 'public/build/base_jq_merge.js'
			}
		},

		uglify: {
			options: {
				compress: true,
				report: 'gzip'
			},
			target: {
				files: {
					'public/build/base_merge.min.js': ['public/build/base_merge.js'],
					'public/build/base_jq_merge.min.js': ['public/build/base_jq_merge.js'],
				}
			}
		},

		watch: {
			styles: {
				files: ['myth/**/*.css'],
				tasks: ['myth']
			},
			scripts: {
				files: ['public/js/**/*.js'],
				tasks: ['concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-myth');

	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('default', ['myth', 'cssmin', 'jshint', 'concat', 'uglify']);
};