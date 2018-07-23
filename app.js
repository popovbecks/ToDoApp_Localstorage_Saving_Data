
window.onload = function () {
    render();
}

let model = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
const todoForm = document.querySelector('#todo-form');
const addInput = document.querySelector('#add-input');
const todoList = document.querySelector('#todo-list');
const todoItems = document.querySelectorAll('.todo-item');
const message = document.querySelector('.todo-message');
const todoMessage = document.querySelector('.todo-message');
localStorage.setItem('items', JSON.stringify(model));
todoForm.addEventListener('submit', addItemToDataBase);
todoList.addEventListener('click', deleteItemFromDB);
todoList.addEventListener('click', toggleTodoItem);
todoList.addEventListener('click', updateItem)

function addItemToDataBase (event) {
    event.preventDefault();
    if(!addInput.value) return alert("You need to add a task!");
    let itemObject = {
        ifChecked: '',
        id: generateID(5),
        title: addInput.value,
        isEditing: false
    }
    model.push(itemObject);
    addInput.value = '';
    render(model);
}

function deleteItemFromDB (event) {
    if(!event.target.classList.contains('delete')) return;
    let ItemId = event.target.parentNode.getAttribute('data-id');
    let ids = model.map(item=> {
        return item.id;
    })
    let index = ids.indexOf(ItemId);
    if(index != -1) {
        model.splice(index, 1)
    }
    ids = model.map(item=> {
        return item.id;
    })
    render(model);
}

function updateItem (event) {
    if(!event.target.classList.contains('edit')) return;
    let listItem = event.target.parentNode;
    let textField = listItem.querySelector('.textfield');
    let listItemId = listItem.getAttribute('data-id');
    let ids = model.map(item=> {
        return item.id;
    });
    let index = ids.indexOf(listItemId);
    
    if(model[index].isEditing) {
        model[index].title = textField.value;
    }
    model[index].isEditing = !model[index].isEditing;
    render(model);
}

function toggleTodoItem (event) {
    if(!event.target.classList.contains('checkbox')) return;
    let listItem = event.target.parentNode;
    let listItemId = listItem.getAttribute('data-id');
    let ids = model.map(item=> {
        return item.id;
    });
    let index = ids.indexOf(listItemId);
    if(!model[index].ifChecked) {
        model[index].ifChecked = 'checked'
    }else {
        model[index].ifChecked = ''
    }
    render(model);
}

function render (initialModel) {
    let model = initialModel;
    removeAllChildren(todoList);
    if(model.length) {
        createListItem();
        todoMessage.classList.add('hide');
    }else {
        todoMessage.classList.remove("hide");
    }
    localStorage.setItem('items', JSON.stringify(model));
}

function generateID(length) {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for(let i = 0; i < length; i++)  {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

function removeAllChildren (rootElement) {
    while(rootElement.firstChild) rootElement.removeChild(rootElement.firstChild)
}

function createElement(tag, props, ...children) {
    const element = document.createElement(tag);
    //we get only own properties
    for (let prop in props) {
        if (!props.hasOwnProperty(prop)) continue;
        element[prop] = props[prop]; //element.type = props['type'];
    }

    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }
            element.appendChild(child);
        });
    }
    return element;
}

function createListItem () {
    removeAllChildren(todoList);

    for (let i = 0; i < model.length; i++) {
        const checkbox = createElement('input', {
            type: 'checkbox',
            className: 'checkbox',
            checked: model[i].ifChecked
        });

        const label = createElement('label', {
            className: 'title'
        }, model[i].title);

        const editInput = createElement('input', {
            type: 'text',
            className: 'textfield',
            value: model[i].isEditing ? model[i].title : ''
        });

        const editButton = createElement('button', {
            className: 'edit'
        }, model[i].isEditing ? 'Save': 'Change');

        const deleteButton = createElement('button', {
            className: 'delete'
        }, 'Delete');

        const listItem = createElement('li', {
            className: checkbox.checked ? 'todo-item completed': model[i].isEditing ? 'todo-item editing': 'todo-item'
        }, checkbox, label, editInput, editButton, deleteButton);
        listItem.setAttribute('data-id', model[i].id)
        todoList.appendChild(listItem);
    }
}

