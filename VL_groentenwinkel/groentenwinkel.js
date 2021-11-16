"use strict";

leesKeuzeOpties();
async function leesKeuzeOpties() {
    const response = await fetch("groenten.json");
    if (response.ok) {
        const groenten = await response.json(); 
        maakKeuzeMenu(groenten);
        valideerInput();
    
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

function valideerInput(groenten){
    document.getElementById("toevoegen").onclick = function () {
        const verkeerdeElementen =
            document.querySelectorAll("select:invalid,input:invalid");
        for (const element of verkeerdeElementen) {
            document.getElementById(`${element.id}Fout`).hidden = false;
        }
        const correcteElementen =
            document.querySelectorAll("input:valid,select:valid");
        for (const element of correcteElementen) {
            document.getElementById(`${element.id}Fout`).hidden = true;
        }
        if (verkeerdeElementen.length == 0){
            document.getElementById("toegevoegd").hidden = false;
            let keuzeInput = document.getElementById("keuze").value;
            let aantalInput = document.getElementById("aantal").value;
            voegToeAanMandje(keuzeInput, aantalInput);
        }
    };

}




function voegToeAanMandje(keuzeInput, aantalInput) {
    const tbody = document.querySelector("tbody");
    const tr = tbody.insertRow();
    //groente
    const gekozenGroenteTd = tr.insertCell();
    gekozenGroenteTd.innerText = keuzeInput.split(" ")[0]; 

    //aantal
    const gekozenAantalTd = tr.insertCell();
    gekozenAantalTd.innerText = aantalInput;

    //prijs
    let prijs = keuzeInput.substring(
        keuzeInput.indexOf("(") + 1,
        keuzeInput.lastIndexOf("/")
    );
    const prijsTd = tr.insertCell();
    prijsTd.innerText = prijs; 

    //te betalen
    const teBetalenTd = tr.insertCell();
    teBetalenTd.innerText = (prijs*aantalInput).toFixed(2); 

    //vuilbakje
    const verwijderTd = tr.insertCell();
    verwijderTd.setAttribute('id', 'verwijder');
    verwijderTd.innerHTML = "<img id='vuilbak' src='./vuilbak.png' alt='verwijder'/>";
    verwijderTd.addEventListener('click', () => {
        tr.remove();
        //updateTotaalprijs();
    })

}

/*

function updateTotaalprijs(){

}

*/