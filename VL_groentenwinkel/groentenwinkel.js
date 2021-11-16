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
        resetInput();
    }

}

function resetInput(){
    document.getElementById("aantal").value="";
    document.getElementById("aantal").focus();
    document.getElementById("keuze").value="";
}


function toeTeVoegenItem(keuzeInput, aantalInput) {
    const tbody = document.querySelector("tbody");
    let rijGevonden = false;
    for (var row of tbody.rows) {
        let groenteNaam = row.querySelector("#winkelmandGroente").innerHTML;
        if (groenteNaam == keuzeInput.substring(0, keuzeInput.indexOf("("))) {
            rijGevonden = true;
            let nieuwAantal = parseInt(row.querySelector("#gekozenAantal").innerHTML) + parseInt(aantalInput);
            row.querySelector("#gekozenAantal").innerHTML = nieuwAantal;
            let prijs = row.querySelector("#prijs").innerHTML;
            row.querySelector("#teBetalen").innerHTML = (nieuwAantal*prijs).toFixed(2);
        }
    }
    if (!rijGevonden) {
        voegrijtoe(keuzeInput, aantalInput);
    }  
    updateTotaalprijs(tbody);
}


function voegrijtoe(keuzeInput, aantalInput) {
    const tbody = document.querySelector("tbody");
    const tr = tbody.insertRow();

    //groente
    const gekozenGroenteTd = tr.insertCell();
    gekozenGroenteTd.setAttribute('id', 'winkelmandGroente');
    gekozenGroenteTd.innerText = keuzeInput.substring(0, keuzeInput.indexOf("("));

    //aantal
    const gekozenAantalTd = tr.insertCell();
    gekozenAantalTd.setAttribute('id', 'gekozenAantal');
    gekozenAantalTd.innerText = aantalInput;

    //prijs
    let prijs = keuzeInput.substring(
        keuzeInput.indexOf("(") + 1,
        keuzeInput.lastIndexOf("/")
    );
    const prijsTd = tr.insertCell();
    prijsTd.setAttribute('id', 'prijs');
    prijsTd.innerText = prijs;

    //te betalen
    const teBetalenTd = tr.insertCell();
    teBetalenTd.setAttribute('id', 'teBetalen');
    teBetalenTd.innerText = (prijs * gekozenAantalTd.innerText).toFixed(2);

    //vuilbakje
    const verwijderTd = tr.insertCell();
    verwijderTd.setAttribute('id', 'verwijder');
    verwijderTd.innerHTML = "<img id='vuilbak' src='./vuilbak.png' alt='verwijder'/>";
    verwijderTd.addEventListener('click', () => {
        tr.remove();
        updateTotaalprijs(tbody);
    })
}


function updateTotaalprijs(tbody){
    let somTotaal = 0;
    for (var i = 0; i < tbody.rows.length; i++) {
        somTotaal = somTotaal + parseFloat(tbody.rows[i].cells[3].innerHTML);
      }
    document.getElementById("totaalPrijs").innerHTML = somTotaal.toFixed(2);
}

