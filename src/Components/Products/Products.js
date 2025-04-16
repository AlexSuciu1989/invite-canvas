import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import SvgEditor from "../SvgEdit/SvgEditor";

function Products({ onEdit }) {
  const [data, setData] = useState([]);
  const [imgPath, setImgPath] = useState("");

  const handleImgPath = (product) => {
    setImgPath(require(`../../Resources/invitatii/${product.svg_img}`));
  };

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
        <Product
          key={product.id}
          data={product}
          onEdit={() => handleImgPath(product)}
        />
      ))}
      <SvgEditor imgPath={imgPath} />
    </div>
  );
}

export default Products;
