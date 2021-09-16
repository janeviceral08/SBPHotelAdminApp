import React, { useState, useEffect } from "react";

import { View,StyleSheet, Dimensions, Text, Image, TouchableOpacity, Alert ,TextInput, TouchableHighlight, ScrollView, RefreshControl, FlatList, } from "react-native";
import { Col, Card, CardItem, Body, Button, Left, List, Content, Thumbnail, Right,Grid, Icon,  Container, Header,Toast, Input,Badge, Item } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Colors';

import styles from '../components/styles/Home.Style';
import { useTasks} from "../providers/TasksProvider";
import { RoomItem } from "../components/RoomItem";
import { AddRoom } from "../components/AddRoom";

export function RoomsView({ navigation, route }) {

  const { rooms, createRoom } = useTasks();
  const [room, setroom] = useState(rooms);

const searchData = (text) => {
  
  const newData = rooms.filter(item => {
    const itemData = item.name.toUpperCase();
    const textData = text.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });
  setroom(newData)  
  }



  return (
    <View style={{height: '100%'}}>
 <View style={{width: '100%'}}>
            <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item>
            <Ionicons name="search" size={20} color={Colors.BackColor}/>
            <Input placeholder="Search Room" style={{borderColor: 'red'}} onChangeText={(text) => searchData(text)}/>
              </Item>
        
        </Header>
        </View>
<ScrollView>
  <Card>
      { room && room.length >0?
      
      room.map((room) =>
      room.status!="Deleted" ? <RoomItem key={`${room._id}`} room={room} />: null
    )
      :
      
      rooms.map((room) =>
      room.status!="Deleted"  ? <RoomItem key={`${room._id}`} room={room} />: null
      )}
      </Card>
      </ScrollView>

<TouchableOpacity
                    style={styles.btnAddNew}
                    onPress={()=> navigation.navigate('AddRoom')}
                >
                    <MaterialCommunityIcons name={"plus-circle"} size={50} color={Colors.BackColor}/>
                </TouchableOpacity>
    </View>
  );
}
