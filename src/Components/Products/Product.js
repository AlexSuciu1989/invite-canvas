import React from "react";
import PropTypes from "prop-types";
import "./Product.css";

function Product({ data, onEdit, onDelete  }) {
  const imgPath = require(`../../Resources/invitatii/${data.svg_img}`);

  return (
    <div className="Product card m-3 shadow-sm">
      <img
        src={imgPath}
        className="card-img-top border rounded m-2"
        alt={data.title}
      />
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.short_description}</p>
        <button
          onClick={() => onEdit(data.svg_img, data.id)}
          className="btn btn-primary"
        >
          Editeaza
        </button>
        {onDelete && (
        <button className="btn btn-danger ms-2" onClick={onDelete}>Sterge</button>
      )}
      </div>
    </div>
  );
}

Product.propTypes = {
  data: PropTypes.shape({
    svg_img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Product;
