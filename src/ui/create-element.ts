interface ElementOptions {
  readonly className?: string;
  readonly text?: string;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly children?: readonly Node[];
}

export const createElement = <Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  { className, text, attributes = {}, children = [] }: ElementOptions = {},
): HTMLElementTagNameMap[Tag] => {
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
