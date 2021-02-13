import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextInput, SelectBox, PrimaryButton } from "../components/UI";
import { SetSizeArea, ImageArea } from "../components/Products";
import { saveProduct } from "../reducks/products/operations";
import { db } from "../firebase";

const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/product/edit")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [maker, setMaker] = useState(""),
    [makers, setMakers] = useState([]),
    [category, setCategory] = useState(""),
    [categories, setCategories] = useState([]),
    [gender, setGender] = useState(""),
    [hand, setHand] = useState(""),
    [handTypes, setHandTypes] = useState([]),
    [images, setImages] = useState(""),
    [price, setPrice] = useState(""),
    [sizes, setSizes] = useState([]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  // 性別
  const genders = [
    { id: "all", name: "全て" },
    { id: "mens", name: "メンズ" },
    { id: "ladies", name: "レディース" },
    { id: "kids", name: "キッズ" },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setName(data.name);
          setDescription(data.description);
          setMaker(data.maker);
          setCategory(data.category);
          setGender(data.gender);
          setHand(data.hand);
          setImages(data.images);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
      });
  }, []);

  useEffect(() => {
    db.collection("makers")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setMakers(list);
      });
  }, []);

  useEffect(() => {
    db.collection("handTypes")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setHandTypes(list);
      });
  }, []);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={inputDescription}
        />
        <SelectBox
          label={"メーカー"}
          required={true}
          value={maker}
          options={makers}
          select={setMaker}
        />
        <SelectBox
          label={"カテゴリー"}
          required={true}
          value={category}
          options={categories}
          select={setCategory}
        />
        <SelectBox
          label={"性別"}
          required={true}
          value={gender}
          options={genders}
          select={setGender}
        />
        <SelectBox
          label={"利き手"}
          required={true}
          value={hand}
          options={handTypes}
          select={setHand}
        />
        <TextInput
          fullWidth={true}
          label={"価格"}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={"number"}
          onChange={inputPrice}
        />
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  images,
                  price,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
