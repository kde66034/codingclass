const tetrisWrap = document.querySelector(".tetris__wrap");
const playground = tetrisWrap.querySelector(".playground > ul");
const tetrisStart = tetrisWrap.querySelector(".tetris__start");
const startBtn = tetrisWrap.querySelector(".start__btn");
const tetrisRestart = tetrisWrap.querySelector(".tetris__restart");
const restartBtn = tetrisWrap.querySelector(".restart__btn");
const resultTime = tetrisWrap.querySelector(".tetris__total .time span");
const resultLine = tetrisWrap.querySelector(".tetris__total .line span");
const resultScore = tetrisWrap.querySelector(".tetris__score span");
const tetrisInfo = tetrisWrap.querySelector(".tetris__info");
const tetrisIcon2 = document.querySelector(".icon4");
const tetrisCloseBtn = document.querySelector(".tetris__close__btn");

// 음악
let tetrisMusic = new Audio("../assets/audio/marioworldbgm.mp3");
let tetrisMatchMusic = new Audio("../assets/audio/match.mp3");
let tetrisEndMusic = new Audio("../assets/audio/up.mp3");

// variables
let rows = 20;
let cols = 12;

let tetrisScore = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
let tetrisTime = 0;
let stopTetris = false;
let setTetrisTime;

// 블록 정보
const movingItem = {
    type: "Tmino",
    direction: 0, //블록 모양
    top: 0,
    left: 6,
};
// 블록 좌표값
const blocks = {
    Tmino : [
        [[2,1],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[2,1],[1,1]],
        [[2,1],[1,2],[1,0],[1,1]],
    ],
    Imino : [
        [[0,0],[0,1],[0,2],[0,3]],
        [[0,0],[1,0],[2,0],[3,0]],
        [[0,0],[0,1],[0,2],[0,3]],
        [[0,0],[1,0],[2,0],[3,0]],
    ],
    Omino : [
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
    ],
    Zmino : [
        [[0,0],[1,0],[1,1],[2,1]],
        [[1,0],[0,1],[1,1],[0,2]],
        [[0,0],[1,0],[1,1],[2,1]],
        [[1,0],[0,1],[1,1],[0,2]],
    ],
    Smino : [
        [[1,0],[2,0],[0,1],[1,1]],
        [[0,0],[0,1],[1,1],[1,2]],
        [[1,0],[2,0],[0,1],[1,1]],
        [[0,0],[0,1],[1,1],[1,2]],
    ],
    Jmino : [
        [[0,2],[1,0],[1,1],[1,2]],
        [[0,0],[0,1],[1,1],[2,1]],
        [[0,0],[1,0],[0,1],[0,2]],
        [[0,0],[1,0],[2,0],[2,1]],
    ],
    Lmino : [
        [[0,0],[0,1],[0,2],[1,2]],
        [[0,0],[1,0],[2,0],[0,1]],
        [[0,0],[1,0],[1,1],[1,2]],
        [[0,1],[1,1],[2,0],[2,1]],
    ]
}
// 시작하기
function init() {
    //블록 정보 저장
    tempMovingItem = { ...movingItem };

    // i의 범위 지정은 만들고 싶은 컷 번째 li의 개수만큼
    for(let i=0; i<rows; i++){
        prependNewLine();   // 테트리스 라인 만들기
    }

    // renderBlocks(); //블록 출력하기
    // generateNewBlock(); //블록 만들기
    // moveBlock();
}

// 블록 만들기
function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    // j의 범위 지정은 만들고 싶은 두 번째 li의 개수만큼
    for (let j = 0; j < cols; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}

// 블록 출력하기
// moveType을 매개변수로 받아오면 해당값을 저장, 아닌 경우는 공백으로 넘어감
// 매개변수를 보내지 않는 경우에 활용할 것
function renderBlocks(moveType = "") {
    if(!stopTetris){
        // const ty = tempMovingItem.type;
        // const di = tempMovingItem.direction;
        // const to = tempMovingItem.top;
        // const le = tempMovingItem.left;

        // 객체구조분해할당
        // 블록의 각 정보를 출력하기 위함
        const { type, direction, top, left } = tempMovingItem;

        // 움직이는 블록이 이동되면 이전에 있던 블록을 없애주기 위해 forEach문을 통해 있던 블록 삭제
        // 이후 새 블록이 출력되기에 이동된 것처럼 보임
        const movingBlocks = document.querySelectorAll(".moving");
        movingBlocks.forEach((moving) => {
            moving.classList.remove(type, "moving");
        });

        // 4개를 모두 출력하기 위해 forEach 반복문 사용
        blocks[type][direction].some((block) => {
            const x = block[0] + left; //2 0 1 1
            const y = block[1] + top; //1 1 0 1
    
            // playground y번째 li의 자식 ul의 x번째 li 선택
            const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
            const isAvailable = checkEmpty(target);
            if (isAvailable) {
                target.classList.add(type, "moving");
            } else {
                tempMovingItem = { ...movingItem };
                setTimeout(() => {
                    renderBlocks();
                    if(moveType === "top"){
                        seizeBlock();
                    }
                }, 0);
                return true;
            }
            // console.log({ playground });
        });

        // 위치값 갱신
        movingItem.left = left;
        movingItem.top = top;
        movingItem.direction = direction;
    }
}

