// Create a list that holds all of your cards
var card = document.querySelectorAll(".card");
var cards = [...card];
var clickedCards = [];


// Adding an event listener to each card.
cards.map(i => {
  i.addEventListener('click', displayCards);
});

// Display cards
var timeStatus=0;
function displayCards() {
  if (timeStatus==0) {
  timerCreation();
    timeStatus=1;
  }
  this.classList.add('open', 'show', 'disabled');
  clickedCards.push(this);
  console.log(clickedCards);
  cardsMatched();
}

// Matching the cards
function cardsMatched() {
  moveCounter();
  setTimeout(function () {
    if (clickedCards.length==2) {

      // Way 1

      if (clickedCards[0].children[0].classList.item(1)===clickedCards[1].children[0].classList.item(1)) {

      // Way 2

      // if (clickedCards[0].children[0].className === clickedCards[1].children[0].className) {

      // Way 3

      // if (clickedCards[0].childNodes[1].className === clickedCards[1].childNodes[1].className) {

      // Way 4

      // if (clickedCards[0].lastElementChild.classList[1]===clickedCards[1].lastElementChild.classList[1]) {

      // Way 5

      // if (clickedCards[0].firstElementChild.classList[1]===clickedCards[1].firstElementChild.classList[1]) {

        clickedCards.map(i=>{
          i.classList.add('match');
          i.classList.remove('open','show');
        });
        gameOver();
      }
      else {
       clickedCards.map(i=>{
        i.classList.remove('open','show','disabled');
       });
      }
      clickedCards=[];
    }
  },180);
}

// moves
var move=document.querySelector('.moves');
function moveCounter() {
  moves=move.innerHTML;
  moves++;

  move.innerHTML=moves;
  starRating();
}

// timer Creation
var timer=document.querySelector('.timer');
var sec=0,
mins=0;
function timerCreation() {
  timerInterval = setInterval(function() {
  sec++;
  if (sec==60) {
    mins++;
    sec=0;
  }
  timer.innerHTML=mins + " : "+sec;
},1000);
}

// Stars Rating
var stars=[].slice.call(document.querySelectorAll('.fa-star'));
function starRating() {
  if (moves==18) {
    stars[2].classList.add('fa-star-o');
    stars[2].classList.remove('fa-star');
  }
  else if (moves==32) {
    stars[1].classList.add('fa-star-o');
    stars[1].classList.remove('fa-star');
  }
}

// Game Over
var matchCount=0;
function gameOver() {
  matchCount++;
  var starsLength=document.querySelectorAll('.fa-star').length;
  var starsData="";
  while (starsLength -- > 0) {
    starsData+='<i class="fa fa-star">';
  }

  if (matchCount==8) {
    clearInterval(timerInterval);
    swal({
      title:'Congratulation..!',
      html: "Total Moves :" + move.innerHTML + "<br>  Wow! you are completed the game with in short time :" + timer.innerHTML + "<br> You have erned : " + starsData,
    }).then(function(){
      reload();
    });
  }
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


// when the page loads, shuffelling all the cards
var deck = document.querySelector(".deck");
  var cardShuffle = shuffle(cards);
  for (i in cardShuffle) {
    [].forEach.call(cards, function (items) {
      deck.appendChild(items);
    });
  }

// Restarting the game
function reload() {
  window.location.reload();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
