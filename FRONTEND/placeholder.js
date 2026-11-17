function displayMatches() {
    document.getElementById('lataus').style.display = 'none';
    document.getElementById('alku-teksti').style.display = 'none';
    for(let i of tietokanta) {
        const divi = document.createElement('p');
        divi.id = "id";
        divi.appendChild('oikea');
        document.getElementById('id').textContent = "HEY!";
    }
}