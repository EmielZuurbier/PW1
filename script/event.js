/*global console, document, alert*/

(function () {
    "use strict";
    
    var navBtn = document.querySelector('nav button'),
        header = document.querySelector('header[role=heading]'),
        main = document.querySelector('main'),
//        result = document.getElementById('result'),
        chosen = [];
        
    function formHide() {
        header.classList.toggle('active');
        navBtn.classList.toggle('active');
        main.classList.toggle('active');
    }
    
//    function move(e) {
//        if (e.target !== e.currentTarget) {
//            var clickedItem = e.target.id,
//                item = e;
//            
//            chosen.push(clickedItem);
//            
//            console.log(clickedItem, item, chosen);
//        }
//        e.stopPropagation();
//    }
    
    navBtn.addEventListener('click', formHide, false);
//    result.addEventListener('click', move, false);
    
}());