/*global document*/

(function () {
    "use strict";
    
    var submit = document.getElementById('submit');
    var app = {
        
        form: function () {
            var area = document.getElementById('area').value,
                budget = document.getElementById('budget').value,
                budgetLow = Math.round(budget * 0.98),
                budgetHigh = Math.round(budget * 1.01);
            
            console.log(area, budget, budgetLow, budgetHigh);
            
            app.get(area, budgetLow, budgetHigh);
        },
        
        get: function (area, low, high) {
            var renderElement = document.getElementById('data'),
                i = 0;
            
            if (area === '' || area === 'undefined') {
                area = 'heel-nederland';
                console.log(area);
            } else {
                area = area;
                console.log(area);
            }
            
            console.log('http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/?type=koop&zo=/' + area + '/' +  low + '-' + high + '/&page=1&pagesize=25');
            
            microAjax('http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/?type=koop&zo=/' + area + '/' +  low + '-' + high + '/&page=1&pagesize=25', function (res) {
                var data = JSON.parse(res);
                console.log(data.Objects);
                
                var directives = {
                    FotoMedium: {
                        srcset: function (params) {
                            return this.FotoMedium;
                        },
                        alt: function (params) {
                            return this.Adres;
                        }
                    },
                    FotoLarge: {
                        srcset: function (params) {
                            return this.FotoLarge;
                        },
                        alt: function (params) {
                            return this.Adres;
                        }
                    },
                    FotoLargest: {
                        srcset: function (params) {
                            return this.FotoLargest;
                        },
                        alt: function (params) {
                            return this.Adres;
                        }
                    },
                    id: {
                        id: function () {
                            return this.Id;
                        }
                    },
                    link: {
                        href: function () {
                            return this.URL;
                        }
                    }
                };
                
                Transparency.render(renderElement, data.Objects, directives);
                
                
                
                // ================ FALLBACK HERE!! ===============
                
                // IF BROWSER SUPPORTS QUERYSELECTORALL AND ADDEVENTLISTENER
                if ('querySelectorAll' in document && 'addEventListener' in window) {
                    var lists = document.querySelectorAll('a'),
                        headers = document.querySelectorAll('li h3');
                    
                    // ADD EVENTLISTENER FOR EXPANDED VIEW
                    for (i; i < lists.length; i += 1) {
                        lists[i].addEventListener('click', app.click, false);
                        console.log(lists);
                    }
                    
                    // REMOVE THOSE IRRELEVANT HEADERS
                    [].forEach.call(headers, function(el) {
                        el.classList.remove('fallback');
                    })
                }
                
                /* WHEN QUERYSELECTORALL AND EVENTLISTENER ARE FOUND A ENHANCED RESULT WILL KICK IN. 
                AN EVENTLISTENER IS ADDED FOR AN ANIMATION WITH MORE INFORMATION.
                IF THIS IS NOT SUPPORTED: THE LINKS WILL FUNCTION AS LINKS AND ROUTE YOU TO THE FUNDA 
                DETAIL PAGE WHEN AN ITEM IS CLICKED */
                
                
            });
        },
        
        click: function (e) {
            // EXECUTE FUNCTION ON TARGET
            if (e.target !== e.currentTarget) {
                
                console.log(this);
                var parent = this.parentNode;
                
//                var clickedItem = e.target.parentElement,
//                    id = e.target.parentElement.id,
//                    item = e;
                
//                console.log(item.target);
                
                // IF THE SELECTED ITEM HAS THE CLASS 'SELECTED'
                if (parent.classList.contains('selected')) {
                    
                    // TOGGLE CLASS SELECTED AND REMOVE DETAILS
                    parent.classList.toggle('selected');
//                    console.log(id, clickedItem, e);
                    app.remove(parent);
                    
                } else {
                    
                    // SELECT ALL ARTICLE
                    var list = document.getElementsByTagName('li');
                                            
                    // REMOVE CLASS FROM ALL ARTICLES
                    [].forEach.call(list, function (el) {
                        el.classList.remove('selected');
                    });

                    console.log('class removed');

                    // ADD CLASS TO SELECTED ELEMENT AND APPEND THE DETAIL
                    parent.classList.toggle('selected');
                    console.log(parent, e);
                    app.append(parent);
                           
                }
            }
            e.preventDefault();
            e.stopPropagation();
        },
        
        append: function (item) {
            
            // CHECK IF ELEMENT IS ALREADY PRESENT
            if (document.getElementById('detail')) {
                
                var detail = document.getElementById('detail');
                detail.parentElement.removeChild(detail);
                
                app.append(item);
                
            } else {
            
                // GET DETAIL DATA
                microAjax('http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/e2d60e885b8742d4b0648300e3703bd7/koop/' + item.id + '/', function (res) {
                    var detail = JSON.parse(res);
                    console.log(detail);

                    // CREATE NEW ELEMENTS FOR DETAIL
                    var container = document.createElement('div');
                    container.innerHTML = '<div class="left"><header><h2 data-bind="Adres"></h2><p data-bind="locatie"></p></header><table><thead><tr><th colspan="2">Informatie</th></tr></thead><tbody><tr><td>Soort Woning</td><td data-bind="SoortWoning"></td></tr><tr><td>Woonlagen</td><td data-bind="AantalWoonlagen"></td></tr><tr><td>Ligging</td><td data-bind="Ligging"></td></tr><tr><td>Woonoppervlakte</td><td data-bind="WoonOppervlakte"></td></tbody></table></div><div class="right"><img data-bind="media"/></div>';

                    // SET ATTRIBUTES FOR DATA BINDING
                    container.setAttribute('id', 'detail');

                    // APPEND DETAIL TO PARENT
                    item.appendChild(container);

                    // DIRECTIVES FOR CONTENT
                    var directives = {
                        WoonOppervlakte: {
                            text: function (params) {
                                return this.WoonOppervlakte + " M2";
                            }
                        },
                        media: {
                            src: function (params) {
                                return this.Media[1].MediaItems[3].Url;
                            }
                        },
                        locatie: {
                            text: function (params) {
                                return this.Postcode + " " + this.Plaats;
                            }
                        }
                    };

                    // RENDER DETAIL
                    Transparency.render(document.getElementById('detail'), detail, directives);
                
                });
            }
        },
        
        remove: function (item) {
            
            // SELECT DETAIL ELEMENT
            var detail = document.getElementById('detail');
            
            // REMOVE ELEMENT
            item.removeChild(detail);
        }
        
    };
    
    submit.addEventListener('click', app.form, false);
    
}());