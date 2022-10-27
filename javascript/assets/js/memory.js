// 01 HTML/CSS 디자인 구성
// 02 클릭한 카드 뒤집기
// 03 두개의 카드 뒤집어서 확인하기 (첫번째,두번째)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCards = memoryWrap.querySelectorAll(".cards li");

let cardOne, cardTwo;
let disableDeck = false;    
let matchedCard = 0;        //매치된카드

let sound = [
    "../assets/audio/match.mp3",
    "../assets/audio/unmatch.mp3",
    "../assets/audio/up.mp3"
];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);

// 카드 뒤집기
function flipCard(e){
    let clickedCard = e.target;

    // 클릭된 카드가 카드1이랑 불일치할때
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");

        // 카드 1,2를 순서대로 들어가게 하기
        if(!cardOne){
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;     // 초기화하기

        let cardOneImg = cardOne.querySelector(".back img").src;
        let cardTwoImg = cardTwo.querySelector(".back img").src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

// 카드 확인 (두개의 이미지 비교)
function matchCards(img1, img2){
    if(img1 == img2){
        // 같을경우
        matchedCard++;      // 매치된카드수 늘리기
        // alert("이미지가 일치합니다.");

        // 카드를 모두 클릭한 경우
        if (matchedCard == 8){
            alert("GAME OVER");
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;

        soundMatch.play();
    } else {
        // 일치하지 않는 경우(틀린음악, 이미지가 좌우로 흔들림)
        setTimeout(() => {
            cardOne.classList.add("shakeX");
            cardTwo.classList.add("shakeX");
        }, 500);

        setTimeout(() => {
            cardOne.classList.remove("shakeX");
            cardTwo.classList.remove("shakeX");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1600);

        soundUnMatch.play();
    }
}

// 카드 섞기
function shuffledCard(){
    cardOne = cardTwo = "";
    disableDeck = false;
    matchedCard = 0;

    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    let result = arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    memoryCards.forEach((card, index) => {
        card.classList.remove("flip");

        setTimeout(() => {
            card.classList.add("flip");
        }, 200 * index);

        setTimeout(() => {
            card.classList.remove("flip");
        }, 5000);

        let imgTag = card.querySelector(".back img");
        imgTag.src = `../assets/img/memory/game_card0${arr[index]}.png`;
    })
}
shuffledCard();

// 카드 클릭
memoryCards.forEach(card => {
    card.addEventListener("click", flipCard);
})