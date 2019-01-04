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
5. Добавить возмоджость фильтрации таблицы по возрасту, полу, компании, несколько
фильтров должны работать вместе
6. Добавить поиск по имени, фамилии, email (один поиск который ищет по трем полям),
поиск должен взаимодействовать с фильтрами
*/

var getJSON = function(url, callback) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

getJSON('https://next.json-generator.com/api/json/get/E1HDvnx1I',
function(err, data) {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your query count: ' + data.query.count);
  }
});