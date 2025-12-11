import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        cart: path.resolve(__dirname, 'src/cart/cart.html'),
        wish_list: path.resolve(__dirname, 'src/wishlist/wish_list.html'),
      }
    }
  }
});
