import React, { useState } from "react";
import { View, Button, ScrollView,TouchableOpacity, Alert, Modal,Pressable, StyleSheet, Dimensions } from "react-native";
import {  Overlay, Input, Text } from "react-native-elements";
import { Thumbnail, List, ListItem,Separator, Col, Card, CardItem, Body, Left, Content, Right,Grid, Icon,  Container, Header,Toast,Badge, Item } from 'native-base';
import { useTasks} from "../providers/TasksProvider";
import Colors from './styles/Color';
import MultiSelect from 'react-native-multiple-select';
import Tags from "react-native-tags";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import moment from 'moment'

// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function Report_Logs_Sheets({ actions, visible, closeOverlay, roomInfo }) {
  const {Get_Logs_Data} = useTasks();

 

const newval_filtered = Get_Logs_Data.filter(item =>item.staff == roomInfo.item)


  return (
    <Overlay
      overlayStyle={{ width: "90%", maxHeight: "85%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
<ScrollView>
<Card>
{newval_filtered.map((info,index)=>
   <Collapse key={index}>
   <CollapseHeader>
   <CardItem bordered>
 
   <Body>
     <View style={{flexDirection: 'row'}}>
     <MaterialCommunityIcons name="history" size={20} color={Colors.buttons}/><Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 20}}>{moment(info.date * 1000).format('MMM D, YYYY h:mm a')}</Text>
     </View>
     <View style={{flexDirection: 'row', marginLeft: '10%'}}>
     <MaterialCommunityIcons name="text-box-outline" size={15} color={'gray'}/><Text style={{fontSize: 12, marginLeft: 5, color: 'gray'}}>{info.description}</Text>
     </View>
   
     </Body>
   </CardItem>
   </CollapseHeader>
  
 </Collapse>

)}
            
    </Card>

    </ScrollView>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
width: '100%',
height: '100%'
  },
  modalView: {
    width: '100%',
height: '100%',
    backgroundColor: "white",

   
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
