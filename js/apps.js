'use strict';
var elem = document.querySelectorAll('li');
const timerContainer = document.querySelector('.timer');
var clickedElem = [];
var allClassnames = [];
var movesCount = 0;
var matchCount = 0;
let initialClick = false;
// console.log(elem[0].children[0].classNamne);
elem.forEach(item => {
  // console.log(item.children[0].className);
  allClassnames.push(item.children[0].className);
})
var movesElem = document.getElementsByClassName('moves');
console.log(movesElem[0].textContent);
/*
 * Create a list that holds all of your cards
 */

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

  for ( var i in array) {
    elem[i].children[0].className = array[i]
  }
  return array;
}


console.log(elem);
elem.forEach(item => {

  item.addEventListener('click', () => {
    // startTimer();
    if (initialClick === false) {
      initialClick = true;
      startTimer();
    }

    item.classList.add('open', 'show', 'disable');
    verify(item);
  })

})



function verify(e) {
  setTimeout(() => {
    clickedElem.push(e);
    // console.log(clickedElem[0].children[0].className);
    if (clickedElem.length == 2) {

      if (clickedElem[0].children[0].className === clickedElem[1].children[0].className) {
        clickedElem.map(i => {
          i.classList.add('match');
          i.classList.remove('open', 'show')
        })
        gameCompletion();

      } else {
        clickedElem.map(i => {
          i.classList.remove('open', 'show', 'match', 'disable')
        })
      }
      movesInc();

      clickedElem = [];
    }
  }, 500)

}


function movesInc() {
  var starElem = []
  starElem = document.getElementsByClassName('fa-star');
  let i = starElem.length;
  // console.log();
  movesCount += 1;
  movesElem[0].textContent = movesCount;
  if (movesCount == 16) {
    starElem[i - 1].className = 'fa fa-star-o'

  } else if (movesCount == 20) {
    starElem[i - 1].className = 'fa fa-star-o'
  }
  // console.log(movesCount);
}


// var span=document.createElement('span');
var stars = document.getElementsByClassName('stars')


console.log(stars[0].innerHTML);

function gameCompletion() {
  matchCount += 1;
  if (matchCount == 2) {
    console.log(movesCount);
    clearInterval(timer);
    // alert('You won the game..... :)')
    swal({
      allowEscapeKey: false,
      allowOutsideClick: false,
      html: true,
      title: 'superb You have won the game!',
      text: 'With ' + movesCount + ' Moves ' + minutes + ":" + seconds +" secs "+ stars[0].innerHTML + '\n Woooooo!',
      type: 'success',
      confirmButtonColor: '#02ccba',
      confirmButtonText: 'are you want to play again!'
    }, function() {
      location.reload();

    })




  }
}


function restart() {
  location.reload();
}
// timer code........ starts
let hour = 0;
let minutes = 0;
let seconds = 0;

let timer;

function startTimer() {
  timer = setInterval(function() {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    //console.log(formatTimer());
    timerContainer.innerHTML = minutes + ":" + seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}


function resetTimer() {
  location.reload();

}
//timer code ends

function startGame() {
  // console.log(initialElem);
  shuffle(allClassnames);

}
document.body.onload=startGame();


// card
// open
// show
// disable
// match
// fa-star
// fa-star-o
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
