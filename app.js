
import {model} from './model.js';
import {removeAllChildren, createElement} from './helper.js';
import {bindEvents} from './controller.js';

const todoForm = document.querySelector('#todo-form');
const addInput = document.querySelector('#add-input');
const todoList = document.querySelector('#todo-list');
const todoItems = document.querySelectorAll('.todo-item');
const todoMessage = document.querySelector('.todo-message');


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
    console.log(model)
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
            className: checkbox.checked ? 'todo-item completed' : model[i].isEditing ? 'todo-item editing': 'todo-item'
        }, checkbox, label, editInput, editButton, deleteButton);
        listItem.setAttribute('data-id', model[i].id)
        todoList.appendChild(listItem);
    }
}

render(model);
bindEvents();

export {render,todoForm, addInput, todoList, todoItems, todoMessage}


