const body = document.querySelector("body");
const addItemElms = document.querySelectorAll("button.addItem");

let lists = [];

class List {
    constructor(...initialListItems) {
        this.list = initialListItems;
    }

    append(...items) {
        items.forEach((item) => {
            this.list.push(item);
        });
    }

    index(index) {
        return this.list[index]
    }
}

function appendElm(parent, child) {
    const newElm = document.createElement(child);
    document.querySelector(parent).appendChild(newElm);
}

const buttons = document.querySelectorAll(".addItem");
buttons.forEach((button, i) => {
    console.log("button:", button);
    button.addEventListener("click", () => addListItem(i + 1));
});

function addListItem(listId) {
    const newElm = document.createElement("li");
    newElm.innerHTML = `<input type="text">`;

    document.querySelector(`#list-${listId} ul`).appendChild(newElm);
    // lists[0].index(0);
    document.querySelector(`#list-${listId} ul li:last-child input`).focus();
}