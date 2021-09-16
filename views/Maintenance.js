import React, { useState, useEffect } from "react";

import { Dimensions, StyleSheet, ScrollView, TouchableOpacity, Button, PermissionsAndroid,Alert, BackHandler, Pressable, Modal, FlatList } from 'react-native';
import { Container, Content, View, Left, Right, Icon, Card, CardItem, Badge, Text, Body, Thumbnail, Item, Input, Label, Header, SwipeRow} from 'native-base';
var {height, width } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../Colors';
import { useTasks} from "../providers/TasksProvider";



export function Maintenance({ navigation }) {
    const {rooms, Available, Under_Maintenance } = useTasks();
    const [room_data, setguest]= useState(rooms)

    const searchData = (text) => {
  
        const newData = rooms.filter(item => {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
         
          return itemData.indexOf(textData) > -1
        });
      
        setguest(newData)  
        }
      
    
    const getClean =(item)=>{
        Alert.alert(
            "Do you Want to Proceed?",
            "You will set the room "+item.name+" into Available?",
            [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Yes", onPress: () =>   {
                Available(item)
        }         
        }
        ],
        { cancelable: false }
        
        );
    }

    const getMaintain =(item)=>{
        Alert.alert(
            "Do you Want to Proceed?",
            "You will set the room "+item.name+" into Under Maintenance?",
            [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Yes", onPress: () =>   {
                Under_Maintenance(item)
        }         
        }
        ],
        { cancelable: false }
        
        );
    }

  return (
    <View>
        <View style={{width: '100%'}}>
               <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
         <Item>
           <MaterialCommunityIcons name="book-search-outline" size={23} color={Colors.BackColor}/>
           <Input placeholder=" Maintenance Search Room Number" style={{borderColor: 'red'}}    onChangeText={(text) => searchData(text)}/>
           </Item>
       
       </Header>
               </View>
               <Card>
              {
                 room_data && room_data.length > 0 ?
                 
                 room_data.map((item, i) =>
                 
                 item.status== 'Under Maintenance'?

      
                 <CardItem bordered style={{  width: '95%', marginLeft: '2.5%', flexDirection: 'row', padding: 10}}  key={item.name}>
                 <Left>
                 <MaterialCommunityIcons name={'circle-outline'} size={20} />
                 </Left>
                  
           <Body style={{marginLeft: -70}}>
           <Text>Room {item.name}</Text>
           </Body>
                  <Right style={{flexDirection: 'row', marginLeft: 80}}>
                      <TouchableOpacity onPress={()=> getMaintain(item)}>
                  <MaterialCommunityIcons name={'lock-alert'} size={25} color={'#f6665c'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> getClean(item)}>
                  <Octicons name={'checklist'} size={25} style={{marginLeft: 25}} color={Colors.buttons}  />
                  </TouchableOpacity>
                  </Right>
                   </CardItem>
                :null
                  ) 
                :
                rooms.map((item, i) =>
                 
                item.status== 'Under Maintenance'?

     
                <CardItem bordered style={{  width: '95%', marginLeft: '2.5%', flexDirection: 'row', padding: 10}}  key={item.name}>
                <Left>
                <MaterialCommunityIcons name={'circle-outline'} size={20} />
                </Left>
                 
          <Body style={{marginLeft: -70}}>
          <Text>Room {item.name}</Text>
          </Body>
                 <Right style={{flexDirection: 'row', marginLeft: 80}}>
                     <TouchableOpacity onPress={()=> getMaintain(item)}>
                 <MaterialCommunityIcons name={'lock-alert'} size={25} color={'#f6665c'} />
                 </TouchableOpacity>
                 <TouchableOpacity onPress={()=> getClean(item)}>
                 <Octicons name={'checklist'} size={25} style={{marginLeft: 25}} color={Colors.buttons}  />
                 </TouchableOpacity>
                 </Right>
                  </CardItem>
               :null
                 ) }
                </Card>

    </View>
  );
}
