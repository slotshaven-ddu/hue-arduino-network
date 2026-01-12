# Hue-Arduino-netværk

Dette system sætter en webserver op på localhost (din egen maskine, 127.0.0.1) på port 8080, som kan generere en lille webside, hvorfra en Hue-pære kan styres via et javascript: single-lamp.js

Da imidlertid Philips Hue har problemer med web requests *(enten blokerer browseren, fordi http er "for usikker", eller også blokerer den, fordi Philips Hue Bridge'n har et ugyldigt certifikat til https)*, er det nødvendigt også at starte en proxy-server, som kan forwarde requests og responses mellem webserveren og Hue-bridgen. Denne proxy-server kører også lokalt

Det er stadig nødvendigt at Philips Hue Bridgen og den lokale maskine kører på samme netværk, at Hue Bridgens IP-adresse er kendt og skrevet ind i javascriptet, samt at der er en gyldig API-nøgle (username) skrevet ind i javascriptet. 

single-lamp.js styrer, som navnet siger, en enkelt lampe - nummeret på lampen skal skrives også ind i selve scriptet, som det er nu

## Sådan starter man serverne

Find den mappe, hvor proxy-server.js ligger, og åbn en separat command-prompt (terminal) her. (Mac: Det virker ikke hvis man bruger VS Codes terminal ...). **Sørg for at være på det rigtige netværk - altså det samme som Hue Bridge er på.** Skriv i prompten

    node proxy-server.js

Serveren vil nu svare i vinduet at den lytter på port 8080 og at proxyen bruger port 3000.

Åbn så et browser-vindue, og skriv i adresselinjen

    127.0.0.1:8080

Så åbner en webside, og du kan styre den pære der er valgt i scriptet.

Brug **ikke** live server i VS Code - den bruger port 5000.
