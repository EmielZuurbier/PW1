/*jslint vars: true*/
/*global console, alert, microAjax, document, window, Transparency, loader*/

(function () {
    "use strict";
    
    // SUBMIT BUTTONS
    var submit = document.getElementById('submit'),
        resubmit = document.getElementById('csubmit'),
        result = document.getElementById('result'),
        data = [],
        selected = [],
        header = document.querySelector('header[role="banner"]'),
        main = document.querySelector('main'),
        intro = document.getElementById('intro'),
        articles;
    
    header.classList.add('hidden');
    main.classList.add('hidden');
    intro.classList.remove('done', 'hide');
    
    // DATA OBJECT
    var app = {
        formOne: function () {
            
            // SELECTING ELEMENTS
            var budget = document.getElementById('budget').value,
                area = document.getElementById('area').value,
                resubmitBudget = document.getElementById('cbudget'),
                resubmitArea = document.getElementById('carea');
            
            // ADD SUBMITTED VALUE TO RESUBMIT FORM
            resubmitBudget.value = budget;
            resubmitArea.value = area;
            
            // CALCULATE DATA
            app.calculate(budget, area);
        },
        
        formTwo: function () {
            
            // SELECTING ELEMENTS
            var budget = document.getElementById('cbudget').value,
                area = document.getElementById('carea').value;
            
            // CALCULATE DATA
            app.calculate(budget, area);
        },
        
        calculate: function (budget, area) {
            
            // SELECTING AND TRANSFORMING VALUES FROM INPUT
            var budgetHigh = Math.round(budget * 1.05),
                budgetLow = Math.round(budget * 0.95),
                resubmitArea = document.getElementById('carea');
            
            // REMOVE SPACES FROM INPUT VALUE
            area = area.replace(/\s/g, '');
            console.log(area);
            
            // IF NO AREA HAS BEEN GIVEN, RETURN "HEEL-NEDERLAND"
            if (area === '' || area === 'undefined') {
                area = 'heel-nederland';
                resubmitArea.value = area;
            }
            
            // SHOW LOADER
            loader.show();
            
            // CHECK GET REQUEST
            console.log('http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/?type=koop&zo=/' + area + '/' +  budgetLow + '-' + budgetHigh + '/&page=1&pagesize=25');
            
            // GETTING DATA FROM API
            microAjax('http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/?type=koop&zo=/' + area + '/' +  budgetLow + '-' + budgetHigh + '/&page=1&pagesize=25', function (res) {
                var output = JSON.parse(res);
                
                // CHECK THE OUTPUT
                console.log(budgetLow, budgetHigh);
                
                // CHECK IF OUTPUT HAS VALUES
                if (output === '' || output.Objects.length === 0) {
                    loader.hide();
                    alert('Niets gevonden binnen dit gebied of budget');
                } else {
                
                    // GIVE DATA TO RENDERER
                    app.render(output, budget);
                }
            });
            
        },
        
        render: function (output, budget) {
            
            // CREATING VARIABLES
            var result = document.getElementById('result');
            
            data = output.Objects;

            // DIRECTIVE FOR TRANSPARENCY
            var i = -1;
            var directives = {
                Foto: {
                    src: function (params) {
                        return this.Foto;
                    },
                    alt: function (params) {
                        return this.Adres;
                    }
                },
                FotoLarge: {
                    src: function (params) {
                        return this.FotoLarge;
                    },
                    alt: function (params) {
                        return this.Adres;
                    }
                },
                FotoLargest: {
                    src: function (params) {
                        return this.FotoLargest;
                    },
                    alt: function (params) {
                        return this.Adres;
                    }
                },
                link: {
                    href: function (params) {
                        return this.Id;
                    }
                },
                bg: {
                    style: function (params) {
                        return 'background-image: url("' + this.FotoLargest + '");';
                    }
                },
                id: {
                    id: function () {
                        return this.Id;
                    }
                }
            };

            console.log(data);

            // START RENDERING
            Transparency.render(result, data, directives);            

            // SHOW SCREEN WHEN FINISHED
            loader.hide();
            
            main.classList.remove('hidden');
            header.classList.remove('hidden');
            
            intro.classList.add('done');
            window.setTimeout(function () {
                intro.classList.add('hide');
            }, 1000);
            
            articles = document.querySelectorAll('article');
            
            for (var i = 0; i < articles.length; i += 1) {
                articles[i].addEventListener('click', app.select, false);
            }
            
        },
        select: function (e) {
            
            // EXECUTE FUNCTION ON TARGET
            if (e.target !== e.currentTarget) {
                var clickedItem = e.target.parentElement,
                    id = e.target.parentElement.id,
                    item = e;
                
                // IF THE SELECTED ITEM HAS THE CLASS 'SELECTED'
                if (clickedItem.classList.contains('selected')) {
                    
                    // TOGGLE CLASS SELECTED AND REMOVE DETAILS
                    clickedItem.classList.toggle('selected');
                    console.log(id, clickedItem, e);
                    app.remove(clickedItem);
                    
                } else {
                    
                    // SELECT ALL ARTICLE
                    var articles = document.getElementsByTagName('article');
                                            
                    // REMOVE CLASS FROM ALL ARTICLES
                    [].forEach.call(articles, function (el) {
                        el.classList.remove('selected');
                    });

                    console.log('class removed');

                    // ADD CLASS TO SELECTED ELEMENT AND APPEND THE DETAIL
                    clickedItem.classList.toggle('selected');
                    console.log(id, clickedItem, e);
                    app.append(clickedItem);
                           
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
    
    // EVENTLISTENERS
    submit.addEventListener('click', app.formOne, false);
    resubmit.addEventListener('click', app.formTwo, false);
//    result.addEventListener('click', app.select, false);
    
}());