function watchConfig(x, files) {
    return {
        files: files,
        tasks: [x],
        options: {
            debounceDelay: 200,
        },
    };
}

module.exports = {
  watchConfig
};
