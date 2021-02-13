import React from "react";
import { makeStyles } from "@material-ui/styles";

const UseStyles = makeStyles({
  row: {
    display: "flex",
    flexFlow: "row wrap",
    marginBottom: 16,
  },
  label: {
    marginLeft: 0,
    marginRight: "auto",
  },
  value: {
    fontWeight: 600,
    marginLeft: "auto",
    marginRight: 0,
  },
});

const TextDetail = (props) => {
  const classes = UseStyles();
  return (
    <div className={classes.row}>
      <div className={classes.label}>{props.label}</div>
      <div className={props.value}>{props.value}</div>
    </div>
  );
};

export default TextDetail;
