import {
    generateID,
    getId
} from './helper.js';

let model = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

function addItem(input) {
    let itemObject = {
        ifChecked: '',
        id: generateID(5),
        title: input.value,
        isEditing: false
    }
    model.push(itemObject);
    input.value = '';
}

function deleteItem(id) {
    let ids = getId(model);
    let index = ids.indexOf(id);
    if (index != -1) {
        model.splice(index, 1)
    }
}

function updateItem(textField, id) {
    let ids = getId(model);
    let index = ids.indexOf(id);
    if (model[index].isEditing) {
        model[index].title = textField.value;
    }
    model[index].isEditing = !model[index].isEditing;
}

function toggleItem(id) {
    let ids = getId(model);
    let index = ids.indexOf(id);
    if (!model[index].ifChecked) {
        model[index].ifChecked = 'checked'
    } else {
        model[index].ifChecked = ''
    }
}



export {
    model,
    addItem,
    deleteItem,
    updateItem,
    toggleItem
};