"use strict";

leesKeuzeOpties();
async function leesKeuzeOpties() {
    const response = await fetch("groenten.json");
    if (response.ok) {
        const groenten = await response.json(); 
        maakKeuzeMenu(groenten);
    
    } else {
        document.getElementById("nietGevonden").hidden = false;
    }
}


function maakKeuzeMenu(groenten) {
    for (const groente of groenten) {
        let keuzeOptie = document.createElement('option');
        keuzeOptie.innerText = `${groente.naam} (${groente.prijs}/${groente.eenheid})`; 
        //keuzeOptie.value = `${optie.info}`; // ! value toevoegen om later op te selecteren
        document.getElementById('keuze').appendChild(keuzeOptie);
        
    }
}
