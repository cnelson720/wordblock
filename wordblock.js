class Wordblock{
    constructor(output, button){
        this.output = output;
        this.button = button;
    }

    clear(){
        this.output.innerText = '';
    }

    disableAll(){
        for (let i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }
    }

    enableAll(){
        for (let i = 0; i < button.length; i++) {
            button[i].disabled = false;
        }
    }
}


const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const startButton = document.getElementById('startButton');
const gameDiv = document.getElementById('gameArea');
const button = document.getElementsByClassName('btn');
const output = document.getElementById('output');
const submit = document.getElementById('submit');
const clear = document.getElementById('clear');
const countDiv = document.getElementById('count');
let count = parseInt(countDiv.innerText);
const scoreDiv = document.getElementById('score');
let score = parseInt(scoreDiv.innerText);
const timerDiv = document.getElementById('countDown');
const gameOverScreen = document.getElementById('gameOver');
let timeLeft = 59;

let foundList = [];

let game = new Wordblock(output, button);

function gameOver(){
    alert(
        `You found ${foundList.length} words\nYou scored ${score} points\nStarting over..`
    );
    location.reload();
}




function randInt(max){
    return Math.floor(Math.random() * max);
}

function getScore(word){
    var pointAmount = 0;

    for (let i = 0; i < word.length; i++) {
        pointAmount++;
    }

    return pointAmount;
}


for (let i in button){
    button[i].innerText = alph[randInt(25)];
}

startButton.addEventListener('click', ()=>{
    gameDiv.style.display = 'block';
    startButton.style.display = 'none';
    let timer = setInterval(function(){
        if(timeLeft <= 0){
            clearInterval(timer);
            timerDiv.innerText = 'Game over!';
            gameOver();
        } else {
            timerDiv.innerText = timeLeft;
        }
        timeLeft -= 1;
    }, 1000);
});

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', ()=>{
        var pressed = button[i].innerText;

        if (output.innerText.length > 16){
            return;
        }
        
        output.innerText += pressed;
        button[i].disabled = true;
    })
}

submit.addEventListener('click', ()=>{

    fetch('./words.json').then(res => res.json().then(
        data =>{

            for (let i = 0; i < data.words.length; i++) {
                
                if (output.innerText.toLowerCase() == data.words[i]){

                    if(foundList.includes(data.words[i])){
                        console.log('You already found that word!');
                        alert('You already found that word!');
                        game.clear();
                        game.enableAll();
                    } else {

                        foundList.push(data.words[i]);

                        console.log('word matches: ' + data.words[i]);

                        game.clear();
                        game.enableAll();
                        score += getScore(data.words[i]);
                        scoreDiv.innerText = score;
                        console.log('score: ' + score);

                        count++;
                        countDiv.innerText = count;

                        console.log(`Words found: ${count}`);

                        console.log(foundList);
                    }
                }
                
            }
            
        }
    ));
})

clear.addEventListener('click', ()=>{
    game.clear();
    game.enableAll();
})