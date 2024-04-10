import React, { useState, useEffect } from "react";
import ProductList from "../ProductList";
import "./index.css";

const categories = [
  {
    id: 1,
    name: "smartphones",
  },
  {
    id: 2,
    name: "laptops",
  },
  {
    id: 3,
    name: "fragrances",
  },
  {
    id: 4,
    name: "skincare",
  },
  {
    id: 5,
    name: "groceries",
  },
  {
    id: 6,
    name: "home-decoration",
  },
];

function Products() {
  const [productData, setProductData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  const getData = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?&category=${selectedCategory}`
    );
    const data = await response.json();
    const formattedData = data.products.map((eachItem) => ({
      id: eachItem.id,
      brand: eachItem.brand,
      category: eachItem.category,
      discountPercentage: eachItem.discountPercentage,
      images: eachItem.images,
      price: eachItem.price,
      rating: eachItem.rating,
      thumbnail: eachItem.thumbnail,
      title: eachItem.title,
    }));
    setProductData(formattedData);
  };

  const handleSearch = () => {
    const searchResult = productData.filter((item) =>
      item.brand.toLowerCase().includes(searchInput.toLowerCase())
    );
    setProductData(searchResult);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  console.log(selectedCategory);
  console.log(productData);

  return (
    <div className="bg-container">
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option value={category.name} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div>
        <div>
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <ul className="product-list">
          {productData.map((item) => (
            <ProductList productData={item} key={item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
