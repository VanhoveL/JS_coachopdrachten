"use strict";

leesGeslachten();
async function leesGeslachten() {
    const response = await fetch("geslachten.json");
    if (response.ok) {
        const personen = await response.json(); 
        maakTabel(personen);
        
    } else {
        document.getElementById("nietGevonden").hidden = false;
    }
}

leesKeuzeOpties();
async function leesKeuzeOpties() {
    const response = await fetch("opties.json");
    if (response.ok) {
        const opties = await response.json(); 
        maakKeuzeMenu(opties);
    
    } else {
        document.getElementById("nietGevonden").hidden = false;
    }
}


function maakKeuzeMenu(opties) {
    for (const optie of opties) {
        let keuzeOptie = document.createElement('option');
        keuzeOptie.innerText = `${optie.tekst}`; 
        keuzeOptie.value = `${optie.geslacht}`; // ! value toevoegen om later op te selecteren
        document.getElementById('keuze').appendChild(keuzeOptie);
        
    }
}

//dropdown keuzemenu
const filter = document.querySelector('#filter');
filter.addEventListener('click', () => {
    const selectElement = document.querySelector('#keuze');
    let sexe = selectElement.value;
    document.getElementById("geenGeslacht").hidden = true;

    let table = document.querySelectorAll('tbody tr');
    for (const tr of table) {
        if (sexe == "allen") {
            tr.hidden = false;
        } else if (sexe =="") {
            document.getElementById("geenGeslacht").hidden = false;
        } else {
            if (tr.dataset.geslacht == sexe) {
                tr.hidden = false;
            } else {
                tr.hidden = true;
            }
        }

    } 
    toonAantalPersonen();
});




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

        //Verwijder 'vuilbakje'
        const verwijderTd = tr.insertCell();
        verwijderTd.setAttribute('id', 'verwijder');
        verwijderTd.innerHTML="<img id='vuilbak' src='./images/verwijder.png' alt='verwijder'/>";
        verwijderTd.addEventListener('click', () => {
            tr.remove();
            toonAantalPersonen();
        })

        //geslacht om straks te sorteren
        tr.dataset.geslacht = persoon.geslacht;
    
    } toonAantalPersonen();
}



function toonAantalPersonen() {
    let teller = 0;
    let tbody = document.getElementById('tbody');
    for (var i = 0, row; row = tbody.rows[i]; i++) {
        if(! row.hidden){
            teller++;
        }
    }
    document.getElementById('tfooter').innerHTML = `Aantal personen: ${teller} `;
};


function add_img(fotoNaam, idCell) { 
    let img = document.createElement('img'); 
    img.src = `./images/${fotoNaam}`;
    document.getElementById(`${idCell}`).appendChild(img);
};



