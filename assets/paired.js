$(function () {
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

        if (xs.size() != ys.size()) {
            $("#alert-size").css("display", "block");

            $("#size-x").text(xs.size());
            $("#size-y").text(ys.size());

            $("#mean-x").text(xs.mean().toPrecision(5));
            $("#mean-y").text(ys.mean().toPrecision(5));

            $("#variance-x").text(xs.variance().toPrecision(5));
            $("#variance-y").text(ys.variance().toPrecision(5));

            $("#sd-x").text(xs.sd().toPrecision(5));
            $("#sd-y").text(ys.sd().toPrecision(5));
        }
        else {
            $("#alert-size").css("display", "none");

            $("#size-x").text(xs.size());
            $("#size-y").text(ys.size());

            $("#mean-x").text(xs.mean().toPrecision(5));
            $("#mean-y").text(ys.mean().toPrecision(5));

            $("#variance-x").text(xs.variance().toPrecision(5));
            $("#variance-y").text(ys.variance().toPrecision(5));

            $("#sd-x").text(xs.sd().toPrecision(5));
            $("#sd-y").text(ys.sd().toPrecision(5));
        }
    });

    $("#group-x").val([109, 115, 107, 124, 123, 112, 128, 119, 121, 124, 123, 123].join("\n"));
    $("#group-y").val([105, 100, 118, 122, 122, 125, 101, 128, 104, 107, 103, 128].join("\n"));

    $("#run-test").click();
});
