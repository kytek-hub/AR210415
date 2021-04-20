export {}
// let text:string = 'hello world!';
// let text2: any = text;
// let text3 = text2;
// let num1: number = 20000;
// let arr1: Array<boolean> = [true, false, null, undefined]

// let obj_student: {id: number, name:string} = {id:10, name:'donga'}

// text3 = 20;
// console.log(text + num1) 
// console.log(arr1)

// bai tap: Khai bao 3 object cho project con: card, product, user, voucher. co su dung chung voi nhau. It nhat 3 function trong interface


// let cardObject: {id: number, name:string,quantity: number, price: number, decription: string, image: string[]} = 

interface Person {
    firstName: string,
    lastName: string,
    addToCart: () => string
}

let person1: Person = {firstName: 'Dong A', lastName: 'Dang The', addToCart: ()=> 'hi'}

class Person implements Person {
    firstName = 'ihhi';
    lastName = 'hehe';
}

const person2 = new Person()
console.log(person2.firstName)

interface ICart {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    images: string[];
    addToCart: (id:number)=> boolean;
}

class CCart implements ICart {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    images: string[];
    addToCart = (id:number): boolean => true 
    hello: string
    constructor(id: number){
        if (this.id === id){
            this.quantity += 1
            this.price += this.price
        } else {
            this.quantity = 1
        }
    }
}

const newCart = new CCart(20)

interface Product {
    id:number;
    
}




