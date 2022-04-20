window.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.querySelector('.home');
  const bookSection = document.querySelector('.book-list');
  const bookTitle = document.querySelector('#title');
  const bookAuthor = document.querySelector('#author');
  const addBtn = document.querySelector('#submit');
  const homeSection = document.querySelector('.books-container');
  const addSection = document.querySelector('.add-new');
  const contactSection = document.querySelector('.contact-information');
  homeSection.classList.add('showContent');
  homeLink.classList.add('select');
  let prevPage = '';
  let prevLink = '';
  let currentPage = homeSection;
  let selectedLink = '';
  addSection.classList.add('hideContent');
  contactSection.classList.add('hideContent');
  const Links = document.querySelectorAll('.link');
  Links.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const currentLink = event.target.innerHTML;
      if (prevPage) {
        prevLink.classList.remove('select');
        prevPage.classList.remove('showContent');
        prevPage.classList.add('hideContent');
        if (currentLink === 'List') {
          selectedLink = event.target;
          selectedLink.classList.add('select');
          prevLink = selectedLink;
          currentPage = homeSection;
          currentPage.classList.remove('hideContent');
          currentPage.classList.add('showContent');
          prevPage = currentPage;
        }
        if (currentLink === 'Add new') {
          selectedLink = event.target;
          selectedLink.classList.add('select');
          prevLink = selectedLink;
          currentPage = addSection;
          currentPage.classList.remove('hideContent');
          currentPage.classList.add('showContent');
          prevPage = currentPage;
        }
        if (currentLink === 'Contact') {
          selectedLink = event.target;
          selectedLink.classList.add('select');
          prevLink = selectedLink;
          currentPage = contactSection;
          currentPage.classList.remove('hideContent');
          currentPage.classList.add('showContent');
          prevPage = currentPage;
        }
      } else {
        if (currentLink === 'Add new') {
          homeLink.classList.remove('select');
          selectedLink = event.target;
          selectedLink.classList.add('select');
          prevLink = selectedLink;
          currentPage.classList.remove('showContent');
          currentPage.classList.add('hideContent');
          currentPage = addSection;
          currentPage.classList.remove('hideContent');
          currentPage.classList.add('showContent');
          prevPage = currentPage;
          addBtn.addEventListener('click', () => {
            addSection.classList.add('hideContent');
            homeSection.classList.add('showContent');
            window.location.reload();
          });
        }
        if (currentLink === 'Contact') {
          homeLink.classList.remove('select');
          selectedLink = event.target;
          selectedLink.classList.add('select');
          prevLink = selectedLink;
          currentPage.classList.remove('showContent');
          currentPage.classList.add('hideContent');
          currentPage = contactSection;
          currentPage.classList.remove('hideContent');
          currentPage.classList.add('showContent');
          prevPage = currentPage;
        }
      }
    });
  });
  class Library {
    constructor() {
      this.library = JSON.parse(localStorage.getItem('book-collection')) || [];
    }

    addBook(bookTitle, bookAuthor) {
      const selectedBook = { title: bookTitle.value, author: bookAuthor.value };
      this.library.push(selectedBook);
      this.createBook();
    }

    createBook() {
      bookSection.innerHTML = '';
      for (let i = 0; i < this.library.length; i += 1) {
        const bookContainer = document.createElement('div');
        bookContainer.setAttribute('class', 'container');
        const bookDescription = document.createElement('h2');
        bookDescription.setAttribute('class', 'width');
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'deletebtn');
        deleteBtn.setAttribute('data', i);

        bookDescription.textContent = `${this.library[i].title} by ${this.library[i].author}`;
        deleteBtn.textContent = 'Delete';

        bookContainer.appendChild(bookDescription);
        bookContainer.appendChild(deleteBtn);
        bookSection.appendChild(bookContainer);
      }
      this.deleteBook();
    }

    deleteBook() {
      [...document.querySelectorAll('.deletebtn')].forEach((element) => {
        const elementIndex = parseInt(element.getAttribute('data'), 10);
        element.addEventListener('click', () => {
          this.library.splice(elementIndex, 1);
          localStorage.setItem('book-collection', JSON.stringify(this.library));
          this.createBook();
        });
      });
    }
  }

  const myLibrary = new Library();

  myLibrary.createBook();

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (bookTitle.value === '' || bookAuthor.value === '') {
      return;
    }
    myLibrary.addBook(bookTitle, bookAuthor);
    localStorage.setItem('book-collection', JSON.stringify(myLibrary.library));
    bookTitle.value = '';
    bookAuthor.value = '';
  });
});

function time() {
  const siteDate = document.querySelector('.time');
  const date = new Date();
  const locale = navigator.language;
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: 'false',
  };
  siteDate.textContent = `${date.toLocaleTimeString(locale, options)}`;
}

setInterval(time, 1000);
