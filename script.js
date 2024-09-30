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
}

function appendElm(parent, child) {
    const newElm = document.createElement(child);
    document.querySelector(parent).appendChild(newElm);
}

// function addListItem() {
//     const newElm = document.createElement("li");
//     body.appendChild(newElm);
// }

function addListItemTo(listSelector) {
    const newElm = document.createElement("li");
    document.querySelector(listSelector).appendChild(newElm);
}


// document.appendElm = function () {
//     console.log("2 document:", document);

// }


addItemElms[0].addEventListener("click", function () {
    
});