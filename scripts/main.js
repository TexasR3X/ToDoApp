// ============================== main.js stores the bulk of the code for the ToDoApp ============================== //
import { ListOfLists, List } from "./classes.js";

const mainElm = document.querySelector("main");

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
            
            const newLi = newLiInput.parentNode;

            if (newTask !== "") {
                newLi.innerHTML = `<li>${newTask}</li>`;
                listOfLists.getListByHTMLId(newLi.parentNode.parentNode.id).push(newTask);

                listOfLists.updateLocalStorage();
            }
            else { newLi.remove(); }
        });
    }
});

//
