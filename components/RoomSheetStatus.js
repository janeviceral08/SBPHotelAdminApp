import React, { useState } from "react";
import { View, Button } from "react-native";
import { ListItem, Overlay, Input,Text,  } from "react-native-elements";
import { useTasks} from "../providers/TasksProvider";
import Colors from './styles/Color';
import MultiSelect from 'react-native-multiple-select';
import DropDownPicker from 'react-native-dropdown-picker';

// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function RoomSheetStatus({ actions, visible, closeOverlay, roomInfo }) {
  const { Cleaning, Under_Maintenance,Available } = useTasks();
  const [category, setcategory] = useState("");


  //console.log('roomInfo: ',roomInfo)
  return (
    <Overlay
      overlayStyle={{ width: "90%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
      <View>
          <Text style={{marginBottom: 20, fontWeight: 'bold', fontSize: 15}}>Room Status:    {roomInfo.status}</Text>
          
          <DropDownPicker
                        placeholder="Status"
                        items={[
                        {label: 'Available', value: 'Available'},
                        {label: 'Cleaning', value: 'Cleaning'},
                        {label: 'Under Maintenance', value: 'Under Maintenance'},
                        ]}
                        defaultIndex={0}
                        containerStyle={{height: 40, width: 150}}
                        onChangeItem={item => {setcategory(item.label)
                        }}

                        />
         <Text style={{marginTop: 120}}>   </Text>
          <Button
          
            title="Update Room Status"
            onPress={() => {
                category == "Cleaning"? Cleaning(roomInfo): category == "Under Maintenance"? Under_Maintenance(roomInfo):Available(roomInfo)
             
            }}
            color={Colors.buttons}
          />
     
      </View>
    </Overlay>
  );
}
