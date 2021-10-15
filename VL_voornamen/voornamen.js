"use strict";


const submit = document.getElementById('knop');
submit.addEventListener('click', function() {
    
    // input van gebruiker ophalen en inputveld resetten
    const naamInput = document.getElementById('vnaam').value.toLowerCase().trim();
    const input = document.getElementById('vnaam');
    input.value="";
    input.focus();

    // al bestaande namen ophalen en vergelijken
    const liElementen = document.getElementsByTagName('li');
    var found = false;
    Array.from(liElementen).forEach(function(liElement) {
        let naamLijst = liElement.dataset.naam;
        if (naamLijst == naamInput) {
            liElement.dataset.aantal = Number(liElement.dataset.aantal) + 1;
            liElement.textContent = `${liElement.dataset.naam}: ${liElement.dataset.aantal}`
            found = true;
        }
    }); 


    if (!found) {

         //aanmaken element
         const liItem = document.createElement('li');
         liItem.setAttribute("data-naam", naamInput);
         liItem.setAttribute("data-aantal", "1");

         //inhoud toevoegen
         liItem.textContent = `${liItem.dataset.naam}: ${liItem.dataset.aantal}`

         //aan DOM toevoegen
         const list = document.querySelector('#namenlijst ul');
         list.appendChild(liItem);
    }
});



