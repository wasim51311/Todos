import { SET_TASKS } from '../types/types';

//create initialState which will be sat to the state of our app and contain
// empty array
const initialState = {
  tasks: [],
};
// Define  our taskReducer which take two props (state which equal to initailState and action)
// action will be tested its type with switch and based on that we will return some thing
const taskReducer = (state = initialState, action) => {

  switch (action.type) {
    //if action is SET_TASKS we will return the tasks array which equal to the payload 
    //this payload will come from taskActions.js
    case SET_TASKS:
      return {
        tasks: action.payload,
      };
      //this is the default state if any thing is not happened
    default:
      return state;
  }
};

export default taskReducer;