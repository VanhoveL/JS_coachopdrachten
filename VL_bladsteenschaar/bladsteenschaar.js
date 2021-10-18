"use strict";
// keuzes
const choices = ["blad", "steen", "schaar"];

// 
const keuzes = document.querySelectorAll('img');

keuzes.forEach(function(keuze) {
    keuze.addEventListener('click', function(e) {
        //myChoice
        const myChoice = `${keuze.dataset.keuze}.png`;
        //pcChoice
        const index = choices[Math.floor((Math.random()*3))];
        const pcChoice = document.getElementById('afbeelding').src = `${index}.png`;
        //bladsteenschaar
        let wintVan = keuze.dataset.wintVan;
        //let spanText = document.getElementById('winnaar').innerText; ---> waarom werkt dit zo niet?
        if (myChoice == pcChoice) {
            document.getElementById('winnaar').innerText = "Gelijkspel"; //spanText = "Gelijkspel"
        } else if (pcChoice == wintVan) {
            document.getElementById('winnaar').innerText = "Gewonnen"; //spanText = "Gewonnen"
        } else {
            document.getElementById('winnaar').innerText = "Verloren"; //spanText = "Verloren"
        }
    }); 
} );

