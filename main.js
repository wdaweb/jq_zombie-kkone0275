const mouse = document.querySelector('.mouse')
const holes = document.querySelectorAll('.hole')
const timeOut = document.querySelector('.text-time')
const scoreEl = document.querySelector('.score span')

const setGameTime = 40
let score = 0
let gameTime = setGameTime
let timer


// 添加捕捉聲音檔
const sound = new Audio("image/smash.mp3")
timeOut.textContent = gameTime

let btn = document.querySelector("#show");
let infoModal = document.querySelector("#infoModal");
let close = document.querySelector("#close");
btn.addEventListener("click", function () {
    infoModal.showModal();
})
close.addEventListener("click", function () {
    infoModal.close();
})

// 設置遊戲開始
$('#start').on('click', function () {
    run()
    $(this).attr('disabled', true)
})
function run() {
    timer = setInterval(() => {
        game()
        gameTime--
        timeOut.textContent = gameTime
        if (gameTime <= 0) {
            clearInterval(timer)
            const holeImge = document.querySelectorAll('.bear')
            holeImge.forEach((img) => {
                img.remove()
            })
            resetGame()
        }
    }, 1000)
}

function game() {
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    const img = document.createElement('img')

    let clicked = false

    img.classList.add('bear')

    const imgs = [{
        show: 'image/bear.png',
        click: './image/Bear-on.png',
        score: 1
    }, {
        show: './image/eevee.png',
        click: './image/eevee-on.png',
        score: -1,
    }, {
        show: './image/baby.png',
        click: './image/baby-on.png',
        score: -2,
    }, {
        show: './image/shiny.png',
        click: './image/shiny-on.png',
        score: 4,
    }, {
        show: './image/tree.png',
        click: './image/tree-on.png',
        score: -2,
    }
    ]

    // 0
    const imgRandom = Math.round(Math.random() * (imgs.length - 1))
    // imgs[0].show
    img.src = imgs[imgRandom].show
    hole.appendChild(img)

    // img.addEventListener('click',function (){
    // })

    img.addEventListener('click', () => {
        score += imgs[imgRandom].score
        score = score < 0 ? 0 : score
        sound.play()

        scoreEl.textContent = score
        // imgs[0].click
        img.src = imgs[imgRandom].click
        clicked = true
    })
    if (clicked) {
        removeImg(img, 800)
    } else {
        removeImg(img)
    }
}

// function functionName(參數, 有預設值的參數=1000){
// 要做的事情
// }
function removeImg(el, time = 1400) {
    setTimeout(() => {
        el.remove()
    }, time)
}

function resetGame() {
    $('#start').attr('disabled', false)
    score = 0
    gameTime = setGameTime
}

// event
// 將滑鼠位置，與圖示做綁定
window.addEventListener('mousemove', e => {
    mouse.style.top = e.pageY + 'px'
    mouse.style.left = e.pageX + 'px'
})

// 當滑鼠按下時進行 active 的行為
window.addEventListener('mousedown', () => {
    mouse.classList.add('active')
})

// 當滑鼠按下時取消 active 的行為
window.addEventListener('mouseup', () => {
    mouse.classList.remove('active')
})