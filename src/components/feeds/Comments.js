import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Comments = ({ id }) => {
  const commentRef = useRef();
  const [allComments, setAllComments] = useState([]);
  // const [likse, setLikes] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const commentFn = async () => {
    const url = "http://localhost:4000/comments/addcomment";
    const tempObj = {};
    tempObj.commentid = "c104";
    tempObj.feedid = id;
    tempObj.userid = "id001";
    tempObj.name = "Subhradip Nath";
    tempObj.text = commentRef.current.value;
    if (commentRef.current.value !== "") {
      const response = await axios.post(url, tempObj);
      commentRef.current.value = "";
      console.log(response);
    }
  };

  const loadCommentsFn = async () => {
    const url = "http://localhost:4000/comments/search/" + id;
    const response = await axios.get(url);
    if (response.status === 200) {
      setAllComments(response.data.reverse());
    }
  };

  // const loadLikesFn = async () => {
  //   const url = "http://localhost:4000/likes/search/" + id;
  //   const response = await axios.get(url);
  //   if (response.status === 200) {
  //     setLikes(response.data);
  //   }
  // };

  useEffect(() => {
    loadCommentsFn();
    // loadLikesFn();
  }, []);

  console.log(id);
  return (
    <>
      <hr />
      <div className="border border-white rounded d-flex">
        <input
          className="txtboxItem w-100"
          ref={commentRef}
          placeholder="write your comment"
        />
        <button
          className="btn btn-sm btn-outline-secondary my-1 comment-btn"
          onClick={commentFn}
        >
          <i class="fa-regular fa-paper-plane"></i>
        </button>
        <button
          className="btn btn-outline-secondary m-1 comment-btn"
          style={{ height: "50%" }}
        >
          <i className="fa-regular fa-heart"></i>
        </button>
        <button
          className="btn btn-outline-secondary m-1 comment-btn"
          style={{ height: "50%" }}
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          <i className="fa-solid fa-comment"></i>
        </button>
      </div>
      <div>
        {showComments &&
          allComments &&
          allComments.map(comment => (
            <div>
              <p>
                <span className="fw-bold">{comment.name}:</span>
                <span> "{comment.text}"</span>
              </p>
              <p></p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Comments;
