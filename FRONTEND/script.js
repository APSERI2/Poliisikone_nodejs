

const elementit = ['hetu', 'etunimi', 'sukunimi', 'koko-nimi', 'pob', 'dob', 'sukupuoli', 'kansalaisuus'];
const luokat = ['lataus', 'yla-teksti', 'mugshot', 'viiva1', 'viiva2', 'keski-teksti', 'ala-teksti', 'alku-teksti'];
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
            console.log('toimii!')
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