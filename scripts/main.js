// ============================== main.js stores the bulk of the code for the ToDoApp ============================== //
import { ListOfLists } from "./classes.js";
import * as HTML from "./html.js";
HTML.updateHTMLElementClass();

const bodyElm = document.querySelector("body");
const mainElm = document.querySelector("main");

// When the page loads, this retrieves the data from local storage and puts it into listOfLists.
export const listOfLists = new ListOfLists(window.localStorage.getItem("listOfLists"));
// This takes the data from listOfLists variable, writes it as HTML, and puts it into the <main> element.
mainElm.innerHTML = listOfLists.toHTML();

console.log("listOfLists:", listOfLists);


// This defines a function to easily create event listeners that get delegated to bodyElm.
export const addBodyEventListener = (eventType, targetSelector, callbackFn) => {
    bodyElm.addEventListener(eventType, (event) => {
        const targetElm = event.target;
        if (targetElm.tagName === targetSelector || targetElm.classList.contains(targetSelector) || targetElm.id === targetSelector) { callbackFn(targetElm, event); }
    }, true);
}
export const removeBodyEventListener = (eventType, targetSelector, callbackFn) => {
    bodyElm.removeEventListener(eventType, (event) => {
        const targetElm = event.target;
        if (targetElm.tagName === targetSelector || targetElm.classList.contains(targetSelector) || targetElm.id === targetSelector) { callbackFn(targetElm, event); }
    }, true);
}
// This defines a function to easily create hovering event listeners.
export const hoverEventListener = (targetSelector, enterFn, leaveFn) => {
    addBodyEventListener("mouseenter", targetSelector, (targetElm) => enterFn(targetElm));
    addBodyEventListener("mouseleave", targetSelector, (targetElm) => leaveFn(targetElm));
}

// This will create a temporary input element that allows you to edite new or existing task or list names.
const useTempInput = (changingElm, reassignmentType) => {
    const originalContent = changingElm.innerHTML;
    changingElm.innerHTML = `<input id="temp-input" type="text" value="${changingElm.innerHTML}">`;
    const inputElm = changingElm.children[0];
    
    inputElm.focus();
    inputElm.addEventListener("keydown", (event) => { if (event.key === "Enter") { inputElm.blur(); } });

    inputElm.addEventListener("blur", () => {
        let updatedContent = inputElm.value;

        // This ensures that HTML cannot be entered into updatedContent.
        updatedContent = updatedContent.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        // This upodates the content in changingElm.
        changingElm.innerHTML = updatedContent;

        // If the updatedContent quals the originalContent, the code can stop right here.
        if (updatedContent === originalContent && !!updatedContent) { return; }

        // The following if-else chain updates the data in local storage.
        // Depending on what is being changed (tasks or lists) it needs to be changed differently.
        if (reassignmentType === "task") {
            const liElm = changingElm.parentNode;

            if (!!updatedContent) {
                if (listOfLists.getListByHTMLElm(liElm).getTaskByLiElm(liElm) !== undefined) { listOfLists.getListByHTMLElm(liElm).getTaskByLiElm(liElm).name = updatedContent; }
                else { listOfLists.getListByHTMLElm(liElm).push(updatedContent); }
            }
            else {
                listOfLists.getListByHTMLElm(liElm).removeTaskByLiElm(liElm);
                liElm.remove();
            }
        }
        
        listOfLists.updateLocalStorage();
    });
}

// It will make it so the user can add extra tasks to any to-do list.
addBodyEventListener("click", "add-task", (addTaskElm) => {
    const id = addTaskElm.parentNode.id;
    const ulElm = document.querySelector(`#${id} ul`)

    // This will create a new li element for the new task.
    ulElm.innerHTML += HTML.buildLiElm("", false, false);

    // This will create a temporary input element inside of the newe li.
    useTempInput(ulElm.children[ulElm.children.length - 1].children[1], "task");
});

// This makes it so the user can mark a task as complete or incomplete.
addBodyEventListener("click", "complete-button", (buttonElm) => {
    const liElm = buttonElm.parentNode;

    liElm.liToggleComplete();

    if (liElm.classList.contains("incomplete")) {
        buttonElm.innerHTML = HTML.completeIcon;
        listOfLists.getListByHTMLElm(liElm).getTaskByLiElm(liElm).complete = true;
    }
    else {
        buttonElm.innerHTML = HTML.incompleteIcon;
        listOfLists.getListByHTMLElm(liElm).getTaskByLiElm(liElm).complete = false;
    }

    listOfLists.updateLocalStorage();
});

// This event listener makes it so the delete-button is shown when the user hovers over its li parent.
hoverEventListener("LI", (targetElm) => { targetElm.children[2].style.opacity = "1"; }, (targetElm) => { targetElm.children[2].style.opacity = "0"; });

// This makes it so the user can delete tasks.
addBodyEventListener("click", "delete-button", (deleteButtonElm) => {
    const liElm = deleteButtonElm.parentNode;
    
    listOfLists.getListByHTMLElm(liElm).removeTaskByLiElm(liElm);
    listOfLists.updateLocalStorage();

    liElm.remove();
});

// This makes it so the user can edit tasks (task names).
addBodyEventListener("dblclick", "task-content", (taskContentElm) => useTempInput(taskContentElm, "task"));

//
document.querySelector("#add-list").addEventListener("click", (addListElm) => {
    console.log("addListElm:", addListElm);
    console.log("listOfLists:", listOfLists);
    listOfLists.addNewList();
    listOfLists.updateLocalStorage();

    addListElm.target.parentNode.remove();
    mainElm.innerHTML += HTML.buildListContainer() + HTML.buildAddListContainer();
});