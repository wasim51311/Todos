import React, { useState, useEffect } from 'react';
import { View, 
  StyleSheet, 
  ActivityIndicator, 
  StatusBar , 
  ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';

import globalStyles from '../style/global';
import { Colors } from '../constants';
import CustomButton from '../component/CustomButton';
import Tasks from '../component/Task';
import { getTasks } from '../store/actions/taskAction';
import { setActiveListId } from '../store/actions/listActions';

const ListScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const { id } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(() => setLoading(false)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setActiveListId(id));
  }, [dispatch, id]);

  if (loading) {
    return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary}/>
      <ImageBackground
            source={require('../assets/bg.png')}
            style={globalStyles.img}
            resizeMode="stretch"/>
      <Tasks navigation={navigation} listId={id} />
      <CustomButton text="Add new task" icon="add" iconColor="#fff" onPress={() => navigation.navigate('NewTask')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default ListScreen;