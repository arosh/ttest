$(function () {
    var welchttest = function (xs, ys) {
        var distributions = require("distributions");
        var sxn = xs.variance() / xs.size();
        var syn = ys.variance() / ys.size();
        var t = (xs.mean() - ys.mean()) / Math.sqrt(sxn + syn);
        var numer = Math.pow(sxn + syn, 2);
        var denom = Math.pow(sxn, 2) / (xs.size() - 1) + Math.pow(syn, 2) / (ys.size() - 1);
        var nu = numer / denom;
        var studentt = new distributions.Studentt(nu);
        var pvalue = 2 * (1 - studentt.cdf(Math.abs(t)));
        return { t: t, nu: nu, pvalue: pvalue };
    };

    var effectsizeUnpaired = function (xs, ys) {
        var numer = xs.mean() - xs.mean();
        var denom = Math.sqrt(((xs.size() - 1) * xs.variance() + (xs.size() - 1) * xs.variance()) / (xs.size() + xs.size() - 2));
        return numer / denom;
    };

    Number.isFinite = Number.isFinite || function (any) {
        return typeof any === 'number' && isFinite(any);
    };

    var parseTextArea = function (elem) {
        var summary = require("summary");
        var items = $(elem).val().split(/[,\s]+/);
        var numbers = [];
        $.each(items, function (index, item) {
            var num = parseFloat($.trim(item));
            if (Number.isFinite(num)) {
                numbers.push(num);
            }
        });
        return summary(numbers);
    };

    $('#run-test').on('click', function () {
        var xs = parseTextArea("#group-x");
        var ys = parseTextArea("#group-y");
        $("#size-x").text(xs.size());
        $("#size-y").text(ys.size());

        $("#mean-x").text(xs.mean().toPrecision(5));
        $("#mean-y").text(ys.mean().toPrecision(5));

        $("#variance-x").text(xs.variance().toPrecision(5));
        $("#variance-y").text(ys.variance().toPrecision(5));

        $("#sd-x").text(xs.sd().toPrecision(5));
        $("#sd-y").text(ys.sd().toPrecision(5));

        var welch = welchttest(xs, ys);
        $("#welch-ttest-t").text(welch.t.toPrecision(5));
        $("#welch-ttest-nu").text(welch.nu.toPrecision(5));
        $("#welch-ttest-p").text(welch.pvalue.toPrecision(5));
        var es = effectsizeUnpaired(xs, ys);
        $("#effect-size-unpaired").text(es.toPrecision(5));
    });

    $("#group-x").val([1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 1, 1].join("\n"));
    $("#group-y").val([3, 3, 4, 3, 1, 2, 3, 1, 1, 5, 4].join("\n"));

    $("#run-test").click();
});
