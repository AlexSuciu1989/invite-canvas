import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import SvgEditor from "../SvgEdit/SvgEditor";
import "./Products.css";

function Products({ onEdit }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [showEditor, setShowEditor] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const totalPages = Math.ceil(filteredData.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const [vip, setVip] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [background, setBackground] = useState(false);
  const [productData, setProductData] = useState({});
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [colors, setColors] = useState([]);

  const handleShowEditor = () => setShowEditor(true);

  const handleImgPath = (product) => {
    setImgPath(require(`../../Resources/invitatii/${product.svg_img}`));
    setId(product.id);
    setProductData(product);
  };

  useEffect(() => {
    axios
      .get("./product.json")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);

        const uniqueCategories = [...new Set(response.data.map((p) => p.product_category))];
        const uniqueThemes = [...new Set(response.data.map((p) => p.product_theme))];
        const uniqueColors = [...new Set(response.data.flatMap((p) => p.product_colors))];

        setCategories(uniqueCategories);
        setThemes(uniqueThemes);
        setColors(uniqueColors);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    let filtered = data;

    if (vip) filtered = filtered.filter((product) => product.vip === !vip);

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.product_category)
      );
    }

    if (selectedThemes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedThemes.includes(product.product_theme)
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColors.every((color) => product.product_colors.includes(color))
      );
    }

    if (background) {
      filtered = filtered.filter((product) => product.product_background === background);
    }

    setFilteredData(filtered);
  }, [vip, selectedCategories, selectedThemes, selectedColors, background, data]);

  return (
    <div className="Products position-relative">
      {/* Toggle button for mobile */}
      <button
        className="btn btn-outline-secondary d-lg-none mb-3"
        onClick={() => setShowFilters(true)}
      >
        Arata filtre
      </button>

      {/* Overlay Filters */}
      <div className={`overlay-filter d-lg-none ${showFilters ? "active" : ""}`}>
        <div className="filter-panel shadow">
          <div className="text-end">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setShowFilters(false)}
            >
              ✕ Inchide
            </button>
          </div>

          <div className="filter-section">
            <p>Card Type</p>
            <label>
              <input
                type="checkbox"
                className="me-2"
                checked={vip}
                onChange={(e) => setVip(e.target.checked)}
              />
              Free
            </label>
          </div>

          <div className="filter-section">
            <p>Category</p>
            {categories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  className="me-2"
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelectedCategories((prev) =>
                      checked
                        ? [...prev, category]
                        : prev.filter((cat) => cat !== category)
                    );
                  }}
                />
                {category}
              </label>
            ))}
          </div>

          <div className="filter-section">
            <p>Theme</p>
            {themes.map((theme) => (
              <label key={theme}>
                <input
                  type="checkbox"
                  className="me-2"
                  checked={selectedThemes.includes(theme)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelectedThemes((prev) =>
                      checked
                        ? [...prev, theme]
                        : prev.filter((t) => t !== theme)
                    );
                  }}
                />
                {theme}
              </label>
            ))}
          </div>

          <div className="filter-section">
            <p>Colors</p>
            {colors.map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  className="me-2"
                  checked={selectedColors.includes(color)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelectedColors((prev) =>
                      checked
                        ? [...prev, color]
                        : prev.filter((col) => col !== color)
                    );
                  }}
                />
                {color}
              </label>
            ))}
          </div>

          <div className="filter-section">
            <p>Background</p>
            <label>
              <input
                type="checkbox"
                className="me-2"
                checked={background}
                onChange={(e) => setBackground(e.target.checked)}
              />
              Background
            </label>
          </div>
        </div>
      </div>

      {/* Static Filters on large screens */}
      <div className="d-flex">
      <div className="Filters d-none d-lg-block col-lg-2 p-3 border">
        <div className="filter-section">
          <p>Card Type</p>
          <label>
            <input
              type="checkbox"
              className="me-2"
              checked={vip}
              onChange={(e) => setVip(e.target.checked)}
            />
            Free
          </label>
        </div>

        <div className="filter-section">
          <p>Category</p>
          {categories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                className="me-2"
                checked={selectedCategories.includes(category)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedCategories((prev) =>
                    checked
                      ? [...prev, category]
                      : prev.filter((cat) => cat !== category)
                  );
                }}
              />
              {category}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <p>Theme</p>
          {themes.map((theme) => (
            <label key={theme}>
              <input
                type="checkbox"
                className="me-2"
                checked={selectedThemes.includes(theme)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedThemes((prev) =>
                    checked
                      ? [...prev, theme]
                      : prev.filter((t) => t !== theme)
                  );
                }}
              />
              {theme}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <p>Colors</p>
          {colors.map((color) => (
            <label key={color}>
              <input
                type="checkbox"
                className="me-2"
                checked={selectedColors.includes(color)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedColors((prev) =>
                    checked
                      ? [...prev, color]
                      : prev.filter((col) => col !== color)
                  );
                }}
              />
              {color}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <p>Background</p>
          <label>
            <input
              type="checkbox"
              className="me-2"
              checked={background}
              onChange={(e) => setBackground(e.target.checked)}
            />
            Background
          </label>
        </div>
      </div>

      {/* Products */}
      <div className="col-lg">
        <div className="d-flex flex-wrap gap-3">
          {paginatedData.map((product) => (
            <Product
              key={product.id}
              data={product}
              onEdit={() => {
                handleImgPath(product);
                handleShowEditor();
              }}
            />
          ))}
        </div>

        <div className="pagination d-flex align-items-center justify-content-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-3">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
</div>
      {showEditor && (
        <SvgEditor imgPath={imgPath} id={id} isSaved={false} data={productData} />
      )}
    </div>
  );
}

export default Products;
