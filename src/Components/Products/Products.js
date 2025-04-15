import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";

function Products({ onEdit }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("./product.json")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="Products d-flex flex-wrap">
      {data.map((product) => (
        <Product key={product.id} data={product} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default Products;
