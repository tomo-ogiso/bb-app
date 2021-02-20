import React from "react";
import { Route, Switch } from "react-router";
import {
  CheckoutWrapper,
  Profile,
  OrderHistory,
  OrderConfirm,
  CartList,
  ProductDetail,
  ProductList,
  ProductEdit,
  SignUp,
  SignIn,
  Reset,
} from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />
      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />
        <Route exact path={"/cart"} component={CartList} />
        <Route exact path={"/order/confirm"} component={OrderConfirm} />
        <Route exact path={"/order/history"} component={OrderHistory} />
        <Route exact path={"/user/payment/edit"} component={CheckoutWrapper} />
      </Auth>
    </Switch>
  );
};

export default Router;
