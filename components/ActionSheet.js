import React, { useState } from "react";
import { View, ScrollView, TextInput, Image, TouchableOpacity, Switch, Alert } from "react-native";
import { ListItem, Overlay, Input, Text, Button} from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles/styles';
import ImagePicker from "react-native-image-picker";
import {imgDefault} from "./styles/images";
import { useTasks} from "../providers/TasksProvider";

// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function ActionSheet({ actions, visible, closeOverlay, roomTypeInfo }) {
  const { Edit_Room_Type } = useTasks();
  const [newRoomType, setNewRoomType] = useState(roomTypeInfo.room_type);
  const [newRoomPrice, setNewRoomPrice] = useState(roomTypeInfo.roomprice);
  const [newExtension, setNewExtension] = useState(roomTypeInfo.extension);
  const [newhour_duration, setNewhour_duration] = useState(roomTypeInfo.hour_duration);
  const [newDuration, setNewDuration] = useState(roomTypeInfo.hour_duration);
  const [newExtraPerson, setNewExtraPerson] = useState(roomTypeInfo.extra_person_charge);
  const [newMaxPerson, setNewMaxPerson] = useState(roomTypeInfo.max_person);
  const [newroomprice_hour, setNewroomprice_hour] = useState(roomTypeInfo.roomprice_hour);
  const [newpromo_duration, setNewpromo_duration] = useState(roomTypeInfo.promo_duration);
  const [isEnabled, setIsEnabled] = useState(roomTypeInfo.show_website == 1? true:false);
  const [Durationvalue, setDurationValue] = useState(null);
  const [image, setimage] = useState(roomTypeInfo.img);
  console.log('roomTypeInfo.show_websit: ', roomTypeInfo.show_website)
  const [Durationitems, setDurationItems] = useState([
    {label: 'Daily', value: 'Daily',},
    {label: 'Hour', value: 'Hour',},
]);
  let Durationcontroller;
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Daily', value: 'Daily',},
    {label: 'Hour', value: 'Hour',},
    {label: 'Promo', value: 'Promo',},
]);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  let controller;
  const cancelAction = {
    title: "Cancel",
    action: closeOverlay,
  };

  const selectImage =()=>{
    ImagePicker.showImagePicker({
      maxWidth: 500,
      maxHeight: 500,
      mediaType: 'photo',
  }, image => {
    setimage(image.data)
  })
  }
  return (
    <Overlay
      overlayStyle={{ width: "90%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
      <ScrollView style={{height: "70%"}}>
      <View>
        <Text>Room Type</Text>
        <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        returnKeyType={'next'}
                        placeholder="Room Type"
                        onChangeText={(text) => setNewRoomType(text)}
                        autoFocus={true}
                       value={newRoomType}
                    />
    
             <Text>Rate Mode: {roomTypeInfo.rate_mode}</Text>
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
                        value={newRoomPrice}
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
                        onChangeText={(text) => {isNaN(text)? null:setNewhour_duration(text)}}
                        autoFocus={true}
                        defaultValue={newhour_duration}
                    />
       
              <Text>Regular Price Hour Rate</Text>
              <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Room Price"
                        onChangeText={(text) => {isNaN(text)? null:setNewroomprice_hour(text)}}
                        autoFocus={true}
                        value={newroomprice_hour}
                    />
       </View>
          ) :value =='Promo' ? (
            <View>
               <Text>Duration Mode: {roomTypeInfo.duration_mode}</Text>
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
                        onChangeText={(text) => {isNaN(text)? null:setNewpromo_duration(text)}}
                        autoFocus={true}
                        defaultValue={newpromo_duration}
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
                        defaultValue={newRoomPrice}
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
                        onChangeText={(text) => {isNaN(text)? null:setNewExtraPerson(text)}}
                        autoFocus={true}
                        defaultValue={newExtraPerson}
                    />
      
            <Text>Max Person Allowed</Text>
            <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Max Person"
                        onChangeText={(text) => {isNaN(text)? null:setNewMaxPerson(text)}}
                        autoFocus={true}
                        defaultValue={newMaxPerson}
                    />
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                   <Text style={{marginRight: 10}}>Visible for Online Booking</Text>
                   <Switch   trackColor={{ false: "#767577", true: "#353332" }}
        thumbColor={isEnabled ? "#e87b1c" : "#f4f3f4"} value={isEnabled}    onValueChange={toggleSwitch}/></View>
          <Button
            title="Update"
            onPress={() => {
         
              Edit_Room_Type(roomTypeInfo, newRoomType, value, newRoomPrice,Durationvalue,newExtension,newExtraPerson,newMaxPerson,image, newhour_duration, newroomprice_hour, newpromo_duration, isEnabled);
            }}
          />
        {[...actions].map(({ title, action }) => (
       
          <ListItem
            key={title}
            title={title}
            onPress={() => {
              closeOverlay();
              action();
            }}
            
          />
        
        ))}
      </View>
      </ScrollView>
    </Overlay>
  );
}
