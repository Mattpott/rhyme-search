// get relevant dom elements
const queryInputElem = document.getElementById('query');

const form = document.getElementById('rhyme-form');

form.addEventListener('submit', (event) => {
  console.log('submitting');
  event.preventDefault();
})

const results = document.getElementById('results');

// write function that searches the rhyme API given a (string) query (likely you should use the fetch API)
// add event listener to know when to search
queryInputElem.addEventListener('keyup', async function (ev) {
  ev.preventDefault()
  if (ev.key == 'Enter') {
    console.log('pressed enter')

    const rhymeResultsResp = await fetch(
      `https://rhymebrain.com/talk?function=getRhymes&word=${queryInputElem.value}`);
    console.log(rhymeResultsResp);
    const rhymeResults = await rhymeResultsResp.json();
    console.log(rhymeResults);
    await displayRhymes(rhymeResults);
    const rhymeResultsElems = rhymeResults.map((rhymeWord) => {
      const resultElem = document.createElement("div");
      resultElem.classList.add("result");
      if (rhymeWord.score >= 300) {
        resultElem.classList.add("perfect");
      } else {
        resultElem.classList.add("perfect");
      }
      resultElem.dataset.score = rhymeWord.score;
      resultElem.innerText = rhymeWord.word;
      return resultElem;
    });
    const resultsContainer = document.getElementById('results');
    resultsContainer.append(...rhymeResultsElems);
  }
});

// function calculateFontSize(score) {
//   return score / 15 > 16 ? score / 15 : 16;
// }

function displayRhymes(arrayOfRhymes) {
  // displaySize = 100;
  // rhymeHtml = arrayOfRhymes.array.map(element => {
  //   `<p style="font-size: ${calculateFontSize(element.score)};">
  //     ${element.word}
  //   </p>`
  // });

  // const resultsElem = document.getElementById("results");
  // rhymeHtml.array.forEach(element => {
  //   resultsElem.append(element);
  // });
}

// write function that:
//  1. expects array of word object results
//    that look like the spec says https://rhymebrain.com/api.html#rhyme
//  2. creates DOM elements and inserts them into the page
