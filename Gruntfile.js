module.exports = function (grunt) {
  process.execArgv = [];

  // Params helper setter
  function setParams(env) {
    let configJson = grunt.file.readJSON('config/parameterConfig.json');

    configJson.headless = grunt.option('headless') || configJson.headless;
    configJson.computerNameToSearch = grunt.option('computerToSearch') || configJson.computerToSearch;
    configJson.computerNameToSearch

    grunt.config.set('params', configJson);
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'specs/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    protractor: {
      options: {
        configFile: "conf.js",
        directConnect: true
      },
      wip: {
        options: {
          configFile: "conf.js",
          directConnect: true,
          args: {
            suite: "wip",
            params: '<%= params %>'
          }
        }
      },
      testFrontend: {
        options: {
          configFile: "conf.js",
          directConnect: true,
          args: {
            suite: ['wip'],
            params: '<%= params %>'
          }
        }
      },
      testFrontendHeadless: {
        options: {
          configFile: "conf-headless.js",
          directConnect: true,
          args: {
            suite: ['wip'],
            params: '<%= params %>'
          }
        }
      },
    },

    shell: {
      options: {
        stdout: true
      },
      install: {
        command: 'npm install'
      },
      testBackend: {
        command: 'npm test'
      },
      webdriver_update: {
        command: 'node node_modules/webdriver-manager/bin/webdriver-manager update'
      }
    },

  });


  /// GRUNT PLUGIN LOAD ///

  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-shell');


  /// SHELL TASKS ///

  grunt.registerTask('install', ['shell:install']);
  grunt.registerTask('update', ['shell:webdriver_update']);
  grunt.registerTask('test-backend', ['shell:testBackend']);


  /// INDIVIDUAL TASKS ///

  grunt.registerTask('default', ['protractor:full']);


  grunt.registerTask('test-CRUD', function (env) {
    setParams(env);
      if (grunt.config.data.params.headless == true) {
        console.log("DESKTOP HEADLESS")
        grunt.task.run(['protractor:wip-headless']);
      } else {
        console.log("DESKTOP")
        grunt.task.run(['protractor:wip']);
      }
  });

  grunt.registerTask('wip', function (env) {
    setParams(env);
    grunt.task.run(['protractor:wip']);
  });

};
