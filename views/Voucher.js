import React, { useState, useEffect } from "react";

import { View,StyleSheet, Dimensions, Text, Image, TouchableOpacity, Alert ,TextInput, TouchableHighlight, ScrollView, RefreshControl, FlatList, } from "react-native";
import { Col, Card, CardItem, Body, Button, Left, List, Content, Thumbnail, Right,Grid, Icon,  Container, Header,Toast, Input,Badge, Item } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Colors';

import styles from '../components/styles/Home.Style';
import { useTasks} from "../providers/TasksProvider";
import { VoucherItem } from "./VoucherItem";


export function Voucher({ navigation, route }) {

  const { rooms, Get_Voucher } = useTasks();
  const [room, setroom] = useState(Get_Voucher);

const searchData = (text) => {
  
  const newData = Get_Voucher.filter(item => {
    const itemData = item.code.toUpperCase();
    const textData = text.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });
  setroom(newData)  
  }

console.log('Get_Voucher: ',Get_Voucher)

  return (
    <View style={{height: '100%'}}>
 <View style={{width: '100%'}}>
            <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item>
            <Ionicons name="search" size={20} color={Colors.BackColor}/>
            <Input placeholder="Search Voucher COde" style={{borderColor: 'red'}} onChangeText={(text) => searchData(text)}/>
              </Item>
        
        </Header>
        </View>
<ScrollView>
  <Card>
      { room && room.length >0?
      
      room.map((room) =>
    <VoucherItem key={`${room._id}`} room={room} />
    )
      :
      
      Get_Voucher.map((room) =>
       <VoucherItem key={`${room._id}`} room={room} />
      )}
      </Card>
      </ScrollView>

<TouchableOpacity
                    style={styles.btnAddNew}
                    onPress={()=> navigation.navigate('VoucherAdd')}
                >
                    <MaterialCommunityIcons name={"plus-circle"} size={50} color={Colors.BackColor}/>
                </TouchableOpacity>
    </View>
  );
}
