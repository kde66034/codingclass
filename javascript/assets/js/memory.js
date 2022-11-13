// 01 HTML/CSS 디자인 구성
// 02 클릭한 카드 뒤집기
// 03 두개의 카드 뒤집어서 확인하기 (첫번째,두번째)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCards = memoryWrap.querySelectorAll(".cards li");
const memoryStart = document.querySelector(".memory__start");
const memoryTotal = document.querySelector(".memory__total span");
const memoryClose = document.querySelector(".memory__close");

let cardOne = '';
let cardTwo = '';
let disableDeck = true;    
let matchedCard = 0;        //매치된카드

let sound = [
    "../assets/audio/match.mp3",
    "../assets/audio/unmatch.mp3",
    "../assets/audio/mario64clear.mp3",
    "../assets/audio/mario64bgm2.mp3",
];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);
let soundBgm = new Audio(sound[3]);

let startTime;
let endTime;
let memoryTID = 0;
let memoryTID2 = 0;

// 카드 뒤집기
function flipCard(){
    soundBgm.play();

    if (disableDeck) return;
    if (this === cardOne) return;

    let clickedCard = this;
    clickedCard.classList.add("flip");

    if (!cardOne){
        cardOne = clickedCard;
        disableDeck = false;
        return;
    }
    cardTwo = clickedCard;
    disableDeck = true;     // 초기화하기

    let cardOneImg = cardOne.querySelector(".back img").src;
    let cardTwoImg = cardTwo.querySelector(".back img").src;

    matchCards(cardOneImg, cardTwoImg);

    // // 클릭된 카드가 카드1이랑 불일치할때
    // if(clickedCard !== cardOne && !disableDeck){
    //     clickedCard.classList.add("flip");

    //     // 카드 1,2를 순서대로 들어가게 하기
    //     if(!cardOne){
    //         return cardOne = clickedCard;
    //     }
    //     cardTwo = clickedCard;
    //     disableDeck = true;     // 초기화하기

    //     let cardOneImg = cardOne.querySelector(".back img").src;
    //     let cardTwoImg = cardTwo.querySelector(".back img").src;

    //     matchCards(cardOneImg, cardTwoImg);
    // }
}

// 카드 확인 (두개의 이미지 비교)
function matchCards(img1, img2){
    if(img1 === img2){
        // 같을경우
        matchedCard++;      // 매치된카드수 늘리기
        // alert("이미지가 일치합니다.");

        // 맞춘 개수 출력
        memoryTotal.innerHTML = matchedCard;

        // 카드를 모두 클릭한 경우
        if (matchedCard === 8){
            soundBgm.pause();
            soundSuccess.play();
            setTimeout(() => {
                endTime = new Date();
                
                let playTime = Math.floor((endTime - startTime) / 1000);
                alert(`${playTime}초 만에 클리어 하셨습니다! 당신의 점수는 ${100 - playTime}점입니다.`);
                alert("다시 플레이하고 싶으시다면 [REPLAY] 버튼을 눌러주세요.");
                memoryStart.innerText = "REPLAY";
            }, 300);
        }
        soundMatch.play();
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = "";
        cardTwo = "";
        disableDeck = false;
    } else {
        // 일치하지 않는 경우(틀린음악, 이미지가 좌우로 흔들림)
        soundUnMatch.play();

        setTimeout(() => {
            cardOne.classList.add("shakeX");
            cardTwo.classList.add("shakeX");
        }, 500);

        setTimeout(() => {
            cardOne.classList.remove("shakeX", "flip");
            cardTwo.classList.remove("shakeX", "flip");
            cardOne = "";
            cardTwo = "";
            disableDeck = false;
        }, 1600);
    }
}

// 카드 섞기
function shuffledCard(){
    cardOne = "";
    cardTwo = "";
    matchedCard = 0;

    soundBgm.play();

    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    let result = arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    // 점수 출력
    memoryTotal.innerHTML = matchedCard;

    memoryCards.forEach((card, index) => {
        card.classList.remove("flip");

        memoryTID = setTimeout(() => {
            card.classList.add("flip");
        }, 200 * index);

        memoryTID2 = setTimeout(() => {
            card.classList.remove("flip");
            disableDeck = false;
            startTime = new Date();
        }, memoryCards.length * 200 + 1000);

        let imgTag = card.querySelector(".back img");
        imgTag.src = `../assets/img/memory/game_card0${arr[index]}.png`;
    });

    // 카드 클릭
    memoryCards.forEach(card => {
        card.addEventListener("click", flipCard);
    });
}
memoryStart.addEventListener("click", shuffledCard);

// 게임 종료
memoryClose.addEventListener("click", () => {
    document.querySelector(".memory__wrap").classList.remove("show");
    soundBgm.pause();
})