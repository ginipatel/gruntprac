module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['src/js/*.js'],
                dest: ['dist/js/main.min.js']
            }
        },
        concat: {
            dist: {
                src: ['src/js/main.js'],
                dest: 'dist/js/main.js'
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'dist/css/style.css': 'src/scss/*.scss'       // 'destination': 'source'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8002,
                    hostname: 'localhost',
                    base:'dist',
                    livereload: true
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: 'templates/**.html',
                dest: 'dist/',
                flatten: true,
                filter: 'isFile'
            }
        },
        wiredep: {

            task: {

                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'src/templates/**/*.html' // .html support...
                ],
                ignorePath: '../../dist/'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            options:{
                livereload:true,
                spawn:false
            },
            src: {
                files: ['src/js/*.js', 'src/scss/*.scss' , 'src/templates/*.html'],
                tasks:['sass', 'concat','babel','copy','connect']
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-babel');

    // Default task(s).
    grunt.registerTask('default', ['wiredep','concat','sass','babel', 'copy','connect','watch']);

};