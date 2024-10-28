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

// This defines a function to easily create event listeners that get delegated to bodyElm.
export const addBodyEventListener = (eventType, targetSelector, callbackFn) => {
    bodyElm.addEventListener(eventType, (event) => {
        let targetElm = event.target;
        for (let _i in [0, 1]) {
            if (targetElm.tagName === targetSelector || targetElm.classList.contains(targetSelector) || targetElm.id === targetSelector) {
                callbackFn(targetElm, event);
                break;
            };
            targetElm = targetElm.parentNode;
        }
    }, true);
}
export const removeBodyEventListener = (eventType, targetSelector, callbackFn) => {
    bodyElm.removeEventListener(eventType, (event) => {
        let targetElm = event.target;
        for (let _i in [0, 1]) {
            if (targetElm.tagName === targetSelector || targetElm.classList.contains(targetSelector) || targetElm.id === targetSelector) {
                callbackFn(targetElm, event);
                break;
            };
            targetElm = targetElm.parentNode;
        }
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
        updatedContent = updatedContent.replaceAll("<", "").replaceAll(">", "").replaceAll(`"`, "&quot;");

        if (reassignmentType === "list") updatedContent = listOfLists.sanitizeName(updatedContent);

        // This upodates the content in changingElm.
        changingElm.innerHTML = updatedContent;

        // If the updatedContent quals the originalContent, the code can stop right here.
        if (updatedContent === originalContent && !!updatedContent) { return; }

        // The following if-else chain updates the data in local storage.
        // Depending on what is being changed (tasks or lists) it needs to be changed differently.
        if (reassignmentType === "task") {
            const liElm = changingElm.parentNode;

            if (/^[ ]*$/.test(updatedContent)) {
                listOfLists.getListByHTMLElm(liElm).removeTaskByLiElm(liElm);
                liElm.remove();
            }
            else {
                if (listOfLists.getListByHTMLElm(liElm).getTaskByLiElm(liElm) !== undefined) listOfLists.getListByHTMLElm(liElm).getTaskByLiElm(liElm).name = updatedContent;
                else listOfLists.getListByHTMLElm(liElm).push(updatedContent);
            }
        }
        else if (reassignmentType === "list") {
            if (!!updatedContent) {
                listOfLists.renameListByHTMLElm(changingElm, updatedContent);
                changingElm.findListContainerAncestor().dataset.id = `list-name-${updatedContent}`;
            }
            else changingElm.innerHTML = originalContent;
        }
        
        listOfLists.updateLocalStorage();
    });
}

// It will make it so the user can add extra tasks to any to-do list.
addBodyEventListener("click", "add-task", (addTaskElm) => {
    // This finds the ul element in the .list-container that .add-task is located in.
    const ulElm = addTaskElm.findListContainerAncestor().children[1];

    // This will create a new li element for the new task.
    ulElm.innerHTML += HTML.buildLiElm("", false, false);

    // This will create a temporary input element inside of the newe li.
    useTempInput(ulElm.lastElementChild.children[1], "task");
});

// This makes it so the user can mark a task as complete or incomplete.
addBodyEventListener("click", "complete-bnt", (buttonElm) => {
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

// This event listener makes it so the delete-bnt is shown when the user hovers over its li parent.
hoverEventListener("LI", (targetElm) => { targetElm.children[2].style.opacity = "1"; }, (targetElm) => { targetElm.children[2].style.opacity = "0"; });

// This makes it so the user can delete tasks.
addBodyEventListener("click", "delete-bnt", (buttonElm) => {
    let removeElm;

    if (buttonElm.parentNode.tagName === "LI") {
        removeElm = buttonElm.parentNode;
        listOfLists.getListByHTMLElm(removeElm).removeTaskByLiElm(removeElm);
    }
    else if (buttonElm.parentNode.parentNode.classList.contains("list-container")) {
        removeElm = buttonElm.parentNode.parentNode;
        listOfLists.removeListByHTMLElm(removeElm);
    }

    removeElm.remove();
    listOfLists.updateLocalStorage();
});

// This makes it so the user can edit tasks (task names).
addBodyEventListener("dblclick", "task-content", (taskContentElm) => useTempInput(taskContentElm, "task"));
// This makes it so the user can edit list names.
addBodyEventListener("dblclick", "list-heading", (listElm) => useTempInput(listElm, "list"));

//
addBodyEventListener("click", "add-list", (addListElm) => {
    console.log("addListElm:", addListElm);
    console.log("listOfLists:", listOfLists);
    
    const newListName = listOfLists.sanitizeName("New List");

    listOfLists.addNewList(newListName);
    listOfLists.updateLocalStorage();

    addListElm.parentNode.remove();
    mainElm.innerHTML += HTML.buildListContainer(newListName, "") + HTML.buildAddList();
});

//
addBodyEventListener("click", "clear-bnt", (clearBntElm) => {
    listOfLists.getListByHTMLElm(clearBntElm).removeCompletedTasks();
    listOfLists.updateLocalStorage();

    clearBntElm.clearCompleteLiElms();
});