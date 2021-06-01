const searchBtn = document.getElementById('search-btn')
const input = document.getElementById('input')
const btn = document.getElementById('btn')
const bookList = document.querySelector('.book-list')


const getApi = async() => {
    clearScreen()
    // const url = `https://www.googleapis.com/books/v1/volumes?q=flower+inauthor:keyes&key=AIzaSyDTRvmOXoKFshQxMljuS3hFSdFNiwROC2E`
    const url = `https://www.googleapis.com/books/v1/volumes?q=${input.value}`
    const response = await fetch(url);
    const data = await response.json();
    const {items} = data
    items.forEach((item)=> {
        const title = item.volumeInfo.title
        const author = item.volumeInfo.authors
        const cover = item.volumeInfo.imageLinks.thumbnail
        const publishedDate = item.volumeInfo.publishedDate
        const published = item.volumeInfo.publisher
        const link = item.volumeInfo.infoLink
        createBookEl(title,author,cover,publishedDate, published,link)
    })
    
    
    
}


const createBookEl = (title,author,cover, publishedDate,published,link) => {
    const bookItem = document.createElement('li')
    bookItem.classList.add('list-item')
    const markup = `
    <div class= 'book-cover'>
    <img src = ${cover}alt='cover'>
    </div>
    <div class='book-info'>
        <h2 class='book-title'><span class='book-title-style'>${title}</span></h2>
        <h4 class = 'book-author'><span class='book-title-style'>Authors:</span>${author}</h4>
        <h4 class = 'book-author'><span class='book-title-style'>Published date:</span>${publishedDate}</h4>
        <h4 class = 'book-author'><span class='book-title-style'>Publisher:</span>${published}</h4>
        <a href = ${link} class = 'more-btn'>More</a>
    </div>
   
        `
    
    bookItem.innerHTML = markup
    bookList.appendChild(bookItem)

}


const clearScreen =() => {
    bookList.innerHTML = '';
}

btn.addEventListener('click',getApi)
input.addEventListener('click', ()=> {input.value = ''})