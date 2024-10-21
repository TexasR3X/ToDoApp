// ============================== drag.js stores the code for added drag and drop ability ============================== //
import * as HTML from "./html.js";
HTML.updateHTMLElementClass();
import * as main from "./main.js";

main.addBodyEventListener("dragstart", "LI", (dragLiElm) => {
    console.log("dragLiElm:", dragLiElm);

    // If I have time I should come back to this and fix it.
    // const dragOverFn = async (dropOnLiElm, event) => {
    //     event.preventDefault();

    //     console.log("dragLiElm.getBoundingClientRect():", dragLiElm.getBoundingClientRect());
    //     const dragLiRect = dragLiElm.getBoundingClientRect();
    //     const dropOnLiRect = dropOnLiElm.getBoundingClientRect();
    //     const elmsTouching = (rect1, rect2) => !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);        

    //     const waitForTouching = setInterval(() => {
    //         if (elmsTouching(dragLiRect, dropOnLiRect)) { clearInterval(waitForTouching); }
    //     }, 250);

    //     dropOnLiElm.style.backgroundColor = "green";

    //     const waitForNotTouching = setInterval(() => {
    //         if (!elmsTouching(dragLiRect, dropOnLiRect)) { clearInterval(waitForNotTouching); }
    //     }, 250);

    //     dropOnLiElm.style.backgroundColor = "purple";
    // }
    // const dragOverFn = async (dropOnLiElm, event) => {
    //     event.preventDefault();

    //     dropOnLiElm.style.backgroundColor = "purple";
    //     dropOnLiElm.style.transition = "background-color 2s";
    //     const _timeoutId = setTimeout(() => {
    //         dropOnLiElm.style.backgroundColor = "green";
    //     }, 5000);
    // }
    main.addBodyEventListener("dragover", "LI", (dropOnLiElm, event) => event.preventDefault());

    const dropFn = (dropOnLiElm, event) => {
        event.preventDefault();

        // This will swap the HTML for each li element.
        [dragLiElm.innerHTML, dropOnLiElm.innerHTML] = [dropOnLiElm.innerHTML , dragLiElm.innerHTML];
        if (dragLiElm.liGetComplete() !== dropOnLiElm.liGetComplete()) {
            dragLiElm.liToggleComplete();
            dropOnLiElm.liToggleComplete();
        }

        //
        main.listOfLists.getListByHTMLElm(dragLiElm).getTaskByLiElm(dragLiElm).changeTaskByLiElm(dragLiElm);
        console.log("=".repeat(25));
        main.listOfLists.getListByHTMLElm(dropOnLiElm).getTaskByLiElm(dropOnLiElm).changeTaskByLiElm(dropOnLiElm);

        main.listOfLists.updateLocalStorage();

        main.removeBodyEventListener("drop", "LI", dropFn);
    }
    main.addBodyEventListener("drop", "LI", dropFn);
});