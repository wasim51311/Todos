//import these component which is very necessary 
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

//import our reducers
import listReducer from './reducers/listReducer';
import taskReducer from './reducers/taskReducer';

//create rootReducer which combine all of our reducers 
const rootReducer = combineReducers({
  list: listReducer,
  task: taskReducer,
});

//create store with rootReducer
const store = createStore(rootReducer, applyMiddleware(thunk));


//Export our store
export default store;