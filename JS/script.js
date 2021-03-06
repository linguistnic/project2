//API URL:

function getApiUrl(cardType) {
    return `https://db.ygoprodeck.com/api/v7/cardinfo.php?level=10&fname=${cardType}`;
  }
  
//Card HTML:
  function getCardHtml(card) {
    return `
      <div class="card-container">
        <h2>${card.name}</h2>
        <img class="card-image" src="${card.card_images[0].image_url}" alt="${card.name}" />
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
//Event:
  document
    .querySelector(".js-get-cards")
    .addEventListener("click", downloadCards);
  

/* Actual Pathway:
1) On "Click," User will be able to perform "downloadCards"
2) "downloadCards" then informs to fetch the API URL.

