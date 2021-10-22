"use strict";

leesBestand();
async function leesBestand() {
    const response = await fetch("geslachten.json")
    if (response.ok) {
        const personen = await response.json(); 
        displayPersonen(personen);
        displayVrouwen(personen);
        displayMannen(personen);
        displayAllen(personen);

    } else {
        document.getElementById("nietGevonden").hidden = false;
    }
}



function displayVrouwen(personen) {
    document.getElementById('vrouwen').onclick = function() {
        let vrouwen = [];
        for (const persoon of personen) {
            if(persoon.geslacht == 'vrouw'){
                vrouwen.push(persoon);
                
            }
        }
        while (document.getElementById('tbody').lastChild !== null) {
            document.getElementById('tbody').lastChild.remove();
        }
        displayPersonen(vrouwen);
    }
}

function displayMannen(personen) {
    document.getElementById('mannen').onclick = function() {
        let mannen = [];
        for (const persoon of personen) {
            if(persoon.geslacht == 'man'){
                mannen.push(persoon);
            }
        }
        while (document.getElementById('tbody').lastChild !== null) {
            document.getElementById('tbody').lastChild.remove();
        }
           
        displayPersonen(mannen);
    }
}


function displayAllen(personen) {
    document.getElementById('allen').onclick = function () {
        while (document.getElementById('tbody').lastChild !== null) {
            document.getElementById('tbody').lastChild.remove();
        }

        displayPersonen(personen);
    }

}


function displayPersonen(personen) {
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
        }
}


function add_img(fotoNaam, idCell) { 
    let img = document.createElement('img'); 
    img.src = `./images/${fotoNaam}`;
    document.getElementById(`${idCell}`).appendChild(img);
}


