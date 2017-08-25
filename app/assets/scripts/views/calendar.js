define(['underscore', 'helper', 'date'], function (_, helper, date) {

    function buildCalendar(month, year) {
        $('#my').text(date.months(year)[month][0] + "," + year);

        var calendarBody = '<tr>';

        for (var i in date.days) {
            calendarBody += '<td class="day-col"><span class="day">' + date.days[i] + '</span></td>';
        }

        calendarBody += '</tr>';

        var firstNilDays = new Date(date.months(year)[month][0] + " 1, " + year).getDay();
        var lastNilDays = (7 - (firstNilDays + date.months(year)[month][1]) % 7) % 7;

        var arr = helper.split(Array(firstNilDays).fill(0).concat(_.range(1, (date.months(year)[month][1] + 1))).concat(Array(lastNilDays).fill(0)), 7);

        for (var i = 0; i < arr.length; i++) {
            calendarBody += '<tr>';

            for (var j = 0; j < 7; j++) {
                if (arr[i][j] == 0)
                    calendarBody += '<td></td>';
                else
                    calendarBody += '<td>' +
                                    '<i id="x' + arr[i][j] + '" class="fa fa-star-o fa-3x"></i>' +
                                    '<span class="date">' + arr[i][j] + '</span>' +
                                 '</td>';
            }

            calendarBody += '</tr>';
        }

        $('#calendarBody').find('table').html(calendarBody);
    }

    /* Initialize Calendar with current month and year. */
    (function () {
        var currentDate = new Date();
        buildCalendar(currentDate.getMonth(), currentDate.getFullYear());
    }());

    $('#next').click(function () {
        var currentMonthYear = new Date($('#my').text());
        var month = currentMonthYear.getMonth() + 1;
        var year = currentMonthYear.getFullYear();

        if (month > 11) {
            month = 0;
            year += 1;
        }

        var calendar = buildCalendar(month, year);
        $('#calendar').html(calendar);
    });

    $('#prev').click(function () {
        var currentMonthYear = new Date($('#my').text());
        var month = currentMonthYear.getMonth() - 1;
        var year = currentMonthYear.getFullYear();

        if (month < 0) {
            month = 11;
            year -= 1;
        }

        var calendar = buildCalendar(month, year);
        $('#calendar').html(calendar);
    });

});
