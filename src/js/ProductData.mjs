// ProductData.mjs
export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = "/json/ProductData.json"; // path from root
  }

  // Fetch all products for this category
  async getData() {
    const response = await fetch(this.path);
    const data = await response.json();
    return data[this.category] || [];
  }

  // Find product by ID
  async findProductById(id) {
    const products = await this.getData();
    return products.find(p => p.product_id === id);
  }
}
