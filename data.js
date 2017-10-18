//存储在LocalStorage 中
;(function () {
    window.s = {};
    s.get = function (a) {
        var c = localStorage.getItem(a);
        return JSON.parse(c);
    };
    s.set = function (a, b) {
        b = JSON.stringify(b);
        return localStorage.setItem(a,b);
    }

})();