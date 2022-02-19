let storedName = localStorage.getItem("name");
let storedBgColor = localStorage.getItem("bgcolor");
if (storedName) {
    // Grab the values stored in web storage and change the name
    document.querySelector("#name-display").innerHTML = storedName;
}

document.querySelector("#form").onsubmit = function(event) {
    event.preventDefault();

    let nameInput = document.querySelector("#name").value;

    // Save this info to the local storage
    // .setItem() saves key/value pairs into the web storage
    // 1st arg: name of the key - you can name this whatever you want
    // 2nd arg: value
    localStorage.setItem("name", nameInput);

    // Change the name using user input
    document.querySelector("#name-display").innerHTML = nameInput;
}