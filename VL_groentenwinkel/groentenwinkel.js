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


    for(var row of tbody.rows) {
        console.log(tbody.rows);
        let groenteNaam = row.querySelector("#winkelmandGroente").innerHTML;
        console.log(groenteNaam);
        if (groenteNaam == keuzeInput.substring(0, keuzeInput.indexOf("("))) {
            console.log("dubbel"); 
            //this.row.innerHTML += aantalInput
            //niet opnieuw aan tabel toevoegen, maar het bestaande antal verhogen met het nieuw gekozen aantal
        } else {
            console.log("niet dubbel");
            //nieuwe rij in tabel maken met de gekozen gegevens (zie hieronder)
        }
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


/*
    for (var i = 0; i < (tbody.rows.length); i++) {
        let winkelmandGroente = row.querySelectorAll("winkelmandGroente").innerHTML;
        if (winkelmandGroente == keuzeInput.substring( 0, keuzeInput.indexOf("("))) {
            console.log('dubbel!');
        } else {
            console.log('geen dubbel');
        }
    }
*/