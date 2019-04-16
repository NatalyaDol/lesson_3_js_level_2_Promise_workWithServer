var blockForGood =   document.querySelector('.goods-list');
var blockForGoodTitle = document.getElementById('goods-list__text__title');

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online­store­api/master/responses';
const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];

  //Прежде всего у нас есть товар, создадим для него класс GoodsItem. 
  //На текущем этапе у него будет два свойства – title и price – и один метод render, 
  //который будет возвращать html­разметку. 
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div
    class="goods­item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    } 
}

//метод для заполнения списка. Позже мы будем получать данные с сервера, 
//поэтому создадим метод fetchGoods, но пока запишем в массив goods статичный список товаров:
class GoodsList {
    constructor() {
      this.goods = [];
    }
    fetchGoods() {
      this.goods = [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
        ];
    }
    //Ещё один метод – вывод списка товаров. Создадим для этого действия метод render(). 
    //Для каждого элемента массива goods будем создавать экземпляр класса GoodsItem и запрашивать его разметку.
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price);
          listHtml += goodItem.render();
        });
        blockForGood.innerHTML = listHtml;
    }
}


//Теперь, чтобы вывести список, нужно создать экземпляр класса GoodsList, вызвать для него метод fetchGoods, 
//чтобы записать список товаров в свойство goods, и вызвать render().

var openCart = (time) => {
    const list = new GoodsList();

    if (time > 60) {
        console.log('загрузка корзины с ожиданием...');
        
        setTimeout(function() {
            list.fetchGoods(); 
            list.render();
            console.log('Готово!!!');
        }, 3000);
       
    } else {
        console.log('Загрузка без ожидания!!!');
        
        list.fetchGoods(); 
        list.render();
    }
};


function makeGETRequest(url, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
  }
    xhr.open('GET', url, true);
    xhr.send();
  }

//Используя promise, реализовать следующие сценарии: 
//а) с вероятностью 60% загрузка данных с сервера прошла успешно (т.е. функция создания запроса из методички) 
//б) с вероятностью 20% реализуется функция ожидания 3 секунды 
//с сообщением о длительном ответе с сервера (запрос на самом деле не должен отправляться. симулируем ситуацию длительного ответа) 
//в) с вероятностью 20% наш запрос уходит по ссылке, в которой есть опечатка (симулируем отсутствие файла на сервере)

var openCartServer = () => {
    let promise = new Promise( (resolve, reject) => {
        let time = Math.random() * 100;
        console.log(time);
        
        if (time <= 80) {
            resolve(time);
        } else {
            reject(console.info('сервер не доступен :'));
           
        }
    });
    return promise;
};

var serverOnline = (time) => {
    console.info('Сервер доступен');
   
    return time;
}
var openCartServerClick = () => {
    
    console.log ('Ждем данные с сервера: ');
   // blockForGoodTitle.innerText = 'Ждем данные с сервера:';
    blockForGood.innerHTML = ' ';
    
    setTimeout( () => {
       
        openCartServer({})

        .then(serverOnline)
        .then(openCart)
        .catch(error => console.error(error));
    }, 2000);
    
};

