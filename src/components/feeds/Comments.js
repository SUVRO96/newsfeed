import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Comments = ({ id }) => {
  const commentRef = useRef();
  const [allComments, setAllComments] = useState([]);
  const loginData = useSelector(state => state.login.loginDataRedux);

  const [likes, setLikes] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [success, setSuccess] = useState(false);

  const commentFn = async () => {
    const url = "http://localhost:4000/comments/addcomment";
    const tempObj = {};
    tempObj.commentid = "c" + parseInt(Math.random() * 100000000000);
    tempObj.feedid = id;
    tempObj.userid = loginData.userid;
    tempObj.name = loginData.name;
    tempObj.text = commentRef.current.value;
    if (commentRef.current.value !== "") {
      const response = await axios.post(url, tempObj);
      if (response.status === 201) {
        setSuccess(true);
        commentRef.current.value = "";
        setInterval(() => {
          setSuccess(false);
        }, 1000);
      }
    }
  };

  const loadCommentsFn = async () => {
    const url = "http://localhost:4000/comments/search/" + id;
    const response = await axios.get(url);
    if (response.status === 200) {
      setAllComments(response.data.reverse());
    }
  };

  const loadLikesFn = async () => {
    const url = "http://localhost:4000/likes/search/" + id;
    const response = await axios.get(url);
    if (response.status === 200) {
      setLikes(response.data);
    }
  };

  const addlikeFn = async () => {
    const url = "http://localhost:4000/likes/addlike";
    const templike = {};
    templike.feedid = id;
    templike.name = loginData.name;
    templike.userid = loginData.userid;
    const response = await axios.post(url, templike);
    if (response.status === 201) {
      setSuccess(true);
      setInterval(() => {
        setSuccess(false);
      }, 1000);
    }
  };

  useEffect(() => {
    loadCommentsFn();
    loadLikesFn();
  }, [success]);

  console.log(id);
  return (
    <>
      <hr />
      <p style={{ fontSize: "10px", marginLeft: "5px", fontWeight: "bold" }}>
        {likes.length} likes {allComments.length} comments
      </p>
      <div className="border border-white rounded d-flex">
        <input
          className="txtboxItem w-100"
          ref={commentRef}
          placeholder="write your comment"
        />
        <button className=" my-1 comment-btn" onClick={commentFn}>
          <i class="fa-regular fa-paper-plane"></i>
        </button>
        <button
          className=" m-1 comment-btn"
          style={{ height: "50%" }}
          onClick={addlikeFn}
        >
          <i className="fa-regular fa-heart"></i>
        </button>
        <button
          className=" m-1 comment-btn"
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
              <p className="ms-3" style={{ fontSize: "12px" }}>
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
