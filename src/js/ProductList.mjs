import { renderListTemplate } from "./utils.mjs";

export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init(){
        const list = await this.dataSource.getData();

        this.renderList(list);
    }

    renderList(list){
        renderListTemplate(productCardTemplate, this.listElement, list);
    
    }
}

function productCardTemplate(product){
        return `<li class="product-card">
        <a href = "product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt= "Image of ${product.NameWithoutBrand}">
        <h2 class = "card__brand">${product.Brand.Name} </h2>
        <h3 class = "card__name">${product.Name} </h3>
        <p class = "card__price"> $${product.FinalPrice.toFixed(2)} </p>
        </a>
        </li>
        `
    }