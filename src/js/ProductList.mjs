import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `
        <div class = "product-card">
            <h3 class ="brand">${product.Brand}</h3>
            <h2 class="name">${product.Name}</h2>   
            <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="${product.Name}">
                <p class="product-card__price">$${product.Price}</p>
                <p class="product__color">${product.Color}</p>
                <p class="product__description">${product.Description}</p>
            </a>
         </div>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
    }


    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
    const htmlStrings = list.map(productCardTemplate);
    this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    }
}