//블록 감지하기
function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    });
    checkMatch();   // 줄이 채워졌는지 체크
}

// 채워진 줄 제거하기
function checkMatch(){
    // playground의 자식요소선택
    const childNodes = playground.childNodes;

    // 게임 끝났을 때

    childNodes[0].children[0].childNodes.forEach((li) => {
        if(li.classList.contains("seized")){
            stopTetris = true;
            tetrisEndMusic.play();
            tetrisGameover();
        }
    });
    childNodes.forEach((child) => {
        let matched = true;     // 트리거 변수 생성

        // child(li)의 0번째 자식(ul)의 모든 li를 대상으로 반복문 실행
        child.children[0].childNodes.forEach((li) => {
            if (!li.classList.contains("seized")) {
                matched = false;
            }
        });
        
        // match가 true인 경우, 꽉 채운 해당 줄을 삭제하고, 새로 한 줄을 추가합니다.
        if (matched) {
            tetrisMatchMusic.play();
            child.remove();     // 줄 삭제
            prependNewLine();   // 줄 생성
            tetrisScore++;
            document.querySelector(".tetris__info .line span").innerText =
            tetrisScore;
        };
    });


    // 새로운 블록을 생성합니다.
    generateNewBlock();
}

//새로운 블록 만들기
function generateNewBlock(){
    clearInterval(downInterval);

    downInterval = setInterval(()=>{
        moveBlock("top", 1)
    }, duration);

    const blockArray = Object.entries(blocks);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    movingItem.type = blockArray[randomIndex][0];

    movingItem.top = 0;
    movingItem.left = 5;
    movingItem.direction = 0;
    tempMovingItem = { ...movingItem };
    // renderBlocks();
}

// 빈칸 감지
function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}

// 블록 움직이기
function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

// 모양 바꾸기
function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? (tempMovingItem.direction=0) : (tempMovingItem.direction += 1);
    renderBlocks();
}

// 빨리 내리기
function dropBlock() {
    clearInterval(downInterval);

    downInterval = setInterval(() => {
       moveBlock("top", 1)
    }, 10);
}

// 시간 설정하기
function setTime() {
    setTetrisTime = setInterval(() => {
    tetrisTime++;
    document.querySelector(".tetris__info .time span").innerText = tetrisTime;
    }, 1000);
}

// 게임 오버
function tetrisGameover() {
    tetrisMusic.pause();
    tetrisMusic.currentTime = 0;
    clearInterval(setTetrisTime);
    tetrisInfo.classList.remove("show");
    tetrisRestart.classList.add("show");
    resultTime.innerText = tetrisTime;
    resultLine.innerText = tetrisScore;
    resultScore.innerText = tetrisTime + tetrisScore * 5;
}

// 게임 시작하기
function tetrisStartFunc() {
    stopTetris = false;
    tetrisStart.classList.remove("show");
    tetrisInfo.classList.add("show");
    document.querySelector(".tetris__restart").classList.remove("show");
    generateNewBlock();
    setTime();
    tetrisMusic.play();
    tetrisMusic.loop = true;
}

// 리셋하기
function resetTetris() {
    tetrisMusic.pause();
    tetrisMusic.currentTime = 0;
    tetrisInfo.classList.remove("show");
    clearInterval(setTetrisTime);
    tetrisScore = 0;
    tetrisTime = 0;
    stopTetris = true;
    document.querySelector(".tetris__info .time span").innerText = tetrisTime;

    const tetrisMinos = playground.querySelectorAll("li > ul > li");
    tetrisMinos.forEach((minos) => {
    minos.className = "";
    });
}

// 이벤트
document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
            case 38:
            changeDirection();
            break;
            case 32:
            dropBlock();
            break;
        default:
            break;
    }
});

// 클릭 이벤트
// 게임 시작하기
startBtn.addEventListener("click", () => {
    tetrisStartFunc();
});
// 게임 재시작하기
restartBtn.addEventListener("click", () => {
    resetTetris();
    tetrisRestart.classList.remove("show");
    tetrisStart.classList.add("show");
});

// // 창 켜기
// tetrisIcon2.addEventListener("click", () => {
//     resetTetris();
//     tetrisWrap.classList.add("show");
// });

// // 창 끄기
// tetrisIcon2.addEventListener("click", () => {
//     resetTetris();
//     tetrisRestart.classList.remove("show");
//     tetrisStart.classList.add("show");
//     tetrisWrap.classList.remove("show");
// });
tetrisCloseBtn.addEventListener("click", () => {
    resetTetris();
    tetrisRestart.classList.remove("show");
    tetrisStart.classList.add("show");
    tetrisWrap.classList.remove("show");
});

// 테트리스 만들기
init();

