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