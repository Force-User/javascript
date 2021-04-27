const createRow = (data, count) => {
  const row = document.createElement("tr");
  row.classList.add("table-row");

  const numberCell = document.createElement("td");
  numberCell.classList.add("table-row-number");
  numberCell.innerText = count;

  const nameCell = document.createElement("td");
  nameCell.classList.add("table-row-name");
  nameCell.dataset.id = data.id;
  nameCell.innerText = data.name;
  nameCell.dataset.name = "name";
  nameCell.setAttribute("contenteditable", true);

  const positionCell = document.createElement("td");
  positionCell.classList.add("table-row-position");
  positionCell.dataset.id = data.id;
  positionCell.dataset.name = "position";
  positionCell.innerText = data.position;
  positionCell.setAttribute("contenteditable", true);

  row.append(numberCell, nameCell, positionCell);
  return row;
};

const clearTable = () => {
  [...table.children].forEach(
    (child) =>
      child.classList.contains("table-row") &&
      table.removeChild(table.lastChild)
  );
};

const fillTable = (data) => {
  const rows = data.map((item, index) => createRow(item, index + 1));
  table.append(...rows);
};

const sortDescending = (data, prop) => {
  data.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
};

const sortAscending = (data, prop) => {
  data.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
};

const sorting = (data, prop) => {
  stateSorting[prop] ? sortDescending(data, prop) : sortAscending(data, prop);
  stateSorting[prop] = !stateSorting[prop];
  clearTable();
  fillTable(data);
};

const setNewInfo = (text, id, prop) => {
  if (prop) {
    const user = data.find((item) => item.id === Number(id));
    user[prop] = text;
  }
};

const data = [
  {
    id: 1,
    name: "Barry Allen",
    position: "Flash",
  },
  {
    id: 2,
    name: "Bruce Wayne",
    position: "Batman",
  },
  {
    id: 3,
    name: "Clark Kent",
    position: "Superman",
  },
  {
    id: 4,
    name: "Diana Prince",
    position: "Wonder Woman",
  },
  {
    id: 5,
    name: "Jon Jones",
    position: "Martian Manhunter",
  },
];

const stateSorting = {
  toName: false,
  toPosition: false,
};

const table = document.querySelector(".table");
const tableHeader = document.querySelector(".table-header");

fillTable(data);
const tableRows = document.querySelectorAll(".table-row-name");

tableHeader.addEventListener("click", (e) => {
  const element = e.target.closest("td");
  if (!element) return;
  return sorting(data, element.dataset.sort);
});

table.addEventListener(
  "blur",
  (e) => {
    const element = e.target.closest("td");
    if (!element) return;
    return setNewInfo(
      element.innerText,
      element.dataset.id,
      element.dataset.name
    );
  },
  true
);
