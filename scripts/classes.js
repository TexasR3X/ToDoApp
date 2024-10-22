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
    getListByHTMLElm(elm) { return this.lists[elm.findListContainerAncestor().id.slice(10)]; }
    updateLocalStorage() {
        let jsonString = "[";
        for (let list of Object.values(this.lists)) { jsonString += ` ${list.toString()},`; }
        jsonString = jsonString.slice(0, jsonString.length - 1);
        
        jsonString += " ]";

        window.localStorage.setItem("listOfLists", jsonString);
    }
    addNewList() { this.lists["New_List"] = new List("New_List", []); }
}

export class List {
    constructor(name, tasks) {
        this.name = name; // String
        this.tasks = tasks; // Array (with Task elements)
        this.length = this.tasks.length; // Number
    }

    toHTML() {
        let ulElm = "";
        this.tasks.forEach((task) => { ulElm += HTML.buildLiElm(task.name, task.complete, false); });

        return HTML.buildListContainer(this.name, ulElm);
    }
    toString() { return `{ "name": "${this.name}", "order": null, "tasks": ${JSON.stringify(this.tasks)} }`; }
    push(taskName) { this.tasks.push(new Task(taskName)); }
    getTaskByLiElm(liElm) { return this.tasks[liElm.siblingIndex()]; }
    removeTaskByLiElm(liElm) { this.tasks.splice(liElm.siblingIndex(), 1); }
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