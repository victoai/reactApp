import React, { useState } from "react";

function Project() {
  // 상품 목록을 state로 관리
  const [products, setProducts] = useState([
    { id: 1, name: "상품 1", price: 1000 },
    { id: 2, name: "상품 2", price: 2000 },
    { id: 3, name: "상품 3", price: 3000 },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>상품 목록</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Project;
