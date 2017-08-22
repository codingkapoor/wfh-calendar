module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times.
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Tasks
    grunt.initConfig({
        config: config,

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: '<%= config.dist %>/*'
                }]
            }
        }
    });

    // Load grunt plugins
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register grunt tasks
    grunt.registerTask('build', ['sass', 'cssmin', 'uglify']);
    grunt.registerTask('default', ['build', 'watch']);
    //grunt.registerTask('say', function() {console.log('despacito')});
}
