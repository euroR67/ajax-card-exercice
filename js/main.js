// Fonction qui fait le fetch(), qui contact l'API
async function callAPI(uri) {
    console.log("-- callAPI - start --")
    console.log("uri = ", uri);

    // Fetch(), appel à l'API et réception de la réponse
    const response = await fetch(uri);
    console.log("response = ", response);

    // Récupération des données JSON reçues de l'API
    const data = await response.json();
    console.log("data = ", data);

    // Renvoi des données
    return data;
}

// Constate globale : l'URI du endpoint de demande de nouveau deck
const API_ENDPOINT_NEW_DECK = "https://deckofcardsapi.com/api/deck/new/";

// Fonction de demande de nouveau deck
async function getNewDeck() {
    console.log(">> getNewDeck");

    return await callAPI(API_ENDPOINT_NEW_DECK);
}

let idDeck = null;

// Fonctions (syntaxe de fonction fléchée) qui renoient des URI dynamiques de demande de mélange du deck et de pioche
const getApiEndpointShuffleDeck = () => `https://deckofcardsapi.com/api/deck/${idDeck}/shuffle/`;

// Fonction de demande de mélange du deck
async function shuffleDeck() {
    console.log(">> shuffleDeck");

    return await callAPI(getApiEndpointShuffleDeck());
}

// Fonctions (syntaxe de fonction fléchée) qui renoient des URI dynamiques de demande de mélange du deck et de pioche
const getApiEndpointDrawCard = () => `https://deckofcardsapi.com/api/deck/${idDeck}/draw/?count=1`;

// Fonction de demande de pioche dans le deck
async function drawCard() {
    console.log(">> drawCard");

    return await callAPI(getApiEndpointDrawCard());
}

// Supprime les cartes de l'anien deck du DOM
const cleanDomCardsFromPreviousDeck = () => {
    // Récupération des cartes (class css "card")
    document.querySelectorAll(".card")
    // et pour chacune de ces cartes
    .forEach(card => {
        // Suppression du DOM
        card.remove();
    });
}

// Fonction de réinitilisation (demande de nouveau deck + demande de mélange de ce nouveau deck)
async function ationReset() {
    // Vider dans le DOM les cartes de l'ancien deck
    cleanDomCardsFromPreviousDeck();

    // Récupération d'un nouveau deck
    const newDeckResponse = await getNewDeck();

    // Récupération de l'id de ce nouveau deck dans les données reçues et mise à jour de la variable globale
    idDeck = newDeckResponse.deck_id;

    // Mélange du deck
    await shuffleDeck();
}

// Elément HTML utiles pour évènements et pour la manipulation du DOM
const cardsContainer = document.getElementById("cards-container");

// Ajoute une carte dans le OM (dans la zone des cartes piochées) d'après l'URI de son image
function addCardToDomByImgUri(imgUri) {
    // Création de l'élément HTML "img", de classe CSS "card" et avec pour attribut HTML "src" l'URI reçue en argument
    const imgCardHtmlElement = document.createElement("img");
    imgCardHtmlElement.classList.add("card");
    imgCardHtmlElement.src = imgUri;

    // Ajout de cette image dans la zone des cartes piochées (en dernière position, dernier enfant de cardsContainer)
    cardsContainer.append(imgCardHtmlElement);
}

// Fonction qui demande à piocher une carte, puis qui fait l'appel pour l'intéfrer dans le DOM
async function actionDraw() {
    // Appel à l'API pour demander au croupier de piocher une carte et de nous la renvoyer
    const drawCardResponse = await drawCard();

    console.log("drawCardResponse = ", drawCardResponse);

    // Récupération de l'URI de l'image de cette carte dans les données reçues
    const imgCardUri = drawCardResponse.cards[0].image;

    // Ajout de la carte piochée dans la zone des cartes piochées
    addCardToDomByImgUri(imgCardUri);
}

// appel d'initiliation au lancement de l'application
ationReset();

// éléments HTML utilses pour les évènements et pour la manipulation du DOM
const actionResetButton = document.getElementById("action-reset");
const actionDrawButton = document.getElementById("action-draw");

// écoutes d'évènements sur les boutons d'action
actionResetButton.addEventListener("click", ationReset);
actionDrawButton.addEventListener("click", actionDraw);