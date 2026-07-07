import React, { useState, useEffect } from "react";

function App4() {
  const [comments, setComments] = useState([]); // 댓글 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // useEffect로 댓글 데이터 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=10");
        if (!response.ok) {
          throw new Error("댓글 데이터를 가져오는데 실패했습니다.");
        }
        const data = await response.json();
        // 각 댓글에 좋아요 상태 추가
        const commentsWithLikes = data.map((comment) => ({
          ...comment,
          liked: false, // 초기 좋아요 상태
        }) );
        setComments(commentsWithLikes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // 좋아요 상태를 토글하고 서버에 전달
  const toggleLike = async (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, liked: !comment.liked } : comment
      )
    );

    // 서버로 좋아요 상태 전달
    try {
      const likedComment = comments.find((comment) => comment.id === id);
      const updatedLikedState = !likedComment.liked; // 토글된 상태
      await fetch(`https://example.com/comments/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: updatedLikedState }),
      });
      console.log(`Comment ${id} like state sent to server: ${updatedLikedState}`);
    } catch (err) {
      console.error("서버에 좋아요 정보를 전달하는데 실패했습니다:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>댓글 목록</h1>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {comments.map((comment) => {return   (
            <li
              key={comment.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <p>
                <strong>{comment.name}</strong>: {comment.body}
              </p>
              <button
                onClick={() => toggleLike(comment.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: comment.liked ? "red" : "gray",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {comment.liked ? "좋아요 취소" : "좋아요"}
              </button>
            </li>
          )})}
        </ul>
      )}
    </div>
  );
}

export default App4;
