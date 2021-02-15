import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserName } from "../reducks/users/selectors";
import { SecondaryButton } from "../components/UI";
import { push } from "connected-react-router";

const Profile = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const username = getUserName(selector);

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ</h2>
      <div className="module-spacer--medium" />
      <p className="text">ユーザ名: {username}</p>

      <div className="module-spacer--small" />
      <div className="center">
        <SecondaryButton
          label={"カード情報の編集"}
          onClick={() => dispatch(push("/user/payment/edit"))}
        />
        <SecondaryButton
          label={"注文履歴の編集"}
          onClick={() => dispatch(push("/order/history"))}
        />
      </div>
    </section>
  );
};

export default Profile;
