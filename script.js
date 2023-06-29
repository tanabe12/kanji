
// https://sites.google.com/a/h7a.org/kanjicompounds/after-primary-school
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

let data;

async function fetchData() {
    try {
        const response = await fetch("./all.json");
        data = await response.json();
        console.log(data); // Optional: Log the fetched data for verification
    } catch (error) {
        console.error("Error", error);
    }
}


async function generateWord() {
    try {
        console.log(data);
        const keys = Object.keys(data);
        const randomNumber = Math.floor(Math.random() * keys.length);
        const word = keys[randomNumber];
        const reading = wanakana.toRomaji(data[word]);
        //console.log(word);
        console.log(reading);

        document.getElementById("word").innerHTML = word;
        return reading;

    } catch (error) {
        console.error("Error", error);
    }
}

async function getValue() {
    let input = document.getElementById("input").value;


    
    if(input === reading) {
        console.log("correct");
        reading = await generateWord();
        document.getElementById("input").value = "";
        getValue();
    }

}

let reading;

async function initialize() {
    await fetchData();
    reading = await generateWord();

  }


initialize();


