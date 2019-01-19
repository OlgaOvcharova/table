/*
1. Сверстать таблицу. Вида: First name, Last name, Sex, Age, Email, Phone number, Company
2. Получить данные по ссылке: https://next.json-generator.com/api/json/get/E1HDvnx1I
3. Заполнить таблицу информацией из полученных данных
4. Добавить возможность сортировать таблицу по любой из колонок
5. Добавить возможность фильтрации таблицы по возрасту, полу, компании, несколько
фильтров должны работать вместе
6. Добавить поиск по имени, фамилии, email (один поиск который ищет по трем полям),
поиск должен взаимодействовать с фильтрами
*/

// 1. Создаём новый объект XMLHttpRequest


var xhr = new XMLHttpRequest();
let users = [];

xhr.open('GET', 'https://next.json-generator.com/api/json/get/E1HDvnx1I', false);
xhr.send();

if (xhr.status != 200) {
  alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
} else {
  users = JSON.parse(xhr.responseText); // responseText -- текст ответа.
}

let tbody = document.querySelector('tbody');
let trhead = document.querySelector('thead').children[0];
let search = document.querySelector('#search');

generateTable(users);

function generateTable(users){
    tbody.innerHTML = '';
    let companyNamesForFilters = {};
    let companyFilters = document.getElementById('chooseCompany');

    users.forEach((element) => {
        let trhead = document.createElement('tr');
        let tableKeys = [element.name.first, element.name.last, element.sex, element.age, element.email, element.phone, element.company];
        for (let i = 0; i < tableKeys.length; i++) {
            let td = document.createElement('td');
            td.innerHTML = tableKeys[i];
            trhead.appendChild(td);
        }
        tbody.appendChild(trhead);
        companyNamesForFilters[element.company] = element.company;
    });

    let keysSorted = Object.keys(companyNamesForFilters)
                            .sort((nameA, nameB) => nameA < nameB ? -1 : 1);

    if (companyFilters.children.length < 5) {

        for (let key of keysSorted) {
            let option = document.createElement('option');
            option.innerHTML = key;
            companyFilters.appendChild(option);
        }
    }
}

let table = document.querySelector('.table');
let sortFromAtoZ = [];

trhead.addEventListener('click', (event) => {
  let targetEvent = +event.target.dataset.sort;
  sortFromAtoZ[targetEvent] = !sortFromAtoZ[targetEvent];
  
  let usersSort = users.sort((per1, per2) => {
    let key1 = [per1.name.first, per1.name.last, per1.sex, per1.age, per1.email, per1.phone, per1.company];
    let key2 = [per2.name.first, per2.name.last, per2.sex, per2.age, per2.email, per2.phone, per2.company];
    let quality1, quality2;

    if (isNaN(Number(key1[targetEvent]))) {
      quality1 = key1[targetEvent].toUpperCase();
      quality2 = key2[targetEvent].toUpperCase();
    } else {
      quality1 = Number(key1[targetEvent]);
      quality2 = Number(key2[targetEvent]);
    }
    
    if (sortFromAtoZ[targetEvent]) {
      return (quality1 < quality2) ? -1 : 1;
    } else {
      return (quality1 > quality2) ? -1 : 1;
    }
  });
  generateTable(usersSort);
});

function searchInTable(searchExpression) 
{
  let filteredUsers = applyFiltersFromCollection();
  let usersSearch = filteredUsers.filter((user) =>
         user.name.first.indexOf(searchExpression) !== -1 
      || user.name.last.indexOf(searchExpression) !== -1 
      || user.email.indexOf(searchExpression) !== -1
    )
  generateTable(usersSearch);
}

var filterCollection = {};

function filtration(filterName, value) {
  processFilter(value, filterName);

  let filteredUsers = applyFiltersFromCollection();

  generateTable(filteredUsers);
}

function processFilter(value, filterName) {
  if (value === 'all' || value === '') {
    delete filterCollection[filterName];
  }
  else {
    filterCollection[filterName] = value;
  }
}

function applyFiltersFromCollection() {
  let temproraryUsers = users;

  for (const [key, filterExp] of Object.entries(filterCollection)) {
    let filterRules = function (user) {
      return user[key] === filterExp;
    };

    if (key === "min age")
      filterRules = function (user) {
        return parseInt(user.age) >= parseInt(filterExp);
      };
    if (key === "max age")
      filterRules = function (user) {
        return parseInt(user.age) <= parseInt(filterExp);
      };

    temproraryUsers = temproraryUsers.filter(filterRules); 
  }

  return temproraryUsers;
}