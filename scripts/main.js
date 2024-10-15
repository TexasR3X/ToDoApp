// ============================== main.js stores the bulk of the code for the ToDoApp ============================== //
import { ListOfLists } from "./classes.js";
import * as HTML from "./html.js";
HTML.updateHTMLElementClass();

const bodyElm = document.querySelector("body");
const mainElm = document.querySelector("main");

// When the page loads, this retrieves the data from local storage and puts it into listOfLists.
const listOfLists = new ListOfLists(window.localStorage.getItem("listOfLists"));
// This takes the data from listOfLists variable, writes it as HTML, and puts it into the <main> element.
mainElm.innerHTML = listOfLists.toHTML();

console.log("listOfLists:", listOfLists);


// This defines a function to easily create event listeners that get delegated to bodyElm.
const addBodyEventListener = (eventType, targetSelector, callbackFn) => {
    bodyElm.addEventListener(eventType, (event) => {
        const targetElm = event.target;
        if (targetElm.tagName === targetSelector || targetElm.classList.contains(targetSelector) || targetElm.id === targetSelector) { callbackFn(targetElm); }
    }, true);
}
// This defines a function to easily create hovering event listeners.
const hoverEventListener = (targetSelector, enterFn, leaveFn) => {
    addBodyEventListener("mouseenter", targetSelector, (targetElm) => enterFn(targetElm));
    addBodyEventListener("mouseleave", targetSelector, (targetElm) => leaveFn(targetElm));
}

// It will make it so the user can add extra tasks to any to-do list.
addBodyEventListener("click", "add-task", (addTaskElm) => {
    const id = addTaskElm.parentNode.id;

    // This will create a text box inside of the new li.
    document.querySelector(`#${id} ul`).innerHTML += HTML.buildLiElm(`<input id="new-li-input" type="text">`, false, false);
    const newLiInputElm = document.querySelector("#new-li-input");
    const newLiElm = newLiInputElm.parentNode.parentNode;

    // // This will remove newLiInputElm's .index-blank class and replace it with the blank with whatever the li's index is amongst its children.
    // newLiElm.classList.remove("index-blank");
    // newLiElm.classList.add(`index-${newLiElm.parentNode.children.length - 1}`);

    // This immediately focuses newLiInputElm, and it makes it so pressing enter blurs it.
    // Note that by default any input element is also blurred when the user clicks anything other than it.
    newLiInputElm.focus();
    newLiInputElm.addEventListener("keydown", (event) => { if (event.key === "Enter") { newLiInputElm.blur(); } });

    // This makes it so once newLiInputElm is blurred, it is replaced with newLiInputElm.value
    newLiInputElm.addEventListener("blur", () => {
        let newTask = newLiInputElm.value;
        // This ensures that HTML cannot entered into newTask.
        newTask = newTask.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

        if (newTask) {
            newLiElm.innerHTML = HTML.buildLiElm(newTask, newLiElm.classList.contains("complete"), true);
            listOfLists.getListByHTMLId(newLiElm.parentNode.parentNode.id).push(newTask);

            listOfLists.updateLocalStorage();
        }
        else { newLiElm.remove(); }
    });
});

// This makes it so the user can mark a task as complete or incomplete.
addBodyEventListener("click", "complete-button", (buttonElm) => {
    const liElm = buttonElm.parentNode;

    console.log()
    if (liElm.classList.contains("incomplete")) {
        buttonElm.innerHTML = HTML.completeIcon;
        liElm.classList.add("complete");
        liElm.classList.remove("incomplete");

        listOfLists.getListByHTMLId(liElm.parentNode.parentNode.id).tasks[liElm.siblingIndex()].setToComplete();
    }
    else {
        buttonElm.innerHTML = HTML.incompleteIcon;
        liElm.classList.add("incomplete");
        liElm.classList.remove("complete");

        listOfLists.getListByHTMLId(liElm.parentNode.parentNode.id).tasks[liElm.siblingIndex()].setToIncomplete();
    }

    listOfLists.updateLocalStorage();
});

// This event listener makes it so the delete-button is shown when the user hovers over its li parent.
hoverEventListener("LI", (targetElm) => { targetElm.children[2].style.opacity = "1"; }, (targetElm) => { targetElm.children[2].style.opacity = "0"; });

addBodyEventListener("click", "delete-button", (deleteButtonElm) => {
    const liElm = deleteButtonElm.parentNode;
    
    listOfLists.getListByHTMLId(liElm.parentNode.parentNode.id).removeAtIndex(liElm.siblingIndex());
    listOfLists.updateLocalStorage();

    liElm.remove();
});