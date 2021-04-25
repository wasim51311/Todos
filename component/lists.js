import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useSelector } from 'react-redux';
import globalStyles from '../style/global';

const Lists=({navigation}) =>{

    const { lists } = useSelector(state => state.list);
    console.log(lists);

    const itemClickHandler = (item) => {
        navigation.navigate('List', { name: item.name, id: item.id });
      };
    return (
            <View style={styles.container}>
                
               {lists.length > 0 ? <FlatList
                keyExtractor={(item) => item.id}
                contentContainerStyle={globalStyles.listContainer}
                data={lists}
                renderItem={({ item }) => <TouchableOpacity style={globalStyles.listItem} onPress={() => itemClickHandler(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>}
            /> : <Text style={globalStyles.noData}>No lists</Text>}
    </View>
    );
};

export default Lists;
const styles=StyleSheet.create({

    container:{
        flex :1,
        paddingVertical:10,
          
    },
    
    itemText:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
        color:'#000' 
    }
   

})