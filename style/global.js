
import { Colors } from '../constants';
import {Dimensions} from 'react-native';

export default {
    loader :{
        marginTop:20,
    },
    noData:{
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    listContainer: {
        paddingHorizontal: 20,
      },
      listItem: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 10,
        borderLeftWidth: 2,
        borderLeftColor: Colors.primary,
        borderBottomWidth:2,
        borderBottomColor:Colors.primary,
        
      },
      input: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.quaternary,
        borderStyle: 'solid',
        fontFamily: 'Poppins-Light',
        fontSize: 20,
        lineHeight: 28,
        marginBottom: 30,
        padding: 5,
      },
      switchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 30,
      },
      switchText: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
      },
      img:{
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        opacity:0.02,
    
      }
};