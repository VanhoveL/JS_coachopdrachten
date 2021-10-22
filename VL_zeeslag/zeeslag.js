"use strict";

leesBestand();
async function leesBestand() {
    const response = await fetch("boten.json")
    if (response.ok) {
        const boten = await response.json(); 
        schipKeuze(boten);
    } else {
        document.getElementById("nietGevonden").hidden = false;
    }
}


function schipKeuze(boten) {
    for (const boot of boten) {
        //maak opties
        let optie = document.createElement('option');
        optie.innerText = (`${boot.naam} (lengte: ${boot.lengte})`);
        document.getElementById('boot').appendChild(optie);
    }

}


