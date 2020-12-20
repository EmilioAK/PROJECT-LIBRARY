let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createAndAddElement(htmlType, htmlClass, elementToAppendTo, textContent = "") {
    const ELEMENT = document.createElement(htmlType);
    ELEMENT.classList.add(htmlClass);
    ELEMENT.textContent = textContent;
    elementToAppendTo.appendChild(ELEMENT);
    return ELEMENT;
}

function createBookCard (title, author, pages, read) {
    const BOOKLIST = document.getElementById("bookList");
    const BOOKCARD = createAndAddElement("div", "bookCard", BOOKLIST);

    const TITLE = createAndAddElement("div", "bookTitle", BOOKCARD, title);
    const AUTHOR = createAndAddElement("div", "bookAuthor", BOOKCARD, author);
    const PAGES = createAndAddElement("div", "bookPages", BOOKCARD, pages);
    const READ = createAndAddElement("div", "bookRead", BOOKCARD, read);
}

function addLibraryToPage (library) {
    document.querySelector("#bookList").innerHTML = ""; //Clears it on each call so it doesn't keep old values but just shows the current list
    for (book of library) {
        createBookCard(book.title, book.author, book.pages, book.read);
    }
}

function addBookToLibrary() {
    const TITLE = document.getElementById("userTitle").value;
    const AUTHOR = document.getElementById("userAuthor").value;
    const PAGES = document.getElementById("userPages").value;
    myLibrary.push(new Book(TITLE, AUTHOR, PAGES, true));
    addLibraryToPage(myLibrary);
}

document.getElementById("newBook").addEventListener("click", addBookToLibrary)