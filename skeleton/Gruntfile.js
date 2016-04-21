module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        template: {
          default: {
            options: {
              data: {
                'ad_name': 'skeleton',
                'ad_title': 'Skeleton Project',
                'ad_icon_file': 'icon.png',
                'ad_app_store_url': 'https://itunes.apple.com/'
              }
            },
            files: {
              '../../webroot/skeleton/landscape.html': ['../global/tags/landscape.html'],
              '../../webroot/skeleton/portrait.html': ['../global/tags/portrait.html'],
              '../../webroot/skeleton/test_tag.html': ['../global/tags/test_tag.html'],
              '../../webroot/skeleton/prod.html': ['../global/tags/prod.html']
            }
          }
        },

        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              '../../webroot/skeleton/css/mraid_wrapper.css': ['../global/css/mraid_wrapper.css']
            }
          }
        },

        tinypng: {
          options: {
              apiKey: "uOcm62qGGuH93MynfXExwmC3-DvOYOFM",
              summarize: true,
              showProgress: true,
              stopOnImageError: true
          },
          compress: {
            expand: true,
            src: ['texture_sheets/*.png'],
            dest: '../../webroot/skeleton/',
            ext: '.png'
          }
        },

        uglify: {
          options: {
            mangle: false
          },
          target: {
            files: {
              '../../webroot/skeleton/js/code.js': ['js/lib/phaser-no-physics.js', '../global/js/localization.js', '../global/js/utils.js', '../global/js/image_loader.js', 'js/preloader.js', 'js/game.js', 'js/ad.js', '../global/js/mraid_wrapper.js']
            }
          }
        },

        copy: {
          target: {
            files: [
              {src: ['texture_sheets/*.json'], dest: '../../webroot/skeleton/'},
              {src: ['img/icon.png'], dest: '../../webroot/skeleton/'}
            ]
          },
        },

        serve: {
          options: {
            port: 9998
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-serve');

    grunt.registerTask('default', ['cssmin', 'uglify', 'copy', 'tinypng', 'template']);
};