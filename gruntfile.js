'use strict';

module.exports = function (grunt) {

    // Logs time taken by grunt tasks.
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Tasks configurations
    grunt.initConfig({
        config: config,

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['.tmp', '<%= config.dist %>/*']
                }]
            },
            server: '.tmp'
        },

        htmlmin: {
            html: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: '*.html',
                    dest: '.tmp'
                  }]
            }
        },

        sass: {
            css: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/styles/scss',
                    src: ['{,*/}*.scss'],
                    dest: '.tmp/assets/styles',
                    ext: '.css'
                }]
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/scripts',
                    src: ['{,*/}*.js', '!libs/*.js'],
                    dest: '.tmp/assets/scripts'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        'assets/scripts/libs/*.js'
                      ]
                }, {
                    expand: true,
                    cwd: '.tmp',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.html',
                        'assets/scripts/{,*/}*.js',
                        'assets/styles/{,*/}*.css'
                      ]
                }]
            }
        },

        watch: {
            html: {
                files: '<%= config.app %>/*.html',
                tasks: ['htmlmin']
            },
            css: {
                files: '<%= config.app %>/assets/styles/{,*/}*.scss',
                tasks: ['sass']
            },
            js: {
                files: '<%= config.app %>/assets/scripts/{,*/}*.js',
                tasks: ['uglify']
            }
        },

        concurrent: {
            target: [
                'htmlmin',
                'sass',
                'uglify'
              ]
        },

        browserSync: {
            options: {
                notify: false,
                background: true,
                browser: "google chrome"
            },
            
            // How does livereload works?
            // Changes to files watched in 'config.app' invokes respective tasks which brings changes to files in '.tmp'.
            livereload: {
                options: {
                    files: [
                        '.tmp/*.html',
                        '.tmp/assets/styles/{,*/}*.css',
                        '.tmp/assets/scripts/{,*/}*.js'
                      ],
                    port: 9000,
                    server: {
                        baseDir: ['.tmp', config.app]
                    }
                }
            },
            dist: {
                options: {
                    background: false,
                    server: '<%= config.dist %>'
                }
            }
        }
    });

    // Load grunt plugins
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register grunt tasks    
    grunt.registerTask('build', ['clean:dist', 'concurrent', 'copy']);    
    grunt.registerTask('default', ['build', 'watch']);

    grunt.registerTask('server', 'Starts the server with livereload.', function (target) {
        if (target == 'dist') {
            return grunt.task.run(['build', 'browserSync:dist']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent',
            'browserSync:livereload',
            'watch'
        ]);
    });
}
