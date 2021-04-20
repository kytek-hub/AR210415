export {}

// when begin we will have IDS of user and product start by 1, 
// each time when we create user or product it will automately increase ID number
let new_user_id: number = 1;
let new_product_id: number = 1;


// Database 
let products_DB: IProduct[] = [];
let users_DB: IUser[] = [];


//  User
interface IUser{
    readonly id: number,
    name: string,
    age: number,
    cart: IOrderItem[],
    add_to_cart: (product_id: number) => void;
    minus_to_cart: (product_id: number) => void;
    remove_item_from_cart: (product_id: number) => void
    checkout: () => boolean
}

class User implements IUser {
    id: number;
    name: string;
    age: number;
    cart: IOrderItem[]=[];
    constructor (id:number, name:string, age: number){
        this.id = id;
        this.name = name;
        this.age = age;
    }

    add_to_cart(product_id: number) {
        let filter_item_arr = this.cart.filter((item) => item.product_id === product_id)
        
        if (filter_item_arr.length <= 0){
            let new_order_item = new OrderItem(product_id)
            this.cart.push(new_order_item)
        } else {
            let filter_item = filter_item_arr[0];
            this.cart[this.cart.indexOf(filter_item)].quantity++
        }
    }

    minus_to_cart(product_id: number) {
        let filter_item_arr = this.cart.filter((item) => item.product_id === product_id);
        let filter_item = filter_item_arr[0];
        filter_item.quantity--;
        if (filter_item.quantity <=0 ){
            this.remove_item_from_cart(product_id);
        }      
    }

    remove_item_from_cart(product_id: number){
        let item_index: number = this.cart.indexOf(this.cart.filter((item) => item.product_id === product_id)[0]);
        this.cart = this.cart.slice(0, item_index).concat(this.cart.slice(item_index+1));
    }

    checkout(){
        return true
    }
}


const createNewUser = (name: string, age: number) => {
    let user: IUser = new User(new_user_id, name, age);
    new_user_id ++;
    users_DB.push(user)
    return user;
}


// Product
enum productStatus{
    available='available',
    outStock='outStock',
    hidden='hidden',
}


interface IProduct{
    readonly id: number;
    name: string;
    description: string;
    price: number;
    status: productStatus;
    quantity: number;
    changePrice: (number) => void;
    changeDescription: (string) => void;
    checkAvailable: () => void
    hideProduct: () => void;
}

class Product implements IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    status: productStatus;
    constructor(id: number, name:string, description: string, price: number, quantity: number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.checkAvailable();
    }

    changePrice(newPrice: number){
        this.price = newPrice;
    }

    changeDescription(newDescription:string){
        this.description =  newDescription;
    }

    changeQuantity(newQuantity){
        this.quantity = newQuantity
    }
    
    checkAvailable(){
        if (this.quantity > 0 && this.status != productStatus.hidden ){
            this.status = productStatus.available
        }  else if (this.status != productStatus.hidden) {
            this.status = productStatus.outStock
        }
    }
    hideProduct(){
        this.status = productStatus.hidden;
    }
    
}

const createNewProduct = (name:string, description: string,price: number, quantity: number) => {
    let product = new Product(new_product_id, name,description,price, quantity);
    new_product_id++;
    products_DB.push(product)
    return product
}


// Order Items
interface IOrderItem {
    product_id: number,
    quantity: number,
    total_money: () => number, 
}

class OrderItem implements IOrderItem{
    product_id: number;
    quantity: number = 1;
    constructor(product_id: number, ){
        this.product_id = product_id
    }
    total_money(){
        const price = products_DB.filter((item) => this.product_id === item.id)[0].price
        return this.quantity*price
    }
}


// Run program

// Create User

let user1 = createNewUser('donga', 29)
let user2 = createNewUser('naruto', 27)
console.log(users_DB)


// Create product
createNewProduct('Ao phong', 'Luon vui tuoi', 2000000, 17)
createNewProduct('Quan jean rach goi', 'Gu xi', 4000000, 4)
createNewProduct('Quan jean rach dit', 'Hoi met', 9000000, 10)
createNewProduct('Ao sida', 'Cha neo', 1000000, 20)
createNewProduct('Thao duoc', 'nha lam', 145000, 0)

console.log(products_DB)

// Add and minus product
user2.add_to_cart(2);
user2.add_to_cart(1);
user2.add_to_cart(2);
user2.add_to_cart(3);
user2.add_to_cart(4);
user2.minus_to_cart(4)

console.log(user2.cart)

// [
//     OrderItem { quantity: 2, product_id: 2 },
//     OrderItem { quantity: 1, product_id: 1 },
//     OrderItem { quantity: 1, product_id: 3 },
//   ]


