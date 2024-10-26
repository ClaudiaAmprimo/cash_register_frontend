import useProducts from '../hooks/useProducts';
import { FaShoppingBasket } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import greenTeaImage from '../assets/images/green_tea.webp';
import coffeeImage from '../assets/images/coffee.webp';
import strawberriesImage from '../assets/images/Strawberries.jpg';

const imageMap = {
  'GR1': greenTeaImage,
  'CF1': coffeeImage,
  'SR1': strawberriesImage
};

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const { addProductToCart } = useCart();

  if (loading) {
    return <p className="container mt-2">Loading products...</p>;
  }

  if (error) {
    return <p className="container mt-2">{error}</p>;
  }

  return (
    <section className="pt-4">
    <h4 className="text-center mb-4">
      <FaShoppingBasket className="me-2" /> Grocery
    </h4>
    <div className="container">
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {products.map(product => (
          <div className="col mb-5" key={product.id}>
            <div className="card h-100">
              <img
                className="card-img-top"
                src={imageMap[product.code]}
                alt={product.name}
              />
              <div className="card-body p-4">
                <div className="text-center">
                  <h5 className="fw-bolder">{product.name}</h5>
                  {product.price}€
                </div>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                <button
                      className="btn btn-outline-dark"
                      onClick={() => addProductToCart(product.code)}
                    >
                      Add to cart
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default ProductList;
