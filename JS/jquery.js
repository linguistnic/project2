// jQuery version

/* the $(``) is shorthand for document.querySelector/All(.yourSelectionHere) it intelligently selects whatever you need
*/

function getApiUrl(cardType) {
    return `https://db.ygoprodeck.com/api/v7/cardinfo.php?level=10&fname=${cardType}`;
  }
  
  function getCardHtml(card) {
    return `
      <div class="card-container">
        <h2>${card.name}</h2>
        <img class="card-image" src="${card.card_images[0].image_url}" alt="${card.name}" />
      </div>  
    `;
  }
  
  function insertCards(cards) {
    const cardsHtml = cards.data.map(getCardHtml).join("");
  
    $(".js-container").html(cardsHtml);
  }
  
  function errorHandler() {
    $(".js-container").html(`
      <div class="error">
        The requested cards were not found.
      </div>
    `);
  }
  
  function downloadCards() {
    const cardType = $("[name=card-types]").val();
    const api_url = getApiUrl(cardType);
    $.get(api_url).done(insertCards).fail(errorHandler);
  }
  
  $(".js-get-cards").click(downloadCards);
  