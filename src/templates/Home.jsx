import React from "react";
import { getUserId, getUserName } from "../reducks/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../reducks/users/operations";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);
  return (
    <>
      <h2>ここはホーム</h2>
      <p>{uid}</p>
      <p>{username}</p>
      <button onClick={() => dispatch(signOut())}>サインアウト</button>
    </>
  );
};

export default Home;
