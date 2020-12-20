let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createAndAppendElement(htmlType, htmlClass, elementToAppendTo, textContent = "") {
    const ELEMENT = document.createElement(htmlType);
    ELEMENT.classList.add(htmlClass);
    ELEMENT.textContent = textContent;
    elementToAppendTo.appendChild(ELEMENT);
    return ELEMENT;
}

function createBookCard (title, author, pages, read, bookIndex = 0) {
    const BOOKLIST = document.getElementById("bookList");
    const BOOKCARD = createAndAppendElement("div", "bookCard", BOOKLIST);
    BOOKCARD.setAttribute("data-bookIndex", bookIndex);

    const TITLE = createAndAppendElement("div", "bookTitle", BOOKCARD, title);
    const AUTHOR = createAndAppendElement("div", "bookAuthor", BOOKCARD, author);
    const PAGES = createAndAppendElement("div", "bookPages", BOOKCARD, pages);
    const READ = createAndAppendElement("div", "bookRead", BOOKCARD, read);
    READ.checked = read;
    
    const DELETE_BUTTON = createAndAppendElement("button", "deleteButton", BOOKCARD, "Delete book");
    DELETE_BUTTON.addEventListener("click", () => {
        myLibrary.splice(bookIndex, 1);
        updatePageLibrary(myLibrary);
    })
    const TOGGLE_READ = createAndAppendElement("input", "toggleRead", BOOKCARD);
    TOGGLE_READ.setAttribute("type", "checkbox");
    TOGGLE_READ.addEventListener('change', function() {
        if (this.checked) {
            myLibrary[bookIndex].read = true;
            console.log(myLibrary[bookIndex].read);
            console.log(READ.checked);
            updatePageLibrary(myLibrary);
        } else {
            myLibrary[bookIndex].read = false;
            console.log(myLibrary[bookIndex].read);
            console.log(READ.checked);
            updatePageLibrary(myLibrary);
        }
      });
}

function updatePageLibrary (library) {
    document.querySelector("#bookList").innerHTML = ""; //Clears it on each call so it doesn't keep old values but just shows the current list
    
    for (let book of library) {
        createBookCard(book.title, book.author, book.pages, book.read, library.indexOf(book));
        console.log(library.indexOf(book), book)
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