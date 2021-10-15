"use strict";


const submit = document.getElementById('knop');
submit.addEventListener('click', function() {
    
    // input van gebruiker ophalen en inputveld resetten
    const naamInput = document.getElementById('vnaam').value.toLowerCase().trim();
    const input = document.getElementById('vnaam');
    input.value="";
    input.focus();
    let gevondenLiItem = zoekListItemMetNaam(naamInput); //liElement of null (return uit zoeklistitemmetnaam)

    if (gevondenLiItem !== null) { 
        verhoogAantal(gevondenLiItem, 1);
    } else { 
        maakListItemMetNaam(naamInput);

    }
});

// FUNCTIES
function zoekListItemMetNaam(naamInput) {
    const liElementen = document.getElementsByTagName('li');
    for (const li of liElementen) {
        if (naamInput === li.dataset.naam) {
            return li;
        }
    }
    return null;
}


function maakListItemMetNaam(naamInput) {
    //aanmaken element
    const liItem = document.createElement('li');
    //inhoud toevoegen
    liItem.dataset.naam = naamInput;
    liItem.dataset.aantal = 1;
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
