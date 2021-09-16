import React, { useState, useEffect } from "react";

import { View,StyleSheet, Dimensions, Text, Image, TouchableOpacity, Alert ,TextInput, TouchableHighlight, ScrollView, RefreshControl, FlatList, } from "react-native";
import { Col, Card, CardItem, Body, Button, Left, List, Content, Thumbnail, Right,Grid, Icon,  Container, Header,Toast, Input,Badge, Item } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Colors';

import styles from '../components/styles/Home.Style';
import { useTasks} from "../providers/TasksProvider";
import { CategoryItem } from './CategoryItem';
import { AddRoom } from "../components/AddRoom";

export function Category({ navigation, route }) {

  const { category } = useTasks();
  const [room, setroom] = useState(category);

//console.log('room roomType: ', route.params.roomType)
const searchData = (text) => {
  
  const newData = category.filter(item => {
    const itemData = item.name.toUpperCase();
    const textData = text.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });
  //console.log('room newData: ', newData)
  setroom(newData)  
  }

  console.log('category: ', category)

  return (
    <View style={{height: '100%'}}>
 <View style={{width: '100%'}}>
            <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item>
            <Ionicons name="search" size={20} color={Colors.BackColor}/>
            <Input placeholder="Search Category" style={{borderColor: 'red'}} onChangeText={(text) => searchData(text)}/>
              </Item>
        
        </Header>
        </View>
<ScrollView>
  <Card>
      { room && room.length >0?
      
      room.map((room) =>
      room.status!="Deleted" ? <CategoryItem key={`${room._id}`} room={room} />: null
    )
      :
      
      category.map((room) =>
      room.status!="Deleted"  ? <CategoryItem key={`${room._id}`} room={room} />: null
      )}
      </Card>
      </ScrollView>

<TouchableOpacity
                    style={styles.btnAddNew}
                    onPress={()=> navigation.navigate('AddCategory')}
                >
                    <MaterialCommunityIcons name={"plus-circle"} size={50} color={Colors.BackColor}/>
                </TouchableOpacity>
    </View>
  );
}
