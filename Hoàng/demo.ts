interface IProduct {
    uid: number;
    name: string;
    price: number;
    display_name?: string;
    img_cover?: string;
    inStock: boolean;
    checkInStock: (uid: number, name: string) => boolean;
    showMessage: (prod_name: string, text: string) => void;
  }
  
  interface ICart {
    uid: number;
    name: string;
    quantity: number;
    final_price: number;
    addToCart: (prodInfo: IProduct) => string;
    decreaseQty: (prodInfo: IProduct) => void;
    increaseQty: (prodInfo: IProduct) => void;
    resetCart: () => void;
    checkCart: () => boolean;
  }
  
  interface IUser {
    userId: number;
    fullName: string;
    account: string;
    password: string;
    phoneNumber: string;
    address: string;
    email?: string;
    order?: {
      status: string;
      data: ICart;
    };
    initUser: (
      acc: string,
      pass: string,
      fullName: string,
      phoneNumber: string,
      address: string,
      email: string
    ) => string;
    submitCheckout: (data: ICart) => string;
    checkValidUser: (acc: string, pass: string, cartData: ICart) => string;
  }
  
  class Product implements IProduct {
    uid: number;
    name: string;
    display_name: string;
    img_cover: string;
    price: number;
    inStock: boolean;
  
    showMessage = (prod_name: string, text: string): void => {
      console.log(`Sản phẩm ${prod_name} ${text}`);
    };
  
    checkInStock = (product_id: number, product_name: string): boolean => {
      if (product_id === this.uid && this.inStock) {
        return true;
      }
      this.showMessage(product_name, "hiện tại không còn hàng");
      return false;
    };
  
    constructor(
      uid: number,
      name: string,
      price: number,
      display_name = "",
      img_cover = "",
      inStock = true
    ) {
      this.uid = uid;
      this.name = name;
      this.price = price;
      this.display_name = display_name;
      this.img_cover = img_cover;
      this.inStock = inStock;
    }
  }
  
  class Cart implements ICart {
    uid: number;
    name: string;
    quantity: number;
    final_price: number;
  
    checkCart = (): boolean => {
      if (this.quantity === 0) {
        console.log("Giỏ hàng hiện tại đang trống");
        return false;
      }
      console.log(
        `Giỏ hàng hiện tại đang có: ${this.name} x${this.quantity} với giá ${this.final_price} VND`
      );
      return true;
    };
  
    addToCart = (prodInfo: IProduct): string => {
      const { price = 0, uid = 0, name = "" } = prodInfo;
      if (!prodInfo.checkInStock(uid, name)) return "fail";
      if (!this.checkCart()) {
        prodInfo.showMessage(name, "đã được thêm vào giỏ hàng");
        this.quantity += 1;
        this.uid = uid;
        this.name = name;
        this.final_price = this.quantity * price;
        return "success";
      }
    };
  
    decreaseQty = (prodInfo: IProduct): void => {
      const { price = 0, uid = 0, name = "" } = prodInfo;
      if (this.uid === uid) {
        this.quantity -= 1;
        this.final_price = this.quantity * price;
        if (this.quantity > 0) {
          prodInfo.showMessage(
            name,
            `hiện tại đang có số lượng là: ${this.quantity} trong giỏ hàng`
          );
        } else {
          this.quantity = 0;
          this.uid = 0;
          this.name = "";
          this.final_price = this.quantity * price;
          prodInfo.showMessage(name, `đã được xóa khỏi giỏ hàng`);
        }
      }
    };
  
    increaseQty = (prodInfo: IProduct): void => {
      const { price = 0, uid = 0, name = "" } = prodInfo;
  
      if (this.uid === uid) {
        prodInfo.showMessage(
          name,
          `hiện tại đang có số lượng là: ${this.quantity} trong giỏ hàng`
        );
        this.quantity += 1;
        this.final_price = this.quantity * price;
      }
      prodInfo.showMessage(
        name,
        "hiện tại chưa có. Bạn có muốn thêm vào giỏ hàng ?"
      );
      this.addToCart(prodInfo);
    };
  
    resetCart = (): void => {
      this.uid = 0;
      this.final_price = 0;
      this.quantity = 0;
      this.name = "";
      console.log("Giỏ hàng đang trống. Bạn có muốn tiếp tục mua sắm ?");
    };
  
    constructor() {
      this.quantity = 0;
      this.final_price = 0;
    }
  }
  
  class User implements IUser {
    userId: number;
    fullName: string;
    account: string;
    password: string;
    phoneNumber: string;
    address: string;
    email?: string;
    order?: {
      status: string;
      data: ICart;
    };
  
    initUser = (acc, pass, fullName, phoneNumber, address, email = "") => {
      this.userId = this.userId >= 0 ? +this.userId + 1 : 1;
      this.fullName = fullName;
      this.account = acc;
      this.password = pass;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.email = email;
      if (
        fullName.length &&
        acc.length &&
        pass.length &&
        phoneNumber.length &&
        address.length
      ) {
        console.log("Đăng ký thành công");
        return "success";
      } else {
        console.log("Chưa nhập đủ thông tin yêu cầu");
        this.userId = 0;
        return "fail";
      }
    };
  
    checkValidUser = (acc = "", pass = "", cartData = null): string => {
      if (!this.userId) {
        console.log("Chưa có tài khoản. Vui lòng tạo tài khoản mới");
        return "not exist user";
      }
      if (
        acc.length &&
        pass.length &&
        pass === this.password &&
        acc === this.account
      ) {
        console.log("Đăng nhập thành công");
        return "login success";
      } else {
        console.log(
          "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu"
        );
        return "login fail";
      }
    };
  
    submitCheckout = (data: ICart): string => {
      if (data.checkCart()) {
        this.order = {
          status: "SUCCESS",
          data,
        };
        console.log(`Đơn hàng đã tạo thành công`);
        data.resetCart();
      } else {
        this.order = {
          status: "FAIL",
          data,
        };
        console.log("Vui lòng kiểm tra lại giỏ hàng");
      }
      return this.order.status;
    };
  
    constructor() {
      this.userId = 0;
      this.account = "";
      this.password = "";
      this.fullName = "";
      this.phoneNumber = "";
      this.address = "";
      this.email = "";
      this.order = {
        status: "",
        data: null,
      };
    }
  }
  
  // 1. Tạo sản phẩm
  // 2. Thêm sản phẩm vào giỏ hàng tạm thời
  /** 
   *  3. KH muốn thanh toán => kiểm tra userId và cart id:
   @  - đúng: load thông tin giỏ hàng => thanh toán success => clear giỏ hàng
   @  - sai: lưu thông tin giỏ hàng vào localStorage
   * */
  
  // Demo
  // 1. Tạo 1 sản phẩm bất kì
  const product1 = new Product(1, "iPhone 12 Promax 512gb", 35000000);
  console.log("Thông tin sản phẩm", product1);
  
  console.log("=======================================");
  
  // 2. Thêm sản phẩm vào giỏ hàng
  const cart1 = new Cart();
  cart1.addToCart(product1);
  
  console.log("=======================================");
  
  // thay đổi số lượng sản phẩm trong giỏ hàng
  cart1.decreaseQty(product1);
  cart1.decreaseQty(product1);
  cart1.increaseQty(product1);
  
  console.log("=======================================");
  
  // 3. Kiểm tra thông tin user
  const user1 = new User();
  user1.checkValidUser();
  
  console.log("=======================================");
  
  user1.initUser("hoang123", "123456", "hoang", "0123456789", "trai dat");
  user1.checkValidUser("hoang123", "123456789", cart1);
  
  console.log("=======================================");
  
  user1.checkValidUser("hoang123", "123456", cart1);
  
  console.log("=======================================");
  
  user1.submitCheckout(cart1);
  