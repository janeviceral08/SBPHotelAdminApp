import React, { useState, useEffect }  from "react";
import { View,StyleSheet, Dimensions, Text, Image, TouchableOpacity, Alert ,TextInput, TouchableHighlight, ScrollView, RefreshControl, FlatList,Modal, Pressable } from "react-native";
import { Col, Card, CardItem, Body, Button, Left, List, Content, Thumbnail, Right,Grid, Icon,  Container, Header,Toast, Root,Badge } from 'native-base';
import styless from '../components/styles/styless';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTasks} from "../providers/TasksProvider";
import { AddGood } from "../components/AddGood";
import { FlatGrid } from 'react-native-super-grid';
import styles from '../components/styles/Home.Style';
import Colors from '../components/styles/Color';
import MultiSelect from 'react-native-multiple-select';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

export function GoodDetails({ navigation, route }) {
  
    const id= route.params.id;
  

    const { goods, EditGoods, deleteGood, category } = useTasks();
    const newdar = goods.find(x => x.itemid === id)



    const [selectedItems, setSelectedItems] = useState([newdar.cat]);
    const [visibleModal, setvisibleModal] = useState(false);
    const [product, setproduct] = useState(newdar.product);
    const [quantity, setquantity] = useState(newdar.quantity);
    const [price, setprice] = useState(newdar.price);

    const onSelectedItemsChange = (selectedItems) => {
      // Set Selected Items
      setSelectedItems(selectedItems);

  
    
    };
console.log('newdar.cat: ', newdar.cat)

  // the onClickProject navigates to the Task List with the project name
  // and project partition value
  

  return (
    <View>
 
      <View>
 <View style={{flexDirection: 'row', height: 50,  backgroundColor: Colors.BackColor}}>

 

    </View>
    <View style={{margin: 10}}>
      <Text style={styles.textTitle}>Product Name</Text>
                                                     <TextInput
                                                         style={{ height: 40, borderBottomColor: 'gray',borderWidth: 1,borderRadius: 5, paddingLeft: 20, width: 250, marginBottom: 10 }}
                                                         onChangeText={(text) => setproduct(text)}
                                                         defaultValue= {newdar.product}
                                                         
                                                         autoCorrect={true}
                                                     />
                                                     <Text style={styles.textTitle}>Price</Text>
                                                      <TextInput
                                                             style={{height: 40, borderBottomColor: 'gray', borderWidth: 1,borderRadius: 5, paddingLeft: 20, width: 250, marginBottom: 10 }}
                                                         onChangeText={(text) => setprice(text)}
                                                         defaultValue={newdar.price.toString()}
                                                         keyboardType={'numeric'}
                                                     />
                                          <Text style={styles.textTitle}>Quantity</Text>
                                                      <TextInput
                                                             style={{height: 40, borderBottomColor: 'gray', borderWidth: 1,borderRadius: 5, paddingLeft: 20, width: 250, marginBottom: 10 }}
                                                         onChangeText={(text) => setquantity(text)}
                                                         defaultValue={newdar.quantity.toString()}
                                                         keyboardType={'numeric'}
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
                                             <TouchableOpacity
                                               style={{ ...styless.openButton, backgroundColor: Colors.bottom_nav_background, alignSelf: 'flex-end' }}
                                               onPress={() =>  EditGoods(newdar, product, price, quantity, selectedItems)}
                                             >
                                               <Text style={[styless.textStyle, {color: Colors.BackColor}]}>Save</Text>
                                             </TouchableOpacity>
                                             </View>
                                             </View>
        
    </View>
  );
}
