const { ipcRenderer } = require("electron");
const input = document.getElementById("inputSearch");
const selectInput = document.getElementById("selectInput");

window.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    if (input.value == "" || selectInput.value == "") {
      return;
    }

    ipcRenderer.send("search", [input.value, selectInput.value]);
    input.value = "";
  }
});
