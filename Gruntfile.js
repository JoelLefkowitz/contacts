const init = require("./tools/grunt/init");
const aliases = require("./tools/grunt/aliases");

module.exports = function (grunt) {
    grunt.initConfig({
            clean: init.toClean,
            exec: init.execTasks,
            watch: init.watchTasks
    });
    
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-force-task");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");

    aliases.aliasExecTasks(grunt, init.execTasks, init.toForce)
    aliases.aliasWatchTasks(grunt, init.toWatch);

    grunt.registerTask("lint", [
        "cspell",
        "eslint",
        "pylint",
        "bandit",
    ]);
    grunt.registerTask("format", [
        "prettier",
        "csscomb",
        "presort",
        "black",
        "autoflake",
        "isort",
    ]);
    grunt.registerTask("tests", [ "unitTests", "integrationTests", "e2eTests"]);
    grunt.registerTask("prebuild", ["format", "lint", "tests"]);
};
