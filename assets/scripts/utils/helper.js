define(function () {
    return {
        split: function split(arr, n) {
            var res = [];
            while (arr.length) {
                res.push(arr.splice(0, n));
            }
            return res;
        }
    }
});
