// ============================== classes.js stores all of the classes for list storage ============================== //
import * as HTML from "./html.js";

// Local Storage Structure:
// [
//     {
//         "name": "My_To_Do_List_Name",
//         "order": null,
//         "tasks": ["task1", "task2", "task3"]
//     },
//     {
//         "name": "Another_List",
//         "order": null,
//         "tasks": ["a", "b", "c"]
//     },
//     {
//         "name": "Web_Dev",
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
        if (typeof lists) { lists = JSON.parse(lists); }

        this.lists = {};
        for (let list of lists) { this.lists[list.name] = new List(list.name, list.tasks); }

        this.length = lists.length;
    }

    toHTML() { return HTML.buildMainElm(this.lists); }
    getListByName(name) { for (let listName in this.lists) { if (listName === name) { return this.lists[listName]; } } }
    getListByHTMLId(id) { return this.getListByName(id.slice(10)); }
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
        this.name = name;
        this.tasks = tasks;
    }

    // This method is never used and maybe should be deleted.
    toObjectLiteral() {
        return {
            name: this.name,
            tasks: this.tasks
        };
    }
    toHTML() {
        let ulElm = "";
        this.tasks.forEach((task, i) => { ulElm += HTML.buildLiElm(task.name, task.complete, i); });

        return HTML.buildListContainer(this.name, ulElm);
    }
    toString() { return `{ "name": "${this.name}", "order": null, "tasks": ${JSON.stringify(this.tasks)} }`; }
    push(taskName) { this.tasks.push(new Task(taskName)); }
}

export class Task {
    constructor(name, complete = false) {
        this.name = name;
        this.complete = complete;
    }

    // I might not need these methods.
    setToComplete() { this.complete = true; }
    setToIncomplete() { this.complete = false; }
}


// Test code to add data to local storage.
const example = `[
    {
        "name": "Homework",
        "order": null,
        "tasks": [{"name": "a", "complete": false}, {"name": "b", "complete": false}, {"name": "c", "complete": false}]
    },
    {
        "name": "Another_List",
        "order": null,
        "tasks": [{"name": "1", "complete": false}, {"name": "2.817", "complete": false}, {"name": "3.14", "complete": false}, {"name": "5", "complete": false}]
    },
    {
        "name": "Web_Dev",
        "order": null,
        "tasks": [{"name": "All of the work!", "complete": false}]
    }
]`;

// window.localStorage.clear();
// window.localStorage.setItem("listOfLists", example);