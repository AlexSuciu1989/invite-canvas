import React from "react";

function Product({ data }) {
  const imgPath = require(`../../Resources/Invitatii/${data.svg_img}`);
  return (
    <div className="card m-3">
      <img src={imgPath} className="card-img-top" alt={data.title} />
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.short_description}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default Product;
