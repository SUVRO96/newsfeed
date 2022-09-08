import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Comments from "./Comments";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Feeds = () => {
  const [postItem, setPostItem] = useState([]);
  const [successPost, setSuccessPost] = useState(false);
  const text = useRef();

  const submitPost = async () => {
    if (text.current.value !== "") {
      const url = "http://localhost:4000/feeditems/additems";
      const tempObj = {};
      tempObj.id = "106";
      tempObj.userid = "id003";
      tempObj.name = "Mumaj Alam";
      tempObj.itemText = text.current.value;
      const response = await axios.post(url, tempObj);
      if (response.status === 201) {
        setSuccessPost(true);
      }
      console.log(response);
      text.current.value = "";
      setTimeout(() => {
        setSuccessPost(false);
      }, 2000);
    }
  };

  const callItemApi = async () => {
    const url = "http://localhost:4000/feeditems/allitems";
    try {
      const response = await axios.get(url);
      console.log(response);
      setPostItem(response.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callItemApi();
  }, [successPost]);

  return (
    <div className="d-flex bg-dark">
      <LeftSide />
      <section className="col-8 bg-light m-2">
        <div className="d-flex flex-column rounded text-center">
          <textarea className="m-2 border rounded" ref={text}></textarea>
          <span className="align-self-end">
            <button className="btn btn-sm btn-info mx-2" onClick={submitPost}>
              Post
            </button>
          </span>
        </div>
        {successPost && (
          <p className="alert alert-success m-2" role="alert">
            successfully posted..
          </p>
        )}

        <div className="d-flex flex-column m-2 border border-dark rounded">
          {postItem &&
            postItem.map(item => (
              <div key={item.id} className="m-1 border border-dark rounded">
                <div>
                  <h5>{item.name}</h5>
                  {item.itemText && <p>{item.itemText}</p>}
                  {item.itemImage && <img src={item.itemImage} alt="post" />}
                </div>
                <Comments id={item.id} />
              </div>
            ))}
        </div>
      </section>
      <RightSide />
    </div>
  );
};

export default Feeds;
