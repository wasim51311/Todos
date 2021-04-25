import React, { useState, useEffect } from 'react';
import { View, 
  Text, 
  TextInput, 
  Switch, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard, ActivityIndicator, 
  ToastAndroid, 
  Alert, 
  StatusBar , 
  ImageBackground} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Colors } from '../constants';
import globalStyles from '../style/global';
import CustomButton from '../component/CustomButton';
import { updateTask, deleteTask } from '../store/actions/taskAction';

const TaskScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [completed, setCompleted] = useState(false);
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.task);

  useEffect(() => {
    const taskFound = tasks.find(t => t.id === route.params.id);
    if (taskFound) {
      setName(taskFound.name);
      setCompleted(taskFound.completed);
      setTask(taskFound);
      setLoading(false);
    }
  }, [tasks, route.params.id]);

  const updateTaskHandler = () => {
    if (task.name === name && task.completed === completed) {
      return Alert.alert('Nothing changed', 'Cannot update because nothing was changed!');
    }

    const updatedTask = {
      ...task,
      name,
      completed,
    };

    dispatch(updateTask(
      updatedTask,
      () => {
        navigation.goBack();
        ToastAndroid.show('Task updated!', ToastAndroid.LONG);
      },
      () => {
        ToastAndroid.show('Something went wrong. Please try again!', ToastAndroid.LONG);
      },
    ));
  };

  const deleteTaskClickHandler = () => {
    Alert.alert(
      'Delete task',
      'Are you sure you want to delete this task?',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: () => deleteTaskHandler() }]
    );
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTask(
      task.id,
      () => {
        navigation.goBack();
        ToastAndroid.show(`Task "${task.name} deleted!"`, ToastAndroid.LONG);
      },
      () => {
        ToastAndroid.show('Something went wrong. Please try again!', ToastAndroid.LONG);
      },
    ));
  };

  if (loading) {
    return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
     
      <View style={styles.container}>

      <StatusBar backgroundColor={Colors.primary}/>
      <ImageBackground
            source={require('../assets/bg.png')}
            style={globalStyles.img}
            resizeMode="stretch"/>

        <TextInput value={name} onChangeText={(val) => setName(val)} placeholder="Task name" placeholderTextColor={Colors.quaternary} style={globalStyles.input} />
        <View style={globalStyles.switchContainer}>
          <Switch
            value={completed}
            onValueChange={(val) => setCompleted(val)}
            thumbColor={completed ? Colors.primary : Colors.secondary}
            trackColor={{ false: Colors.tertiary, true: Colors.quaternary }}
          />
          <Text style={globalStyles.switchText}>Complete task</Text>
        </View>
        <CustomButton text="Update task" onPress={updateTaskHandler} round style={styles.spaceBottom} />
        <CustomButton text="Delete task" onPress={deleteTaskClickHandler} round danger />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  spaceBottom: {
    marginBottom: 30,
  },
});

export default TaskScreen;