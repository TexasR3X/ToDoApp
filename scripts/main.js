// ============================== main.js stores the bulk of the code for the ToDoApp ============================== //
import { ListOfLists, List, Task } from "./classes.js";

const mainElm = document.querySelector("main");

// When the page loads, this retrieves the data from local storage and puts it into listOfLists.
const listOfLists = new ListOfLists(window.localStorage.getItem("listOfLists"));
// This takes the data from listOfLists variable, writes it as HTML, and puts it into the <main> element.
mainElm.innerHTML = listOfLists.toHTML();

// This adds an event listener to button.add-task elements.
// It will make it so the user can add extra tasks to any to-do list.
mainElm.addEventListener("click", (event) => {
    if (event.target.className === "add-task") {
        // This will create a text box inside of the new li.
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
            let newTask = newLiInput.value;
            // This ensures that HTML cannot entered into newTask.
            newTask = newTask.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
            
            const newLi = newLiInput.parentNode;

            if (newTask) {
                newLi.innerHTML = newTask;
                listOfLists.getListByHTMLId(newLi.parentNode.parentNode.id).push(newTask);

                listOfLists.updateLocalStorage();
            }
            else { newLi.remove(); }
        });
    }
});

//
// mainElm.addEventListener("mouseenter", (event) => {
//     if (event.target.tagName === "LI") {
//         console.log("Enter2!");
//         event.target.classList.add("completed");
//     }
// }, true);