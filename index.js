const submitBtn = document.querySelector('.submit-btn');
const bookSection = document.querySelector('.books-section');
const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');

let myBooks = [];
if (localStorage.getItem('books')) {
  const locaBooks = localStorage.getItem('books');
  const readyBooks = JSON.parse(locaBooks);
  myBooks = [...readyBooks];
  for (let i = 0; i < myBooks.length; i += 1) {
    const book = document.createElement('div');
    book.classList.add('book');
    book.innerHTML = `
  <h1 class="header">${myBooks[i].title}</h1>
  <h3 class="auther">${myBooks[i].author}</h3>
  <button class="remove-btn">remove</button>
  `;
    bookSection.appendChild(book);
  }

  const removeBtn = document.querySelectorAll('.remove-btn');
  removeBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const header = event.target.closest('div');
      const key = header.firstElementChild.innerHTML;
      event.target.closest('div').remove();
      const filtered = myBooks.filter((book) => book.title !== key);
      localStorage.setItem('books', JSON.stringify(filtered));
    });
  });
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const addedBooks = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };

  const book = document.createElement('div');
  book.classList.add('book');
  book.innerHTML = `
<h1 class="header">${addedBooks.title}</h1>
<h2 class="author">${addedBooks.author}</h2>
<button class="remove-btn">remove</button>
`;
  bookSection.appendChild(book);

  myBooks.push(addedBooks);
  localStorage.setItem('books', JSON.stringify(myBooks));
  const removeBtn = document.querySelectorAll('.remove-btn');
  removeBtn.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.target.closest('div').remove();
    });
    bookAuthor.value = '';
    bookTitle.value = '';
  });
});
