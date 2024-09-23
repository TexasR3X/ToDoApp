const body = document.querySelector("body");
const addItemElms = document.querySelectorAll("button.addItem");

console.log("document:", document);

function appendElm(parent, child) {document.querySelector(parent).appendChild(child);}

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