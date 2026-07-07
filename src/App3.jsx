import React, { useState, useEffect } from "react";

function App3() {
  // 상품 목록을 관리하는 state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // useEffect를 사용해 데이터를 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("데이터를 가져오는데 실패했습니다.");
        }
        const data = await response.json();
        // 각 상품에 좋아요 상태를 추가
        const productsWithLikes = data.map((product) => ({
          ...product,
          liked: false, // 초기 좋아요 상태는 false
        }));
        setProducts(productsWithLikes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 좋아요 상태를 토글하는 함수
  const toggleLike = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>상품 목록</h1>

      {/* 단락 평가를 이용해서 조건부 렌더링 */}    
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span>
                <strong>{product.title}</strong> - ${product.price}
              </span>
              <button
                onClick={() => toggleLike(product.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: product.liked ? "red" : "gray",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {product.liked ? "좋아요 취소" : "좋아요"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App3;
