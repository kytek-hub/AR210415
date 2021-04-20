"use strict";
exports.__esModule = true;
var person1 = { firstName: 'Dong A', lastName: 'Dang The', addToCart: function () { return 'hi'; } };
var Person = /** @class */ (function () {
    function Person() {
        this.firstName = 'ihhi';
        this.lastName = 'hehe';
    }
    return Person;
}());
var person2 = new Person();
console.log(person2.firstName);
var CCard = /** @class */ (function () {
    function CCard(id) {
        this.addToCart = function (id) { return true; };
        if (this.id === id) {
            this.quantity += 1;
            this.price += this.price;
        }
        else {
            this.quantity = 1;
        }
    }
    return CCard;
}());
var newCard = new CCard(20);
