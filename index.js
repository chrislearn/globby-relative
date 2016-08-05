module.exports = function(pth, globs) {
    var providers = require("./index").providers;
    var pparts = pth.split(/[\\\/]/g);
    if (typeof globs == "string") {
        globs = [globs];
    }
    var maxMatched = [], matchedGlob;
    for (var i = 0, il = globs.length; i < il; i++) {
        var glob = globs[i];
        if (glob[0] != "!") {
            var gparts = glob.split(/[\\\/]/g);
            for (var j = 0, jl = pparts.length; j < jl; j++) {
                var ppart = pparts[j],
                    gpart = gparts[j];
                if (gpart == ppart && j >= maxMatched.length) {
                    maxMatched.push(ppart);
                    matchedGlob = glob;
                } else {
                    break;
                }
            }
        }
    }
    pparts.splice(0, maxMatched.length);
    return {path:pparts.join("/"), glob: matchedGlob};
};
