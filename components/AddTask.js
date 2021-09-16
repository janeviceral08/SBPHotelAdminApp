import React, { useState } from "react";

import { View, ScrollView, TextInput, Button, TouchableOpacity, Image,} from "react-native";
import { ListItem, Overlay, Input, Text, } from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles/styles';
import Toast from "react-native-simple-toast";
import { useTasks } from "../providers/TasksProvider";
import Colors from '../Colors';
import {imgDefault} from "./styles/images";
import ImagePicker from "react-native-image-picker";
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddTask({ navigation, route }) {
  const {createTask,} = useTasks();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newRoomType, setRoomType] = useState("");
  const [newRoomPrice, setNewRoomPrice] = useState("");
  const [RoomExtraPerson, setRoomExtraPerson] = useState("");
  const [RoomMaxPer, setRoomMaxPer] = useState("");
  const [RoomHourDur, setRoomHourDur] = useState("");
  const [RoomHourPrice, setRoomHourPrice] = useState("");
  const [PromoDuration, setNewPromoDuration] = useState("");
  const [RoomPrice, setRoomPrice] = useState("");
  const [newExtension, setNewExtension] = useState("");
  const [MaxRes, setRoomMaxRes] = useState("");
  const [Durationvalue, setDurationValue] = useState(null);
  const [Durationitems, setDurationItems] = useState([
    {label: 'Daily', value: 'Daily',},
    {label: 'Hour', value: 'Hour',},
]);
const [image, setimage] = useState(null);
  let Durationcontroller;
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Daily', value: 'Daily',},
    {label: 'Hour', value: 'Hour',},
    {label: 'Promo', value: 'Promo',},
]);
  let controller;

  const onClickRooms = async ( newRoomType,newRoomPrice,RoomExtraPerson,RoomMaxPer,RoomHourDur,RoomHourPrice,PromoDuration,RoomPrice,Durationvalue,Durationitems,value,items,newExtension,image, MaxRes) => {

    if( value == null || !newRoomType.trim()  ){
      Toast.show('Please Complete All the Fields')
     
    }
    else if (MaxRes == ""){

      Toast.show('Declare Max Reservation')
    }
    else if (value == "Daily" && newRoomPrice < 1 ){

      Toast.show('Room Price Should be more than 0 and a number')
    }
    else if (value == "Hour" &&  RoomHourDur < 1 ){

      Toast.show('Hour Duration Should be more than 0 and a number')
    }
    else if (value == "Hour" && RoomHourPrice < 1){
      Toast.show('Regular Hour Rate should be more than 0 and a number')
    }
    else if (value == "Promo" && Durationvalue == null ){

      Toast.show('Pick Duration Value')
    }
    else if (value == "Promo" && Durationvalue == 'Hour' && PromoDuration <1 ){

      Toast.show('Please Enter Duration')
    }
    else if (value == "Promo" && newRoomPrice < 1){

      Toast.show('Room Price should be more than 0 and a number')
    }
 
    else{
         setOverlayVisible(false);
         createTask(newRoomType,newRoomPrice,RoomExtraPerson,RoomMaxPer,RoomHourDur,RoomHourPrice,PromoDuration,RoomPrice,Durationvalue,Durationitems,value,items,newExtension,image,MaxRes );
    }
     
  
  };

  const selectImage =()=>{
    ImagePicker.showImagePicker({
      maxWidth: 500,
      maxHeight: 500,
      mediaType: 'photo',
  }, image => {
    setimage(image.data)
    //console.log('image.data: ', image.data)
  })
  }
  return (
    <View style={{margin: 10}}>
      <ScrollView>
      <View>
      
        <Text>Room Type</Text>
        <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        returnKeyType={'next'}
                        placeholder="Room Type"
                        onChangeText={text => setRoomType(text)}
                        autoFocus={true}
                      
                    />
    
             <Text>Rate Mode</Text>
          <DropDownPicker
           placeholder="Select Rate Mode"
            items={items}
            controller={instance => controller = instance}
            onChangeList={(items, callback) => {
                new Promise((resolve, reject) => resolve(setItems(items)))
                    .then(() => callback())
                    .catch(() => {});
            }}

            defaultValue={value}
            onChangeItem={item => setValue(item.value)}
        />
        {
          value == 'Daily' ? (
            <View>
               <Text>Room Price</Text>
               <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Room Price"
                        onChangeText={(text) => {isNaN(text)? null:setNewRoomPrice(text)}}
                        autoFocus={true}
                      
                    />
         </View>
          ) :value =='Hour' ? (
            <View> 
               <Text>Hour Duration</Text>
               <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Hour Duration"
                        onChangeText={(text) => {isNaN(text)? null:setRoomHourDur(text)}}
                        autoFocus={true}
                      
                    />
       
              <Text>Regular Price Hour Rate</Text>
              <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Room Price"
                        onChangeText={(text) => {isNaN(text)? null:setRoomHourPrice(text)}}
                        autoFocus={true}
                       
                    />
       </View>
          ) :value =='Promo' ? 
          (
            <View>
               <Text>Duration Mode</Text>
                  <DropDownPicker
                  placeholder="Select Duration Mode"
                    items={Durationitems}
                    controller={instance => Durationcontroller = instance}
                    onChangeList={(items, callback) => {
                        new Promise((resolve, reject) => resolve(setDurationItems(Durationitems)))
                            .then(() => callback())
                            .catch(() => {});
                    }}
        
                    defaultValue={Durationvalue}
                    onChangeItem={item => setDurationValue(item.value)}
                  />
          <Text>Promo Duration</Text>
            <TextInput
                  style={styles.textInputTitle}
                  autoCorrect={true}
                  keyboardType='numeric'
                  returnKeyType={'next'}
                  placeholder="Promo Duration"
                  onChangeText={(text) => {isNaN(text)? null:setNewPromoDuration(text)}}
                  autoFocus={true}
                 
              />
                  
               <Text>Room Price</Text>
               <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Room Price"
                        onChangeText={(text) => {isNaN(text)? null:setNewRoomPrice(text)}}
                        autoFocus={true}
                        
                    />
       </View>
          ) :  null
        }
           
            <Text>Extra Person Charge</Text>
            <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Extra Person Charge"
                        onChangeText={(text) => {isNaN(text)? null:setRoomExtraPerson(text)}}
                        autoFocus={true}
                      
                    />
      
            <Text>Max Person Allowed</Text>
            <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Max Person"
                        onChangeText={(text) => {isNaN(text)? null:setRoomMaxPer(text)}}
                        autoFocus={true}
                      
                    />
              <Text>Max Reservation</Text>
            <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Max Reservation"
                        onChangeText={text => {isNaN(text)? null:setRoomMaxRes(text)}}
                        autoFocus={true}
                      
                    />
             <Button
 title="Create"
 onPress={() => {navigation.goBack();onClickRooms(newRoomType,newRoomPrice,RoomExtraPerson,RoomMaxPer,RoomHourDur,RoomHourPrice,PromoDuration,RoomPrice,Durationvalue,Durationitems,value,items,newExtension,image,MaxRes )}}
color={Colors.buttons}

/>
        
      </View>
      </ScrollView>
       
      
    </View>
  );
}
