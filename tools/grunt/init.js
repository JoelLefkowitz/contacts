const parsers = require("./parsers");
const utils = require("./utils");
const path = require('path');

const toForce = ["prettier"]
const toWatch = ["lint", "tests"]
const toClean = ["contacts/dist"]

const routineExecs = parsers.parseObjAttrs(
    parsers.parseYaml(path.join(__dirname, "routines.yml")),
    parsers.joinListEntries
);

const angularExecs = parsers.parseObjAttrs(
    parsers.parseYaml(path.join(__dirname, "angular.yml")),
    exec => {
        [key, cmd] = parsers.joinListEntries(exec)
        return [key, {cmd, cwd: "contacts"}]
    }
);

const execTasks = { ...routineExecs, ...angularExecs };
const watchTasks = parsers.parseListToObj(toWatch, utils.watchConfig);

module.exports = {
    execTasks,
    watchTasks,
    toClean,
    toWatch,
    toForce
  };
  