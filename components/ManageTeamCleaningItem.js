import React, { useState } from "react";
import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { useTasks} from "../providers/TasksProvider";
import { ManageTeamCleaningSheets } from "./ManageTeamCleaningSheets";
import { Room } from "../schemas";
import Toast from "react-native-simple-toast";        
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Col, Card, CardItem, Body, Left, List, Content, Thumbnail, Right, Icon,  Container, Header } from 'native-base';
import { useAuth } from "../providers/AuthProvider";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export function ManageTeamCleaningItem({ room }) {
  const { user, userData } = useAuth();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [roomSheetStatus, setRoomSheetStatus] = useState(false);
  const [teamMemberList, setTeamMemberList] = useState([]);
  const { deleteRoom, setRoomStatus } = useTasks();

  const getTeam = async () => {
    try {
      const teamMembers = await user.functions.getMyTeamMembersMaintenance([]);
      console.log('teamMembers: ', teamMembers)
      setTeamMemberList(teamMembers);
    } catch (err) {
      Alert.alert("An error occurred while getting team members", err.message);
    }
  };
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
  const removeTeamMember = async (email) => {
    console.log('remove: ',email)
    try {
      await user.functions.removeTeamMember(email);
      getTeam();
    } catch (error) {
      console.log('remove err: ', error)
      Alert.alert("An error occurred while removing a team member", error.message);
    }
  };

  const openDeleteDialogue = (member) => {
    Alert.alert("Remove the following member from your team?", member.name, [
      {
        text: "Remove",
        onPress: () => {
          removeTeamMember(member.name);
        },
      },
      { text: "cancel", style: "cancel" },
    ]);
  };
 
  // For each possible status other than the current status, make an action to
  // move the room into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
 
  return (
    <>
      <ManageTeamCleaningSheets
        visible={actionSheetVisible}
        closeOverlay={() =>  setActionSheetVisible(false)}
        actions={actions}
        roomInfo={room}
      />
     
       <CardItem bordered button   key={room}
  >
     
      <View style={{flexDirection: 'row', paddingTop: 10,paddingBottom: 10, paddingLeft: 5, width: '100%',borderWidth: 1, borderColor: 'black'}}>
     
      <Text style={style.itemName} numberOfLines={1}>{room.name}</Text>
      <View style={{'float': 'right'}}>
        <MaterialCommunityIcons name="text-box-outline" size={30} color={'gray'}   
    onPress={() => {
      setActionSheetVisible(true);
    }}/>
       </View>
     
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
  