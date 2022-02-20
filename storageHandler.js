function getFromStorage() {
  const dos = JSON.parse(localStorage.toDo || "[]");
  const completed = JSON.parse(localStorage.completed || "[]");
  return { dos, completed };
}
function setTostorage(toWhere, data) {
  toWhere == "toDo"
    ? (localStorage.toDo = JSON.stringify(data))
    : (localStorage.completed = JSON.stringify(data));
}
