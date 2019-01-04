/*
Необходимо:
1. Сверстать таблицу. Вида:
First name Last name Sex Age Email Phone
number
Company
2. Получить данные по ссылке:
https://next.json-generator.com/api/json/get/E1HDvnx1I
3. Заполнить таблицу информацией из полученных данных
4. Добавить возможность сортировать таблицу по любой из колонок
5. Добавить возможность фильтрации таблицы по возрасту, полу, компании, несколько
фильтров должны работать вместе
6. Добавить поиск по имени, фамилии, email (один поиск который ищет по трем полям),
поиск должен взаимодействовать с фильтрами
*/

// 1. Создаём новый объект XMLHttpRequest
var xhr = new XMLHttpRequest();
let ajax;

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
xhr.open('GET', 'https://next.json-generator.com/api/json/get/E1HDvnx1I', false);
// 3. Отсылаем запрос
xhr.send();
// 4. Если код ответа сервера не 200, то это ошибка
if (xhr.status != 200) {
  // обработать ошибку
  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
} else {
  // вывести результат
 ajax = JSON.parse(xhr.responseText); // responseText -- текст ответа.
}


let tbody = document.querySelector('tbody'); 

ajax.forEach(element => { 
   let row = document.createElement('tr');
   let arr = [element.name.first, element.name.last, element.sex, element.age, element.email, element.phone, element.company]; 
   for (let i = 0; i < arr.length; i++) {
       let td = document.createElement('td');
       td.innerHTML = arr[i];
       row.appendChild(td);
   }
   tbody.appendChild(row);
});



let trhead = document.querySelector('thead').children[0];

trhead.addEventListener("click", function(event){  //event.target.innerHTML
    tr = tbody.querySelectorAll('tr');
    let myArrTr = [...tr]; 
    let zuzya =  event.target.dataset.sort;
console.log(zuzya)
    //let arrTarget = [0, 1, 2, 3, ]

    myArrTr.sort(function(tr1, tr2) {
        let a = tr1.children[zuzya].innerHTML;
        let b = tr2.children[zuzya].innerHTML;
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
    });
    
    tbody.innerHTML = '';
    for (let j = 0; j < myArrTr.length; j++) {
        tbody.appendChild(myArrTr[j]);
        
    }
    //console.log();



});


