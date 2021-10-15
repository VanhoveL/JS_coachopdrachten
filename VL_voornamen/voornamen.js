"use strict";


const submit = document.getElementById('knop');
submit.addEventListener('click', function() {
    
    // input van gebruiker ophalen en inputveld resetten
    const naamInput = document.getElementById('vnaam').value.toLowerCase().trim();
    const input = document.getElementById('vnaam');
    input.value="";
    input.focus();
    let gevondenLiItem = zoekListItemMetNaam(naamInput); //lielement of null

    if (gevondenLiItem !== null) { 
        verhoogAantal(gevondenLiItem, 1);
    } else { 
        maakListItemMetNaam(naamInput);

    }
    /*
    IF (zoeklistmetnaam(naamInput) iets teruggeeft omdat naam al bestaat -> liElement) {
        verhoogaantal(liElement, aantal)
    } ELSE //naam bestaat nog niet in lijst {
        maaklistitemmetnaam(naamInput)
    }
    */

});

// FUNCTIES
function zoekListItemMetNaam(naamInput) {
    const liElementen = document.getElementsByTagName('li');
    let gevondenListItem = null;
    Array.from(liElementen).forEach(function(liElement) {
        let naamLijst = liElement.dataset.naam;
        if (naamLijst === naamInput) {
            gevondenListItem = liElement;
            return;
        }
    });



    /*
    for (const li of liElementen) {
        if (naamInput === li.dataset.naam) {
            return li;
        }
    }
    */
    return gevondenListItem;
}


function maakListItemMetNaam(naamInput) {
    //aanmaken element
    const liItem = document.createElement('li');
    /*
    liItem.setAttribute("data-naam", naamInput);
    liItem.setAttribute("data-aantal", "1");
    */
    liItem.dataset.naam = naamInput;
    liItem.dataset.aantal = 1;
    //inhoud toevoegen
    liItem.textContent = `${liItem.dataset.naam}: ${liItem.dataset.aantal}`
    //aan DOM toevoegen
    const list = document.querySelector('#namenlijst ul');
    list.appendChild(liItem);
};


function verhoogAantal(liElement, aantal) {
    let vorigAantal = Number(liElement.dataset.aantal);
    liElement.dataset.aantal++;
    liElement.textContent = `${liElement.dataset.naam}: ${vorigAantal + aantal}`;
}
