// DOM elements and global variables
const booksList = document.querySelector('#books-list')
const showFormButton = document.querySelector('#show-form-button')
const addBookForm = document.querySelector('#add-book-form')
let myLibrary = []


// Choose preloaded books
const defaultBooks = [
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    pages: 314,
    read: true
  },
  {
    title: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    pages: 309,
    read: false
  },
  {
    title: 'Harry Potter and the deathly hallows',
    author: 'J. K. Rowling',
    pages: 783,
    read: true
  },
  {
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel Garcia Marquez',
    pages: 419,
    read: true
  },
  {
    title: '1914',
    author: 'Margaret MacMillan',
    pages: 892,
    read: false
  }
]
preloadBooks(defaultBooks)


// Functionality
showFormButton.addEventListener('click', () => {
  addBookForm.classList.toggle("d-none")
  showFormButton.classList.toggle("d-none")
})

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const book = new Book(
    document.querySelector('[name=title]').value,
    document.querySelector('[name=author]').value,
    document.querySelector('[name=pages]').value,
    document.querySelector('[name=read]').checked
  )
  addBookToLibrary(book)

  event.target.reset()
  addBookForm.classList.toggle("d-none")
  showFormButton.classList.toggle("d-none")
})


// Functions
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.toggleRead = function() {
  this.read = !this.read
}

function preloadBooks(defaultBooks) {
  let storedLibrary = JSON.parse(localStorage.getItem('myLibrary'))
  let preloadedBooks = storedLibrary === null ? defaultBooks : storedLibrary
  preloadedBooks.forEach((info) => {
    const book = new Book(info.title, info.author, info.pages, info.read)
    addBookToLibrary(book)
  })
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
  displayBooks()
}

function displayBooks() {
  booksList.innerHTML = ''
  myLibrary.forEach((book, index) => {
    addBookToTable(book, index)
  })
}

function addBookToTable(book, rowIndex) {
  const row = booksList.insertRow(rowIndex)
  for (const [index, [key, value]] of Object.entries(Object.entries(book))) {
    let cell = row.insertCell(index)
    cell.classList.add('align-middle')

    if (key === 'read') {
      addReadButton(cell, value, rowIndex)
    } else {
      if (key == 'pages') { cell.classList.add('text-center') }
      cell.innerHTML = value
    }
  }
  addDeleteButton(row, rowIndex)
}

function addReadButton(cell, value, index) {
  cell.innerHTML = value ? '✓' : '✗'
  cell.classList.add('text-center')
  cell.addEventListener('click', () => {
    toggleReadByIndex(index)
  })
}

function toggleReadByIndex(index) {
  myLibrary[index].toggleRead()
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
  displayBooks()
}

function addDeleteButton(row, index) {
  let td = row.insertCell()
  td.classList.add('text-center')
  let button = document.createElement('input')
  button.type = "button"
  button.value = "Remove"
  button.classList.add("btn", "btn-danger")
  button.addEventListener('click', () => {
    removeBookFromLibraryByIndex(index)
  })
  td.appendChild(button)
}

function removeBookFromLibraryByIndex(index) {
  myLibrary.splice(index, 1)
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
  displayBooks()
}


