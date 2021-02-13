import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/styles";
import { getOrdersHistory } from "../reducks/users/selectors";
import { fetchOrderHistory } from "../reducks/users/operations";
import { OrderHistoryItem } from "../components/Products";

const useStyles = makeStyles((theme) => ({
  orderList: {
    backgroundColor: theme.palette.grey["100"],
    margin: "0 auto",
    padding: 32,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: 768,
    },
  },
}));

const OrderHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const ordersHistory = getOrdersHistory(selector);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, []);

  return (
    <section className="c-section-wrapin">
      <List className={classes.orderList}>
        {ordersHistory.length > 0 &&
          ordersHistory.map((order) => (
            <OrderHistoryItem key={order.key} order={order} />
          ))}
      </List>
    </section>
  );
};

export default OrderHistory;
