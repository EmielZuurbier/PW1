/*global console, document, alert*/

(function () {
    "use strict";
    
    var navBtn = document.querySelector('nav button'),
        header = document.querySelector('header[role=heading]'),
        main = document.querySelector('main');
    
    function formHide() {
        header.classList.toggle('active');
        navBtn.classList.toggle('active');
        main.classList.toggle('active');
    }
    
    navBtn.addEventListener('click', formHide, false);
    
}());