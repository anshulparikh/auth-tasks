// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", renderItems);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
    event.preventDefault();

    // todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // li
    const li = document.createElement("li");
    li.innerText = todoInput.value;
    li.classList.add("todo-item");
    todoDiv.appendChild(li);
    // saving li items to local storage
    saveLocalItems(todoInput.value);
    // completed button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);
    // trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // append to ul
    todoList.appendChild(todoDiv);
    // clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // delete item
    if (item.classList[0] === "trash-btn") {
        const li = item.parentElement;
        // animation
        li.classList.add("fall");
        removeLocalItems(li);
        li.addEventListener("transitionend", function () {
            li.remove();
        });
    }

    // check mark
    if (item.classList[0] === "completed-btn") {
        const li = item.parentElement;
        li.classList.toggle("completed");
    }
}

function filterTodo(e) {
    // const lis = todoList.children;
    const lis = todoList.childNodes;
    lis.forEach((li) => {
        switch (e.target.value) {
            case "all":
                li.style.display = "flex";
                break;
            case "completed":
                if (li.classList.contains("completed")) {
                    li.style.display = "flex";
                } else {
                    li.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!li.classList.contains("completed")) {
                    li.style.display = "flex";
                } else {
                    li.style.display = "none";
                }
                break;
        }
    });
}

/*-------------------------------------  Local Storage  -----------------------------------------*/

function saveLocalItems(item) {
    // checking if some items are already there
    let items = [];
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

function removeLocalItems(item) {
    // checking if some items are already there
    let items = [];
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }

    const itemIndex = item.children[0].innerText;
    items.splice(items.indexOf(itemIndex), 1);
    localStorage.setItem("items", JSON.stringify(items));
}

// To render the storedItem
function renderItems() {
    // checking if some items are already there
    let items = [];
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    items.forEach(function (item) {
        // todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // li
        const li = document.createElement("li");
        li.innerText = item;
        li.classList.add("todo-item");
        todoDiv.appendChild(li);
        // completed button
        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
        completedBtn.classList.add("completed-btn");
        todoDiv.appendChild(completedBtn);
        // trash button
        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn);
        // append to ul
        todoList.appendChild(todoDiv);
    });
}
