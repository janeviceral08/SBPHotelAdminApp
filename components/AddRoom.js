import React, { useState,useRef } from "react";
import { ScrollView, View, Button, Dimensions, TouchableOpacity } from "react-native";
import { Overlay, Input, Text } from "react-native-elements";
import styles from './styles/styles';
import Toast from "react-native-simple-toast";
import MultiSelect from 'react-native-multiple-select';
import { useTasks} from "../providers/TasksProvider";
import Colors from '../Colors';
import Tags from "react-native-tags";
import Ionicons from 'react-native-vector-icons/Ionicons'
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddRoom({ navigation, route }) {

  const { tasks, createRoom, User_Info,rooms,own } = useTasks();
  const [newName, setNewName] = useState("");
  const [newFloor, setNewFloor] = useState("");
  const [RoomTypeId, setRoomTypeId] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [tags, settags] = useState([]);

  const user = User_Info[0]
  console.log('tags: ', tags)
  console.log('User_Info: ', User_Info)
  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
 //   Toast.show('Added '+ selectedItems)


  
  };



  return (
    <View style={{margin: 10}}>
    
        <ScrollView>
          <Text>Room Number</Text>
          <Input
            placeholder="Room Number"
            onChangeText={(text) => setNewName(text)}
            autoFocus={true}
          />
           <Text>Floor Number</Text>
           <Input
            placeholder="Floor Number"
            onChangeText={(text) => setNewFloor(text)}
            autoFocus={true}
          />
         <Text style={{marginBottom: 20}}>Room Type</Text>
            <MultiSelect
            
            items={tasks}
            uniqueKey='temp_id'
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText='Choose Room Type'
            searchInputPlaceholderText='Search Room Type...'
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor={Colors.buttons}
            tagBorderColor={Colors.buttons}
            tagTextColor={Colors.buttons}
            selectedItemTextColor='white'
            selectedItemIconColor='white'
            itemTextColor='#000'
            displayKey='name'
            searchInputStyle={{ color: Colors.buttons }}
            submitButtonColor={Colors.buttons}
            submitButtonText='Submit'
            removeSelected
            />
 <Text style={{marginBottom: 20}}>Room Check List</Text>
<Tags
    textInputProps={{
      placeholder: "Seperate by comma"
    }}
    initialTags={tags}
    onChangeTags={tags => settags(tags)}
    onTagPress={(index, tagLabel, event, deleted) =>
      console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
    }
    createTagOnString={[",", "."]}
    containerStyle={{ justifyContent: "center" }}
    inputStyle={{ backgroundColor: "white" }}
    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
      <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={{borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        marginRight: 5,}}>
        <Text>{tag}</Text>
      </TouchableOpacity>
    )}
  />
         
         {user.rooms <= rooms.length || own === false? null:
          <Button
            title="Create"
            onPress={() => {
              navigation.goBack()
              createRoom(newName,newFloor,selectedItems, RoomTypeId, tags);
             

            }}
            color={Colors.buttons}
          />}
        </ScrollView>
    
    </View>
  );


}
