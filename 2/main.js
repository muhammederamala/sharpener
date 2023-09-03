var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

form.addEventListener('submit', addItem);

itemList.addEventListener('click', removeItem);

filter.addEventListener('keyup',filterItems);


function addItem(e){
    e.preventDefault();


    var newItem = document.getElementById('item').value;

    var li = document.createElement('li');
    li.className = 'list-group-item';
    
    li.appendChild(document.createTextNode(newItem));

    var deleteBtn = document.createElement('button');
    
    // add classes
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('X'));

    li.appendChild(deleteBtn);


    itemList.appendChild(li)
}


function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li = e.target.parentElement;
            itemList.removeChild(li);

        }
    }
}


function filterItems(e){
    var text = e.target.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');

    Array.from(items).forEach(function(item){
        var itemname = item.firstChild.textContent;
        
        if(itemname.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
        }
        else{
            item.style.display = 'none';
        }
    })
}

// Retrieve existing items from local storage or initialize an empty array
let items = JSON.parse(localStorage.getItem('items')) || [];

// Function to refresh the displayed list
function refreshList() {
  const itemList = document.getElementById('items');
  itemList.innerHTML = '';

  items.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `${item.name} <button class="btn btn-danger btn-sm float-right delete" data-index="${index}">X</button>`;
    itemList.appendChild(listItem);
  });
}

// Add item to the list and update local storage
function addItemToLocalStorage(item) {
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  refreshList();
}

// Remove item from the list and update local storage
function removeItemFromLocalStorage(index) {
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
  refreshList();
}

// Add item to the list when the form is submitted
document.getElementById('addForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const newItemName = document.getElementById('item').value.trim();

  if (newItemName !== '') {
    const newItem = {
      id: Date.now(), // You can use a unique identifier like a timestamp
      name: newItemName,
    };

    addItemToLocalStorage(newItem);
    document.getElementById('item').value = '';
  }
});

// Remove item from the list when the delete button is clicked
document.getElementById('items').addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    const index = e.target.getAttribute('data-index');
    removeItemFromLocalStorage(index);
  }
});

// Initial list display
refreshList();
