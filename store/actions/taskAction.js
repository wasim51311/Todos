//First import these packages and component 
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SET_TASKS } from '../types/types';
import { STORAGE_KEYS } from '../../constants';
import store from '../';

// create getTask function which enable us to get the state that we stored it
/*
  1-onSuccess is a funtion we write it and give its name also onError
  2- insidt getTasks {} we must write async dispatch to make our app work even though
     the getTasks not finished
  3-AsyncStorage.getItem(STORAGE_KEYS.tasks);   this will give us the content of our store
    await is necessary when we use async
  4-JSON.parse convert the result taskRes to JSON file
  5-to make our state not change we need to dispatch it with the same state and here is (tasks)
  6-remember (payload ) in reducer and type
*/
export const getTasks = (onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      const tasksRes = await AsyncStorage.getItem(STORAGE_KEYS.tasks);
      const tasks = tasksRes ? JSON.parse(tasksRes) : [];

      dispatch({
        type: SET_TASKS,
        payload: tasks,
      });
      onSuccess();
    } catch (err) {
      console.log(err);
      onError();
    }
  };
};

// Create task
/**
 * 
 * @param {*} name is the content of the store which we will pass it from our fecth api
 * @param {*} listId is the id of our list
 * @param {*} onSuccess as we just said in get task
 * @param {*} onError as we just said in get task
 * @returns 
 */
export const createTask = (name, listId, onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      //define newTask which contain the name which is the content of the store
      //listId and id and if completed or not which by default is false
      const newTask = {
        name,
        listId,
        id: `task-${new Date().getTime()}`,
        completed: false,
      };

      //get the state of our store and put it in the tasks constant
      const { tasks } = store.getState().task;

      //create a copy of tasks 
      const tasksCopy = [...tasks];
      //use push function to perform the newTask which put the content of newTask inside tasksCopy
      tasksCopy.push(newTask);
      //Store the tasksCopy after convert it from JSON to stringify in our storage
       //be attention about STORAGE_KEYS which created in constants.js 
      await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasksCopy));
      //disatch our changes to make it stored
      dispatch({
        type: SET_TASKS,
        payload: tasksCopy,
      });
      onSuccess();
    } catch (err) {
      console.log(err);
      onError();
    }
  };
};

// Update task
/**
 * 
 * @param {*} task is the task we will update its state 
 * @param {*} onSuccess 
 * @param {*} onError 
 * @returns 
 */
export const updateTask = (task, onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      const { tasks } = store.getState().task;

      //when we call updateTask we need to pass the id of this task 
      const updatedTasks = [...tasks].map(t => t.id === task.id ? task : t);
      await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(updatedTasks));

      dispatch({
        type: SET_TASKS,
        payload: updatedTasks,
      });
      onSuccess();
    } catch (err) {
      console.log(err);
      onError();
    }
  };
};

// Delete task
/**
 * 
 * @param {*} id this id is necessary to delete the task
 * @param {*} onSuccess 
 * @param {*} onError 
 * @returns 
 */
export const deleteTask = (id, onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      const { tasks } = store.getState().task;
      const updatedTasks = [...tasks].filter(t => t.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(updatedTasks));

      dispatch({
        type: SET_TASKS,
        payload: updatedTasks,
      });
      onSuccess();
    } catch (err) {
      console.log(err);
      onError();
    }
  };
};