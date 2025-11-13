import { setLocalStorage, getLocalStorage, } from "./utils.mjs";

export default class ProductData {

    constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    }

    async init () {
        
        document.getElementById('addToCart')
                .addEventListener('click', this.addToCart.bind(this));

        this.dataSource.findProductById(this.productId).then(product => {
        this.product = product;    });
        
        this.renderProductDetails();
    }

    addProductToCart(product) {
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails(product) {
        document.querySelector('brand').textContent = product.Brand;
        document.querySelector('name').textContent = product.Name;
        document.getElementById('price').textContent = product.Price;
        document.getElementById('color').textContent = product.Color;
        document.getElementById('description').textContent = product.Description;

        const image = document.createElement('img');
        image.src = product.Images.PrimaryLarge;
        image.alt = product.Name

        document.getElementById('addToCart').dataset.id = product.Id;

    }

}