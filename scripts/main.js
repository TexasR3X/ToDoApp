// ============================== main.js stores the bulk of the code for the ToDoApp ============================== //
import { ListOfLists, ListContainer } from "./classes.js";

const mainElm = document.querySelector("main");
const addItemElms = document.querySelectorAll("button.add-item");

// When the page loads, this retrieves the data from local storage and puts it into listOfLists.
const listOfLists = new ListOfLists(window.localStorage.getItem("listOfLists"));
// This takes the data from listOfLists variable, writes it as HTML, and puts it into the <main> element.
mainElm.innerHTML = listOfLists.toHTML();

// This adds an event listener to button.add-item elements.
// It will make it so the user can add extra items to any to-do list.
mainElm.addEventListener("click", (event) => {
    if (event.target.className === "add-item") {
        // This will create a text box inside of the new list item.
        const id = event.target.parentNode.id;
        document.querySelector(`#${id} ul`).innerHTML += `<li><input id="new-li-input" type="text"></li>`;
        const newLiInput = document.querySelector("#new-li-input");

        // This immediately focuses newLiInput, and it makes it so pressing enter blurs it.
        // Note that by default any input element is also blurred when the user clicks anything other than it.
        newLiInput.focus();
        newLiInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") { newLiInput.blur(); }
        });

        // This makes it so once newLiInput is blurred, it is replaced with newLiInput.value
        newLiInput.addEventListener("blur", () => {
            const newTask = newLiInput.value;
            if (newTask !== "") { newLiInput.parentNode.innerHTML = `<li>${newTask}</li>`; }
            else { newLiInput.parentNode.remove(); }
        });

        // // This updates listOfLists.
        // console.log("listOfLists:", listOfLists);
        // let W = listOfLists
        // console.log("W:", W);
    }
});

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

