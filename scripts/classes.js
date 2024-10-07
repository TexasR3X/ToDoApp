// ============================== classes.js is stores all of the classes in main.js ============================== //

// The ListOfLists class will be used for the listOfLists variable in main.js
// A ListOfLists object will mimic the following format: [{}, {}, {}, ...]
// It will technically be in the following format: ListOfLists {0: ListContainer {}, 1: ListContainer {}, 2: ListContainer {}, ...}
    // On the outside, the ListOfLists class will mimic an array.
    // For the most part, each element of the fake array will be a ListContainer object.
export class ListOfLists {
    constructor(listOfLists) {
        if (typeof listOfLists) { listOfLists = JSON.parse(listOfLists); }

        let count = 0;
        for (let i = 0; i < listOfLists.length; i++) {
            this[i] = new ListContainer(listOfLists[i].name, listOfLists[i].id, listOfLists[i].list);
            count++;
        }
        this.length = count;
    }

    toHTML() {
        let output = "";
        for (let i = 0; i < this.length; i++) { output += ` ${this[i].toHTML()} `; }
        return output += `
            <div class="add-new-list">
                <h2>Create New List</h2>
                +
            </div>
        `;
    }
    getListContainer(id) {
        for (let list in this) {
            if (list.id === id) { return list; }
        }
    }
}

export class ListContainer {
    constructor(name, id, list) {
        this.name = name;
        this.id = id;
        this.list = list;
    }

    toObjectLiteral() {
        return {
            name: this.name,
            id: this.id,
            list: this.list
        };
    }
    toHTML() {
        let ulElm = "";
        this.list.forEach((item) => { ulElm += ` <li>${item}</li> `; });

        return `
            <div id="list-${this.id}" class="list-container">
                <h2>${this.name}</h2>
                <ul>${ulElm}</ul>
                <button class="add-item">Add Item</button>
            </div>
        `;
    }
}

// Test code to add data to local storage.
// window.localStorage.clear();
// window.localStorage.setItem("listOfLists",
//     `[
//         {
//             "name": "Homework",
//             "id": 100,
//             "list": ["a", "b", "c"]
//         },
//         {
//             "name": "Another name that will not be seen",
//             "id": 2,
//             "list": [1, 2.817, 3.14, 5]
//         },
//         {
//             "name": "Web Dev",
//             "id": 21,
//             "list": ["All of the work!"]
//         }
//     ]`);