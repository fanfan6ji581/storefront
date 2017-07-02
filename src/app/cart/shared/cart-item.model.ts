import { Product } from '../../products/shared/product.model';

export class CartItem {
    productId: number;
    product?: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.productId = product.id;
        this.product = product;
        this.quantity = quantity;
    }

    /**
     * when save to local storage, only keep the id and quantity
     */
    toStorageFormat() {
        return {
            productId: this.productId,
            quantity: this.quantity
        }
    }
}
