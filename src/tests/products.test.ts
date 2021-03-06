import request from 'supertest';
import App from '@/app';
import { Product } from '@interfaces/products.interface';
import productModel from '@models/products.model';
import ProductsRoute from '@/routes/products.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Products', () => {
  describe('[GET] /products', () => {
    it('response statusCode 200 / findAll', () => {
      const findProduct: Product[] = productModel;
      const productsRoute = new ProductsRoute();
      const app = new App([productsRoute]);

      return request(app.getServer()).get(`${productsRoute.path}`).expect(200, { data: findProduct, message: 'findAll' });
    });
  });

  describe('[GET] /products/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const productGtin = '1';
      const findProduct: Product = productModel.find(product => product.gtin === productGtin);
      const productsRoute = new ProductsRoute();
      const app = new App([productsRoute]);

      return request(app.getServer()).get(`${productsRoute.path}/${productGtin}`).expect(200, { data: findProduct, message: 'findOne' });
    });
  });
});
