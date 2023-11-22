const table = document.getElementById("list");
const panel = document.getElementById("add-panel");
const myLibrary = [];
let currentID = 0;
class Book {
    constructor(title, autor, pages = 0, readInfo = "Not read yet"){
        this.id = currentID;
        this.title = title == "" ? "No specified title" : title;
        this.autor = autor == "" ? "No specified autor" : autor;
        this.pages = pages;
        this.readInfo = readInfo;
    }
    get info () {
     return `${this.title} by ${this.autor}, ${this.pages} pages, ${this.readInfo}`;
     }
}
init();
function init() {
    addBookToLibrary(new Book("The Hobbit", "J.R.R Tolkien", 295));
    addBookToLibrary(new Book("Harry Potter", "J. K. Rowling", 320));
    addBookToLibrary(new Book("The Crow", "Edgar Allan Poe", 160));
    events();
    Book.prototype.chanceReadStatus = function (val) {
        this.readInfo = val;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    uploadRow(book);
    currentID++;
}

function uploadRow(book) {
    let row = document.createElement("tr");
    row.setAttribute("data-id", book.id);
    row.innerHTML = `<td>${book.title}</td>
                        <td>${book.autor}</td>
                        <td>${book.pages}</td>
                        <td>${book.readInfo}</td>`;

    row.appendChild(deleteButton());
    row.appendChild(editButton());
    table.appendChild(row);
}

function events() {
    document.getElementById("add").addEventListener("click", () => {
        panel.style.visibility = "visible";
        panel.style.transform = "translateY(116vh)";
    })
    document.getElementById("close").addEventListener("click", () => {
        setTimeout(() => { panel.style.visibility = "hidden"; }, 300)
        panel.style.transform = "translateY(-116vh)";
    })
    document.getElementById("register").addEventListener("click", () => {
        let book = document.getElementById("input-title").value;
        let autor = document.getElementById("input-autor").value;
        let pages = document.getElementById("input-pages").value;
        let status = Array.from(document.getElementsByName("read-status")).find(s => s.checked).value;
        addBookToLibrary(new Book(book, autor, Number.parseInt(pages), status));
        panel.style.transform = "translateY(-116vh)";
    })
}
function deleteButton() {
    let del = document.createElement("span");
    del.setAttribute("class", "material-symbols-outlined");
    del.setAttribute("title", "Delete book");
    del.textContent = "delete";
    del.addEventListener("click", (e) => {
        e.preventDefault;
        myLibrary.splice(bookId(del.parentElement.dataset.id), 1);
        del.parentElement.remove();
    });
    return del;
}

function editButton() {
    let edit = document.createElement("span");
    edit.setAttribute("class", "material-symbols-outlined");
    edit.setAttribute("title", "Change Status");
    edit.textContent = "edit_square";
    edit.addEventListener("click", (e) => {
        let status = e.target.parentElement.children[3];
        e.preventDefault;
        status.innerHTML = "";
        status.appendChild(editEvent(edit.parentElement.dataset.id));
    })
    return edit;
}

function editEvent(id) {
    const edit = document.createElement("select");
    edit.name = "reading-status";
    edit.innerHTML = `<option value="Not read yet">Not read yet</option>
        <option value="Reading">Reading</option>
        <option value="Finishied">Finishied</option>`;
    edit.value = bookId(id).readInfo;
    edit.addEventListener("input", () => {
        edit.parentElement.innerHTML = edit.value;
        bookId(id).chanceReadStatus(edit.value);
    });
    return edit;
}

function bookId(id) {
    return myLibrary[myLibrary.findIndex(b => b.id == id)];
}