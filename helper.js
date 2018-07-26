function generateID(length) {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

function getId(model) {
    return model.map(item => {
        return item.id;
    });
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

function removeAllChildren(rootElement) {
    while (rootElement.firstChild) rootElement.removeChild(rootElement.firstChild)
}

export {
    generateID,
    createElement,
    removeAllChildren,
    getId
};