import React, { useState, useEffect } from "react";

import { View,StyleSheet, Dimensions, Text, Image, TouchableOpacity, Alert ,TextInput, TouchableHighlight, ScrollView, RefreshControl, FlatList,Modal, Pressable } from "react-native";
import { Col, Card, CardItem, Body, Button, Left, List, Content, Thumbnail, Right,Grid, Icon,  Container, Header,Toast, Root,Badge, Item,Input,Tab, Tabs,ScrollableTab  } from 'native-base';

import styless from '../components/styles/styless';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB, Portal, Provider } from 'react-native-paper';
import { useTasks} from "../providers/TasksProvider";
import { AddGood } from "../components/AddGood";
import styles from '../components/styles/Home.Style';
import Colors from '../components/styles/Color';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CategoryItem } from './CategoryItem';



export function GoodsView({ navigation, route }) {
  const { goods, deleteGood, User_Info, category } = useTasks();
  const [visibleModal, setvisibleModal] = useState(false);
  const [room, setroom] = useState(category);
  const [state, setState] = useState({ open: false });
  const { open } = state;
  const onStateChange = ({ open }) => setState({ open });
  const [Good, setGoods] = useState(goods)
  const user = User_Info[0]

  const searchData = (text) => {
  
    const newData = goods.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
     
      return itemData.indexOf(textData) > -1
    });
    setGoods(newData)  
    }

    const searchDataCat = (text) => {
  
      const newData = category.filter(item => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
       
        return itemData.indexOf(textData) > -1
      });
      //console.log('room newData: ', newData)
      setroom(newData)  
      }
    
  
    const delete_goods = (goods) => {
  
      Alert.alert(
        "Do you Want to Proceed?",
        "You will not retrive it after deleting",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Yes", onPress: () =>   {
            deleteGood(goods)
            
    }         
    }
    ],
    { cancelable: false }
    
    );
      }
      console.log('category: ', category.length)

  return (
    <View style={{height: '100%'}}>
    

      
<Container>
<Tabs renderTabBar={()=> <ScrollableTab tabsContainerStyle={{backgroundColor: Colors.BackColor }}/>}>
  <Tab heading="Goods" tabStyle={{backgroundColor: Colors.BackColor, color: 'white', }} activeTabStyle={{backgroundColor: Colors.BackColor, color: 'white'  }}>
  
  <View style={{width: '100%', marginTop: 5}}>
            <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item>
            <Ionicons name="search" size={20} color={Colors.BackColor}/>
            <Input placeholder="Search Store Items" style={{borderColor: 'red'}}    onChangeText={(text) => searchData(text)}/>
              </Item>
        
        </Header>
        </View>
  { Good && Good.length > 0?
     
     <FlatList
   
        data={Good}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({item})  =>  
        item.status!='Deleted'?
        <Card style={{marginLeft: 10, width: '45%'}}>
        <CardItem  style={{marginBottom: 0, flexDirection: 'column'}} button onPress={() => navigation.navigate('GoodDetails', {
         id: item.itemid
       })}>
         <View  style={{ alignSelf: 'flex-end', position: 'absolute'}}>
           <MaterialCommunityIcons name={'delete-circle-outline'} size={30} color={Colors.BackColor} onPress={()=>delete_goods(item)} style={{marginRight: 10}}/>
         
           </View>
           <Text style={{fontWeight: 'bold', alignSelf: 'flex-start',fontSize: 18}} numberOfLines={1}>{item.name}</Text>
           <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
           <Text style={{color: 'gray', fontSize: 14}}>Price</Text>
           <Text style={{color: 'gray', marginLeft: '10%', fontSize: 14}}>Quantity</Text>
           </View>
           <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
           <Text style={{fontSize: 14}}>{item.price}</Text>
           <Text style={{ marginLeft: '30%', fontSize: 14}}>{item.quantity}</Text>
           </View>
        </CardItem>
           </Card>
           :  null
      }
    />:
    goods && goods.length > 0?
    <FlatList
   
    data={goods}
    keyExtractor={(item, index) => index.toString()}
    numColumns={2}
    renderItem={({item})  =>  
    item.status!='Deleted'?
    <Card style={{marginLeft: 10, width: '45%'}}>
    <CardItem  style={{marginBottom: 0, flexDirection: 'column'}} button onPress={() => navigation.navigate('GoodDetails', {
    id: item.itemid,
   })}>
     <View  style={{ alignSelf: 'flex-end', position: 'absolute'}}>
           <MaterialCommunityIcons name={'delete-circle-outline'} size={30} color={Colors.BackColor} onPress={()=>delete_goods(item)} style={{marginRight: 10}}/>
         
           </View>
       
       <Text style={{fontWeight: 'bold', alignSelf: 'flex-start', fontSize: 18}} numberOfLines={1}>{item.name}</Text>

       <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
       <Text style={{color: 'gray', fontSize: 14}}>Price</Text>
       <Text style={{color: 'gray', marginLeft: '10%', fontSize: 14}}>Quantity</Text>
       </View>
       <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
       <Text style={{fontSize: 14}}>{item.price}</Text>
       <Text style={{ marginLeft: '30%', fontSize: 14}}>{item.quantity}</Text>
       </View>
    </CardItem>
       </Card>
       :null
  }
/>
:<View style={{ flex: 1, width: '50%', alignSelf: 'center', alignItems:'center',
     justifyContent:'center'}}>
<Image style={{ width: 200, height: 200}} source={require('./goods.png')} />
<View style={{ width: 200, alignItems: 'center', borderWidth: 5, borderColor: Colors.bottom_nav_background, borderRadius: 50, padding: 10}} >
     <Text>Goods Are Empty</Text>
   </View>
</View>
     }
   <TouchableOpacity
                    style={styles.btnAddNew}
                    onPress={()=> navigation.navigate('AddGood')}
                >
                    <MaterialCommunityIcons name={"plus-circle"} size={50} color={Colors.BackColor}/>
                </TouchableOpacity>
 
   
   
  </Tab>
  <Tab heading="Store Items Category" tabStyle={{backgroundColor: Colors.BackColor, color: 'white' }} activeTabStyle={{backgroundColor: Colors.BackColor, color: 'white'  }}>
  <View style={{width: '100%'}}>
            <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item>
            <Ionicons name="search" size={20} color={Colors.BackColor}/>
            <Input placeholder="Search Category" style={{borderColor: 'red'}} onChangeText={(text) => searchDataCat(text)}/>
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
{category.length >= 4? null:
  <TouchableOpacity
                    style={styles.btnAddNew}
                    onPress={()=> navigation.navigate('AddCategory')}
                >
                    <MaterialCommunityIcons name={"plus-circle"} size={50} color={Colors.BackColor}/>
                </TouchableOpacity>
 

}

 
  </Tab>

</Tabs>
</Container>      
    



  
      
    </View>
  );
}
