import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        cart: path.resolve(__dirname, 'src/cart/cart.html'),
        product_list: path.resolve(__dirname, 'src/product_list/product_list.html'),
        product_details: path.resolve(__dirname, 'src/product_details/product_details.html'),
        wish_list: path.resolve(__dirname, 'src/wishlist/wish_list.html'),
      }
    }
  }
});
