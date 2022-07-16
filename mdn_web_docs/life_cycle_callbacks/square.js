const updateStyle = (element) => {
  const shadow = element.shadowRoot;

  shadow.querySelector("style").textContent = `
    div {
      width: ${element.getAttribute("l")}px;
      height: ${element.getAttribute("l")}px;
      background-color: ${element.getAttribute("c")};
    }
  `;
};

class Square extends HTMLElement {
  // Specify observed attributes so that attributeChangedCallback will work.
  static get observedAttributes() {
    return ["c", "l"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const div = document.createElement("div");
    const style = document.createElement("style");
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  connectedCallback() {
    console.log("Custom square element added to page.");
    updateStyle(this);
  }

  disconnectedCallback() {
    console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom square element attributes changed.", {
      name,
      oldValue,
      newValue,
    });

    updateStyle(this);
  }
}

customElements.define("custom-square", Square);
