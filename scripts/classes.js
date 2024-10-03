export class ListContainer {
    constructor(name, listIndex, list) {
        this.name = name;
        this.listIndex = listIndex;
        this.list = list;
    }

    printHTML() {
        return `<div id="list-${this.listIndex}" class="listContainer">
                    <h2>List ${this.name}</h2>
                    <ul></ul>
                    <button class="addItem">Add Item</button>
                </div>`;
    } 
}


/*
const listContainerTemplate = (listIndex) =>
    `<div id="list-${listIndex + 1}" class="listContainer">
        <h2>List ${listIndex + 1}</h2>
        <ul></ul>
        <button class="addItem">Add Item</button>
    </div>`
*/