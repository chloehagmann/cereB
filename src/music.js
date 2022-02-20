document.querySelector("#search-form").onsubmit = function(event) {
    event.preventDefault();

    //Get the user's input 
    let searchInput = document.querySelector("#search-id").value.trim();
    let limitInput = document.querySelector("#limit-id").value;

    //convert spaces and special characters 
    let convertedSearchInput = encodeURIComponent(searchInput);


    //prepare the endpoint
    let endpoint = "https://itunes.apple.com/search?term=" + convertedSearchInput + "&limit=" + limitInput;  

    console.log(endpoint); 

    //Make HTTP request via AJAX
   let httpRequest = new XMLHttpRequest();
   //Create a request (initialize) .open()
   //first arg: the method  (GET OR POST)
   // 2nd arg: the endpoint
   httpRequest.open("GET", endpoint);
   httpRequest.send();
   //don't wait around for response, set up an event handler
   //below function will run when iTunes sends back a response
   httpRequest.onreadystatechange = function() {
       console.log(httpRequest.readyState);
       console.log("we got a response!");
       //check that we got response
       if(httpRequest.readyState == 4){
           //check if response was successful
           if(httpRequest.status == 200){
               //log out response from iTunes
               console.log(httpRequest.responseText);
               // console.log(JSON.parse(httpRequest.responseText));
               displayResults(httpRequest.responseText);
           }
           else{ 
               alert("AJAX error!!");
               console.log(httpRequest.status);
           }
       }
   }
   console.log("moving on ....");

   // three different things happen when we send a request
   // makes sure its requested, read, and actually responce total 4 when loading is done

   //display the information

}

function displayResults(resultsString){ 
   //convert the JSON string to JS object
   let resultsJS = JSON.parse(resultsString);
   console.log(resultsJS);
   //clear the previous search results
   document.querySelector("tbody").replaceChildren();

   document.querySelector("#num-results").innerHTML = resultsJS.resultCount;
   for(let i = 0; i < resultsJS.results.length; i++){
       //creating the TR tag from html for each result
       let htmlString =`
       <tr>
           <td>
           <img src="${resultsJS.results[i].artworkUrl100}">
           </td>
           <td>${resultsJS.results[i].artistName}</td>
           <td>${resultsJS.results[i].trackName}</td>
           <td>${resultsJS.results[i].collectionName}</td>
           <td><audio src="${resultsJS.results[i].previewUrl}" controls></audio></td>
       </tr>
       `;
       document.querySelector("tbody").innerHTML += htmlString;
   }
}