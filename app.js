console.log("Welcome to console");
//If user add note ,add it to localStorage
// localStorage.clear();
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addText = document.getElementById("addText");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addText.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  console.log(notesObj);
  showNotes();
});
//function to show elements from localstorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div  class="noteCard mx-2 my-2 card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
             <p>${element}</p>
             <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">DELETE</a>
            </div>
            </div>

        `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show,use add to add notes`;
  }
}
//function to delete a note
function deleteNote(index) {
  // console.log("I am deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
let search = document.getElementById("searchText");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log("input event fired!", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardText = element.getElementByTagName("p")[0].innerText;
    if (cardText.includes(inputVal)) {
      element.style.display="block";
    }
    else{
      element.style.display="none";
    }
    // console.log(cardText);
  });
});
