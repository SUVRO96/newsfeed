import React, { useState } from "react";
import { useSelector } from "react-redux";

const Options = ({ item }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  console.log(item);
  const loginData = useSelector(state => state.login.loginDataRedux);
  return (
    <div>
      <div
        className="post_menu_icon"
        onClick={() => {
          setToggleMenu(!toggleMenu);
          console.log(toggleMenu);
        }}
      >
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
      <div className={toggleMenu ? "post_option show" : "post_option not_show"}>
        <ul>
          <li>edit</li>
          <li>delete</li>
        </ul>
      </div>
    </div>
  );
};

export default Options;
