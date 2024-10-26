import useCart from '../hooks/useCart';
import { FaMinus, FaPlus } from 'react-icons/fa';
import './Cart.css';
import greenTeaImage from '../assets/images/green_tea.webp';
import coffeeImage from '../assets/images/coffee.webp';
import strawberriesImage from '../assets/images/Strawberries.jpg';

const imageMap = {
  'GR1': greenTeaImage,
  'CF1': coffeeImage,
  'SR1': strawberriesImage
};

const Cart = () => {
  const { cartItems, addProductToCart, removeProductFromCart } = useCart();

  if (cartItems.length === 0) {
    return <p className="container mt-2">Your cart is empty.</p>;
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.total_price, 0).toFixed(2);

  return (
    <div id="cart" className="container mt-5">
    {cartItems.map(item => (
      <div key={item.product_code} className="cart-item">
        <img
          src={imageMap[item.product_code]}
          alt={item.name}
        />
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-quantity">
          <button onClick={() => removeProductFromCart(item.product_code)}>
            <FaMinus />
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => addProductToCart(item.product_code)}>
            <FaPlus />
          </button>
        </div>
        <div className="cart-item-price">{item.total_price.toFixed(2)}€</div>
      </div>
    ))}
      <div className="total-price">
      <h5>
        <strong>Total Price:</strong> {totalPrice}€
      </h5>
    </div>
  </div>
  );
};

export default Cart;
