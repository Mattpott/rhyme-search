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
    displayRhymes(rhymeResults);
  }
});

// write function that:
//  1. expects array of word object results
//    that look like the spec says https://rhymebrain.com/api.html#rhyme
//  2. creates DOM elements and inserts them into the page
function displayRhymes(rhymeResults) {
  const resultsContainer = document.getElementById('results');
  while (resultsContainer.hasChildNodes()) {
    resultsContainer.removeChild(resultsContainer.lastChild);
  }
  const rhymeResultsElems = rhymeResults.map((rhymeWord) => {
    const resultElem = document.createElement("div");
    resultElem.classList.add("result");
    resultElem.style.fontSize = `${scaleFontSize(rhymeWord.score)}px`;
    resultElem.dataset.score = rhymeWord.score;
    resultElem.innerText = rhymeWord.word;
    resultElem.style.padding = "0.5rem";
    resultElem.style.display = "inline-block";
    return resultElem;
  });
  resultsContainer.append(...rhymeResultsElems);
}

function scaleFontSize(score) {
  return 50 * (score / 300);
}