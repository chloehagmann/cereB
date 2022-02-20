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

let todoArray = [];

let storedTodo = localStorage.getItem("todo");
if (storedTodo) {
    let todos = JSON.parse(storedTodo);
    todoArray = todos;
}

document.querySelector("#todo-form").onsubmit = function(event) {
    event.preventDefault();

    console.log("submittodo");
    
    let todoInput = document.querySelector("#todo-input").value.trim();
    
    todoArray.push(todoInput);

    let todoString = JSON.stringify(todoArray);

    localStorage.setItem("todo", todoString);

    document.querySelector("#list").innerHTML = "";
    for (let i=0; i < todoArray.length; i++) {
        document.querySelector("#list").innerHTML += `<li>${todoArray[i]}</li>`;
    }
}

let listArray = document.querySelectorAll("li");
console.log(listArray);

for (let i=0; i < listArray.length; i++) {
    listArray[i].onclick = function () {
        this.style.backgroundColor = "grey";
        this.remove();
    }
}
