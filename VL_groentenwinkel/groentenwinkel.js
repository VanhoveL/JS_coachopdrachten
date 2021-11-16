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
            toeTeVoegenItem(keuzeInput, aantalInput);
        }
    };

}



function toeTeVoegenItem(keuzeInput, aantalInput) {
    // laten staan!!
    const tbody = document.querySelector("tbody");
    
    
    //CHECK DUBBELS
    /*
    for (var i = 0; i < (tbody.rows.length); i++) {
        let winkelmandGroente = document.getElementById("winkelmandGroente").innerHTML;
        if (winkelmandGroente == keuzeInput.split(" ")[0]) {
            console.log('dubbel!');
        } else {
            console.log('geen dubbel');
        }
    }*/

    for (var i = 0; i < tbody.rows.length; i++) {
        let item = tbody.rows[i].cells[0].innerHTML;
        console.log(item);
    }

    //VOEG RIJ TOE
    const tr = tbody.insertRow();
    //groente
    const gekozenGroenteTd = tr.insertCell();
    gekozenGroenteTd.setAttribute('id', 'winkelmandGroente');
    gekozenGroenteTd.innerText = keuzeInput.substring( 0, keuzeInput.indexOf("(")); 

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
        updateTotaalprijs(tbody);
    })
    
    updateTotaalprijs(tbody);

}



function updateTotaalprijs(tbody){
    let somTotaal = 0;
    for (var i = 0; i < tbody.rows.length; i++) {
        somTotaal = somTotaal + parseFloat(tbody.rows[i].cells[3].innerHTML);
      }
    document.getElementById("totaalPrijs").innerHTML = somTotaal.toFixed(2);
}
