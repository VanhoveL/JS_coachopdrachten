"use strict";

leesBestand();
async function leesBestand() {
    const response = await fetch("boten.json")
    if (response.ok) {
        const boten = await response.json(); 
        schipKeuze(boten);
        rijKeuze();
        kolomKeuze();
        
    } else {
        document.getElementById("nietGevonden").hidden = false;
    }
}



document.getElementById('plaats').onclick = function() {
    valideerInput();

    //keuzes:
    //const schipKeuze = 2 //document.getElementById('boot').value;
    //const rijKeuze = document.getElementById('rij').value;
    //const kolomKeuze = document.getElementById('kolom').value;

    //voorbeeldkeuzes
    //schip: bv 2 (5-4-3-3-2)
    //rij bv 2 (1 tot 10)
    //kolom bv 1 (1 tot 10)
    //richting () //nog geen values toegekend... pak standaard horizontaal

    

}










function schipKeuze(boten) {  //bv <option> vliegdekschip (lengte:5) </option>
    for (const boot of boten) {
        let schipOptie = document.createElement('option');
        schipOptie.innerText = (`${boot.naam} (lengte: ${boot.lengte})`);
        schipOptie.value = boot.lengte; 
        document.getElementById('boot').appendChild(schipOptie);
        
    }

}

function rijKeuze() {
    for (let i=1; i<11; i++) {
        let rijOptie = document.createElement('option');
        rijOptie.innerText = (`${i}`);
        rijOptie.value = (`${i}`);
        document.getElementById('rij').appendChild(rijOptie);
    }
}

function kolomKeuze() {
    for (let i=1; i<11; i++) {
        let kolomOptie = document.createElement('option');
        let opties = ["A","B","C","D","E","F","G","H","I","J"];
        kolomOptie.innerText = (`${opties[i-1]}`);
        kolomOptie.value = (`${i}`); //value 1-10 meegegeven (mssh handig als kolomnummers?)
        document.getElementById('kolom').appendChild(kolomOptie);
        
    }
}


function valideerInput() {
    const verkeerdeElementen = 
    document.querySelectorAll("input:invalid,select:invalid");
for (const element of verkeerdeElementen) {
    document.getElementById(`${element.id}Fout`).hidden = false; //itereer over de foute, maak hun foutmelding zichtbaar
}
}