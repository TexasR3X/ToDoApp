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

export const buildLiElm = (taskName, isComplete) => {
    return `
        <li class="${(isComplete)? "complete": "incomplete"}">
            <button>${(isComplete)? "&check;": ""}</button>
            <span>${taskName}</span>
        </li>
    `;
}


// `<li class="${(isComplete)? "complete": "incomplete"}">
//     <i class="material-symbols-outlined">${(task.complete)? "check_circle": "radio_button_unchecked"}</i>
//     <span>${task.name}</span>
// </li>`;