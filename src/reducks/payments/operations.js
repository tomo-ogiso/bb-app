import { CardElement } from "@stripe/react-stripe-js";
import { db } from "../../firebase";
import { push } from "connected-react-router";
import { updateUserStateAction } from "../users/actions";

const headers = new Headers();
headers.set("Content-type", "application/json");
const BASE_URL = "https://bb-app-4cd1b.web.app";

const createCustomer = async (email, paymentMethodId, uid) => {
  const response = await fetch(BASE_URL + "/v1/customer", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      paymentMethod: paymentMethodId,
      userId: uid,
    }),
  });

  const customerResponse = await response.json(); // JSONを受け取る
  return JSON.parse(customerResponse.body); //オブジェクト型へ
};

export const registerCard = (stripe, elements) => {
  return async (dispatch, getState) => {
    const user = getState().users;
    const email = user.email;
    const uid = user.uid;

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      return;
    }

    const paymentMethodId = paymentMethod.id;
    const customerData = await createCustomer(email, paymentMethodId, uid);

    if (customerData.id === "") {
      alert("カード情報の登録に失敗しました。");
      return;
    } else {
      const updateUserState = {
        customer_id: customerData.id,
        payment_method_id: paymentMethodId,
      };
      db.collection("users")
        .doc(uid)
        .update(updateUserState)
        .then(() => {
          dispatch(updateUserStateAction(updateUserState));
          dispatch(push("/profile"));
        })
        .catch(() => {
          alert("カード情報の登録に失敗しました");
          return;
        });
    }
  };
};
