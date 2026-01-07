# Hue-Arduino-netværk

Dette system sætter en webserver op på localhost (din egen maskine, 127.0.0.1) på port 8080, som kan generere en lille webside, hvorfra en Hue-pære kan styres via et javascript: single-lamp.js

Da imidlertid Philips Hue har problemer med web requests (enten blokerer browseren fordi http-er "for usikker", eller også blokerer den fordi Philips Hue Bridge'n har et ugyldigt certifikat til https), er det nødvendigt også at starte en proxy-server, som kan forwarde requests og responses mellem webserveren og Hue-bridgen. Denne proxy-server skal også startes og kører også lokalt

Det er stadig nødvendigt at Philips Hue Bridgen og den lokale maskine kører på samme netværk, at Hue Bridgens IP-adresse er kendt og skrevet ind i javascriptet, samt at der er en gyldig API-nøgle (username) skrevet ind i javascriptet.

De to servere mangler at blive til eet script - lige nu skal de startes hver for sig.

## Sådan bruger man proxyen

Start node server i en separat terminal.
(Mac: Det virker ikke hvis man bruger VS Codes terminal ...)

```bash
node proxy-server.js
```

Start verysimplebridge on port 8080:

```bash
node verysimplebridge.js
```

Åben index.html i folderen client på port 8080.

Brug ikke live server i VS Code - den bruger port 5000.
