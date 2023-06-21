import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

const page = {
    number: 1,
};

const matches = {
    data: books,
};

//'BookElementFactory' FUNCTION
// the 'BookElement' function creates individual DOM elements using document.createElement and appends them to the element container. 

// 'BookElementFactory' function serves as the factory function. It encapsulates the 'BookElement' function and returns it as a closure. 
function BookElementFactory() {

    const showPreview = (author, id, image, title) => {  
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        /*
        *The book's image is represented by an img element (imgElement). It is created using document.createElement('img'), 
        *and the preview__image class is assigned to it.
        * Then the img element is appended as a child to the book element. 
        */
        const imgElement = document.createElement('img');
        imgElement.classList = 'preview__image';
        imgElement.src = image;
        element.appendChild(imgElement);

        const infoElement = document.createElement('div');
        infoElement.classList = 'preview__info';

        const titleElement = document.createElement('h3');
        titleElement.classList = 'preview__title';
        titleElement.innerText = title;
        infoElement.appendChild(titleElement);

        const authorElement = document.createElement('div');
        authorElement.classList = 'preview__author';
        authorElement.innerText = authors[author];
        infoElement.appendChild(authorElement);

        element.appendChild(infoElement);

        return element;
    }
    const hidePreview = () => {
        document.querySelector('[data-list-close]').addEventListener('click', () => {
            document.querySelector('[data-list-active]').open = false
        })
    }
    
    const previewElement = {
        showPreview,
        hidePreview,
    }
    return previewElement
}

// Usage
//the 'BookElement' component and specification of the properties of a book to be rendered by that component.
const BookElement = BookElementFactory();
const book = {
    author: 'authorId',
    id: 'bookId',
    image: 'book.jpg',
    title: 'Book Title',
};

//'BookElement' factory function creates a book element by passing the 'book' object as an argument. 
const bookElement = BookElement(book);
console.log(bookElement);
// Output: <button class="preview" data-preview="bookId"><img class="preview__image" src="book.jpg"><div class="preview__info"><h3 class="preview__title">Book Title</h3><div class="preview__author">Author Name</div></div></button>  


//UPDATE FUNCTIONS:
//Updates the text and disabled state of the "Show more" button based on the remaining books to be displayed.
function updateListButton() {
    const remaining = matches.data.length - page.number * BOOKS_PER_PAGE;
    const button = document.querySelector('[data-list-button]');
    button.innerText = `Show more (${remaining})`;
    button.disabled = remaining <= 0;
}

//Updates the list of book elements displayed on the page.
function updateListItems() {
    const listItems = document.querySelector('[data-list-items]');
    listItems.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (const book of matches.data.slice(0, page.number * BOOKS_PER_PAGE)) {
        const element = BookElement(book);
        fragment.appendChild(element);
    }

    listItems.appendChild(fragment);
}

//Shows or hides a message based on the number of matches or books in the data.
function updateListMessage() {
    const message = document.querySelector('[data-list-message]');
    if (matches.data.length < 1) {
        message.classList.add('list__message_show');
    } else {
        message.classList.remove('list__message_show');
    }
}

//Calls the above three update functions to update the entire book list.
function updateList() {
    updateListItems();
    updateListButton();
    updateListMessage();
}



//EVENT HANDLER FUNCTIONS:
//Handles the click event on the "Show more" button to load and display the next set of books.
function handleListButtonClick() {
    page.number += 1;
    updateListItems();
    updateListButton();
}

//Handles the cancellation of the search overlay by closing it.
function handleSearchCancel() {
    document.querySelector('[data-search-overlay]').open = false;
}

//Handles the cancellation of the settings overlay by closing it.
function handleSettingsCancel() {
    document.querySelector('[data-settings-overlay]').open = false;
}

//Handles the click event on the search icon in the header by opening the search overlay.
function handleHeaderSearchClick() {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
}

//Handles the click event on the settings icon in the header by opening the settings overlay.
function handleHeaderSettingsClick() {
    document.querySelector('[data-settings-overlay]').open = true;
}

//Handles the submission of the settings form by changing the theme and closing the settings overlay.
function handleSettingsFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

    document.querySelector('[data-settings-overlay]').open = false;
}

//Handles the submission of the search form by applying the search filters, updating the list, and closing the search overlay.
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) {
                genreMatch = true;
            }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book);
        }
    }

    page.number = 1;
    matches.data = result;
    updateList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('[data-search-overlay]').open = false;
}

//Handles the click event on a book element in the list by displaying the book preview.
function handleListItemsClick(event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            active = books.find((book) => book.id === node.dataset.preview);
        }
    }


    if (active) {
        document.querySelector('[data-list-active]').open = true;
        document.querySelector('[data-list-blur]').src = active.image;
        document.querySelector('[data-list-image]').src = active.image;
        document.querySelector('[data-list-title]').innerText = active.title;
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        document.querySelector('[data-list-description]').innerText = active.description;
    }
    document.querySelector('[data-list-close]').addEventListener('click', () => {
        document.querySelector('[data-list-active]').open = false
    })
}

// Initialization
/*
*The initialize function is called when the page loads and sets up the initial state of the application. 
*It creates the book elements for the first page, populates the genre and author dropdowns for search filters, 
sets the initial theme based on the user's preference, and attaches event listeners to various elements.
*/
function initialize() {
    const starting = document.createDocumentFragment();

    for (const book of matches.data.slice(0, BOOKS_PER_PAGE)) {
        const element = BookElement(book);
        starting.appendChild(element);
    }

    document.querySelector('[data-list-items]').appendChild(starting);

    const genreHtml = document.createDocumentFragment();
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    genreHtml.appendChild(firstGenreElement);

    for (const [id, name] of Object.entries(genres)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        genreHtml.appendChild(element);
    }

    document.querySelector('[data-search-genres]').appendChild(genreHtml);

    const authorsHtml = document.createDocumentFragment();
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    authorsHtml.appendChild(firstAuthorElement);

    for (const [id, name] of Object.entries(authors)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        authorsHtml.appendChild(element);
    }

    document.querySelector('[data-search-authors]').appendChild(authorsHtml);

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector('[data-settings-theme]').value = 'night';
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.querySelector('[data-settings-theme]').value = 'day';
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

    updateList();

    // Event listeners
    document.querySelector('[data-list-button]').addEventListener('click', handleListButtonClick);
    document.querySelector('[data-search-cancel]').addEventListener('click', handleSearchCancel);
    document.querySelector('[data-settings-cancel]').addEventListener('click', handleSettingsCancel);
    document.querySelector('[data-header-search]').addEventListener('click', handleHeaderSearchClick);
    document.querySelector('[data-header-settings]').addEventListener('click', handleHeaderSettingsClick);
    document.querySelector('[data-settings-form]').addEventListener('submit', handleSettingsFormSubmit);
    document.querySelector('[data-search-form]').addEventListener('submit', handleSearchFormSubmit);
    document.querySelector('[data-list-items]').addEventListener('click', handleListItemsClick);
}

initialize();
