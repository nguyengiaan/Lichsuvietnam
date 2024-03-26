import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReduce';
const rootReducer = combineReducers({
    counter: counterReducer,
    user:userReducer,
    
});
export default rootReducer;