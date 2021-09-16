import React, { useState } from "react";
import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { useTasks} from "../providers/TasksProvider";
import { Room } from "../schemas";
import Toast from "react-native-simple-toast";        
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Col, Card, CardItem, Body, Left, List, Content, Thumbnail, Right, Icon,  Container, Header } from 'native-base';



export function CategoryItem({ room }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [roomSheetStatus, setRoomSheetStatus] = useState(false);
  const { deleteCat, setRoomStatus } = useTasks();
  const actions = [
    {
      title: "Delete",
      action: () => {
        Alert.alert(
          "Delete the Room from database?",
          "You cannot undo the process if you proceed",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "OK", onPress: () =>   

            {
              deleteCat(room);
            }
          }
          ],
          { cancelable: false }
          );
   

       
      },
    },
  ];
  const remove_cat = () => {
  
      Alert.alert(
      "Delete the category from database?",
      "You cannot undo the process if you proceed",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "OK", onPress: () =>   

        {
          deleteCat(room);
        }
      }
      ],
      { cancelable: false }
      );
    }
  // For each possible status other than the current status, make an action to
  // move the room into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
 
  return (
    <>

 
       <CardItem bordered button   key={room.id}
   
    onPress={remove_cat}>
     
      <View style={{flexDirection: 'row', paddingTop: 10,paddingBottom: 10, paddingLeft: 5,}}>
       <Ionicons name="radio-button-on-outline" size={20} color={'#52c28f'} style={{paddingRight: 10}} />
  
     
 
      <Text style={style.itemName} numberOfLines={1}>{room.name}</Text>
      </View>
    
      </CardItem>
    </>
  );
}
const style = StyleSheet.create({

  itemName: {
    textAlign: 'left',
    fontSize: 18,
    color:'black',

  },
  
  
  
  });
  