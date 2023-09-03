var headerTitle = document.getElementById('main-header');

headerTitle.style.borderBottom = 'solid 3px black'

var addItems = document.getElementById('addItems');
addItems.style.fontWeight = 'bold'

var itemList = document.querySelector('#items')
itemList.parentNode.style.backgroundColor = 'whitesmoke'

itemList.firstElementChild.style.backgroundColor = 'red'
itemList.lastElementChild.style.backgroundColor = 'blue'

itemList.nextElementSibling.style.backgroundColor = 'yellow'


var newDiv = document.createElement('div');
newDiv.className = 'hello';
newDiv.id = 'hello1';
newDiv.setAttribute('title','hello,div')

var divText = document.createTextNode("hello world");
newDiv.appendChild(divText);

var container = document.querySelector('header .container');
var h1 = document.querySelector('header .h1');

container.insertBefore(newDiv, h1)

console.log(newDiv)
