
// https://sites.google.com/a/h7a.org/kanjicompounds/after-primary-school
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

let data;

async function fetchData(deck) {
    try {
        const deckFiles = {
            0: "./all.json",
            1: "./gr1.json",
            2: "./gr2.json",
            3: "./gr3.json",
            4: "./gr4.json",
            5: "./gr5.json",
            6: "./gr6.json",
        };

        const response = await fetch(deckFiles[deck]);
        data = await response.json();
        const deckName = document.getElementById("deck" + deck).textContent;
        document.getElementById("buttontext").textContent = deckName;

        console.log(data); // Optional: Log the fetched data for verification
        return data;
    } catch (error) {
        console.error("Error", error);
    }
}

async function generateWord() {
    try {
        const keys = Object.keys(data);
        const randomNumber = Math.floor(Math.random() * keys.length);
        const word = keys[randomNumber];
        const reading = wanakana.toRomaji(data[word]);
        console.log(reading);

        document.getElementById("word").innerHTML = word;
        return reading;
    } catch (error) {
        console.error("Error", error);
    }
}

async function getValue() {
    const input = document.getElementById("input").value;
    if (input === reading) {
        console.log("correct");
        reading = await generateWord();
        document.getElementById("input").value = "";
        getValue();
    }
}

let reading;

async function initialize(decknumber) {
    await fetchData(decknumber);
    reading = await generateWord();
    const display = document.querySelector('.container');
    display.classList.add('show');
    document.getElementById("input").value = "";
}


initialize(0);

document.addEventListener("DOMContentLoaded", function() {
    const deckButton = document.getElementById("deckbutton");
    const deckList = document.getElementById("decklist");
    const deckItems = deckList.getElementsByTagName("li");

    deckButton.addEventListener("click", toggleMenu);

    for (let i = 0; i < deckItems.length; i++) {
        deckItems[i].addEventListener("click", handleMenuItemClick);
    }

    function toggleMenu() {
        deckList.style.display = (deckList.style.display === "none") ? "block" : "none";
    }

    async function handleMenuItemClick(e) {
        const display = document.querySelector('.container');
        const eventNumber = e.target.getAttribute("data-event");
        if (eventNumber >= 0 && eventNumber <= 6) {
            display.classList.remove('show');

            /*
            setTimeout(async function() {
                await initialize(Number(eventNumber));
                console.log("Event " + eventNumber + " triggered");
            }, 10
            );
            */

            display.addEventListener("transitionend", async function() {
                await initialize(Number(eventNumber));
                console.log("Event" + eventNumber + "triggered");
                display.removeEventListener("transitionend", arguments.callee);
                setTimeout(function() {
                    display.classList.add("show");
                }, 1);

            });

            const deckName = e.target.textContent;
            document.getElementById("buttontext").textContent = deckName;
        } else {
            console.log("Invalid event number");
        }
      
        deckList.style.display = "none";
    }
});