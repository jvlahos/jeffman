module.exports = function (grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {
        dev: {
          options: {
            style: 'expanded',
            lineNumbers: true,
            sourcemap: 'none'
          },
          files: [{
            expand: true,
            cwd: 'scss/',
            src: ['*.scss'],
            dest: 'css/',
            ext: '.css'
          }]
        },
        dist: {
          options: {
            style: 'compressed',
            lineNumbers: false,
            sourcemap: 'none'
          },
          files: [{
            expand: true,
            cwd: 'scss/',
            src: ['*.scss'],
            dest: 'css/',
            ext: '.css'
          }]
        }
      },
      watch: {
        scripts: {
          files: ['scss/*.scss'],
          tasks: ['sass'],
          options: {
            spawn: false,
          },
        },
      }, //eo watch
      postcss: {
        options: {
          processors: [
            require('autoprefixer-core')({
              browsers: 'last 2 versions, ie >= 8'
            })
          ]
        },
        dist: {
          files: [{
            expand: true,
            cwd: 'css/',
            src: ['screen.css'],
            dest: 'css/',
            ext: '.css'
            }]
        }
      } //eo postcss
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('dev', ['sass:dev', 'postcss']);
  grunt.registerTask('dist', ['sass:dist', 'postcss']);
  grunt.registerTask('default', ['sass:dist', 'postcss']);

};
