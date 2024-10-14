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

export const completeIcon = `<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>`;
export const incompleteIcon = `<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>`;

export const buildLiElm = (taskContent, isComplete, indexInList) => {
    const insideLiHTML = `
        <svg class="complete-button" role="button" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
            ${(isComplete)? completeIcon: incompleteIcon}
        </svg>
        <span class="task-content">${taskContent}</span>
    `;

    // If the index is unspecified or set to null, then only the content of the li will be returned.
    if (indexInList === null) { return insideLiHTML; }
    else { return `<li class="${(isComplete)? "complete": "incomplete"} index-${indexInList}"> ${insideLiHTML} </li>`; }
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