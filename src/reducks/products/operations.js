import { db, FirebaseTimestamp } from "../../firebase";
import { push } from "connected-react-router";
import { deleteProductAction, fetchProductsAction } from "./actions";

const productsRef = db.collection("products");

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );
        dispatch(deleteProductAction(nextProducts));
      });
  };
};
export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        const productList = [];
        snapshots.forEach((snapshot) => {
          const product = snapshot.data();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList));
      });
  };
};

export const saveProduct = (
  id,
  name,
  description,
  category,
  gender,
  images,
  price,
  sizes
) => {
  return async (dispatch) => {
    const timeStamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      name: name,
      images: images,
      price: parseInt(price, 10),
      updated_at: timeStamp,
      sizes: sizes,
    };

    if (id === "") {
      // 新規登録
      const ref = productsRef.doc(); // id取得
      id = ref.id;
      data.id = id;
      data.created_at = timeStamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
