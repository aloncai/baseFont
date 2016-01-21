/*jslint node: true */
module.exports = function (grunt) {
    //config project
    grunt.initConfig({
        //加载数据
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.distlate.today("yyyy-mm-dd") %>n' +
        '* Copyright (c) <%= grunt.distlate.today("yyyy") %> <%= pkg.author.name %>;' +
        ' */n',

        // Grunt任务开始前的清理工作
        clean: {
            files: ['dist']
        },

        //合并文件
        concat: {
            js: {
                src: ['app/modules/*/*.js'],
                dest: 'dist/js/server.js'
            },
            css: {
                src: ['app/modules/*.css'],
                dest: 'dist/css/server.css'
            }
        },
        //js文件压缩
        uglify: {
            js: {
                src: ['dist/js/server.js'],
                dest: 'dist/js/server.min.js'
            }
        },
        //js文件压缩
        cssmin: {
            js: {
                src: ['dist/css/server.css'],
                dest: 'dist/css/server.min.css'
            }
        },

        //文件校验
        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            js: {
                src: ['app/modules/*/*.js', 'dist/js/*.js']
            }
        },
        //watch任务，实时监听文件的变化，并进行编译
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            js: {
                files: '<%= concat.js.src %>',
                tasks: ['jshint:js', 'concat:js', 'uglify']
            },
            css: {
                files: '<%= concat.css.src %>',
                tasks: ['concat:css','cssmin']
            }
        },

    });


    //加载各种grunt插件完成任务
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //注册服务
    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'watch']);
    grunt.registerTask('online', ['clean', 'jshint', 'concat', 'uglify', 'cssmin']);
};

