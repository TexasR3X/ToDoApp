// ============================== main.js stores the bulk of the code for the ToDoApp ============================== //
import { ListOfLists, ListContainer } from "./classes.js";

const mainElm = document.querySelector("main");

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








    



const upDateHTML = () => {

};


// .................................... //


// I should put this in buildListContainer();
listOfLists.forEach((val, i) => {
    val.list.forEach((item, j) => {
        mainHTML += `<li>${item}</li>`
    });
});

htmlElms.main.innerHTML = mainHTML;



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

const buttons = document.querySelectorAll(".addItem");
buttons.forEach((button, i) => {
    button.addEventListener("click", () => addListItem(i + 1));
});