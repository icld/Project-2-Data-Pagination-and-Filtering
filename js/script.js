
// adds search within header element
const header = document.querySelector('.header')
header.insertAdjacentHTML('beforeend', `<form class='form' type= 'submit'><label for="search" class="student-search">
<input id="search-input" placeholder="Search by name...">
<button id="sub" type="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
</label></form>`)

const itemsPerPage = 9
const linkList = document.querySelector(".link-list")
const form = document.querySelector('form')
const studentList = document.querySelector('.student-list')
const h2 = document.querySelector('h2')
h2.id = 'h2'
const searchButton = document.querySelector('#sub')
const searchInput = document.querySelector('#search-input');



//creates studentItem from data.js and to studentList to be displayed
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage
   const endIndex = page * itemsPerPage
   studentList.innerHTML = '';
   for (let i in list) {
      if (i >= startIndex && i < endIndex) {
         const name = `${list[i].name.title}. ${list[i].name.first} ${list[i].name.last}`;
         const email = `${list[i].email}`
         const img = `${list[i].picture.medium}`
         const reg = `${list[i].registered.date}`
         const studentItem = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src=${img} alt="Profile Picture">
           <h3>${name}</h3>
           <span class="email">${email}</span>
         </div>
         <div class="joined-details">
           <span class="date">${reg}</span>
         </div>
       </li>`;
         studentList.insertAdjacentHTML("beforeend", studentItem)
      }
   }
}

// determines the number of pages to create, and creates the buttons for those pages
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage)
   linkList.innerHTML = '';
   for (let i = 1; i <= numOfPages; i++) {
      const addButton = `<li>
<button id = "pagButton" type="button">${i}</button>
</li>`;
      linkList.insertAdjacentHTML("beforeend", addButton);
      const firstButton = document.querySelector('#pagButton');
      firstButton.className = 'active'
   }

}

// listens on pagination buttons.  Changes page based on text within, and changes appearance of the buttons
linkList.addEventListener('click', (event) => {
   const targ = event.target
   const buttons = document.getElementsByTagName('button')
   for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = '';
      targ.className = 'active'
      showPage(data, targ.textContent)
   }
})

// creates a div alert and changes search button style
function alertMe() {
   const alertMe = document.createElement('div')
   const header = form.parentNode
   searchButton.style.backgroundColor = 'red';
   alertMe.className = 'alert'
   alertMe.style.backgroundColor = 'red'
   alertMe.style.fontSize = '1.76em'
   alertMe.textContent = `Please Enter a Name`;
   header.insertBefore(alertMe, form)
}
// creates a NO MATCH alert
function alertNoMatch() {
   const alertNoMatch = document.createElement('div')
   const header = form.parentNode
   searchButton.style.backgroundColor = 'red';
   alertNoMatch.className = 'alertNoMatch'
   alertNoMatch.style.backgroundColor = 'red'
   alertNoMatch.style.fontSize = '1.76em'
   alertNoMatch.textContent = `No Match Found!`;
   header.insertBefore(alertNoMatch, form)
}
// removes alert and alert style
function removeAlert() {
   searchButton.style = ''
   const alertMe = document.getElementsByClassName('alert')[0]
   const alertNoMatch = document.getElementsByClassName('alertNoMatch')[0]
   if (alertMe) {
      header.removeChild(alertMe)
   }
   if (alertNoMatch) {
      header.removeChild(alertNoMatch)
   }
}

// searches student names, displays only matching, and alerts if search field is empty
function studentSearch() {
   const userInput = searchInput.value.toLowerCase();
   const filter = [];
   if (userInput.length === 0 && searchButton.backgroundColor != 'red') {
      alertMe()
   } else if (userInput.length !== 0) {
      removeAlert()
      for (let i in data) {
         const firstName = data[i].name.first.toLowerCase()
         const lastName = data[i].name.last.toLowerCase()
         if (firstName.includes(userInput) || lastName.includes(userInput)) {
            filter.push(data[i]);
         }
      }
      showPage(filter, 1)
      addPagination(filter)
   } else {
      showPage(data, 1);
      addPagination(data)
   }
}
// listens on key clicks in search. Calls studentSearch and removes the alert
searchInput.addEventListener('keyup', () => {
   studentSearch();
   removeAlert()
})

// removes alert when clicking back inside the search input field 
searchInput.addEventListener('click', () => {
   removeAlert()
})

// listens on button click.  calls student search and removes alert
searchButton.addEventListener('click', (e) => {
   e.preventDefault();
   removeAlert();
   studentSearch();

})

// resets page on clicking h2
h2.addEventListener('click', () => {
   showPage(data, 1)
   addPagination(data)
   removeAlert()
   searchInput.value = ''
})

// when hover over h2, change color, and make cursor a pointer
h2.addEventListener('mouseover', () => {
   h2.style.color = 'teal'
   h2.style.cursor = 'pointer'
})

// removes hover effect when mouse is not over h2
h2.addEventListener('mouseleave', () => {
   h2.style.color = ''
})
// creates page and pagination
showPage(data, 1)
addPagination(data)