let storedName = localStorage.getItem("name");
if (storedName) {
    // Grab the values stored in web storage and change the name
    document.querySelector("#name-display").innerHTML = storedName;
    document.querySelector("#form").style.display = "none";
}

document.querySelector("#form").onsubmit = function(event) {
    event.preventDefault();
    console.log("submitted");

    let nameInput = document.querySelector("#name-input").value.trim();

    localStorage.setItem("name", nameInput);

    document.querySelector("#name-display").innerHTML = nameInput;

    document.querySelector("#form").style.display = "none";
}

document.querySelector("#downArrow").onclick = function(event) {
    document.getElementById("todo").scrollIntoView(true);
}

let storedTodo = localStorage.getItem("todo");
if (storedTodo) {
    let todos = JSON.parse(storedTodo);
    for (let i=0; i < todos.length; i++) {
        document.querySelector("#list").innerHTML += `<li class="listItem">${todos[i]}</li>`;
    }
}

let todoArray = [];

document.querySelector("#todo-form").onsubmit = function(event) {
    event.preventDefault();

    console.log("submittodo");
    let todoInput = document.querySelector("#todo-input").value.trim();
    todoArray.push(todoInput);

    let todoString = JSON.stringify(todoArray);

    localStorage.setItem("todo", todoString);

    document.querySelector("#list").innerHTML = "";

    for (let i=0; i < todoArray.length; i++) {
        document.querySelector("#list").innerHTML += `<li class="listItem">${todoArray[i]}</li>`;
    }
    
    document.querySelector("#todo-input").value = "";
}


for (let i=0; i < listArray.length; i++) {
    listArray[i].onclick = function () {
        this.style.backgroundColor = "grey";
        this.remove();
    }
}


var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.querySelector('#stop').onclick = function(){
        self.stopTimer.apply(self);
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
    }
};
window.onload = function(){
  pomodoro.init();
};
