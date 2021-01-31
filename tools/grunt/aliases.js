function aliasExecTasks(grunt, execTasks, toForce=[]) {
    for (let name of Object.keys(execTasks)) {
        toForce.includes(name)
            ? grunt.registerTask(name, "force:exec:" + name)
            : grunt.registerTask(name, "exec:" + name);
    }
}

function aliasWatchTasks(grunt, toWatch) {
    for (let name of toWatch) {
        grunt.registerTask(
            name.concat("Watch"),
            "watch:" + name
        );
    }
}

module.exports = {
    aliasExecTasks,
    aliasWatchTasks
};
  