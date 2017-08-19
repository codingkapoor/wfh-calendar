var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = [];

function prepareMonthsDictionary(year) {
    months = {
        0: ["January", 31],
        1: [],
        2: ["March", 31],
        3: ["April", 30],
        4: ["May", 31],
        5: ["June", 30],
        6: ["July", 31],
        7: ["August", 31],
        8: ["September", 30],
        9: ["October", 31],
        10: ["November", 30],
        11: ["December", 31]
    };

    function isLeapYear(year) {
        return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
    }

    if (isLeapYear(year)) {
        months[1] = ["February", 29]
    } else
        months[1] = ["February", 28]
}

function buildCalendar(month, year) {
    $('#my').text(months[month][0] + "," + year);

    var calendarBody = `<tr>`;

    for (var i in days) {
        calendarBody += `<td class="day-col"><span class="day">` + days[i] + `</span></td>`;
    }

    calendarBody += `</tr>`;

    var firstNilDays = new Date(months[month][0] + " 1, " + year).getDay();
    var lastNilDays = (7 - (firstNilDays + months[month][1]) % 7) % 7;

    var arr = split(Array(firstNilDays).fill(0).concat(_.range(1, (months[month][1] + 1))).concat(Array(lastNilDays).fill(0)), 7);

    for (var i = 0; i < arr.length; i++) {
        calendarBody += `<tr>`;

        for (var j = 0; j < 7; j++) {
            if (arr[i][j] == 0)
                calendarBody += `<td></td>`;
            else
                calendarBody += `<td>
                                    <i id="x` + arr[i][j] + `" class="fa fa-star-o fa-3x"></i>
                                    <span class="date">` + arr[i][j] + `</span>
                                 </td>`;
        }

        calendarBody += `</tr>`;
    }

    $('#calendarBody').find('table').html(calendarBody);
}

function next() {
    var currentMonthYear = new Date($('#my').text());
    var month = currentMonthYear.getMonth() + 1;
    var year = currentMonthYear.getFullYear();

    if (month > 11) {
        month = 0;
        year += 1;
    }

    var calendar = buildCalendar(month, year);
    $('#calendar').html(calendar);
}

function prev() {
    var currentMonthYear = new Date($('#my').text());
    var month = currentMonthYear.getMonth() - 1;
    var year = currentMonthYear.getFullYear();

    if (month < 0) {
        month = 11;
        year -= 1;
    }

    var calendar = buildCalendar(month, year);
    $('#calendar').html(calendar);
}

/* Initialize Calendar with current month and year. */
(function () {
    prepareMonthsDictionary(2017);

    var currentDate = new Date();
    buildCalendar(currentDate.getMonth(), currentDate.getFullYear());
})();
