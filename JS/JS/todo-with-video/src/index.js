import './style.css'

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector("form > input");

const todos = [
    {
        text: 'je suis une todo',
        done: false,
        editMode: false,
    },
    {
        text: 'faire du JS',
        done: true,
        editMode: true,
    }
];


form.addEventListener('submit', event => {
    event.preventDefault();
    const inputValue = input.value;
    input.value = "";
    addTodo(inputValue);
})


const displayTodo = () => {
    const todosNode =
        todos.map((todo, index) => {
            if(todo.editMode){
                return createTodoEditElement(todo, index);
            }

            return createTodoElement(todo, index);
        })
    ul.innerHTML = "";
    ul.append(...todosNode)
}

const createTodoElement = (todo, index) => {
    const li = document.createElement("li");
    li.addEventListener("click", event => {
        validateTodo(index);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = 'Supprimer'
    deleteButton.addEventListener('click', () => {
        deleteTodo(index);
    });

    const editButton = document.createElement("button");
    editButton.innerHTML = 'Modifier'
    editButton.addEventListener('click', () => {
        toggleEditModeTodo(index);
    });

    li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
  `;

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    return li;
}

const createTodoEditElement = (todo, index) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;

    const editButton = document.createElement("button");
    editButton.innerHTML = 'Modifier'
    editButton.addEventListener('click', () => {
        todo.text = input.value;
        todo.editMode = !todo.editMode;
        displayTodo();
    });

    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = 'Annuler'
    cancelButton.addEventListener('click', () => {
        todo.editMode = !todo.editMode;
        displayTodo();
    });

    li.appendChild(input);
    li.appendChild(editButton);
    li.appendChild(cancelButton);

    return li;
}

const addTodo = text => {
    todos.push({
        text,
        done: false,
        editMode: false,
    });
    displayTodo();
}

const deleteTodo = index => {
    todos.splice(index, 1);
    displayTodo();
}

const validateTodo = index => {
    todos[index].done = !todos[index].done;
    displayTodo();
}

const toggleEditModeTodo = index => {
    todos[index].editMode = true;
    displayTodo();
}

displayTodo();
