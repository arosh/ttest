$(function () {
    var distributions = require("distributions");
    var summary = require("summary");
    var x = summary([1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 1, 1]);
    var y = summary([3, 3, 4, 3, 1, 2, 3, 1, 1, 5, 4]);
    var sxm = x.variance() / x.size();
    var syn = y.variance() / y.size();
    var t = (x.mean() - y.mean()) / Math.sqrt(sxm + syn);
    var numer = Math.pow(sxm + syn, 2);
    var denom = Math.pow(sxm, 2) / (x.size() - 1) + Math.pow(syn, 2) / (y.size() - 1);
    var nu = numer / denom;
    console.log(t);
    console.log(nu);
    var studentt = new distributions.Studentt(nu);
    console.log(2 * Math.min(studentt.cdf(t), 1 - studentt.cdf(t)));
});
