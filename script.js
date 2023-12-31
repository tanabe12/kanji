
// https://sites.google.com/a/h7a.org/kanjicompounds/after-primary-school
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch


//intializing while furigana is displayed skips the next check
//https://media.discordapp.net/attachments/1031821832149532722/1128504103920746556/image.png
//add english meaning
//add quizmode/retention mode
//add transition to menu display on startup
//cleanup (menubutton svg fill css)

let data = {};

async function fetchData(deck) {
    try {
        const deckFiles = {
            //0: "./all.json",
            "一年生": "./data/gr1.json",
            "二年生": "./data/gr2.json",
            "三年生": "./data/gr3.json",
            "四年生": "./data/gr4.json",
            "五年生": "./data/gr5.json",
            "六年生": "./data/gr6.json",
            "N5": "./data/n5.json",
            "N4": "./data/n4.json",
            "N3": "./data/n3.json",
            "N2": "./data/n2.json",
            "N1": "./data/n1.json"
        };


        data = {}
        for(let i=0; i<deck.length; i++)
        {
            //console.log("deck# " + deck[i]);
            const response = await fetch(deckFiles[deck[i]]);
            deckData = await response.json();
            data = Object.assign({}, data, deckData);
            //console.log(data);
        }

        //const deckName = document.getElementById("deck" + deck).textContent;
        //document.getElementById("buttontext").textContent = deckName;

        //console.log("datatype " + typeof data);
        //console.log("data " + data); // Optional: Log the fetched data for verification
        console.log("wordcount " + Object.keys(data).length)
        return data;
    } catch (error) {
        console.error("Error", error);
    }
}

async function generateWord() {
    try {

        if (data == {}) {
            console.log("null");
        }
        const keys = Object.keys(data);
        const randomNumber = Math.floor(Math.random() * keys.length);
        const word = keys[randomNumber];
        //const reading = wanakana.toRomaji(data[word]); (Furigana)
        const reading = data[word];
        console.log("reading " + typeof reading);

        document.getElementById("word").innerHTML = word;

        return reading;
    } catch (error) {
        console.error("Error", error);
    }
}

function convertKana() {
    wanakana.bind(document.getElementById("input"));

}

let valid = true;

async function checkAnswer(e) {
    const furigana = document.querySelector(".furigana");


    if(e.key === "Enter") {
        input = document.getElementById("input").value;
        console.log("input " + input);
        console.log("reading " + reading);

    if(valid) {
        if(input===reading) {
            console.log("correct");
            furigana.style.opacity = 0;
            await new Promise((resolve) => setTimeout(resolve, 50));
            //document.getElementById("reading").style.color = "rgb(0, 158, 21)";
            furigana.style.color = "rgb(0, 158, 21)";
            furigana.style.opacity = 1;
            //getValue();
        } else {
            console.log("incorrect");
            furigana.style.opacity = 0;
            await new Promise((resolve) => setTimeout(resolve, 50));
            //document.getElementById("reading").style.color = "rgb(158, 0, 0)";
            furigana.style.color  = "rgb(158, 0, 0)";
            furigana.style.opacity = 1;
        }

        document.getElementById("reading").innerHTML = reading;
        document.getElementById("input").value = "";
        valid = false;
        
    } else {
        valid = true;
        reading = await generateWord();
        document.getElementById("input").value = "";
        document.getElementById("reading").innerHTML = "";

    }    
}}


let reading;
var deckNumber = 0;
let selectedDecks = [1];
let display;

async function initialize(n) {
    //document.querySelector("[data-event='1']").className = "option-selected";
    //console.log("classname: " + document.querySelector("[data-event='1']").className);

    display = document.querySelector(".quiz");

    //fade out 
    display.style.opacity = 0;
    await new Promise((resolve) => setTimeout(resolve, 100));

    document.getElementById("menu-button-text").innerHTML = "";

    if (n.length !== 0) {
        //do stuff
        await fetchData(n);
        reading = await generateWord();

        //reset input and furigana
        document.getElementById("input").style.opacity = 1;
        document.getElementById("input").value = "";
        document.getElementById("reading").innerHTML = "";
        document.getElementById("menu-button-text").innerHTML = n.join(", ");

        document.getElementById("input").disabled = 0;
        document.getElementById("input").focus();
        //console.log("decks " + n);


    } else {
        console.log("null");
        document.getElementById("word").innerHTML = "(｡╯︵╰｡)";
        document.getElementById("reading").innerHTML = "";
        //document.getElementById("input").style.opacity = 0;
        document.getElementById("input").disabled = 1;
        //document.querySelector(".word-input" ).style.opacity = 0;
        //document.getElementById("input").style.opacity = 0;
    }

    //fade in 
    display.style.opacity = 1;

    console.log("initialized");
}



