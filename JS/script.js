//API URL:
/*filter:
.php?level=${cardLevel}&fname=${cardType}
`data` is automatic in JS! It's not a parameter you must use.
you must use a question mark ? (that's why it's called a query string)
*/
function getApiUrl(cardType) {
    return `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${cardType}`;
  }
  
//Card HTML:
  function getCardHtml(card) {
    return `
    <div class="flex-card">
      <div class="card-container">
        <h2>${card.name}</h2>
        <img class="card-image" src="${card.card_images[0].image_url}" alt="${card.name}" />
        <p class="card-desc">${card.desc}</p>
        <p class="card-atk">ATK: ${card.atk}</p>
        <p class="card-def">DEF: ${card.def}</p>
      </div>  
    </div>
    `;
  }

//Actually displaying cards within the array:
  function insertCards(cards) {
    const cardsHtml = cards.data.map(getCardHtml).join("");
  
    document.querySelector(".js-container").innerHTML = cardsHtml;
  }

//Failsafe just in case:
  function errorHandler() {
    document.querySelector(".js-container").innerHTML = `
      <div class="error">
        The requested cards were not found.
      </div>
    `;
  }
//Pathway:
  function downloadCards() {
    const cardType = document.querySelector("[name=card-types]").value;
    const api_url = getApiUrl(cardType);
    fetch(api_url)
      .then((data) => data.json())
      .then(insertCards)
      .catch(errorHandler);
  }
//Event (thiss):
  document
    .querySelector(".js-get-cards")
    .addEventListener("click", downloadCards);

