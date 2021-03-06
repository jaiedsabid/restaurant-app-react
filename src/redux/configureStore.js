import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createForms} from "react-redux-form";
import Dishes from "./Dishes";
import Comments from "./Comments";
import Leaders from "./Leaders";
import Promotions from "./Promotions";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {initialFeedback} from "./Forms";


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions,
            ...createForms({
                feedback: initialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};