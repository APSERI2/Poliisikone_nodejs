const elementit = ['hetu', 'etunimi', 'sukunimi', 'koko-nimi', 'pob', 'dob', 'sukupuoli', 'kansalaisuus'];
const luokat = ['lataus', 'yla-teksti', 'mugshot', 'viiva1', 'viiva2', 'keski-teksti', 'ala-teksti', 'alku-teksti', 'oikea', 'tuloskortti'];
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

        case 'tuloskortti':
            const kortti_elementit = document.querySelectorAll('.tuloskortti');
            for(let i = 0; i < kortti_elementit.length; i++) {
                kortti_elementit[i].remove();
            }
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

            case 'tuloskortti':
                const kortti_elementit = document.querySelectorAll('.tuloskortti');
                for(let i = 0; i < kortti_elementit.length; i++) {
                    kortti_elementit[i].remove();
                }
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
                break;

            case 'tuloskortti':
                const kortti_elementit = document.querySelectorAll('.tuloskortti');
                for(let i = 0; i < kortti_elementit.length; i++) {
                    kortti_elementit[i].remove();
                }
                break;
            
            default:
                document.getElementById(i).style.display = "none";
        }
    }
    let x = 0;
    for(let i of tietokanta) {
        x++

        // Korttidiv juttu

        const divi = document.createElement('button');
        document.getElementById('oikea').appendChild(divi);
        divi.id = i.hetu;
        divi.setAttribute('class', 'tuloskortti');
        document.getElementById(divi.id).style.display = 'flex';
        document.getElementById(divi.id).style.minHeight = "25%";
        document.getElementById(divi.id).style.cursor = 'pointer';

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
        document.getElementById(kokonimi.id).textContent = i.etunimi.toUpperCase() + " " +  i.sukunimi.toUpperCase();

        // Kortti hetu luokka
        const korttihetu = document.createElement('p');
        document.getElementById(korttiyla.id).appendChild(korttihetu);
        korttihetu.setAttribute('class', 'kortti-hetu');
        korttihetu.id = 'korttihetu-id' + x;
        document.getElementById(korttihetu.id).textContent = i.hetu;

        // Kortti oikea luokka
        const korttioikea = document.createElement('div');
        document.getElementById(divi.id).appendChild(korttioikea);
        korttioikea.setAttribute('class', 'kortti-oikea');
        korttioikea.id = 'korttioikea-id' + x
        document.getElementById(korttioikea.id).style.minHeight = '100%';
        document.getElementById(korttioikea.id).style.minWidth = '30%';

        // Kortti oikea tekstit
        const syntymaaika_label = document.createElement('label');
        const syntymaaika = document.createElement('p');
        const syntymapaikka_label = document.createElement('label');
        const syntymapaikka = document.createElement('p');

        document.getElementById(korttioikea.id).appendChild(syntymaaika_label);
        document.getElementById(korttioikea.id).appendChild(syntymaaika);
        document.getElementById(korttioikea.id).appendChild(syntymapaikka_label);
        document.getElementById(korttioikea.id).appendChild(syntymapaikka);
        
        syntymaaika_label.setAttribute('class', 'syntymaaika-label');
        syntymapaikka_label.setAttribute('class', 'syntymapaikka-label');
        syntymaaika.setAttribute('class', 'kortti-syntymaaika');
        syntymapaikka.setAttribute('class', 'kortti-syntymapaikka');

        syntymaaika_label.id = 'syntymaaika_label-id' + x;
        syntymapaikka_label.id = 'syntymapaikka_label-id' + x;
        syntymaaika.id = 'syntymaaika-id' + x;
        syntymapaikka.id = 'syntymapaikka-id' + x;

        document.getElementById(syntymaaika_label.id).textContent = 'SYNTYMÄAIKA';
        document.getElementById(syntymapaikka_label.id).textContent = 'SYNTYMÄPAIKKA';

        document.getElementById(syntymaaika_label.id).style.marginTop = '12%';
        document.getElementById(syntymapaikka_label.id).style.marginTop = '12%';

        document.getElementById(syntymaaika_label.id).style.fontSize = '13px';
        document.getElementById(syntymapaikka_label.id).style.fontSize = '13px';

        document.getElementById(syntymapaikka.id).textContent = i.pob;
        document.getElementById(syntymaaika.id).textContent = i.dob;

        document.getElementById(divi.id).addEventListener('click', () => {
            searchByHetu(divi.id);
        });

        document.getElementById(divi.id).addEventListener('mouseover', () => {
            document.getElementById(divi.id).style.backgroundColor = 'grey';
        });

                document.getElementById(divi.id).addEventListener('mouseleave', () => {
            document.getElementById(divi.id).style.backgroundColor = 'white';
        });
        



        
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