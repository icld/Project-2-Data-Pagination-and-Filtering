
const header = document.querySelector('.header')
header.insertAdjacentHTML('beforeend', `<form class='form' type= 'submit'><label for="search" class="student-search">
<input id="search-input" placeholder="Search by name...">
<button id="sub" type="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
</label></form>`)

const itemsPerPage = 9
const linkList = document.querySelector(".link-list")
const studentList = document.querySelector('.student-list')
const pageDiv = document.querySelector(".page")
const form = document.querySelector('.form');



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

function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage)
   linkList.innerHTML = '';
   for (let i = 1; i < numOfPages; i++) {
      const addButton = `<li>
<button id = "pagButton" type="button">${i}</button>
</li>`;
      linkList.insertAdjacentHTML("beforeend", addButton);
   }
   const firstButton = document.querySelector('#pagButton');
   firstButton.className = 'active'
}


linkList.addEventListener('click', (event) => {
   const targ = event.target
   const buttons = document.getElementsByTagName('button')

   for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = '';
      targ.className = 'active'
      showPage(data, targ.textContent)
   }
})

const searchButton = document.querySelector('#sub')
const searchInput = document.querySelector('#search-input');

function alertMe() {
   const alertMe = document.createElement('div')
   const header = form.parentNode
   searchButton.style.backgroundColor = 'red';
   alertMe.className = 'alert'
   alertMe.style.backgroundColor = 'red'
   alertMe.style.fontSize = '2em'
   alertMe.textContent = `Please try again`;
   header.insertBefore(alertMe, form)
}
function removeAlert() {
   searchButton.style = ''
   const alertMe = document.getElementsByClassName('alert')[0]
   if (alertMe) {
      header.removeChild(alertMe)
   }
}

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
searchInput.addEventListener('keyup', () => {
   studentSearch();
})

searchButton.addEventListener('click', (e) => {
   e.preventDefault();
   removeAlert()
   studentSearch();
})






showPage(data, 1)
addPagination(data)