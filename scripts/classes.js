// ============================== classes.js stores all of the classes for list storage ============================== //
import * as HTML from "./html.js";

// Local Storage Structure:
// [
//     {
//         "name": "My To Do List Name",
//         "order": null,
//         "tasks": ["task1", "task2", "task3"]
//     },
//     {
//         "name": "Another List",
//         "order": null,
//         "tasks": ["a", "b", "c"]
//     },
//     {
//         "name": "Web Dev",
//         "order": null,
//         "tasks": ["All of the work!", "More work"]
//     }
// ]

// The ListOfLists class will be used for the listOfLists variable in main.js
// ListOfLists Structure:
    // this.lists
        // This stores the do-to lists.
        // Children: List class instances
    // this.length
        // This will equal the number of lists in this.lists
export class ListOfLists {
    constructor(lists) {
        lists = JSON.parse(lists);

        this.lists = {};
        // This turns each list in lists into a List object.
        for (let list of lists) {
            // This turns each task in list.tasks into a Task object.
            for (let i = 0; i < list.tasks.length; i++) {
                list.tasks[i] = new Task(list.tasks[i].name, list.tasks[i].complete)
            }

            this.lists[list.name] = new List(list.name, list.tasks);
        }

        this.length = lists.length;
    }

    toHTML() { return HTML.buildMainElm(this.lists); }
    findDatasetId(elm) { return elm.findListContainerAncestor().dataset.id.slice(10); }
    getListByHTMLElm(elm) { return this.lists[this.findDatasetId(elm)]; }
    contains(listName) { return this.lists[listName] !== undefined; }
    sanitizeName(newName, i = 1) {
        if (this.contains(newName)) {
            if (!/ \([0-9]+\)$/.test(newName)) newName = `${newName} (${i})`;
            i++;
            return this.sanitizeName(newName = newName.replace(/ \([0-9]+\)$/, ` (${i})`), i);
        }
        else { return newName; }
    }
    addNewList(newList) {
        this.lists[newList] = new List(newList, []);
        this.length++;
    }
    renameListByHTMLElm(elm, newName) {
        const list = this.getListByHTMLElm(elm);
        delete this.lists[this.findDatasetId(elm)];

        list.name = newName;
        this.lists[newName] = list;
    }
    removeListByHTMLElm(elm) {
        delete this.lists[this.findDatasetId(elm)];
        this.length--;
    }
    updateLocalStorage() {
        let jsonString = "[";
        for (let list of Object.values(this.lists)) { jsonString += ` ${list.toString()},`; }
        jsonString = jsonString.slice(0, jsonString.length - 1);
        
        jsonString += " ]";

        window.localStorage.setItem("listOfLists", jsonString);
    }
}

export class List {
    constructor(name, tasks) {
        this.name = name; // String
        this.tasks = tasks; // Array (with Task elements)
        this.length = this.tasks.length; // Number
    }

    toHTML() { return HTML.buildListContainer(this.name, HTML.buildUlElm(this.tasks)); }
    toString() { return `{ "name": "${this.name}", "order": null, "tasks": ${JSON.stringify(this.tasks)} }`; }
    push(taskName) { this.tasks.push(new Task(taskName)); }
    getTaskByLiElm(liElm) { return this.tasks[liElm.siblingIndex()]; }
    removeTaskByLiElm(liElm) { this.tasks.splice(liElm.siblingIndex(), 1); }
    removeCompletedTasks() {
        for (let i = 0; i < this.tasks.length; null) {
            if (this.tasks[i].complete) this.tasks.splice(i, 1);
            else i++;
        }
    }
}

export class Task {
    constructor(name, complete = false) {
        this.name = name;
        this.complete = complete;
    }

    changeTaskByLiElm(liElm) {
        this.name = liElm.liGetContent();
        this.complete = liElm.liGetComplete();
    }
}


// Test code to add data to local storage.
const example = `[
    {
        "name": "Homework",
        "order": null,
        "tasks": [{"name": "a", "complete": false}, {"name": "b", "complete": true}, {"name": "c", "complete": true}]
    },
    {
        "name": "Another List",
        "order": null,
        "tasks": [{"name": "1", "complete": true}, {"name": "2.817", "complete": false}, {"name": "3.14", "complete": false}, {"name": "5", "complete": false}]
    },
    {
        "name": "Web_Dev",
        "order": null,
        "tasks": [{"name": "All of the work!", "complete": false}]
    }
]`;

// window.localStorage.clear();
// window.localStorage.setItem("listOfLists", example);