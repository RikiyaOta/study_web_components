const countWords = (node) => {
  const splitByWhiteSpace = (text) => text.split(/\s+/g);
  const isVaildWord = (maybeWord) => maybeWord.trim().length > 0;

  const text = node.innerText || node.textContent;
  const maybeWords = splitByWhiteSpace(text.trim());

  return maybeWords.filter(isVaildWord).length;
};

class WordCount extends HTMLParagraphElement {
  constructor() {
    super();

    const parentNode = this.parentNode;
    const countResult = `Words: ${countWords(parentNode)}`;

    const shadowRoot = this.attachShadow({ mode: "open" });

    const textNode = document.createElement("span");
    textNode.textContent = countResult;

    shadowRoot.appendChild(textNode);

    // Update count when element content changes.
    // ? 実際にブラウザ上で HTML を無理矢理書き換えたら、確かに更新された。理由がよくわかっていない。
    setInterval(() => {
      const countResult = `Words: ${countWords(parentNode)}`;
      textNode.textContent = countResult;
    }, 200);
  }
}

customElements.define("word-count", WordCount, { extends: "p" });
