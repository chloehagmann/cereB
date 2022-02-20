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
    document.getElementById("todo").scrollIntoView();
}