import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);
const breadcrumbContainer = document.querySelector(".breadcrumb-list");

function renderBreadcrumbs() {
  if (!breadcrumbContainer) return;

  const homeItem = document.createElement("li");
  homeItem.innerHTML = `<a href="/">Home</a>`;

  const categoryItem = document.createElement("li");
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  categoryItem.textContent = formattedCategory;
  categoryItem.setAttribute("aria-current", "page");
  
  breadcrumbContainer.appendChild(homeItem);
  breadcrumbContainer.appendChild(categoryItem);
}

renderBreadcrumbs(category);
