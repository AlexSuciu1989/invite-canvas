import React, { useState, useEffect, useMemo } from "react";
import Product from "../Products/Product";
import axios from "axios";
import SvgEditor from "../SvgEdit/SvgEditor";

const getCookieValue = (cookieName) => {
  const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
  return match ? match[2] : null;
};

function InvitatiileMele() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgPath, setImgPath] = useState("");
  const [id, setId] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = parseInt(getCookieValue("user_id"));
        if (!userId) throw new Error("User ID not found in cookies.");

        const [sessionResponse, productResponse] = await Promise.all([
          axios.get(`https://alex-suciu.homebuddy.ro/cutiuta-cu-de-toate/php/fetch-invitatiile-mele.php?user_id=${userId}`),
          axios.get("./product.json"),
        ]);

        const inviteIds = sessionResponse.data.map(session => session.invite_id);
        const filteredProducts = productResponse.data.filter(product => inviteIds.includes(product.id));

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => products, [products]);

  const handleImgPath = async (product) => {
    try {
      const imgModule = await import(`../../Resources/invitatii/${product.svg_img}`);
      setImgPath(imgModule.default); // imgModule.default contains the actual path
      setId(product.id);
      setData(product);
      setShowEditor(true);
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  };

  if (loading) return <p>Loading products...</p>;

  const handleDelete = async (productId) => {
    const userId = parseInt(getCookieValue("user_id"));
    if (!userId) {
      console.error("User ID not found in cookies.");
      return;
    }
  
    const confirmed = window.confirm("Are you sure you want to delete this invitation?");
    if (!confirmed) return;
  
    try {
await axios.post(
  `https://alex-suciu.homebuddy.ro/cutiuta-cu-de-toate/php/delete-invite.php`,
  new URLSearchParams({
    user_id: userId.toString(),
    invite_id: productId.toString(),
  }),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Error deleting invitation:", error);
    }
  };

  return (
    <div className="product-container">
      <div className="product-list d-flex flex-wrap">
        {filteredProducts.length ? (
          filteredProducts.map(product => (
            <Product key={product.id} data={product} onEdit={() => handleImgPath(product)} onDelete={() => handleDelete(product.id)} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      {showEditor && imgPath && id && (
  <SvgEditor key={id} imgPath={imgPath} id={id} isSaved={true} data={data} />
)}
    </div>
  );
}

export default InvitatiileMele;
