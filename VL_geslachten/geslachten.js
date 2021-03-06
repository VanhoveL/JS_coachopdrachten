"use strict";

leesBestand();
async function leesBestand() {
    const response = await fetch("geslachten.json")
    if (response.ok) {
        const personen = await response.json(); 
        maakTabel(personen);

    } else {
        document.getElementById("nietGevonden").hidden = false;
    }
}


function maakTabel(personen) {
    for (const persoon of personen) {
        const tbody = document.querySelector("tbody");
        const tr = tbody.insertRow();
        const vnaamTd = tr.insertCell();
        vnaamTd.innerText = persoon.voornaam;
        const fnaamTd = tr.insertCell();
        fnaamTd.innerText = persoon.familienaam;

        //geslacht icoon
        const geslachtTd = tr.insertCell(); 
        let icoonNaam = `${persoon.geslacht}.png`;
        geslachtTd.setAttribute('id', `${persoon.voornaam}${persoon.familienaam}`);
        add_img(icoonNaam, `${persoon.voornaam}${persoon.familienaam}`);
        
        //foto afbeelding 
        const fotoTd = tr.insertCell();
        fotoTd.setAttribute('id', persoon.foto)
        add_img(persoon.foto, persoon.foto);  

        //geslacht om straks te sorteren
        tr.dataset.geslacht = persoon.geslacht;

    }
}



document.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        let sexe = a.dataset.geslacht;
        let table = document.querySelectorAll('tbody tr');
        for (const tr of table) {
            if (sexe == "allen") {
                tr.hidden = false;
            } else {
                if (tr.dataset.geslacht == sexe) {
                    tr.hidden = false;
                } else {
                    tr.hidden = true;
                }
            }

        }
    });
});



function add_img(fotoNaam, idCell) { 
    let img = document.createElement('img'); 
    img.src = `./images/${fotoNaam}`;
    document.getElementById(`${idCell}`).appendChild(img);
}

