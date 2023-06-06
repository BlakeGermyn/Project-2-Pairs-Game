//Grab what we need

const  section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 10;

//Link text
playerLivesCount.textContent = playerLives;
playerLivesCount.style.fontFamily = "calibri";

//Generate the data used for cards
const getData = () => [
    { imgSrc: "./images/spade.png", name: "spade"},
    { imgSrc: "./images/Queen.png", name: "queen"},
    { imgSrc: "./images/King.png", name: "king"},
    { imgSrc: "./images/Joker.png", name: "joker"},
    { imgSrc: "./images/heart.png", name: "heart"},
    { imgSrc: "./images/diamond.png", name: "diamond"},
    { imgSrc: "./images/clubs.png", name: "clubs"},
    { imgSrc: "./images/cards.jpg", name: "cards"},
    { imgSrc: "./images/spade.png", name: "spade"},
    { imgSrc: "./images/Queen.png", name: "queen"},
    { imgSrc: "./images/King.png", name: "king"},
    { imgSrc: "./images/Joker.png", name: "joker"},
    { imgSrc: "./images/heart.png", name: "heart"},
    { imgSrc: "./images/diamond.png", name: "diamond"},
    { imgSrc: "./images/clubs.png", name: "clubs"},
    { imgSrc: "./images/cards.jpg", name: "cards"},
];

//randomise the cards
const randomise = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() -0.5);
    return cardData;
};

//Function to generate cards
const cardGenerator = () => {
    const cardData = randomise();
//Making the Html
cardData.forEach((item) => {
const card = document.createElement("div");
const face = document.createElement("img");
const back = document.createElement("div");
card.classList = "card";
face.classList = "face";
back.classList = "back";
//Attach information to cards
face.src = item.imgSrc;
card.setAttribute('name', item.name);
//Attaching cards to section on HTML page
section.appendChild(card);
card.appendChild(face);
card.appendChild(back);

card.addEventListener('click', (e) => {
    card.classList.toggle("toggleCard");
    checkCards(e);
     });
  });
};
//Check if cards match
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    console.log(flippedCards);
//logic
if (flippedCards.length === 2) {
    if (
        flippedCards [0].getAttribute('name') ===
        flippedCards [1].getAttribute('name')
        ) {
    console.log("match");
    flippedCards.forEach(card => {
        card.classList.remove("flipped");
        card.style.pointerEvents = 'none';
    })
      } else { 
        console.log("wrong");
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            setTimeout(() => card.classList.remove("toggleCard"), 1000);
        });
        playerLives--;
        playerLivesCount.textContent = playerLives;
        if (playerLives === 0) {
            reset("💔You lost💔");
        };
    } 
  }
  // Run check on win
  if (toggleCard.length === 16) {
        reset("🥳️ You win! 🥳️");
        
  };
};

//Reset board
const reset = (text) => {
    let cardData = randomise();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        //randomise
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
        faces[index].src = item.imgSrc;
        cards[index].setAttribute('name', item.name);
        }, 1000)
      });
    playerLives = 10;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();