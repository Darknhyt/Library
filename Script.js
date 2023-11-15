function Book (title, autor, pages) {
    this.title = title;
    this.autor = autor;
    this.pages = pages;
    this.readInfo = "not read yet";
    this.info = function (){
        return `${title} by ${autor}, ${pages} pages, ${this.readInfo}`;
    };
}
const theHobbit = new Book("The Hobbit","J.R.R Tolkien", 295);
console.log(theHobbit.info());