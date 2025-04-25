import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import SvgEditor from "../SvgEdit/SvgEditor";

function Products({ onEdit }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [showEditor, setShowEditor] = useState(false);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  // Filters and unique values
  const [vip, setVip] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [background, setBackground] = useState(false);
  const [productData, setProductData] = useState({});
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [colors, setColors] = useState([]);

  const handleShowEditor = () => {
    setShowEditor(true); 
  }

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
        setFilteredData(response.data); // Initially set filtered data to all products

        // Extract unique values for categories, themes, and colors
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.product_category)),
        ];
        const uniqueThemes = [
          ...new Set(response.data.map((product) => product.product_theme)),
        ];
        const uniqueColors = [
          ...new Set(
            response.data.flatMap((product) => product.product_colors)
          ),
        ];

        setCategories(uniqueCategories);
        setThemes(uniqueThemes);
        setColors(uniqueColors);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filtering logic
  useEffect(() => {
    let filtered = data;

    if (vip) {
      filtered = filtered.filter((product) => product.vip === !vip);
    }

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
      filtered = filtered.filter(
        (product) => product.product_background === background
      );
    }

    setFilteredData(filtered);
  }, [
    vip,
    selectedCategories,
    selectedThemes,
    selectedColors,
    background,
    data,
  ]);

  return (
    <div className="Products d-flex row">
      
      <div className="d-flex">
        {/* Filters */}
      <div className="Filters m-2 mt-3 rounded shadow-sm border px-3 p-2 col-2">
        <div className="mb-3 border-bottom pb-2">
          <p className="">Card Type</p>
          <label className="ms-2">
            <input
              className="me-2"
              type="checkbox"
              checked={vip}
              onChange={(e) => setVip(e.target.checked)}
            />
            free
          </label>
        </div>
        <div className="mb-3 border-bottom pb-3">
          <p>Category</p>
          {categories.map((category) => (
            <div key={category} className="ms-2">
              <label>
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
            </div>
          ))}
        </div>
        <div className="mb-3 border-bottom pb-3">
          <p>Theme</p>
          {themes.map((theme) => (
            <div key={theme} className="ms-2">
              <label>
                <input
                  type="checkbox"
                  className="me-2 "
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
            </div>
          ))}
        </div>
        <div className="mb-3 border-bottom pb-3">
          <label>Colors</label>
          {colors.map((color) => (
            <div key={color} className="ms-2">
              <label>
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
            </div>
          ))}
        </div>
        <div className="mb-3 pb-3">
          <p>Background</p>
          <label className="ms-2">
            <input
              type="checkbox"
              className="me-2"
              checked={background}
              onChange={(e) => setBackground(e.target.checked)}
            />
            background
          </label>
        </div>
      </div>
                {/* Products */}
      <div className="">
{/* Products Listing */}
      <div className="d-flex flex-wrap">
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
      </div>

      
      </div>
      
     {/* Pagination Controls */}
     <div className="pagination d-flex align-items-center justify-content-center">
        <button  className="btn btn-secondary" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="mx-3">Page {currentPage} of {totalPages}</span>
        <button className="btn btn-secondary" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {showEditor && <SvgEditor imgPath={imgPath} id={id} isSaved={false} data={productData} />}
    </div>
  );
}

export default Products;
