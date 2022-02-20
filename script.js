const form = document.querySelector("form");
const input = document.querySelector("input");
const toDoContainer = document.querySelector(".to-do");
const completedContainer = document.querySelector(".completed");
const doTemplate = document.querySelector(".do-template");
const completedTemplate = document.querySelector(".completed-template");
input.value = "";
if (screen.width < screen.height) {
  document.querySelector(".rotate").style.display = "flex";
}

form.onsubmit = (e) => {
  e.preventDefault();
  if (!input.value) return;
  const { dos } = getFromStorage();
  dos.unshift(input.value);
  setTostorage("toDo", dos);
  doCreator();
  input.value = "";
};
function doCreator() {
  const { dos } = getFromStorage();
  const fragment = document.createDocumentFragment();
  while (toDoContainer.children.length > 1) {
    toDoContainer.lastChild.remove();
  }
  dos.forEach((toDo, index) => {
    const templateClone = doTemplate.content.cloneNode(true).children[0];
    templateClone.id = `do-${index}`;
    templateClone.children[0].textContent = toDo;
    fragment.append(templateClone);
  });
  toDoContainer.append(fragment);
  interaction();
}
doCreator();
function completedCreator() {
  const { completed } = getFromStorage();
  const fragment = document.createDocumentFragment();
  while (completedContainer.children.length > 1) {
    completedContainer.lastChild.remove();
  }
  completed.forEach((toDo, index) => {
    const templateClone = completedTemplate.content.cloneNode(true).children[0];
    templateClone.id = `completed-${index}`;
    templateClone.children[0].textContent = toDo;
    fragment.append(templateClone);
  });
  completedContainer.append(fragment);
  interaction();
}
completedCreator();
function editElement(id, data) {
  const { dos } = getFromStorage();
  dos[id.replace("do-", "")] = data;
  setTostorage("toDo", dos);
  doCreator();
}
function removeDo(id) {
  const { dos } = getFromStorage();
  dos.splice(id.replace("do-", ""), 1);
  setTostorage("toDo", dos);
  doCreator();
}
function completeElement(id) {
  const { dos, completed } = getFromStorage();
  const [completedDo] = dos.splice(id.replace("do-", ""), 1);
  completed.unshift(completedDo);
  setTostorage("toDo", dos);
  setTostorage("completed", completed);
  doCreator();
  completedCreator();
}
function removeCompleted(id) {
  const { completed } = getFromStorage();
  completed.splice(id.replace("completed-", ""), 1);
  setTostorage("completed", completed);
  completedCreator();
}
function incompleted(id) {
  const { dos, completed } = getFromStorage();
  const [incompletedDo] = completed.splice(id.replace("completed-", ""), 1);
  dos.unshift(incompletedDo);
  setTostorage("toDo", dos);
  setTostorage("completed", completed);
  doCreator();
  completedCreator();
}
