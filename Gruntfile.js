module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            // @todo remove drupal
            dist: {
                src: [
                    'xhr.js',
                    'fetch.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            options: {
              curly: true,
              eqeqeq: true,
              eqnull: true,
              browser: true,
              reporter: 'jslint',
              reporterOutput: 'reports/jshint.xml',
              globals: {
                  jQuery: true
              },
            },
            all: ['src/scripts/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('build-js', ['concat', 'uglify', 'jshint']);
    grunt.registerTask('build', ['build-js']);

};
