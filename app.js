let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createAndAppendElement(htmlType, htmlClass, elementToAppendTo, textContent = "") {
    const element = document.createElement(htmlType);
    element.classList.add(htmlClass);
    element.textContent = textContent;
    elementToAppendTo.appendChild(element);
    return element;
}

function createBookCard (book, bookIndex = 0) {
    const { title, author, pages, read } = book;
    const bookList = document.getElementById("bookList");
    const bookCard = createAndAppendElement("div", "bookCard", bookList);
    bookCard.setAttribute("data-bookIndex", bookIndex);

    const titleEl = createAndAppendElement("div", "bookTitle", bookCard, title);
    const authorEl = createAndAppendElement("div", "bookAuthor", bookCard, author);
    const pagesEl = createAndAppendElement("div", "bookPages", bookCard, pages);
    const readEl = createAndAppendElement("div", "bookRead", bookCard, read);
    readEl.checked = read;
    
    const deleteButton = createAndAppendElement("button", "deleteButton", bookCard, "Delete book");
    deleteButton.addEventListener("click", () => {
        myLibrary.splice(bookIndex, 1);
        updatePageLibrary(myLibrary);
    })
    
    const toggleRead = createAndAppendElement("input", "toggleRead", bookCard);
    toggleRead.setAttribute("type", "checkbox");
    toggleRead.checked = read;
    toggleRead.addEventListener('change', function() {
        if (this.checked) {
            myLibrary[bookIndex].read = true;
        } else {
            myLibrary[bookIndex].read = false;
        }
        updatePageLibrary(myLibrary);
    });
}

function updatePageLibrary (library) {
    document.querySelector("#bookList").innerHTML = ""; //Clears it on each call so it doesn't keep old values but just shows the current list
    
    for (let book of library) {
        createBookCard(book, library.indexOf(book));
    }
}

function addBookToLibraryFromPage() {
    const title = document.getElementById("userTitle").value;
    const author = document.getElementById("userAuthor").value;
    const pages = document.getElementById("userPages").value;
    const read = document.getElementById("isRead").checked;
    myLibrary.push(new Book(title, author, pages, read));
    updatePageLibrary(myLibrary);
}

document.getElementById("newBook").addEventListener("click", addBookToLibraryFromPage);
