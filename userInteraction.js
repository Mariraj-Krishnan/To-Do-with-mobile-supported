const optionsOne = document.querySelector(".options.one");
const optionsTwo = document.querySelector(".options.two");
let selectedElement;
function interaction() {
  const moreFromDo = document.querySelectorAll(".more.one");
  const moreFromCompleted = document.querySelectorAll(".more.two");
  document.body.onclick = () => {
    optionsOne.style.display = "none";
    optionsTwo.style.display = "none";
  };
  function expandOptions(button) {
    button.onclick = () => {
      selectedElement = button.previousElementSibling;
      const { x, y, width, height } =
        button.parentElement.getBoundingClientRect();
      optionsOne.style.display = "flex";
      optionsOne.style.transform = "scale(1)";
      optionsOne.style.left = x + width + "px";
      optionsOne.style.top = y + "px";
      event.stopPropagation();
    };
  }
  function expandOptionsForCompleted(button) {
    button.onclick = () => {
      selectedElement = button.previousElementSibling;
      const { x, y, width, height } =
        button.parentElement.getBoundingClientRect();
      optionsTwo.style.display = "flex";
      optionsTwo.style.transform = "scale(1)";
      optionsTwo.style.left = x + width + "px";
      optionsTwo.style.top = y + "px";
      event.stopPropagation();
    };
  }
  moreFromDo.forEach(expandOptions);
  moreFromCompleted.forEach(expandOptionsForCompleted);
  const edit = optionsOne.children[0];
  const completed = optionsOne.children[1];
  const dltDo = optionsOne.children[2];
  const incomplete = optionsTwo.children[0];
  const dltComplete = optionsTwo.children[1];
  edit.onclick = () => {
    selectedElement.contentEditable = "true";
    selectedElement.focus();
    selectedElement.onblur = () => {
      editElement(
        selectedElement.parentElement.id,
        selectedElement.textContent
      );
    };
  };
  dltDo.onclick = () => {
    removeDo(selectedElement.parentElement.id);
  };
  completed.onclick = () => {
    completeElement(selectedElement.parentElement.id);
  };
  dltComplete.onclick = () => {
    removeCompleted(selectedElement.parentElement.id);
  };
  incomplete.onclick = () => {
    incompleted(selectedElement.parentElement.id);
  };
}
