export const createElement = (tag, { className, text, attributes = {}, children = [] } = {}) => {
    const element = document.createElement(tag);
    if (className !== undefined) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    element.append(...children);
    return element;
};
//# sourceMappingURL=create-element.js.map