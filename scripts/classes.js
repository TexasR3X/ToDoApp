// ============================== classes.js is stores all of the classes in main.js ============================== //

// Local Storage Structure:
// [
//     {
//         "name": "My_To_Do_List_Name",
//         "order": null,
//         "items": ["task1", "task2", "task3"]
//     },
//     {
//         "name": "Another_List",
//         "order": null,
//         "items": ["a", "b", "c"]
//     },
//     {
//         "name": "Web_Dev",
//         "order": null,
//         "items": ["All of the work!", "More work"]
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
        for (let list of lists) { this.lists[list.name] = new List(list.name, list.items); }

        this.length = lists.length;
    }

    toHTML() {
        let output = "";
        for (let list of Object.values(this.lists)) { output += ` ${list.toHTML()} `; }
        return output += `
            <div class="add-new-list">
                <h2>Create New List</h2>
                +
            </div>
        `;
    }
    getListByName(name) { for (let listName in this.lists) { if (listName === name) { return this.lists[listName]; } } }
    getListByHTMLId(id) { return this.getListByName(id.slice(10)); }
    updateLocalStorage() {
        let jsonString = "[";
        for (let list of Object.values(this.lists)) { jsonString += ` ${list.toString()},`; }
        jsonString = jsonString.slice(0, jsonString.length - 1);
        console.log("jsonString:", jsonString);
        jsonString += " ]";

        window.localStorage.setItem("listOfLists", jsonString);
    }
}

export class List {
    constructor(name, items) {
        this.name = name;
        this.items = items;
    }

    // This method is never used and maybe should be deleted.
    toObjectLiteral() {
        return {
            name: this.name,
            items: this.items
        };
    }
    toHTML() {
        let ulElm = "";
        this.items.forEach((item) => { ulElm += ` <li>${item}</li> `; });

        return `
            <div id="list-name-${this.name}" class="list-container">
                <h2>${this.name.replaceAll("_", " ")}</h2>
                <ul>${ulElm}</ul>
                <button class="add-item">Add Item</button>
            </div>
        `;
    }
    toString() {
        let itemsString = JSON.stringify(this.items);
        console.log("itemsString:", itemsString);
        itemsString = itemsString.replaceAll(`","`, `", "`);
        console.log("itemsString:", itemsString);

        return `{ "name": "${this.name}", "order": null, "items": ${JSON.stringify(this.items).replaceAll(`","`, `", "`)} }`;
    }
    push(item) { this.items.push(item); }
}

// Test code to add data to local storage.
// window.localStorage.clear();
// window.localStorage.setItem("listOfLists",
// `[
//     {
//         "name": "Homework",
//         "order": null,
//         "items": ["a", "b", "c"]
//     },
//     {
//         "name": "Another_List",
//         "order": null,
//         "items": ["1", "2.817", "3.14", "5"]
//     },
//     {
//         "name": "Web_Dev",
//         "order": null,
//         "items": ["All of the work!"]
//     }
// ]`);