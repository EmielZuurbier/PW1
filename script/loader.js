/*global document, console*/

var loaderIcon = document.getElementById('loader');
    
var loader = {
    show: function () {
        "use strict";
        loaderIcon.classList.add('active');
        console.log("Loading");
    },
    hide: function () {
        "use strict";
        loaderIcon.classList.remove('active');
        console.log("Loading finished");
    }
};