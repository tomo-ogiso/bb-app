const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.key);
const cors = require("cors");

const sendResponse = (response, statusCode, body) => {
  response.send({
    statusCode,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(body),
  });
};

/**
 * create API
 * req {object}
 * email        : string
 * userId       : string
 * paymentMethod: string
 **/
exports.stripeCustomer = functions.https.onRequest((req, res) => {
  const corsHandler = cors({ origin: true }); // CORS対応

  corsHandler(req, res, () => {
    // POSTメソッド判定
    if (req.method !== "POST") {
      // 405(不正なリクエスト)を返却
      sendResponse(res, 405, { error: "Invalid Request method" });
    }

    return stripe.customers
      .create({
        description: "user",
        email: req.body.email, // requestで受け取ったら、bodyというオブジェクトを参照することができる。 body内はオブジェクト型になっている
        metadata: { userId: req.body.userId }, // metadata一般的にはプライマリーなデータを受け取る
        payment_method: req.body.paymentMethod,
      })
      .then((customer) => {
        sendResponse(res, 200, customer);
      })
      .catch((error) => {
        sendResponse(res, 500, { error: error });
      });
  });
});
