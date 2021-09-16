import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { ListItem, Overlay, Input, Text, Button} from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';

// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function ActionSheet({ actions, visible, closeOverlay, roomTypeInfo }) {
  const [newRoomType, setNewRoomType] = useState(roomTypeInfo.room_type);
  const [newRoomPrice, setNewRoomPrice] = useState(roomTypeInfo.roomprice);
  const [newDuration, setNewDuration] = useState(roomTypeInfo.hour_duration);
  const [newExtraPerson, setNewExtraPerson] = useState(roomTypeInfo.extra_person_charge);
  const [newMaxPerson, setNewMaxPerson] = useState(roomTypeInfo.max_person);
  const [Durationvalue, setDurationValue] = useState(null);
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
  let controller;
  const cancelAction = {
    title: "Cancel",
    action: closeOverlay,
  };

  return (
    <Overlay
      overlayStyle={{ width: "90%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
      <ScrollView style={{height: "80%"}}>
      <View>
        <Text>Room Type</Text>
      <Input
           placeholder="Room Type"
           onChangeText={(text) => setNewRoomType(text)}
           autoFocus={true}
          value={newRoomType}
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
            <Input
                 placeholder="Room Price"
                 onChangeText={(text) => setNewRoomPrice(text)}
                 autoFocus={true}
                 value={newRoomPrice}
               /></View>
          ) :value =='Hour' ? (
            <View> 
               <Text>Hour Duration</Text>
          <Input
               placeholder="Hour Duration"
               onChangeText={(text) => setNewRoomPrice(text)}
               autoFocus={true}
               value={newRoomPrice}
             />
              <Text>Regular Price Hour Rate</Text>
          <Input
               placeholder="Room Price"
               onChangeText={(text) => setNewRoomPrice(text)}
               autoFocus={true}
               value={newRoomPrice}
             /></View>
          ) :value =='Promo' ? (
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
          <Input
               placeholder="Promo Duration"
               onChangeText={(text) => setNewRoomPrice(text)}
               autoFocus={true}
               value={newRoomPrice}
             />
               <Text>Room Price</Text>
          <Input
               placeholder="Room Pricep"
               onChangeText={(text) => setNewRoomPrice(text)}
               autoFocus={true}
               value={newRoomPrice}
             /></View>
          ) :  null
        }
            <Text>Room Price</Text>
      <Input
           placeholder="Room Price"
           onChangeText={(text) => setNewRoomPrice(text)}
           autoFocus={true}
           value={newRoomPrice}
         />
            <Text>Duration</Text>
             <Input
           placeholder="Duration"
           onChangeText={(text) => setNewDuration(text)}
           autoFocus={true}
           value={newDuration}
         />
            <Text>Extra Person Charge</Text>
             <Input
           placeholder="Extra Person Charge"
           onChangeText={(text) => setNewExtraPerson(text)}
           autoFocus={true}
           value={newExtraPerson}
         />
            <Text>Room Type</Text>
             <Input
           placeholder="Max Person"
           onChangeText={(text) => setNewMaxPerson(text)}
           autoFocus={true}
           value={newMaxPerson}
         />
          <Button
            title="Update"
            onPress={() => {
         
              EditRoom(roomInfo, newFloor, newRoomNumber);
            }}
          />
        {[...actions, cancelAction].map(({ title, action }) => (
       
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
