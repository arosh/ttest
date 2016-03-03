$(function () {
    var pairedttest = function (d) {
        var distributions = require("distributions");
        var t = d.mean() * Math.sqrt(d.size()) / d.sd();
        var nu = d.size() - 1;
        var studentt = new distributions.Studentt(nu);
        var pvalue = 2 * (1 - studentt.cdf(Math.abs(t)));
        return { t: t, nu: nu, pvalue: pvalue };
    };

    var effectsizePaired = function (d) {
        return d.mean() / d.sd();
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

    var difference = function (xs, ys) {
        var summary = require("summary");
        var d = [];
        for (var i = 0; i < xs.length; i++) {
            d.push(xs[i] - ys[i]);
        }
        return summary(d);
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
            $("#paired-test-nu").text(paired.nu.toPrecision(5));
            $("#paired-test-p").text(paired.pvalue.toPrecision(5));
            var es = effectsizePaired(d);
            $("#effect-size-paired").text(es.toPrecision(5));
        }
    });

    $("#group-x").val([109, 115, 107, 124, 123, 112, 128, 119, 121, 124, 123, 123].join("\n"));
    $("#group-y").val([105, 100, 118, 122, 122, 125, 101, 128, 104, 107, 103, 128].join("\n"));

    $("#run-test").click();
});
