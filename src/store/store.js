import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

// let composeEnhancers = composeWithDevTools({
//   realtime: true,
//   name: 'Your Instance Name',
//   hostname: 'localhost',
//   port: 8000, // the port your remotedev server is running at
// });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(...middleware),
//   )
// );

export default store;
