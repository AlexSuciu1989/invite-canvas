import React from "react";
import "./Product.css";

function Product({ data }) {
  const imgPath = require(`../../Resources/invitatii/${data.svg_img}`);
  return (
    <div className="card m-3 shadow-sm">
      <img
        src={imgPath}
        className="card-img-top border rounded m-2"
        alt={data.title}
      />
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.short_description}</p>
        <button className="btn btn-primary">Edit SVG</button>
      </div>
    </div>
  );
}

export default Product;
