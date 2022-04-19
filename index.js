const submitBtn = document.querySelector('.submit-btn');
const bookSection = document.querySelector('.books-section');
const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
let oid = 0;

class Library {
  constructor() {
    this.myBooks = [];
  }

  addBook() {
    const addedBooks = {
      title: bookTitle.value,
      author: bookAuthor.value,
      id: oid,
    };
    const book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute('id', addedBooks.id);
    book.innerHTML = `
  <h1 class="header">${addedBooks.title}</h1>
  <h2 class="author">${addedBooks.author}</h2>
  <button class="remove-btn">remove</button>
  `;
    bookSection.appendChild(book);
    this.myBooks.push(addedBooks);
    localStorage.setItem('books', JSON.stringify(this.myBooks));
    oid += 1;
    bookAuthor.value = '';
    bookTitle.value = '';
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach((btn) => {
      btn.addEventListener('click', this.removeItem);
    });
  }
  /* eslint-disable */
  removeItem(event) {
    const key = event.target.closest('div').id;
    const localData = localStorage.getItem('books');
    const parseData = JSON.parse(localData);
    const filtered = parseData.filter((book) => book.id.toString() !== key);
    localStorage.setItem('books', JSON.stringify(filtered));
    event.target.closest('div').remove();
  }
}
/* eslint-enable */

const myLibrary = new Library();

if (!localStorage.getItem('books')) {
  localStorage.setItem('books', JSON.stringify(myLibrary.myBooks));
} else {
  const rawData = localStorage.getItem('books');
  const myData = JSON.parse(rawData);
  for (let i = 0; i < myData.length; i += 1) {
    const book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute('id', myData[i].id);
    book.innerHTML = `
  <h1 class="header">${myData[i].title}</h1>
  <h2 class="author">${myData[i].author}</h2>
  <button class="remove-btn">remove</button>
  `;
    bookSection.appendChild(book);
  }
  const deleteBtn = document.querySelectorAll('.remove-btn');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', this.removeItem);
  });
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  myLibrary.addBook();
});
