$(function() {
    var pairedttest = function(d) {
        var distributions = require("distributions");
        var t = d.mean() * Math.sqrt(d.size()) / d.sd();
        var nu = d.size() - 1;
        var studentt = new distributions.Studentt(nu);
        var pvalue = 2 * (1 - studentt.cdf(Math.abs(t)));
        return { t: t, nu: nu, pvalue: pvalue };
    };

    var effectsizePaired = function(d) {
        return d.mean() / d.sd();
    };

    var confidenceInterval = function(d, alpha) {
        var distributions = require("distributions");
        var n = d.size();
        var nu = n - 1;
        var studentt = new distributions.Studentt(nu);
        var tinv = studentt.inv((1 + alpha) / 2);
        var me = tinv * Math.sqrt(d.variance() / n);
        return { 'lower': d.mean() - me, 'upper': d.mean() + me };
    };

    Number.isFinite = Number.isFinite || function(any) {
        return typeof any === 'number' && isFinite(any);
    };

    var parseTextArea = function(elem) {
        var summary = require("summary");
        var items = $(elem).val().split(/[,\s]+/);
        var numbers = [];
        $.each(items, function(index, item) {
            var num = parseFloat($.trim(item));
            if (Number.isFinite(num)) {
                numbers.push(num);
            }
        });
        return summary(numbers);
    };

    var difference = function(xs, ys) {
        var summary = require("summary");
        var d = [];
        for (var i = 0; i < xs.length; i++) {
            d.push(xs[i] - ys[i]);
        }
        return summary(d);
    };

    $('#run-test').on('click', function() {
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

        if (xs.size() != ys.size()) {
            $("#alert-size").removeClass("hidden");

            $("#mean-d").text("NA");
            $("#variance-d").text("NA");
            $("#paired-test-t").text("NA");
            $("#paired-test-nu").text("NA");
            $("#paired-test-p").text("NA");
            $("#effect-size-paired").text("NA");
        }
        else {
            $("#alert-size").addClass("hidden");

            var d = difference(xs._data, ys._data);
            $("#mean-d").text(d.mean().toPrecision(5));
            $("#variance-d").text(d.variance().toPrecision(5));

            var paired = pairedttest(d);
            $("#paired-test-t").text(paired.t.toPrecision(5));
            $("#paired-test-nu").text(paired.nu);
            $("#paired-test-p").text(paired.pvalue.toPrecision(5));

            var es = effectsizePaired(d);
            $("#effect-size-paired").text(es.toPrecision(5));

            var ci95 = confidenceInterval(d, 0.95);
            $("#ci-95").text("[" + ci95.lower.toPrecision(5) + ", " + ci95.upper.toPrecision(5) + "]");

            var ci99 = confidenceInterval(d, 0.99);
            $("#ci-99").text("[" + ci99.lower.toPrecision(5) + ", " + ci99.upper.toPrecision(5) + "]");
        }
    });

    $("#group-x").val([0.39, 0.28, 0.31, 0.21, 0.19, 0.64, 0.75, 0.36, 0.66, 0.54].join("\n"));
    $("#group-y").val([0.27, 0.04, 0.18, 0.08, 0.19, 0.54, 0.57, 0.28, 0.20, 0.40].join("\n"));

    $("#run-test").click();
});
