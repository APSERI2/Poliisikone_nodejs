Poliisitietokone, johon on käytetty express palvelinta tietojen hakemisessa. Tästä löytyy samanlainen projekti tililläni, mutta tietojen hakeminen on toteutettu PHP:llä.

Käytännössä tämän poliisitietokoneen päätoiminnallisuutena on hakea Sqlite tietokannasta halutun henkilön tiedot, kuten hetu (Henkilötunnus), etunimi, sukunimi...

Suurin osa tietojen käsittelystä löytyy script.js tiedostosta.

Suunnitelmana olisi myöhemmin lisätä muita siistejä toiminnallisuuksia kuten ajoneuvo rekisteri, rikosrekisteri yms...

--> Tekoälyn käytöstä <--

Tätä projektia tehdessä päätin, että en halua enään edes harkita tekoälyn käyttöä koodatessa. Joihinkin kohtiin on kuitenkin hyödynnetty tekoälyn apua (Koodaamisen alkuvaiheissa)
kuten pieniin CSS juttuihin tai debugaamiseen. 

-- Miten tietokone toimii? --

Tietokone toimii hyvin yksinkertaisesti: Syötä joko etunimi, sukunimi, hetu tai kaikki listatuista vaihtoehdoista, ja koodi hakee sopivat tiedot tietokannasta. 
Pääasiassa koodi priorisoi hetun käyttöä, eli jos syötät esim. Etunimen ja hetun, koodi hakee tietokannasta hetun kanssa ensisijaisesti.

Jos tietokannasta ei löydy kuin yksi sopiva tulos, tämän kyseisen henkilön tiedot listataan automaattisesti oikealle puolelle näyttöä.

Jos tietokannasta taas löytyy enemmän kuin yksi sopivaa tulosta, näiden henkilöiden tiedot listataan ns. Kortteina oikealle puolelle näyttöä.
Nämä kortit on kääritty button elementtien sisälle, eli painamalla mitä tahansa korttia, pääset katsomaan kyseisen henkilön tietoja tarkemmin. Tällöin koodi tekee uuden GET pyynnön.

-- Mutta miten tietokone toimii käytännössä? --

Perus workflow:

Käyttäjän inputit -> Express palvelin -> Sqlite tietokanta -> Express palvelin -> script.js -> index.html.

Koodi tekee GET pyynnön fetchin avulla express palvelimelle ja lähettää mukana annetut tiedot (Ensisijaisesti hetu).
Express palvelin kysyy tietokannasta näitä tietoja ja palauttaa vastauksen script.js tiedostolle takaisin.
Tämän jälkeen script.js lajittelee annetut tiedot tiettyjen ehtojen mukaan.

-- Kuinka testata tietokonetta? --

1. Lataa tarvittavat moduulit:
   --> npm install express better-sqlite3 cors <--

2. Avaa terminaali ja kirjoita "node BACKEND/server.js".
3. Avaa index.html tiedosto live serverin kanssa.
4. Lisää tietokantaan uusi table "kansalaiset" seuraavilla tiedoilla:
     hetu TEXT PRIMARY KEY,
     etunimi TEXT,
     sukunimi TEXT,
     dob TEXT,
     pob TEXT,
     kansalaisuus TEXT,
     sukupuoli TEXT

   Muista myös lisätä tietokantaan henkilöitä INSERT komennolla!
5. Testaa ja ylläty!
