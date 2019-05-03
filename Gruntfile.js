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
      all: {
        options: {
          configFile: "conf.js",
          directConnect: true,
          args: {
            suite: "all",
            params: '<%= params %>'
          }
        }
      },
      add: {
        options: {
          configFile: "conf.js",
          directConnect: true,
          args: {
            suite: "add",
            params: '<%= params %>'
          }
        }
      },
      retrieve: {
        options: {
          configFile: "conf.js",
          directConnect: true,
          args: {
            suite: "retrieve",
            params: '<%= params %>'
          }
        }
      },
      edit: {
        options: {
          configFile: "conf.js",
          directConnect: true,
          args: {
            suite: "edit",
            params: '<%= params %>'
          }
        }
      },
      delete: {
        options: {
          configFile: "conf.js",
          directConnect: true,
          args: {
            suite: "delete",
            params: '<%= params %>'
          }
        }
      },
      edgeCases: {
        options: {
          configFile: "conf.js",
          directConnect: true,
          args: {
            suite: "edgeCases",
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

  grunt.registerTask('add', function (env) {
    setParams(env);
    grunt.task.run(['protractor:add']);
  });

  grunt.registerTask('retrieve', function (env) {
    setParams(env);
    grunt.task.run(['protractor:retrieve']);
  });

  grunt.registerTask('delete', function (env) {
    setParams(env);
    grunt.task.run(['protractor:delete']);
  });

  grunt.registerTask('edit', function (env) {
    setParams(env);
    grunt.task.run(['protractor:edit']);
  });

  grunt.registerTask('edgeCases', function (env) {
    setParams(env);
    grunt.task.run(['protractor:edgeCases']);
  });

  grunt.registerTask('all', function (env) {
    setParams(env);
    grunt.task.run(['protractor:all']);
  });

};