document.addEventListener("DOMContentLoaded", function() {
    //const deckButton = document.getElementById("deckbutton");

    const menu = document.querySelector(".menu");
    const menuButton = document.getElementById("menu-button");
    const okButton = document.getElementById("ok");

    let confirm = false;
    

    //display the menu

    
    menuButton.onclick = async function() {
        display.style.opacity = 0;
        await new Promise((resolve) => setTimeout(resolve, 100));
        menu.style.display = "block";
    }
    

    //exiting the menu

    /*
    window.onclick = function(e) {
        if (e.target == menu) {
            menu.style.display = "none";
            confirm = false;
            console.log(confirm);
    }}
    */

    var decks = document.querySelector(".decks");
    var deckList = decks.getElementsByTagName("li");
    console.log("# of decks prepared: " + deckList.length);

    for(let i = 0; i < deckList.length; i++) {
        deckList[i].addEventListener("click", selectDeck);
    }
    
    //change class
    function selectDeck() {
        if (this.classList.contains('option-selected')) {
          this.className = "option";
        } else {
          this.className = 'option-selected';
        }
      }
    
    // ok button
    okButton.onclick = function() {
        console.log("ok");
        menu.style.display = "none";
        confirm = true;
        //console.log(confirm);
        if (decks != changeDeck()) {
            console.log("decks changed");
            decks = changeDeck();
            console.log("deck ids: " + decks)
            initialize(decks);
        }

    }

    //generate array of selected decks
    function changeDeck() {
        selectedDecks = [];
        const selected = document.getElementsByClassName("option-selected");

        for(let i = 0; i < selected.length; i++) {
            //console.log(selected[i].getAttribute("data-event"));
            //selectedDecks.push(selected[i].getAttribute("data-event"));
            selectedDecks.push(selected[i].innerHTML);
            //console.log("selected: " + selectedDecks);

        }

        return selectedDecks;
    }


    function startUp() {
        console.log("startup");
        //console.log(confirm);
        document.querySelector("[data-event='1']").className = "option-selected";
        decks = changeDeck();
        console.log("decks: " + decks)
        //initialize(decks);
        menu.style.display = "grid";
    }


    startUp();


    /*
    function selectDeck() {
        this.classList.toggle("selected");
    }
    */

    

    /*
    const grade = document.getElementById("grade");
    const deckItems = grade.getElementsByTagName("li");

    //deckButton.addEventListener("click", toggleMenu);
    menuButton.addEventListener("click", toggleMenu);

    for (let i = 0; i < deckItems.length; i++) {
        deckItems[i].addEventListener("click", handleMenuItemClick);
    }

    /*
    function toggleMenu() {
        grade.style.display = (grade.style.display === "none") ? "block" : "none";
    }
    

    async function handleMenuItemClick(e) {
        const display = document.querySelector('.container');
        deckNumber  = e.target.getAttribute("data-event");

        if (deckNumber >= 0 && deckNumber <= 6) {
            display.classList.remove('show');

            /*
            setTimeout(async function() {
                await initialize(Number(deckNumber));
                console.log("Event " + deckNumber + " triggered");
            }, 10
            );
            
            
            display.addEventListener("transitionend", async function() {
                await initialize(deckNumber);
                console.log("Event" + deckNumber + "triggered");
                display.removeEventListener("transitionend", arguments.callee);
                setTimeout(function() {
                    display.classList.add("show");
                }, 0.2);

            });

            const deckName = e.target.textContent;
            document.getElementById("buttontext").textContent = deckName;
        } else {
            console.log("Invalid event number");
        }
      
        grade.style.display = "none";
    }

    */

});

