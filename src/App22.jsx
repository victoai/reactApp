import React, { useState, useEffect } from "react";
import './App2.css';
function App2() {
  // 상품 목록을 관리하는 state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태


  //!loading && !error && (...)	조건이 모두 true일 때 괄호 안 JSX를 렌더링하라는 의미
// 괄호 ()	여러 줄 JSX를 묶어 표현하기 위한 표현식 그룹

  //useEffect를 사용해 데이터를 가져오기
  useEffect(() => {
 
 
    // 가상 API 요청

    const fetchProducts = () => {
        setLoading(true); // 로딩 시작

        fetch("https://fakestoreapi.com/products")
          .then((response) => {
            if (!response.ok) {
              throw new Error("데이터를 가져오는데 실패했습니다.");
            }
            return response.json(); // JSON 파싱
          })
          .then((data) => {
            console.log( data);
            setProducts(data); // 데이터 저장
          })
          .catch((err) => {
            setError(err.message); // 에러 저장
          })
          .finally(() => {
            setLoading(false); // 로딩 종료
          });
      };

    fetchProducts();
  }, []); // 빈 배열로 의존성을 설정하여 컴포넌트가 처음 렌더링될 때 한 번만 실행

  return (

    <div>
      <h1>상품 목록</h1>

      {loading && <p>로딩 중...</p>} {/* 로딩 메시지 */}      
      {error && <p style={{ color: "red" }}>{error}</p>} {/* 에러 메시지 */}


      {!loading && !error && (
        <div className="wrap">

          <h2> 테스트 데이터  조회하기</h2>
            <ul>
              {products.map((product) => (
                <li key={product.id}  className="item">
                  <strong>{product.title}</strong> 
                  <p>${product.price}</p>
                  <img src={product.image} alt={product.title} />
                </li>
              ))} 
          
            </ul>


            <p>test</p>
            {products.map( ( product)=>(  <li key={product.id}>  ${product.title}</li>))}
            </div>

    
          )}
      </div>
  );
}

export default App2;
