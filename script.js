

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function randomJouyou() {
    try {
        const response = await fetch("https://kanjiapi.dev/v1/kanji/jouyou");
        const data = await response.json();
        const randomNumber = Math.floor(Math.random() * data.length);
        const randomKanji = data[randomNumber];
        console.log(randomKanji);
        return randomKanji;
    } catch (error) {
        console.error("Error", error);
    }
}

/*
async function generate_word() {
    try {
      const word = await randomJouyou();
      document.getElementById("word").innerHTML = word;
    } catch (error) {
      console.error('Error', error);
    }
}
*/

async function generate_word() {
    try {
        //const kanji = await randomJouyou();
        //const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=%23common%20%23words${kanji}`);
        //const data = await response.json();
        //console.log(data);
        const response = await fetch("words/all.json");
        const data = await response.json();
        console.log(data);
        const randomNumber = Math.floor(Math.random() * data.length);
        const word = data[randomNumber];
        document.getElementById("word").innerHTML = word;
        

    } catch (error) {
        console.error("Error", error);
    }
}