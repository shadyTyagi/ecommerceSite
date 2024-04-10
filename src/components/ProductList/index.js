import "./index.css";
const ProductList = (props) => {
  const { productData } = props;
  const { thumbnail, brand, price, rating, title, discountPercentage } =
    productData;

  const priceInRupees = price * 75;
  const discount = Math.floor((discountPercentage / 100) * priceInRupees);
  const discountPrice = priceInRupees - discount;

  return (
    <li className="product-list-items">
      <img className="thumbnail-img" src={thumbnail} alt="brand" />
      <div>
        <h1 className="title-name">
          {brand}
          <span>{title}</span>
        </h1>
        <p className="price">
          Rs. {discountPrice} <span>(Rs. {discount} OFF)</span>
        </p>
      </div>
    </li>
  );
};

export default ProductList;
