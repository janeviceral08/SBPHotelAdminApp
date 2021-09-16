import React, { useState,useRef } from "react";
import { ScrollView, View,Button } from "react-native";
import { Overlay, Input, Text } from "react-native-elements";
import styles from './styles/styles';
import Toast from "react-native-simple-toast";
import MultiSelect from 'react-native-multiple-select';
import { useTasks} from "../providers/TasksProvider";
import Colors from '../Colors';


// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddGood({ navigation, route }) {
        
        const { goods, createGood, category, User_Info, own} = useTasks();
  const [Product, setProduct] = useState("");
  const [Price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
const user = User_Info[0]
  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
 // console.log('User_Info: ', selectedItems)
  //console.log('selectedItems output: ', selectedItems[0])

  
  };
  console.log('category: ', category)
  return (
    <View style={{margin: 10}}>
      
        <ScrollView>
        <Text>Product Name</Text>
          <Input
            placeholder="Product Name"
            onChangeText={(text) => setProduct(text)}
            autoFocus={true}
          />
          <Text>Price</Text>
           <Input
            placeholder="Price"
            onChangeText={(text) => {isNaN(text)? null:setPrice(text)}}
            autoFocus={true}
            keyboardType={'number-pad'}
          />
          <Text>Quantity</Text>
          <Input
            placeholder="Quantity"
            onChangeText={(text) => {isNaN(text)? null:setQuantity(text)}}
            autoFocus={true}
            keyboardType={'number-pad'}
          />
           <Text style={{marginBottom: 20}}>Category</Text>
            <MultiSelect
            
            items={category}
            uniqueKey='catid'
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText='Choose Category'
            searchInputPlaceholderText='Search Category...'
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
            single
            />

{user.max_Goods == goods.length || own === false ?null:

<Button
title="Add Product"
onPress={() => {
  navigation.goBack()
  createGood(Product,Price,Quantity, selectedItems);
}}
color={Colors.buttons}
/>
}


         
        </ScrollView>
      
    </View>
  );


}
