const fs = require("fs");
const YAML = require("yaml");

function parseYaml(x) {
    return YAML.parse(fs.readFileSync(x, "utf8"));
}

function parseObjAttrs(x, cb) {
    return Object.fromEntries(Object.entries(x).map(cb));
}

function parseListToObj(x, cb) {
    return Object.fromEntries(x.map((i) => [i, cb(i)]));
}

function joinListEntries(x) {
    return [x[0], x[1].join(" ")];
}

module.exports = {
  parseYaml,
  parseObjAttrs,
  parseListToObj,
  joinListEntries,
};
