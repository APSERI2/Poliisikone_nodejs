async function getData() {
    document.getElementById('lataus').style.display = "block";
    const hetu = document.getElementById('Hetu').value;
    document.getElementById('E-nimi').value = "";
    document.getElementById('S-nimi').value = "";
    document.getElementById('Hetu').value = "";
    const data = await fetch(`http://localhost:3000/kansalaiset?hetu=${hetu}`);
    const tietokanta = await data.json();
    if (tietokanta.length === 0) {
        document.getElementById('lataus').style.display = "none";
        document.getElementById('yla-teksti').style.display = "none";
        document.getElementById('mugshot').style.display = "none";
        document.getElementById('viiva1').style.display = "none";
        document.getElementById('viiva2').style.display = "none";
        document.getElementById('keski-teksti').style.display = "none";
        document.getElementById('ala-teksti').style.display = "none";
        document.getElementById('alku-teksti').style.display = "block";
        document.getElementById('alku-teksti').textContent = "Henkilöä ei löytynyt!";
        return;
    };

    console.log(tietokanta);

    document.getElementById('lataus').style.display = "none";
    document.getElementById('alku-teksti').style.display = "none";
    document.getElementById('yla-teksti').style.display = "flex";
    document.getElementById('mugshot').style.display = "flex";
    document.getElementById('K-nimi').textContent = tietokanta[0].etunimi.toUpperCase() + " " +  tietokanta[0].sukunimi.toUpperCase();
    document.getElementById('Hetu-display').textContent = tietokanta[0].hetu;

    document.getElementById('viiva1').style.display = "block";
    document.getElementById('viiva2').style.display = "block";

    document.getElementById('keski-teksti').style.display = "flex";
    document.getElementById('sukupuoli').textContent = "Sukupuoli: "  + tietokanta[0].sukupuoli;
    document.getElementById('kansalaisuus').textContent = "Kansalaisuus: " + tietokanta[0].kansalaisuus;

    document.getElementById('ala-teksti').style.display = "flex";
    document.getElementById('etunimi').textContent = tietokanta[0].etunimi;
    document.getElementById('sukunimi').textContent = tietokanta[0].sukunimi;
    document.getElementById('dob').textContent = tietokanta[0].dob;
    document.getElementById('pob').textContent = tietokanta[0].pob;
    
};

document.getElementById('Haku-btn').addEventListener('click', getData);
document.getElementById('Hetu').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getData();
    }
});