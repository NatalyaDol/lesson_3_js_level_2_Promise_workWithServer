var blockForGood =   document.querySelector('.goods-list');
var blockForGoodTitle = document.getElementById('goods-list__text__title');

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online­store­api/master/responses';
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

    fetchGoods() {
        makeGETRequest(`${API_URL}/catalogData.json`)
            .then((goods) => {this.goods = JSON.parse(goods);
                console.log(`${goods}`)})
            .then(() => {this.render()})
            .catch(err => {console.error('err')})
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

//Теперь, чтобы вывести список, нужно создать экземпляр класса GoodsList, вызвать для него метод fetchGoods, 
//чтобы записать список товаров в свойство goods, и вызвать render().

function makeGETRequest(url) {

    return new Promise ((resolve, reject) => {
        let time = Math.random() * 100;
        console.log(time);
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (time <= 60) {
                    resolve(xhr.responseText);
                } else if ( (time > 60) && (time <= 80) ) {
                    let status = 404;
                    reject(status);
                } else if (time > 80 ) {
                    setTimeout((status) =>{
                        status = 500;
                        reject(status)
                    }, 3000);
                };
            }
        }
            
       
        xhr.send();
        xhr.open('GET', url, true);
        
        return Promise; 
    });
};



var openCartServerClick = () => {
    const list = new GoodsList();
    list.fetchGoods(() => {
        list.render(); 
    });
    
};