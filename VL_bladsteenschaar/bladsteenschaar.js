"use strict";
// keuzes
const choices = ["blad", "steen", "schaar"];

// 
const keuzes = document.querySelectorAll('img');

keuzes.forEach(function(keuze) {
    keuze.addEventListener('click', function(e) {
        //myChoice
        const myChoice = e.target.className;
        //pcChoice
        const pcChoice = choices[Math.floor((Math.random()*3))];
        document.getElementById('afbeelding').src = `${pcChoice}.png`;
        //bladsteenschaar
        document.querySelector('span').innerText = compare(myChoice,pcChoice);
    }); 
} );

// blad steen schaar: 1 ronde

function compare(choice1, choice2) {
    choice1 = choices.indexOf(choice1);
    choice2 = choices.indexOf(choice2);
    if (choice1 == choice2) {
        return "Gelijkspel";
    }
    if (choice1 == choices.length - 1 && choice2 == 0) { 
        return "Gewonnen";
    }
    if (choice2 == choices.length - 1 && choice1 == 0) { 
        return "Verloren";
    }
    if (choice1 > choice2) { 
        return "Verloren";
    } else { 
        return "Gewonnen";
    }
};

