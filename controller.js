import {model, addItem, deleteItem, updateItem, toggleItem} from './model.js';
import {todoForm, addInput, todoList, todoItems, todoMessage, render} from './app.js';

function bindEvents () {
    todoForm.addEventListener('submit', addItemToDataBase);
    todoList.addEventListener('click', deleteItemFromDB);
    todoList.addEventListener('click', toggleTodoItem);
    todoList.addEventListener('click', updateItemInDB);
}

//model manipulation methods
function addItemToDataBase (event) {
    event.preventDefault();
    if(!addInput.value) return alert("You need to add a task!");
    addItem(addInput); //method from model
    render(model);
    return itemObject;
}

function deleteItemFromDB (event) {
    if(!event.target.classList.contains('delete')) return;
    let ItemId = event.target.parentNode.getAttribute('data-id');
    deleteItem(ItemId); //method from model
    render(model);
}

function updateItemInDB (event) {
    if(!event.target.classList.contains('edit')) return;
    let listItem = event.target.parentNode;
    let textField = listItem.querySelector('.textfield');
    let listItemId = listItem.getAttribute('data-id');
    updateItem(textField, listItemId);
    render(model);
}

function toggleTodoItem (event) {
    if(!event.target.classList.contains('checkbox')) return;
    let listItem = event.target.parentNode;
    let listItemId = listItem.getAttribute('data-id');
    toggleItem(listItemId);
    render(model);
}

export {bindEvents};