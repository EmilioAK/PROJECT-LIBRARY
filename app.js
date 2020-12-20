let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function removeBook (title, library) {
    for (let book of library) {
        if (book.title === title) {
            library.splice(library.indexOf(book), 1)
        }
    }
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
    
    const DELETE_BUTTON = createAndAddElement("button", "deleteButton", BOOKCARD, "Delete book");
    DELETE_BUTTON.addEventListener("click", () => {
        removeBook(title, myLibrary);
        updatePageLibrary(myLibrary)
    })
}

function updatePageLibrary (library) {
    document.querySelector("#bookList").innerHTML = ""; //Clears it on each call so it doesn't keep old values but just shows the current list
    for (book of library) {
        createBookCard(book.title, book.author, book.pages, book.read);
    }
}

function addBookToLibraryFromPage() {
    const TITLE = document.getElementById("userTitle").value;
    const AUTHOR = document.getElementById("userAuthor").value;
    const PAGES = document.getElementById("userPages").value;
    myLibrary.push(new Book(TITLE, AUTHOR, PAGES, true));
    updatePageLibrary(myLibrary);
}

document.getElementById("newBook").addEventListener("click", addBookToLibraryFromPage)