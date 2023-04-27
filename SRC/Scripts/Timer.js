var duration = 1800;
var timerDisplay = document.getElementById('timer');
var TimeValue = duration;
var timer = setInterval(function () {
    TimeValue--;
    var minutes = Math.floor(TimeValue/60);
    var seconds = TimeValue % 60;
    timerDisplay.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    if (TimeValue == 0){
        clearInterval(timer);
        alert("El timepo se acabo para la compu");
    }
}, 1000);