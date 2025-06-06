// get elements
var canvas = document.getElementById("canvas");
var form = document.getElementById("property-form");
var formFields = document.getElementById("form-fields");
var selected = null;
var deleteBtn = document.getElementById("delete-btn");

// drag start
var allEls = document.querySelectorAll(".element");
for (var i = 0; i < allEls.length; i++) {
  allEls[i].addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("type", e.target.getAttribute("data-type"));
  });
}

// allow drop
canvas.addEventListener("dragover", function (e) {
  e.preventDefault();
});

// drop event
canvas.addEventListener("drop", function (e) {
  e.preventDefault();
  var type = e.dataTransfer.getData("type");
  var el = makeEl(type);
  canvas.appendChild(el);
});

// make new element
function makeEl(type) {
  var el;
  if (type === "text") {
    el = document.createElement("div");
    el.textContent = "text here";
    el.style.fontSize = "16px";
    el.style.color = "#000";
  } else if (type === "image") {
    el = document.createElement("img");
    el.src = "https://picsum.photos/100";
    el.style.width = "100px";
  } else if (type === "button") {
    el = document.createElement("button");
    el.textContent = "button";
    el.style.background = "#333";
    el.style.color = "#fff";
  }
  el.classList.add("editable");
  el.addEventListener("click", function () {
    pickEl(el, type);
  });
  return el;
}

// show form for editing
function pickEl(el, type) {
  selected = el;
  formFields.innerHTML = "";
  if (type === "text") {
    formFields.innerHTML =
      '<label>text</label><input type="text" name="text" value="' +
      el.textContent +
      '" />' +
      '<label>size</label><input type="number" name="size" value="' +
      parseInt(el.style.fontSize) +
      '" />' +
      '<label>color</label><input type="color" name="color" value="#000000" />';
  } else if (type === "image") {
    formFields.innerHTML =
      '<label>url</label><input type="text" name="src" value="' +
      el.src +
      '" />' +
      '<label>width</label><input type="number" name="width" value="' +
      parseInt(el.style.width) +
      '" />';
  } else if (type === "button") {
    formFields.innerHTML =
      '<label>text</label><input type="text" name="text" value="' +
      el.textContent +
      '" />' +
      '<label>bg</label><input type="color" name="background" value="#333333" />' +
      '<label>color</label><input type="color" name="color" value="#ffffff" />';
  }
  // show delete button
  deleteBtn.style.display = "block";
}

// hide delete button when nothing selected
canvas.addEventListener("click", function (e) {
  if (e.target === canvas) {
    selected = null;
    formFields.innerHTML = "";
    deleteBtn.style.display = "none";
  }
});

deleteBtn.addEventListener("click", function () {
  if (selected) {
    selected.remove();
    formFields.innerHTML = "";
    selected = null;
    deleteBtn.style.display = "none";
  }
});

// update element on input
form.addEventListener("input", function (e) {
  if (!selected) return;
  var name = e.target.name;
  var value = e.target.value;
  if (name === "text") selected.textContent = value;
  if (name === "size") selected.style.fontSize = value + "px";
  if (name === "color") selected.style.color = value;
  if (name === "src") selected.src = value;
  if (name === "width") selected.style.width = value + "px";
  if (name === "background") selected.style.background = value;
});
