<style>
    .file {
        color: #840;
        font-weight: bold;
    }
    .code {
        color: #009;
        font-weight: bold;
    }
    span:hover { filter: brightness(1.4); }
</style>

# To-Do App
## Overview
This app allows users to use, create, and modify multiple to-do lists.

## Files
- <span class="file">index.html</span>, <span class="file">README.md</span>, and <span class="file">.gitignore</span> are located at the root of the app.
- The styling files are contained in the <span class="file">css</span> folder.
    - This app uses SCSS for styling.
- The scripts are contained in a <span class="file">scripts</span> folder.
    - <span class="file">main.js</span> is where most of the code is run to make the program interactive.
    - <span class="file">classes.js</span> is where the storage classes for the app are stored.
    - <span class="file">html.js</span> stores functions that help build, edit, or find data within HTML.
    - <span class="file">drag.js</span> is used to create drag and drop ability in the to-do lists.

## Storage
- The to-do lists are stored and saved in local storage.
- When the page loads, the data from the local storage gets stored in a variable called <span class="code">listOfLists</span> (which is an object of <span class="code">ListOfLists</span> class).
- The variable <span class="code">listOfLists</span> has a <span class="code">lists</span> property that stores an array of each to-do list.
- Each to-do list is a <span class="code">List</span> class.
- Every <span class="code">List</span> class has the following properties:
    - <span class="code">name</span> &#x2794; name of the to-do list
    - <span class="code">tasks</span> &#x2794; array of the tasks
    - <span class="code">length</span> &#x2794; length of the tasks array
- Each element in <span class="code">List.tasks</span> is of the <span class="code">Task</span> class.
- The <span class="code">Task</span> class has two properties:
    - <span class="code">name</span> &#x2794; name of the task
    - <span class="code">complete</span> &#x2794; boolean value representing whether of not the task is complete
- Storage Overview: <span class="code">ListOfLists</span> &#x2794; <span class="code">List</span> &#x2794; <span class="code">Task</span>