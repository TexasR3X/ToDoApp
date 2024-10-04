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
            this[i] = new ListContainer(listOfLists[i].name, listOfLists[i].index, listOfLists[i].list);
            count++;
        }
        this.length = count;
    }

    // getLength() {
    //     let length = 0;
    //     for (let i in this) { length++; }
    //     return length - 1;
    // }
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
}

export class ListContainer {
    constructor(name, index, list) {
        this.name = name;
        this.index = index;
        this.list = list;
    }

    toObjectLiteral() {
        return {
            name: this.name,
            index: this.index,
            list: this.list
        };
    }
    toHTML() {
        let ulElm = "";
        this.list.forEach((item) => { ulElm += ` <li>${item}</li> `; });

        return `
            <div id="list-${this.index}" class="list-container">
                <h2>${this.name}</h2>
                <ul>${ulElm}</ul>
                <button class="add-item">Add Item</button>
            </div>
        `;
    }
}

