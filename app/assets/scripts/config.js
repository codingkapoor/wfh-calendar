requirejs.config({
    baseUrl: 'assets/scripts',
    paths: {
        fontawesome: 'https://use.fontawesome.com/ff519746ef',
        underscore: 'libs/underscore-min',
        helper: 'utils/helper',
        date: 'views/date'
    },
    shim: {
        'utils/validate': ['views/calendar']
    }
});
