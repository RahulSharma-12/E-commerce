import { legacy_createStore , combineReducer , applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const reducer = combineReducer({

});

let initialState={};

const middleware ={thunk};

const store = legacy_createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;  