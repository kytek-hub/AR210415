"use strict";
exports.__esModule = true;
// when begin we will have IDS of user and product start by 1, 
// each time when we create user or product it will automately increase ID number
var new_user_id = 1;
var new_product_id = 1;
// Database 
var products_DB = [];
var users_DB = [];
var User = /** @class */ (function () {
    function User(id, name, age) {
        this.cart = [];
        this.id = id;
        this.name = name;
        this.age = age;
    }
    User.prototype.add_to_cart = function (product_id) {
        var filter_item_arr = this.cart.filter(function (item) { return item.product_id === product_id; });
        if (filter_item_arr.length <= 0) {
            var new_order_item = new OrderItem(product_id);
            this.cart.push(new_order_item);
        }
        else {
            var filter_item = filter_item_arr[0];
            this.cart[this.cart.indexOf(filter_item)].quantity++;
        }
    };
    User.prototype.minus_to_cart = function (product_id) {
        var filter_item_arr = this.cart.filter(function (item) { return item.product_id === product_id; });
        var filter_item = filter_item_arr[0];
        filter_item.quantity--;
        if (filter_item.quantity <= 0) {
            this.remove_item_from_cart(product_id);
        }
    };
    User.prototype.remove_item_from_cart = function (product_id) {
        var item_index = this.cart.indexOf(this.cart.filter(function (item) { return item.product_id === product_id; })[0]);
        this.cart = this.cart.slice(0, item_index).concat(this.cart.slice(item_index + 1));
    };
    User.prototype.checkout = function () {
        return true;
    };
    return User;
}());
var createNewUser = function (name, age) {
    var user = new User(new_user_id, name, age);
    new_user_id++;
    users_DB.push(user);
    return user;
};
// Product
var productStatus;
(function (productStatus) {
    productStatus["available"] = "available";
    productStatus["outStock"] = "outStock";
    productStatus["hidden"] = "hidden";
})(productStatus || (productStatus = {}));
var Product = /** @class */ (function () {
    function Product(id, name, description, price, quantity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.checkAvailable();
    }
    Product.prototype.changePrice = function (newPrice) {
        this.price = newPrice;
    };
    Product.prototype.changeDescription = function (newDescription) {
        this.description = newDescription;
    };
    Product.prototype.changeQuantity = function (newQuantity) {
        this.quantity = newQuantity;
    };
    Product.prototype.checkAvailable = function () {
        if (this.quantity > 0 && this.status != productStatus.hidden) {
            this.status = productStatus.available;
        }
        else if (this.status != productStatus.hidden) {
            this.status = productStatus.outStock;
        }
    };
    Product.prototype.hideProduct = function () {
        this.status = productStatus.hidden;
    };
    return Product;
}());
var createNewProduct = function (name, description, price, quantity) {
    var product = new Product(new_product_id, name, description, price, quantity);
    new_product_id++;
    products_DB.push(product);
    return product;
};
var OrderItem = /** @class */ (function () {
    function OrderItem(product_id) {
        this.quantity = 1;
        this.product_id = product_id;
    }
    OrderItem.prototype.total_money = function () {
        var _this = this;
        var price = products_DB.filter(function (item) { return _this.product_id === item.id; })[0].price;
        return this.quantity * price;
    };
    return OrderItem;
}());
// Run program
// Create User
var user1 = createNewUser('donga', 29);
var user2 = createNewUser('naruto', 27);
console.log(users_DB);
// Create product
createNewProduct('Ao phong', 'Luon vui tuoi', 2000000, 17);
createNewProduct('Quan jean rach goi', 'Gu xi', 4000000, 4);
createNewProduct('Quan jean rach dit', 'Hoi met', 9000000, 10);
createNewProduct('Ao sida', 'Cha neo', 1000000, 20);
createNewProduct('Thao duoc', 'nha lam', 145000, 0);
console.log(products_DB);
// Add and minus product
user2.add_to_cart(2);
user2.add_to_cart(1);
user2.add_to_cart(2);
user2.add_to_cart(3);
user2.add_to_cart(4);
user2.minus_to_cart(4);
console.log(user2.cart);
// [
//     OrderItem { quantity: 2, product_id: 2 },
//     OrderItem { quantity: 1, product_id: 1 },
//     OrderItem { quantity: 1, product_id: 3 },
//   ]
