// ============================== html.js stores functions for building or changing HTML ============================== //

export const buildMainElm = (lists) => {
    let mainElm = "";
    for (let list of Object.values(lists)) { mainElm += ` ${list.toHTML()} `; }
    return mainElm += buildAddListContainer();
}

export const buildAddListContainer = () => {
    return `
        <div id="add-list-container">
            <h2 id="add-list" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                <span>Create New List</span>
            </h2>
        </div>
    `;
}

export const buildListContainer = (listName, ulContent) => {
    return `
        <div id="list-name-${listName}" class="list-container">
            <h2 class="list-heading">${listName.replaceAll("_", " ")}</h2>
            <ul>${ulContent}</ul>
            <button class="add-task">Add Task</button>
        </div>
    `;
}

export const completeIcon = `<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>`;
export const incompleteIcon = `<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>`;

export const buildLiElm = (taskContent, isComplete, insideOnly) => {
    const insideLiHTML = `
        <svg role="button" class="complete-button" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
            ${(isComplete)? completeIcon: incompleteIcon}
        </svg>
        <span class="task-content">${taskContent}</span>
        <svg role="button" class="delete-button   icon icon-tabler icons-tabler-outline icon-tabler-trash" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
    `;

    // If the index is unspecified or set to null, then only the content of the li will be returned.
    if (insideOnly) { return insideLiHTML; }
    else { return `<li class="${(isComplete)? "complete": "incomplete"}" draggable="true"> ${insideLiHTML} </li>`; }
}

// This will return an element's index amongst its siblings.
export const prototypeAdditions = {
    siblingIndex: function () {
        const parentChildren = this.parentNode.children;
        
        for (let i = 0; i < parentChildren.length; i++) { if (parentChildren[i] === this) { return i; } }
        
        console.error("Sibling index not found.");
        return null;
    },
    findListContainerAncestor: function () {
        if (this.classList.contains("list-container")) { return this; }
        else { return this.parentNode.findListContainerAncestor(); }
    },
    liGetContent: function () { return this.children[1].innerHTML; },
    liGetComplete: function () { return this.classList.contains("complete"); },
    liToggleComplete: function () {
        if (this.liGetComplete()) {
            this.classList.add("incomplete");
            this.classList.remove("complete");
        }
        else {
            this.classList.add("complete");
            this.classList.remove("incomplete");
        }
    },
}

export const updateHTMLElementClass = () => { for (let proto in prototypeAdditions) { HTMLElement.prototype[proto] = prototypeAdditions[proto]; } }