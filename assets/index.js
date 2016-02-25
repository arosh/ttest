$(function () {
    var welchttest = function (xs, ys) {
        var distributions = require("distributions");
        var summary = require("summary");
        var x = summary(xs);
        var y = summary(ys);
        var sxm = x.variance() / x.size();
        var syn = y.variance() / y.size();
        var t = (x.mean() - y.mean()) / Math.sqrt(sxm + syn);
        var numer = Math.pow(sxm + syn, 2);
        var denom = Math.pow(sxm, 2) / (x.size() - 1) + Math.pow(syn, 2) / (y.size() - 1);
        var nu = numer / denom;
        var studentt = new distributions.Studentt(nu);
        var pvalue = 2 * Math.min(studentt.cdf(t), 1 - studentt.cdf(t));
        return { t: t, nu: nu, pvalue: pvalue };
    };

    Number.isFinite = Number.isFinite || function (any) {
        return typeof any === 'number' && isFinite(any);
    };

    var parseTextArea = function (elem) {
        var items = $(elem).val().split(/\s+/);
        console.log(items);
        var numbers = [];
        $.each(items, function (index, item) {
            var num = parseFloat($.trim(item));
            if (Number.isFinite(num)) {
                numbers.push(num);
            }
        });
        return numbers;
    };

    var xs = [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 1, 1];
    var ys = [3, 3, 4, 3, 1, 2, 3, 1, 1, 5, 4];
    console.log(welchttest(xs, ys));

    $('#run-test').on('click', function () {
        console.log(parseTextArea('#group-x'));
    });
});
