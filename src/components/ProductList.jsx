import { useEffect, useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import greenTeaImage from '../assets/images/green_tea.webp';
import coffeeImage from '../assets/images/coffee.webp';
import strawberriesImage from '../assets/images/Strawberries.jpg';

const imageMap = {
  'Green Tea': greenTeaImage,
  'Coffee': coffeeImage,
  'Strawberries': strawberriesImage
};

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        return response.json();
      })
      .then(data => {
        console.log("Productos obtenidos:", data);
        setProducts(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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
                src={imageMap[product.name]}
                alt={product.name}
              />
              <div className="card-body p-4">
                <div className="text-center">
                  <h5 className="fw-bolder">{product.name}</h5>
                  ${product.price}
                </div>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                  <button className="btn btn-outline-dark">Add to cart</button>
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
