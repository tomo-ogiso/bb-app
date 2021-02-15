import React, { useEffect } from "react";
import { getUserName, getIsSignedIn } from "../../reducks/users/selectors";
import { useSelector } from "react-redux";

const Modal = () => {
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const username = getUserName(selector);
  let displayUsername;
  isSignedIn ? (displayUsername = username) : (displayUsername = "ゲスト");

  const action = selector.router.action;
  const pathname = selector.router.location.pathname;
  useEffect(() => {
    const bg = document.querySelector(".bg");
    const modal = document.querySelector(".modal");
    if (pathname === "/" && action === "POP") {
      document.body.style.position = "relative";
      bg.style.display = "block";
      modal.style.display = "block";
      modal.animate([{ opacity: 0 }, { opacity: 1 }], 1000);
    }

    bg.addEventListener("click", () => {
      document.body.style.position = null;
      bg.style.display = "none";
      modal.style.display = "none";
    });
  });

  return (
    <>
      <div className="bg">
        <div className="modal">
          <div className="inner">
            <div className="contents">
              <p className="modal_top">ようこそ、{displayUsername} 様！</p>
              <p className="description">
                野球道具ECサイト「bb」へお越しいただきありがとうございます！
                <br />
                本サイトでは、野球道具を購入することができます。
                <br />
                <div className="module-spacer--small" />
                商品、価格、メーカーをお客様に比較していただき、お客様に合った商品を提供します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
