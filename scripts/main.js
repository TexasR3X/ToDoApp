import * as htmlElms from "./htmlElms.js";
import * as classes from "./classes.js";

// window.localStorage.clear();
// window.localStorage.setItem("lists",
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

let lists = JSON.parse(window.localStorage.getItem("lists"));
console.log("lists:", lists);

let mainHTML = "";










// .................................... //
const buildListContainer = () => {

};

// I should put this in buildListContainer();
lists.forEach((val, i) => {
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