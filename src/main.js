let storedName = localStorage.getItem("name");
if (storedName) {
    // Grab the values stored in web storage and change the name
    document.querySelector("#name-display").innerHTML = storedName;
    document.querySelector(".form-inline").style.display = "none";
}

document.querySelector(".form-inline").onsubmit = function(event) {
    event.preventDefault();
    console.log("submitted");

    let nameInput = document.querySelector("#name-input").value.trim();

    localStorage.setItem("name", nameInput);

    document.querySelector("#name-display").innerHTML = nameInput;

    document.querySelector(".form-inline").style.display = "none";
}

document.querySelector("#downArrow1").onclick = function(event) {
    document.getElementById("todo-container").scrollIntoView(true);
}
document.querySelector("#downArrow2").onclick = function(event) {
    document.getElementById("arrowTo").scrollIntoView(true);
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

// ONCLICK
document.querySelector("#imageRB").onclick = function() {
    document.querySelector(".circle").style.background = "rgb(238,174,202)";
    document.querySelector(".circle").style.background = "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)";
    document.querySelector(".links").style.visibility = "visible";
}

document.querySelector("#imageLB").onclick = function() {
    document.querySelector(".circle").style.background = "rgb(219,238,174)";
    document.querySelector(".circle").style.background = "radial-gradient(circle, rgba(219,238,174,1) 18%, rgba(238,96,96,1) 100%)";
    document.querySelector(".links").style.visibility = "hidden";

}