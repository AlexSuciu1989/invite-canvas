import React, { useState, useEffect } from "react";
import Product from "../Products/Product";
import axios from "axios";
import SvgEditor from "../SvgEdit/SvgEditor";
import Modificari from "./Modificari";

function InvitatiileMele() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgPath, setImgPath] = useState("");
  const [id, setId] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const handleShowEditor = () => {
    setShowEditor(true); 
  }

  const handleImgPath = (product) => {
    setImgPath(require(`../../Resources/invitatii/${product.svg_img}`));
    setId(product.id);
  };

  const getCookieValue = (cookieName) => {
    const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
    return match ? match[2] : null;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = parseInt(getCookieValue("user_id"));
        if (!userId) {
          console.error("User ID not found in cookies.");
          setLoading(false);
          return;
        }

        // Fetch session data
        const sessionResponse = await axios.get(
          `https://alex-suciu.homebuddy.ro/cutiuta-cu-de-toate/php/fetch-invitatiile-mele.php?user_id=${userId}`
        );
        const sessions = sessionResponse.data;

        if (!sessions.length) {
          console.error("No sessions found for this user.");
          setLoading(false);
          return;
        }

        // Extract invite IDs
        const inviteIds = sessions.map(session => session.invite_id);

        // Fetch all product data
        const productResponse = await axios.get("./product.json");
        const allProducts = productResponse.data;

        // Filter products based on invite IDs
        const filteredProducts = allProducts.filter(product => inviteIds.includes(product.id));

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const userId = parseInt(getCookieValue("user_id"));
        if (!userId) {
          console.error("User ID not found in cookies.");
          setLoading(false);
          return;
        }

        // Fetch session data
        const sessionResponse = await axios.get(
          `https://alex-suciu.homebuddy.ro/cutiuta-cu-de-toate/php/fetch-sessions.php?user_id=${userId}&invite_id=${id}`
        );
        const sessions_ids = sessionResponse.data;


      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);


  return (
    <div className="">
      <div className="product-list d-flex flex-wrap">
      {products.length ? (
        products.map(product => <Product key={product.id} data={product} onEdit={() => { 
          handleImgPath(product); 
          handleShowEditor(); 
        }} />)
      ) : (
        <p>No products found.</p>
      )}
      </div>
      {showEditor && <SvgEditor imgPath={imgPath} id={id} />}
    </div>
  );
}

export default InvitatiileMele;
