import { useState, useEffect } from "react";
import ProductList from "../ProductList";
import "./index.css";

const category = [
  {
    id: 1,
    name: "Smartphones",
  },
  {
    id: 2,
    name: "Laptops",
  },
  {
    id: 3,
    name: "Fragrances",
  },
  {
    id: 4,
    name: "Skincare",
  },
  {
    id: 5,
    name: "Groceries",
  },
  {
    id: 6,
    name: "Home-decoration",
  },
];

function Products() {
  const [useData, setUseData] = useState([]);
  const [useSearchInput, setSearchInput] = useState("");
  const [isActive, setIsActive] = useState("");
  const [updatedFilter, setUpdatedFilter] = useState([]);

  const getData = async () => {
    const respone = await fetch(
      `https://dummyjson.com/products&category${isActive}`
    );
    const data = await respone.json();
    // console.log(data);
    const formatedData = data.products.map((eachItem) => ({
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
    setUseData(formatedData);
  };

  console.log(useData);
  useEffect(() => {
    getData();
  });

  const onChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const onClickSearchButton = () => {
    const searchResult = useData.filter((eachItem) =>
      eachItem.brand.toLowerCase().includes(useSearchInput.toLowerCase())
    );
    setUseData(searchResult);
  };

  const onChangeSelectOp = (e) => {
    setIsActive(e.target.value);
    console.log(e.target.value);
    const categoryResult = useData.filter((eachItem) =>
      eachItem.category.includes(isActive.toLowerCase())
    );
    setUseData(categoryResult, getData());
  };
  console.log(isActive.toLowerCase());

  return (
    <div className="bg-container">
      <select onChange={onChangeSelectOp} value={isActive}>
        {category.map((eachCat) => (
          <option value={eachCat.name} key={eachCat.id}>
            {eachCat.name}
          </option>
        ))}
      </select>
      <div>
        <div>
          <input type="text" onChange={onChangeInput} />
          <button onClick={onClickSearchButton}>Search</button>
        </div>
        <ul className="product-list">
          {useData.map((item) => (
            <ProductList productData={item} key={item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
