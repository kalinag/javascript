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

// Drag Functionality
let draggedItem;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItem')) {
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
function updateSavedColumns() {
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
function createItemEl(columnEl, column, item, index) {

  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent=item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart','drag(event)');
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute('onfocusout',`editItem(${index},${column})`)
  //append
  columnEl.appendChild(listEl);

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
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
function addToColumn (column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent='';
  updateDOM();
}


// show add item input
function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

//hide item input
function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}


//allows arrays to reflect drag and drop items
function rebuildArrays() {

  backlogListArray=[];
  for(let i=0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }
  progressListArray=[];
  for(let i=0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }
  completeListArray=[];
  for(let i=0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }
  onHoldListArray=[];
  for(let i=0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }
  console.log()
  updateDOM();
}

//drag function
function drag(e) {
  draggedItem = e.target;
}

//column allows dropping
function allowDrop(e){
  e.preventDefault();

}

//when item enters column 
function dragEnter(column) {
  listColumns[column].classList.add('over');
  currentColumn = column;
}

//dropping item 

function drop(e) {
  e.preventDefault();
  listColumns.forEach((column)=> {
    column.classList.remove('over');
  });
  //add item to column
  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);
  rebuildArrays();
}

//on Load
updateDOM();