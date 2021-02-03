import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import createStore from "./reducks/store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// History生成
const history = History.createBrowserHistory();
// store生成
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
