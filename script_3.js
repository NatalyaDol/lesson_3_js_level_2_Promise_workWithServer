var blockForGood =   document.querySelector('.goods-list');
var blockForGoodTitle = document.getElementById('goods-list__text__title');


// const goods = [
//     { product_name: 'Shirt', price: 150 },
//     { product_name: 'Socks', price: 50 },
//     { product_name: 'Jacket', price: 350 },
//     { product_name: 'Shoes', price: 250 },
//   ];

  //Прежде всего у нас есть товар, создадим для него класс GoodsItem. 
  //На текущем этапе у него будет два свойства – title и price – и один метод render, 
  //который будет возвращать html­разметку. 
class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div
    class="goods­item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    } 
}

//метод для заполнения списка. Позже мы будем получать данные с сервера, 
//поэтому создадим метод fetchGoods, но пока запишем в массив goods статичный список товаров:
class GoodsList {
    constructor() {
      this.goods = [];
    }

    // fetchGoods() {
    //   this.goods = [
    //     { product_name: 'Shirt', price: 150 },
    //     { product_name: 'Socks', price: 50 },
    //     { product_name: 'Jacket', price: 350 },
    //     { product_name: 'Shoes', price: 250 },
    //     ];
    // }
    //Ещё один метод – вывод списка товаров. Создадим для этого действия метод render(). 
    //Для каждого элемента массива goods будем создавать экземпляр класса GoodsItem и запрашивать его разметку.
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.product_name, good.price);
          listHtml += goodItem.render();
        });
        blockForGood.innerHTML = listHtml;
    }
}

function makeGetRequest (url) {

    return new Promise ((resolve, reject) => {
        let xhr;
        let fakeError = Math.round(Math.random() * 100);
        console.log(fakeError);
        

        if ( 20 < fakeError && fakeError <= 40) {
            url += 'n/a_file_at_server';
        } 
        if (fakeError <= 20) {
            setTimeout(() => {
                reject('превышено время ожидания')
            }, 3000);
        }  
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        // } else (window.ActiveXObject) {
        //     xhr = new ActiveXObject("Microsoft.XMLHTTP");
        // }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                xhr.status === 404 ? reject (`404 - файл по адресу  ${url} не найден `) : resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        if (fakeError > 20) {
            xhr.send();
        }
    })
}

const div = document.getElementById('body');

const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online­-store­-api/master/responses';
makeGetRequest(`${url}/catalogData.json`)
    .then((response) => {
        div.innerText += response;
    })
    .catch((error) => {
        div.innerText = error;
    });

    