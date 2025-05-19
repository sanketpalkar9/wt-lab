// src/components/CataloguePage.jsx

import React, { useEffect, useState } from 'react';
import './CataloguePage.css';

const CataloguePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch items from backend API (replace with your actual API endpoint)
  useEffect(() => {
    fetch('http://localhost:5000/api/items') // Adjust API URL/port as needed
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching items:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="catalogue-container">
      <h2>Grocery Catalogue</h2>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <div className="item-list">
          {items.length === 0 ? (
            <p>No items found.</p>
          ) : (
            items.map((item) => (
              <div key={item.item_id} className="item-card">
                <h3>{item.item_name}</h3>
                <p>{item.description}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
                <p><strong>Stock:</strong> {item.stock}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CataloguePage;
