// ============================== main.js stores the bulk of the code for the ToDoApp ============================== //
import { ListOfLists, List, Task } from "./classes.js";

const bodyElm = document.querySelector("body");
const mainElm = document.querySelector("main");

// When the page loads, this retrieves the data from local storage and puts it into listOfLists.
const listOfLists = new ListOfLists(window.localStorage.getItem("listOfLists"));
// This takes the data from listOfLists variable, writes it as HTML, and puts it into the <main> element.
mainElm.innerHTML = listOfLists.toHTML();

// This defines a function to easily create event listeners that get delegated to mainElm.
const addMainEventListener = (eventType, targetSelector, callbackFn) => {
    mainElm.addEventListener(eventType, (event) => {
        const targetElm = event.target;
        if (targetElm.tagName === targetSelector || targetElm.classList.contains(targetSelector) || targetElm.id === targetSelector) { callbackFn(targetElm); }
    });
}

const updateLi = (liElm, content) => {
    liElm.innerHTML = `<i class="material-symbols-outlined">${(liElm.className === "complete")? "check_circle": "radio_button_unchecked"}</i> <span>${content}</span>`;
}

// It will make it so the user can add extra tasks to any to-do list.
addMainEventListener("click", "add-task", (addTaskElm) => {
    // This will create a text box inside of the new li.
    const id = addTaskElm.parentNode.id;
    document.querySelector(`#${id} ul`).innerHTML += `<li class=""><i class="material-symbols-outlined">radio_button_unchecked</i><input id="new-li-input" type="text"></li>`;
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
            // newLi.innerHTML = newTask;
            updateLi(newLi, newTask);
            listOfLists.getListByHTMLId(newLi.parentNode.parentNode.id).push(newTask);

            listOfLists.updateLocalStorage();
        }
        else { newLi.remove(); }
    });
});

// This makes it so the user can mark a task as complete or incomplete.
addMainEventListener("click", "material-symbols-outlined", (iconElm) => {
    const liElm = iconElm.parentNode;

    if (!liElm.classList.contains("complete")) {
        iconElm.innerHTML = "X"; // check_circle
        liElm.classList.add("complete");
    }
    else {
        iconElm.innerHTML = "radio_button_unchecked";
        liElm.classList.remove("complete");
    }
});


//
const hoverEventListener = (targetElm, selectorType, enterFn, leaveFn) => {
    let selectorProp = null;
    switch (selectorType.toLowerCase()) {
        case "id":
            selectorProp = "id";
            break;
        case "class":
            selectorProp = "className";
            break;
        case "tag":
            selectorProp = "tagName";
            targetElm = targetElm.toUpperCase();
            break;
        default:
            console.error("Error: Invalid selectorType");
            break;
    }
    
    bodyElm.addEventListener("mouseenter", (event) => { if (event.target[selectorProp] === targetElm) { enterFn(event.target); } }, true);
    bodyElm.addEventListener("mouseleave", (event) => { if (event.target[selectorProp] === targetElm) { leaveFn(event.target); } }, true);
}
// hoverEventListener("li", "tag", (elm) => {
//     elm.classList.add("complete");
// }, (elm) => {
//     elm.classList.remove("complete");
// });