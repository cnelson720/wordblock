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