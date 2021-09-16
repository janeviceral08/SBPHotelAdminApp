import React, { useState } from "react";
import { Alert, TouchableOpacity, View, StyleSheet, Text,Switch,Dimensions } from 'react-native';

import { useTasks} from "../providers/TasksProvider";
import { VoucherSheet } from "./VoucherSheet";
import Toast from "react-native-simple-toast";        
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Col, Card, CardItem, Body, Left, List, Content, Thumbnail, Right, Icon,  Container, Header } from 'native-base';



export function VoucherItem({ room }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const {  changevoucherStatus } = useTasks();

  const [isEnabled, setIsEnabled] = useState(room.status == 'active'? true:false);
  const toggleSwitch = () => {
      
    Alert.alert(
        "Change Status?",
        "Are you sure to change voucher status?",
        [
            { text: "Cancel", onPress: () =>  null
        },
          { text: "OK", onPress: () =>  { changevoucherStatus(room);setIsEnabled(previousState => !previousState)}
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
      <VoucherSheet
        visible={actionSheetVisible}
        closeOverlay={() => setActionSheetVisible(false)}
        roomInfo={room}
      />
       <CardItem bordered key={room.id}  >
     
      <View style={{flexDirection: 'row', paddingTop: 5,paddingBottom: 5, paddingLeft: 5,}}>
       
     
      <Body style={{ width: Dimensions.get('window').width/2.5}}>
          
      <Text style={{...style.itemName,width: Dimensions.get('window').width}} >{'Code:  '+room.code}</Text>
      </Body>
     
      <Body style={{justifyContent: 'flex-end',flexDirection: 'row' }}>
      <Switch   trackColor={{ false: "#767577", true: "#353332" }}
        thumbColor={isEnabled ? "#e87b1c" : "#f4f3f4"} value={isEnabled}  onValueChange={toggleSwitch}/>
      <MaterialCommunityIcons name={'file-document-edit-outline'} size={25} onPress={() => setActionSheetVisible(true)}/>
      </Body>
      
      </View>
    
      </CardItem>
    </>
  );
}
const style = StyleSheet.create({

  itemName: {
    textAlign: 'left',
    fontSize: 15,
    color:'black',

  },
  
  
  
  });
  