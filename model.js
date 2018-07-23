let model = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//localStorage.setItem('items', JSON.stringify(model));


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

export { model, addItemToDataBase, deleteItemFromDB, updateItem, toggleTodoItem };