# Progressive Enhancement

## Bevindingen  

### Afbeeldingen
Funda leunt het allermeest op afbeeldingen. Mijn applicatie ook. Daarom zijn afbeeldingen zeer belangrijk.
Zodra mijn applicatie geen afbeeldingen meer binnen kan halen of er een error plaats vindt bij het laden van de images. Zal er een fallback image geladen worden die een melding geeft dat de image niet geladen kan worden. Hiermee krijgt de gebruiker een indicatie dat de website een fout heeft en deze niet optimaal gebruikt kan worden.  
Een andere oplossing zou een link kunnen zijn die direct naar de bron van de afbeelding gaat. Dit kan alleen mits de data van de afbeelding wel wordt opgehaald en de afbeeldingen zelf alleen niet worden geladen.

### Custom Fonts
Mijn applicatie gebruikt de Custom Font 'Open Sans'. Deze wordt opgehaald via de library van Google Fonts. Wanneer deze font niet geladen kan worden, of weg valt, wordt Arial gebruikt. Deze lijkt heel erg op Open Sans en zal daarom niet meteen opvallen. Mocht Arial niet werken, dan wordt er een sans-serif font door de browser uitgezocht.

### Kleuren
Ik heb met de Accessibility Developer Extension getest naar de moeilijkheden qua toegankelijkheid. Daar kwamen enkele waarschuwingen uit over labels en contrastwaarden. Voor de rest was alles goed gekeurd. Wanneer ik mijn scherm volledig zwart wit maakte, leek alles nog goed te lezen en te zien. Echter gebruik ik een zwart wit filter op de afbeeldingen wanneer deze geselecteerd zijn. Hierdoor verdween het onderscheid tussen de geselecteerde en niet geselecteerde afbeeldingen.  
Hiervoor zal ik nog een andere manier moeten stijlen om de geselecteerde afbeelding beter te accentueren.

### Breedband Internet
Ik heb mijn site getest op een throttle met 2G internet verbinding. Het opstarten van de site ging vrij snel. Met ongeveer 5 seconden was de voorpagina geladen. Echter is de volgende stap het ophalen van de data. Dit duurde echter een aanzienlijk stuk langer, namelijk 60 seconden. Daarbij duurde een individueel object nog een extra 20 seconden. Dit komt doordat ik de op een na grootste afbeelding inlaad.  
Om dit op te lossen zou ik een fallback kunnen maken die op mobiel de kleinste afbeelding ophaalt en deze weergeeft. Hierdoor zal ik heel wat kostbare MB's kunnen besparen.

### Muis/Trackpad doet het niet
Nu is het mogelijk om door mijn site heen te tabben, echter alleen door de header waar een form en een button staat. De rest van mijn content staat in articles die geopend moeten worden door er op te klikken. Ik heb geexperimenteerd om dit op te lossen door `<a>` tags om mijn articles heen te doen en dat lijkt te werken. Ook kunnen ze dan geopend worden. Maar doordat ik de functie van het openen op de articles heb geplaatst, zal ik nog aan de Javascript moeten werken om dit goed te krijgen op de links.

### Javascript volledig
Door Javascript volledig uit te zetten wordt mijn applicatie nutteloos. Je blijft continue in het beginscherm hangen waardoor er niets gebeurd wanneer je iets invoert. Om dit te voorkomen zou ik een bericht kunnen plaatsen in de HTML dat Javascript niet werkt en deze eerst geactiveerd moet worden en wanneer Javascript wel werkt, dit bericht weggehaald wordt.

### Cookies
Dit heeft geen enkel effect voor de site aangezien deze geen Cookies gebruikt. 

### Javascript deels (Wifi Hotspots)
Dit zou betekenen dat de site niet zou werken op Wifi Hotspots en dus gebruikt moet worden op mobiel of lokaal netwerk.

### Javascript deels (Content Blockers)
Dit heeft geen enkel effect op de site.

### Local Storage
Local Storage wordt niet gebruikt en maakt dus niet uit of deze aan of uit zou staan.

### CDN
Ik maak gebruik van 'Font Awesome' die via MAXCDN wordt binnengeladen. Mocht deze weg vallen dan valt het er menu icoon weg. Hiervoor heb ik geen fallback ingesteld. Om dit te voorkomen zou ik dit, zoals bootstrap ook doet, `<span>` elementen kunnen maken op de plaats van het icoon om hetzelfde effect van een hamburger menu na te maken. Een andere oplossing zou een inline SVG kunnen zijn.

### Adblockers
Deze heb ik continue aanstaan, maar maken geen verschil op de site omdat er geen advertenties worden ingeladen.

### CSS
Opvallend genoeg blijft de site goed overeind zonder CSS. De zoekvelden doen nog precies hun ding, alles staat op de goede plek en content kan nog steeds overzichtelijk gepresenteerd worden. Ik kan dus zeggen dat mijn HTML goed is ingedeeld is.