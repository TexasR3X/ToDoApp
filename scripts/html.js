// ============================== html.js stores functions for building or changing HTML ============================== //

export const buildMainElm = (lists) => {
    let output = "";
    for (let list of Object.values(lists)) { output += ` ${list.toHTML()} `; }
    return output += `
        <div class="add-new-list">
            <h2>Create New List</h2>
            +
        </div>
    `;
}

export const buildListContainer = (listName, ulContent) => {
    return `
        <div id="list-name-${listName}" class="list-container">
            <h2>${listName.replaceAll("_", " ")}</h2>
            <ul>${ulContent}</ul>
            <button class="add-task">Add Task</button>
        </div>
    `;
}

export const buildLiElm = (taskContent, isComplete, indexInList) => {
    const insideLiHTML = ` <button class="complete-button">${(isComplete)? "&check;": ""}</button> <span class="task-content">${taskContent}</span> `;

    // If the index is unspecified or set to null, then only the content of the li will be returned.
    if (indexInList === null) { return insideLiHTML; }
    else {
        return `<li class="${(isComplete)? "complete": "incomplete"} index-${indexInList}"> ${insideLiHTML} </li>`;
    }
}

export const getLiIndex = (liElm) => {
    liElm.classList;
    for (let liClass of liElm.classList) {
        console.log("liClass:", liClass);
        if (liClass.includes("index")) { return liClass.slice(6); }
    }
    console.error("Li index not found.");
    return null;
}


// `<li class="${(isComplete)? "complete": "incomplete"}">
//     <i class="material-symbols-outlined">${(task.complete)? "check_circle": "radio_button_unchecked"}</i>
//     <span>${task.name}</span>
// </li>`;