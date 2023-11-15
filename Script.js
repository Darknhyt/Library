const table = document.getElementById("list");
const panel = document.getElementById("add-panel");
const myLibrary = [];
let id = 0;
function Book (title, autor, pages) {
    this.id = id;
    this.title = title;
    this.autor = autor;
    this.pages = pages;
    this.readInfo = "Not read yet";
    this.info = function (){
        return `${title} by ${autor}, ${pages} pages, ${this.readInfo}`;
    };
}
init();
function init(){
    addBookToLibrary(new Book("The Hobbit","J.R.R Tolkien", 295));
    addBookToLibrary(new Book("Harry Potter","J. K. Rowling", 320));
    addBookToLibrary(new Book("The Crow","Edgar Allan Poe", 160));
    events();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    uploadRow(book);
    id++;
  }

function uploadRow(element){
        let row = document.createElement("tr");
        row.setAttribute("data", element.id);     
        row.innerHTML =`<td>${element.title}</td>
                        <td>${element.autor}</td>
                        <td>${element.pages}</td>
                        <td>${element.readInfo}</td>`;
        
        row.appendChild(deleteButton());
        table.appendChild(row);
} 

function events(){
    document.getElementById("add").addEventListener("click",()=>{
        panel.style.visibility = "visible";
        panel.style.transform = "translateY(120vh)";
    })
    document.getElementById("close").addEventListener("click",()=>{
        setTimeout(()=>{panel.style.visibility = "hidden";},300)
        panel.style.transform = "translateY(-120vh)";
    })
    document.getElementById("register").addEventListener("click",()=>{
        let book= document.getElementById("input-title").value;
        let autor= document.getElementById("input-autor").value;
        let pages= document.getElementById("input-pages").value;
        addBookToLibrary(new Book(book,autor, Number.parseInt(pages)));
        setTimeout(()=>{panel.style.visibility = "hidden";},300)
        panel.style.transform = "translateY(-120vh)";
    })
}
function deleteButton(){
    let del = document.createElement("span");
    del.setAttribute("class","material-symbols-outlined");
    del.setAttribute("title","Delete book");
        del.textContent = "delete";
        del.addEventListener("click",(e)=>{
            e.preventDefault;
            del.parentElement.remove();
        })
        return del;
}