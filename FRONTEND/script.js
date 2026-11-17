const elementit = ['hetu', 'etunimi', 'sukunimi', 'koko-nimi', 'pob', 'dob', 'sukupuoli', 'kansalaisuus'];
const luokat = ['lataus', 'yla-teksti', 'mugshot', 'viiva1', 'viiva2', 'keski-teksti', 'ala-teksti', 'alku-teksti', 'oikea'];
const inputit = ['etunimi-input', 'sukunimi-input', 'hetu-input'];

// Hakee tietoja hetun avulla

async function searchByHetu(hetu) {
    const data = await fetch(`http://localhost:3000/kansalaiset/hetu?hetu=${hetu}`);
    const tietokanta = await data.json();
    if (tietokanta.length === 0) {
        noResult();
        return;
    };


    resultFound(tietokanta);
};

// Hakee tietoja etunimen & sukunimen avulla

async function searchByBoth(etunimi, sukunimi) {
    const params = new URLSearchParams({ etunimi, sukunimi });
    const data = await fetch(`http://localhost:3000/kansalaiset/both?${params}`);
    const tietokanta = await data.json();
    switch(true) {
        case tietokanta.length === 0:
            noResult();
            return;

        case tietokanta.length === 1:
            resultFound(tietokanta);
            break;
        
        case tietokanta.length > 1:
            displayMatches(tietokanta);
    };
};


// Tämä funktio pyörii vain, jos tuloksia ei löydy annetuilla tiedoilla
// Käytännössä funktio vain muokkaa frontend elementtejä

function noResult() {
    for(let x of luokat) {
    switch(x) {
        case 'alku-teksti':
            document.getElementById(x).style.display = "block";
            document.getElementById(x).textContent = "Henkilöä ei löytynyt!";
            break;

        case 'oikea':
            break;

        default:
            document.getElementById(x).style.display = 'none';

        };
    };
};

// Tämä funktio pyörii jos tuloksia löytyi annetuilla tiedoilla
// Tässä on sama homma kun noResult funktiossa, eli muokataan frontend elementtejä

function resultFound(tietokanta) {
    for(let x of luokat) {
        switch(x) {
            case 'lataus':
            case 'alku-teksti':
                document.getElementById(x).style.display = 'none';
                break;

            case 'viiva1':
            case 'viiva2':
                document.getElementById(x).style.display = 'block';
                break;

            default:
                document.getElementById(x).style.display = 'flex';
        };
    };

    for(let x of elementit) {
    switch(x) {

        case 'koko-nimi':
            document.getElementById(x).textContent = tietokanta[0].etunimi + " " + tietokanta[0].sukunimi;
            break;

        case 'sukupuoli':
            document.getElementById(x).textContent = `Sukupuoli: ${tietokanta[0][x]}`;
            break;

        case 'kansalaisuus':
            document.getElementById(x).textContent = `Kansalaisuus: ${tietokanta[0][x]}`;
            break;

        default:
            document.getElementById(x).textContent = tietokanta[0][x];
        };
    };
};

function displayMatches(tietokanta) {
    for(let i of luokat) {
        switch(i) {
            case 'lataus':
            case 'alku-teksti':
                document.getElementById(i).style.display = 'none';
                break;

            case 'oikea':
                document.getElementById(i).style.justifyContent = 'flex-start';
                
        }
    }
    let x = 0;
    for(let i of tietokanta) {
        x++

        // Korttidiv juttu

        const divi = document.createElement('div');
        document.getElementById('oikea').appendChild(divi);
        divi.id = "id" + x;
        divi.setAttribute('class', 'tuloskortti');
        document.getElementById(divi.id).style.display = 'flex';
        document.getElementById(divi.id).style.minHeight = "25%";

        // Mugshot luokka

        const mugshotdiv = document.createElement('div');
        document.getElementById(divi.id).appendChild(mugshotdiv);
        mugshotdiv.id = "mugshot-id" + x;
        mugshotdiv.setAttribute('class', 'kortti-mugshot');
        document.getElementById(mugshotdiv.id).style.minHeight = '80%';
        document.getElementById(mugshotdiv.id).style.marginLeft = '2%';

        const mugshot = document.createElement('img');
        document.getElementById(mugshotdiv.id).appendChild(mugshot);
        mugshot.src = '../KUVAT/PLACEHOLDER-MUGSHOT.jpg';
        mugshot.setAttribute('class', 'kortti-img');
        mugshot.id = 'mugshot-img-id' + x;
        document.getElementById(mugshot.id).style.minHeight = '100%';
        document.getElementById(mugshot.id).style.width = '100%';

        // Kortti-yla luokka

        const korttiyla = document.createElement('div');
        document.getElementById(divi.id).appendChild(korttiyla);
        korttiyla.setAttribute('class', 'kortti-yla');
        korttiyla.id = 'kortti-yla-id' + x;
        document.getElementById(korttiyla.id).style.minHeight = '100%';
        document.getElementById(korttiyla.id).style.marginLeft = '3%';

        // Kortti kokonimi luokka

        const kokonimi = document.createElement('p');
        document.getElementById(korttiyla.id).appendChild(kokonimi);
        kokonimi.setAttribute('class', 'kortti-kokonimi');
        kokonimi.id = 'kokonimi-id' + x;
        document.getElementById(kokonimi.id).style.fontSize = '20px';
        document.getElementById(kokonimi.id).style.marginTop = '10%';
        document.getElementById(kokonimi.id).style.marginBottom = '2%'
        document.getElementById(kokonimi.id).style.minWidth = '100%';
        document.getElementById(kokonimi.id).textContent = i.etunimi + " " +  i.sukunimi;

        // Kortti hetu luokka
        const korttihetu = document.createElement('p');
        document.getElementById(korttiyla.id).appendChild(korttihetu);
        korttihetu.setAttribute('class', 'kortti-hetu');
        korttihetu.id = 'korttihetu-id' + x;
        document.getElementById(korttihetu.id).textContent = i.hetu;



        
    }
};

// Tietojen hakeminen Sqlite tietokannasta

async function getData() {
    document.getElementById('lataus').style.display = "block";
    const hetu = document.getElementById('hetu-input').value.trim();
    const etunimi = document.getElementById('etunimi-input').value.trim();
    const sukunimi = document.getElementById('sukunimi-input').value.trim();
    for(let x of inputit) {
        document.getElementById(x).value = "";
    };
    if (hetu) {
        searchByHetu(hetu);
    }
    else if (etunimi && sukunimi) {
        searchByBoth(etunimi, sukunimi)
    }
    else if (etunimi) {
        // Run searchByEtunimi
    }
    else if (sukunimi) {
        // Run searchBySukunimi
    }

    else {
        document.getElementById('alku-teksti').textContent = 'Täytä vähintään yksi hakukenttä.';
        document.getElementById('lataus').style.display = 'none';
    }
};



document.getElementById('Haku-btn').addEventListener('click', getData);
document.getElementById('hetu-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getData();
    }
});