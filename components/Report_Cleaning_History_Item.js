import React, { useState } from "react";
import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { useTasks} from "../providers/TasksProvider";
import { Report_Cleaning_History_Sheets } from "./Report_Cleaning_History_Sheets";
import { Room } from "../schemas";
import Toast from "react-native-simple-toast";        
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Col, Card, CardItem, Body, Left, List, Content, Thumbnail, Right, Icon,  Container, Header } from 'native-base';



export function Report_Cleaning_History_Item({ room }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [roomSheetStatus, setRoomSheetStatus] = useState(false);
  const { deleteRoom, setRoomStatus } = useTasks();
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
              deleteRoom(room);
            }
          }
          ],
          { cancelable: false }
          );
   

       
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the room into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
 
  return (
    <>
      <Report_Cleaning_History_Sheets
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (room.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
        roomInfo={room}
      />
   
       <CardItem bordered button   key={room.id}
    
    onPress={() => {
      setActionSheetVisible(true);
    }}>
     
      <View style={{flexDirection: 'row', paddingTop: 10,paddingBottom: 10, paddingLeft: 5,}}>
        {room.status == "Available"?  <Ionicons name="radio-button-on-outline" size={20} color={'#52c28f'} style={{paddingRight: 10}} />
            :room.status == "Cleaning"?  <Ionicons name="radio-button-on-outline" size={20} color={'#ff6328'} style={{paddingRight: 10}} />
 :room.status == "Occupied"?  <Ionicons name="radio-button-on-outline" size={20} color={'#1e8edf'} style={{paddingRight: 10}} />
       :<Ionicons name="radio-button-on-outline" size={20} color={'#f9393f'} style={{paddingRight: 10}} />
          }
     
 
      <Text style={style.itemName} numberOfLines={1}>{'Room: '+room.name}</Text>
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
  