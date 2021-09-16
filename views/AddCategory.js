import React, { useState,useRef } from "react";
import { ScrollView, View, Button } from "react-native";
import { Overlay, Input, Text } from "react-native-elements";
import styles from '../components/styles/styles';
import Toast from "react-native-simple-toast";
import MultiSelect from 'react-native-multiple-select';
import { useTasks} from "../providers/TasksProvider";
import Colors from '../Colors';

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddCategory({ navigation, route }) {
  const { createCat } = useTasks();
  const [newName, setNewName] = useState("");



  return (
    <View style={{margin: 10}}>
    
        <ScrollView>
          <Text>Category</Text>
          <Input
            placeholder="Category"
            onChangeText={(text) => setNewName(text)}
          />
            
          <Button
            title="Add Category"
            onPress={() => {
              createCat(newName);
             

            }}
            color={Colors.buttons}
          />
        </ScrollView>
    
    </View>
  );


}
