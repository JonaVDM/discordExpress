Element.prototype.addElement = function (type, content = null, className = null) {
    let element = document.createElement(type);
    if (content != null) element.innerHTML = content;
    if (className != null) element.className = className;

    this.appendChild(element);
    return element;
};

Element.prototype.addImage = function (src, alt, className = null) {
    let image = this.addElement("img", null, className);
    image.src = src;
    image.alt = alt;
    return image;
};

Element.prototype.addInput = function (type, className = null, value = null) {
    let input = this.addElement("input", null, className);
    input.type = type;
    if (value) input.value = value;
    return input;
};