

const startBtn=document.getElementById('startBtn');
const mainContainer=document.getElementById('mainContainer');
const gameContainer=document.getElementById('gameContainer');
const gameBoard=document.getElementById('gameBoard');
const statusText=document.getElementById('status');
const p1ScoreText=document.getElementById('p1-score');
const p2ScoreText=document.getElementById('p2-score');
const turnText=document.getElementById('turn');


const emojis=document.querySelectorAll(".emoji-container i");  //emoji section
const safeZone = document.querySelector(".safe-zone");

if(safeZone){
  emojis.forEach(icon=>{
    let x, y;
    const buffer=50;
    const safeRect=safeZone.getBoundingClientRect();
    do{
        x=Math.random()*window.innerWidth;
        y=Math.random()*window.innerHeight;
    }
    while(
       x > safeRect.left - buffer &&
    x < safeRect.right + buffer &&
    y > safeRect.top - buffer &&
    y < safeRect.bottom + buffer
  );

    icon.style.left=`${x}px`;
    icon.style.top=`${y}px`;

     const duration = (Math.random() * 2 + 3).toFixed(1); // between 3s and 5s
     const delay = (Math.random() * 2).toFixed(1);        // between 0s and 2s

  icon.style.animationDuration = `${duration}s`;
  icon.style.animationDelay = `${delay}s`;
});
}


startBtn.addEventListener('click',()=>{
  mainContainer.style.display="none";
  gameContainer.style.display="block";
});

//emoji for cards

const cardsArray=["🍎","🍌","🍇","🍓","🍍","🍉","🥝","🍑"];
let gameCards=[...cardsArray,...cardsArray];
let flippedCards=[];
let matchedCards=[];
let moves=0;

// player variables
let currentPlayer=1;
let p1Score=0;
let p2Score=0;

gameCards.sort(()=>Math.random()-0.5);

//create card on board

gameCards.forEach((emoji)=>{
  const card=document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji=emoji;
  card.textContent="⭐";   //hidden emoji
  card.addEventListener("click",flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
    if (flippedCards.length === 2  ||  matchedCards.includes(this)) return;

    this.textContent = this.dataset.emoji;
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        statusText.textContent = `Moves: ${moves}`;
        checkMatch();
    }
}
function checkMatch(){
  const [card1, card2]=flippedCards;

  if(card1.dataset.emoji===card2.dataset.emoji){
    matchedCards.push(card1, card2);
    flippedCards=[];

    //add score
    if(currentPlayer===1){
      p1Score++;
      p1ScoreText.textContent=p1Score;
    }else{
      p2Score++;
      p2ScoreText.textContent=p2Score;
    }

    if(matchedCards.length===gameCards.length){
      setTimeout(()=>{
        if(p1Score>p2Score){
          alert(`🎉 Player 1 Wins! (${p1Score} - ${p2Score})`);
        }else if(p2Score>p1Score){
          alert(`🎉 Player 2 Wins! (${p2Score} - ${p1Score})`);
        }
        else{
          alert(`🤝 It's a tie! (${p1Score} - ${p2Score})`);
        }
      },500);
    }
  }
  else{
  setTimeout(() => {
    flippedCards.forEach(card=>{
      card.textContent="⭐";
      card.classList.remove("flipped");
    });
    flippedCards=[];
    switchPlayer();
  }, 800);
}
}
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnText.textContent = currentPlayer === 1 ? "🔵 Player 1's Turn" : "🔴 Player 2's Turn";
    turnText.style.color = currentPlayer === 1 ? "blue" : "red";
}