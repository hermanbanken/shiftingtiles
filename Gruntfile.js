module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        autoprefixer: {
            main_style: {
                src: 'design/shiftingtiles.css',
                dest: 'design/shiftingtiles.css'
            }
        },
        less : {
            development: {
                options: {
                    paths: [ "design" ]
                },
                files: {
                    "design/shiftingtiles.css": "design/shiftingtiles.less"

                }
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );

    grunt.registerTask( 'default', [ 'less', 'autoprefixer' ] );
};