import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, StatusBar, ImageBackground, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from '../constants';

import { getLists } from '../store/actions/listActions';
import globalStyles from '../style/global';
import Lists from '../component/lists';
import CustomButton from '../component/CustomButton';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists(() => setLoading(false)));
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
            source={require('../assets/bg.png')}
            style={globalStyles.img}
            resizeMode="stretch"/>
       <StatusBar backgroundColor={Colors.primary}/>
       <Animatable.View 
            animation="fadeInUpBig"
            duration={500}
            style={[styles.container, {
               // backgroundColor: "#ffddcc"
            }]}
        >
          <Lists navigation={navigation} />
      <CustomButton text="Add new list" icon="add" iconColor="#fff" onPress={() => navigation.navigate('NewList')} />
        </Animatable.View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});

export default HomeScreen;