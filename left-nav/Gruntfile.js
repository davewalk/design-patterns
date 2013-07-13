var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	
	var appConfig = {
		dev: 'app',
		prod: 'dist'
	};

	grunt.initConfig({
		app: appConfig,
		pkg: grunt.file.readJSON('package.json'),
		port: 9000,
		connect: {
			options: {
                port: 9000,
                hostname: 'localhost'
            },
			livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            }
		},
		watch: {
			compass: {
				files: ['<%= app.dev %>/styles/*.{scss,sass}'],
				tasks: ['compass']
			},
			livereload: {
				options: {
					livereload: 35729
				},
				files: ['<%= app.dev %>/*', '<%= app.dev %>/scripts/**/*', '<%= app.dev %>/styles/*.css']
			}
		},
		open: {
			dev: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},
		compass: {
			dev: {
				options: {
				cssDir: '<%= app.dev %>/styles',
				sassDir: '<%= app.dev %>/styles',
				imagesDir: '<%= app.dev %>/images',
				javascriptsDir: '<%= app.dev %>/scripts',
				force: true
				}
			}
		}
	});

	grunt.registerTask('server', ['connect:livereload','open:dev','watch']);

	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-compass');
};