define(function () {
    return {
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: function getMonthsDictionary(year) {
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
            
            return months;
        }
    }
});
