// ============================== drag.js stores the code for added drag and drop ability ============================== //
import * as main from "./main.js";
import * as HTML from "./html.js";
HTML.updateHTMLElementClass();

main.addBodyEventListener("dragstart", "LI", (dragLiElm) => {
    main.addBodyEventListener("dragover", "LI", (_dropOnLiElm, event) => event.preventDefault());

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
        main.listOfLists.getListByHTMLElm(dropOnLiElm).getTaskByLiElm(dropOnLiElm).changeTaskByLiElm(dropOnLiElm);

        main.listOfLists.updateLocalStorage();

        main.removeBodyEventListener("drop", "LI", dropFn);
    }
    main.addBodyEventListener("drop", "LI", dropFn);
});