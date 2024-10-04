// ============================== main.js stores the bulk of the code for the ToDoApp ============================== //
import { ListOfLists, ListContainer } from "./classes.js";

const mainElm = document.querySelector("main");
const addItemElms = document.querySelectorAll("button.add-item");

// Test code to add data to local storage.
// window.localStorage.clear();
// window.localStorage.setItem("listOfLists",
//     `[
//         {
//             "name": "Homework",
//             "index": 100,
//             "list": ["a", "b", "c"]
//         },
//         {
//             "name": "Another name that will not be seen",
//             "index": 2,
//             "list": [1, 2.817, 3.14, 5]
//         },
//         {
//             "name": "Web Dev",
//             "index": 21,
//             "list": ["All of the work!"]
//         }
//     ]`);

// When the page loads, this retrieves the data from local storage and puts it into listOfLists.
const listOfLists = new ListOfLists(window.localStorage.getItem("listOfLists"));
// This takes the data from listOfLists variable, writes it as HTML, and puts it into the <main> element.
mainElm.innerHTML = listOfLists.toHTML();


// mainElm.addEventListener("change", function (event) {
//     // "new-li-input"
//     if (event.target.id === "new-li-input") {

//     }
// });

const addListItem = (event) => {
    if (event.target.className === "add-item") {
        // This will get the id of the div.list-container that the button.add-item is in.
        const id = event.target.parentNode.id;

        
        // This will add a new li to the ul child of div.list-container.
        document.querySelector(`#${id} ul`).innerHTML += `<li><input id="new-li-input" type="text"></li>`;

        const newLiInput = document.querySelector("#new-li-input");

        newLiInput.focus();
        newLiInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                newLiInput.blur()
            }
        });
        newLiInput.addEventListener("blur", () => {
            const newTask = newLiInput.value;
            console.log("newTask:", newTask);
            if (newTask !== "") { newLiInput.parentNode.innerHTML = `<li>${newTask}</li>`; }
            else { newLiInput.parentNode.remove(); }
        });
    }
}
mainElm.addEventListener("click", (event) => addListItem(event));





/*
const addListItem = (id) => {
    // Change to maybe this later `<li><input id="new-li-input" type="text"></li>`
    document.querySelector(`#list-${id} ul`).innerHTML += `<li>My new item to do!</li>`;
    // document.querySelector(`#list-${id} ul input`).focus();
}
*/



    



const upDateHTML = () => {

};


// .................................... //



function appendElm(parent, child) {
    const newElm = document.createElement(child);
    document.querySelector(parent).appendChild(newElm);
}
/*
const buttons = document.querySelectorAll(".addItem");
buttons.forEach((button, i) => {
    console.log("button:", button);
    button.addEventListener("click", () => addListItem(i + 1));
});

function addListItem(listId) {
    const newElm = document.createElement("li");
    newElm.innerHTML = `<input type="text">`;

    document.querySelector(`#list-${listId} ul`).appendChild(newElm);
    document.querySelector(`#list-${listId} ul li:last-child input`).focus();
}
*/

