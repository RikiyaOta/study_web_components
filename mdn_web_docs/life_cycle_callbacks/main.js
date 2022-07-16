const MIN_LENGTH = 50;
const MAX_LENGTH = 200;
const randomLength = () =>
  Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH) + MIN_LENGTH);
const randomRGBValue = () => Math.floor(Math.random() * 256);

const add = document.querySelector(".add");
const update = document.querySelector(".update");
const remove = document.querySelector(".remove");
update.disabled = true;
remove.disabled = true;
add.disabled = false;

let square;

add.onclick = () => {
  square = document.createElement("custom-square");
  square.setAttribute("l", "100");
  square.setAttribute("c", "red");
  document.body.appendChild(square);

  update.disabled = false;
  remove.disabled = false;
  add.disabled = true;
};

update.onclick = () => {
  square.setAttribute("l", randomLength());
  square.setAttribute(
    "c",
    `rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`
  );
};

remove.onclick = () => {
  document.body.removeChild(square);

  update.disabled = true;
  remove.disabled = true;
  add.disabled = false;
};
