const hasUlsAsChild = (element) => element.querySelectorAll("ul").length > 0;

const showUl = (event) => {
  const nextUl = event.target.nextElementSibling;

  if (nextUl.style.display == "block") {
    nextUl.style.display = "none";
    nextUl.parentNode.setAttribute("class", "closed");
  } else {
    nextUl.style.display = "block";
    nextUl.parentNode.setAttribute("class", "open");
  }
};

class ExpandingList extends HTMLUListElement {
  constructor() {
    super();

    const uls = Array.from(this.querySelectorAll("ul"));
    const lis = Array.from(this.querySelectorAll("li"));

    // Hide all child uls.
    uls.forEach((ul) => (ul.style.display = "none"));

    // Look through each li element in the ul
    lis.forEach((li) => {
      if (hasUlsAsChild(li)) {
        li.setAttribute("class", "closed");

        const childText = li.childNodes[0];
        const newSpan = document.createElement("span");

        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = "pointer";

        newSpan.onclick = showUl;

        childText.parentNode.insertBefore(newSpan, childText);
        childText.parentNode.removeChild(childText);
      }
    });
  }
}

customElements.define("expanding-list", ExpandingList, { extends: "ul" });
