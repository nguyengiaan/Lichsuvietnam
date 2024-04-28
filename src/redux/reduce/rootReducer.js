import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReduce';
import questReduce from './questReducer';
const rootReducer = combineReducers({
    counter: counterReducer,
    user:userReducer,
    quiz:questReduce,
});
export default rootReducer;