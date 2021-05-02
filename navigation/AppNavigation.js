import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';


//import our screens
import HomeScreen from '../screens/HomeScreen';
import AddListScreen from '../screens/AddListScreen';
import ListScreen from '../screens/ListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskScreen from '../screens/TaskScreen';
//import our Colors
import { Colors } from '../constants';

//import deleteList from listActions
import { deleteList } from '../store/actions/listActions';

//Create stack navigator which will conatin all screen
const TasksStackNavigator = createStackNavigator();

//create default style
const defaultStyles = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    //the font we added in assets/fonts
    fontFamily: 'Poppins-Regular',
  },
};


const styles = StyleSheet.create({
  headerRightSpace: {
    marginRight: 10,
  },
});

//build the TasksNavigator to render it to the user
const TasksNavigator = () => {
  // this dispatch is necessary to get task state
  const dispatch = useDispatch();
  // and also the useSelector
  const { tasks } = useSelector(state => state.task);

  //this function will called from delete task button
  const deleteListClickHandler = (id, navigation) => {
    //first we test the tasks state is empty or not
    const listHasTasks = tasks.find(t => t.listId === id);


    if (listHasTasks) {
      return Alert.alert('Cannot delete', 'List cannot be deleted because it is not empty. First delete tasks in this list!');
    }

    //build Alert Dialog appear to user
    Alert.alert(
      //title of it
      'Delete list',
      //the message
      'Are you sure you want to delete this list ?',
      //build two button cancel and Delete and the delete button call deleteListHandler
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => deleteListHandler(id, navigation) },
      ]
    );
  };

  const deleteListHandler = (id, navigation) => {
    //call deletelist from taskActions.js
    dispatch(deleteList(id, () => {
      //this will return us to previous screen
      navigation.goBack();
      //make toast message appear to user for short time
      ToastAndroid.show('List successfully deleted!', ToastAndroid.LONG);
    }));
  };

  return (
    //build the TasksStackNavigator
    <TasksStackNavigator.Navigator>
      <TasksStackNavigator.Screen
      //this name we will use to move between screens
        name="Home"
        component={HomeScreen}//the component which will appear in this screen
        options={{ ...defaultStyles, title: 'Your lists', headerTitleAlign: 'center' }}
      />
      <TasksStackNavigator.Screen
        name="NewList"
        component={AddListScreen}
        options={{ ...defaultStyles, title: 'Add new list' }}
      />
      <TasksStackNavigator.Screen
        name="List"
        component={ListScreen}
        options={({ route, navigation }) => ({ 
          ...defaultStyles,
          title: route.params.name,
          //this property to make delete icon appear in the right of stackbar of screen
          headerRight: () => (
            <View style={styles.headerRightSpace}>
              <Icon
                name="md-trash"
                color="#fff"
                size={30}
                // look we use the route.params.id to get the id of the task we will delelte
                onPress={() => deleteListClickHandler(route.params.id, navigation)}
              />
            </View>
          ),
        })}
      />
      <TasksStackNavigator.Screen
        name="NewTask"
        component={AddTaskScreen}
        options={{ ...defaultStyles, title: 'Add new task' }}
      />
      <TasksStackNavigator.Screen
        name="Task"
        component={TaskScreen}
        options={{ ...defaultStyles, title: 'Update task' }}
      />
    </TasksStackNavigator.Navigator>
  );
};

//finally we create AppNavigator component and inside it we wrapped the TaskNavigator inside
// NavigationContainer which we imported it from @react-navigation/native
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TasksNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;