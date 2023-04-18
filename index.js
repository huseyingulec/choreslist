const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn")
const choresAdded = document.getElementById("chores-added")
const deleteBtn = document.getElementById("delete-btn")
const choresFromLocalStorage = JSON.parse(localStorage.getItem("myChores"))
const completedChores = document.querySelector(".completed-chores")

let myChores = []
let totalCompletedChores = 0

if (choresFromLocalStorage) { //checks localstorage if there is a data or not.
    myChores = choresFromLocalStorage
    render(myChores)
}


addBtn.addEventListener("click", function(){
    const inputVal = inputEl.value.trim() // removes whitespace from at the end of input
    if (inputVal !== "" && !myChores.includes(inputVal)) { //checks if there are input value and includes the same chore
        myChores.push(inputVal)  // pushes the input to array
        inputEl.value = ""      // clears the input box
        localStorage.setItem("myChores", JSON.stringify(myChores)) // sets inputs to the localstorage
        render(myChores) //renders input array 
    } else if (inputVal === "") { // checks if input field is empty or not
        window.alert("Please enter a chore.")
    } else {
        window.alert("you have already added this chore to the list!.") // gives an alert if there are same chores
    }
})

deleteBtn.addEventListener("click", function(){ // listens for delete button
    if (totalCompletedChores >= 1 || myChores.length >= 1) {         // checks if there are any inputs or completed chores
        const confirmed = window.confirm("do you want to delete reset everything?")       // asks confirmation
        if (confirmed) {
           clearAll() // if confirmed clears all inputs
        }
    }
})

function clearAll() {
    myChores = []   // clears array
    choresAdded.innerHTML = "<ul>You can add your chores here by pressing arrow after writing your chore in the input field. If you completed a chore, you can click the chore to remove. Cross button clears all chores. </ul>"   // clears html
    totalCompletedChores = 0
    completedChores.textContent = "Completed chotes"
    localStorage.clear()    // clears local storage
}


function render(chores) {   // renders chores to the html
    if (chores.length) {    // checks if there are any input
        let listItems = ""  // set a string to be efficient 
        for (let i= 0; i < chores.length; i++) {
            listItems += ` 
            <ul data-btn="${chores[i]}">${chores[i]}</ul> 
            `  // adds items to the string
        }
        choresAdded.innerHTML = listItems   // adds string to the html
}}

choresAdded.addEventListener("click", function(event){      // listens for all Chores added section
    if(event.target.dataset.btn) {      // if there are any elements in the section
        totalCompletedChores++
        let index = myChores.indexOf(event.target.dataset.btn)      // gets index of clicked element
        myChores.splice(index, 1)   // removes clicked element from the array
        render(myChores)    // renders array after removing
        localStorage.setItem("myChores", JSON.stringify(myChores)) // updates localStorage after removal
        if (!myChores.length) {     // when array is empty, clears all elements from the html
            choresAdded.innerHTML = "<ul>You can add your chores here by pressing arrow after writing your chore in the input field. If you completed a chore, you can click the chore to remove. Cross button resets everything. </ul>"   // clears html
            localStorage.clear()    // clears local storage
        }
    }
    completedChores.textContent = "Completed chotes - " + totalCompletedChores
})

