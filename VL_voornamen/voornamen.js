"use strict";


const submit = document.getElementById('knop');
submit.addEventListener('click', function(e) {
    
    // input van gebruiker ophalen en inputveld resetten
    const naamInput = document.getElementById('vnaam').value.toLowerCase().trim();
    const input = document.getElementById('vnaam');
    input.value="";
    input.focus();

    // al bestande namen ophalen en vergelijken
    const liElementen = document.getElementsByTagName('li');
    var found = false;
    Array.from(liElementen).forEach(function(liElement) {
        const naamLijst = liElement.firstElementChild.textContent;
        if(naamLijst == naamInput){
            const countElement = liElement.children[2];
            countElement.textContent = Number(countElement.textContent) + 1;
            found = true;
        }
    }); 

    if (!found) {

         //aanmaken element
         const liItem = document.createElement('li');
         const voornaam = document.createElement('span');
         const dubbelPunt = document.createElement('span');
         const teller = document.createElement('span'); 

         //inhoud toevoegen
         voornaam.textContent = naamInput;
         dubbelPunt.textContent = ': ';
         teller.textContent = 1;

         //classes toevoegen (niet echt nodig voorlopig)
         //voornaam.classList.add('vn');
         //teller.classList.add('aantal');

         //aan DOM toevoegen
         liItem.appendChild(voornaam);
         liItem.appendChild(dubbelPunt);
         liItem.appendChild(teller);
         const list = document.querySelector('#namenlijst ul');
         list.appendChild(liItem);
    }
});



