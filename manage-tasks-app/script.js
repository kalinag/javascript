const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];



// Get Arrays from localStorage if available
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Buy a present', 'Study'];
    progressListArray = ['Learn something new', 'Read a book'];
    completeListArray = ['Go shopping', 'Get a haircut'];
    onHoldListArray = ['Remodel the kitchen'];
  }
}



// Set localStorage Arrays
const updateSavedColumns=() =>{
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];

  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];

  arrayNames.forEach((arrayName, index )=> {
    localStorage.setItem(`${arrayName}Items`,JSON.stringify(listArrays[index]));
  });
}


// filter to remove empy items
const filtered = (array) => {
  
  const filteredArray = array.filter(item=>item!==null);
  return filteredArray;
}



// Create DOM Elements for each list item
const createItemEl=(columnEl, column, item, index) =>{

  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item')
  listEl.textContent=item;
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute('onfocusout',`editItem(${index},${column})`)
  //append
  columnEl.appendChild(listEl);

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
const updateDOM=() =>{
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList,0, backlogItem, index);
  })
  backlogListArray = filtered(backlogListArray);
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList,1, progressItem, index);
  })
  progressListArray = filtered(progressListArray);

  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList,2, completeItem, index);
  })
  completeListArray = filtered(completeListArray);

  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList,3, onHoldItem, index);
  })
  onHoldListArray = filtered(onHoldListArray);

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad=true;
  updateSavedColumns();

}

// edit or delete items
const editItem = (id, column)=> {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;
  console.log(selectedColumnEl[id].textContent)
  if (!selectedColumnEl[id].textContent){
    delete selectedArray[id];
  }
  console.log(selectedArray)
  updateDOM()
}

//add to column list
const addToColumn =(column) =>{
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent='';
  updateDOM();
}


// show add item input
const showInputBox=(column) =>{
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

//hide item input
const hideInputBox=(column) =>{
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

updateDOM();