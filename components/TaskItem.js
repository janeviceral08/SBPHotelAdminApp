import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text,Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get('window').width;
import { useTasks } from "../providers/TasksProvider";
import { ActionSheet } from "./ActionSheet";
import { Task } from "../schemas";
import { Form } from "native-base";
import Colors from '../Colors';
export function TaskItem({ task }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const { deleteTask, setTaskStatus, checkin,rooms } = useTasks();
  const actions = [
    {
      title: "Delete",
      action: () => {
        deleteTask(task);
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  const vacnt = (item) => {

    const filter = item.temp_id;
    const filterRes = rooms.filter((item) => {return(item.room_type_id.indexOf(filter) >= 0 && item.status =="Available")})
  
    return filterRes.length
  }
  
  
  const occ = (item) => {
  
    const filter = item.temp_id;
    const filterRes = checkin.filter((item) => {return(item.room_type_id.indexOf(filter) >= 0 && item.status =="Available")})
   
    return filterRes.length
  }

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (task.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
        roomTypeInfo={task}
      />
      <TouchableOpacity
      
        key={task.id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
       
      >
             <Text style={style.itemCode1}>Vacant:     {vacnt(task)}</Text>
  <Text style={[style.itemCode2]}>Occupied: {occ(task)}</Text>
        <Text style={style.itemName} numberOfLines={1}>{task.name+ ' -'+ task.rate_mode}</Text>
        </TouchableOpacity>
    </>
  );
}

const style = StyleSheet.create({

itemName: {
  textAlign: 'center',
  fontSize: SCREEN_WIDTH > 500? 15: 18,
  color:Colors.bottom_nav_background,
  fontWeight:'bold',
  paddingTop: 10,
},

itemCode1: {
  color: Colors.bottom_nav_background,
  color: '#e87b1c', fontSize: SCREEN_WIDTH > 500? 15:18,fontWeight: 'bold',
  textAlign: 'left'
},
itemCode2: {
  color: 'gray', fontSize: SCREEN_WIDTH > 500? 15: 18, fontWeight: 'bold',
  textAlign: 'left'
},

});
