import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import createStore from "./reducks/store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./assets/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

// History生成
const history = History.createBrowserHistory();
// store生成
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
