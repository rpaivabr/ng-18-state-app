export type Cart = {
  cartId: number;
  cartItems: CartItem[];
}

export type CartItem = {
  itemId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}