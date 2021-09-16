import React, { useState, useEffect } from "react";
import { FAB, Portal, Provider } from 'react-native-paper';
import { View,StyleSheet, Dimensions, Text, Image, TouchableOpacity,Pressable, Alert ,TextInput, TouchableHighlight, ScrollView, RefreshControl, FlatList,Button } from "react-native";
import { Col, Card, CardItem, Body, Left, List, Content, Thumbnail, Right,Grid, Icon,  Container, Header,Toast, Root,Badge, Item,Input } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatGrid } from 'react-native-super-grid';
import { useTasks } from "../providers/TasksProvider";
import { TaskItem } from "../components/TaskItem";

import { useAuth } from "../providers/AuthProvider";
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../Colors';
const SCREEN_WIDTH = Dimensions.get('window').width;

export function TasksView({ navigation, route,name }) {
  const { BusinessData } = useAuth();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayVisibleAdd, setOverlayVisibleAdd] = useState(false);
  const [state, setState] = useState({ open: false });
  const [product, setproduct] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const onStateChange = ({ open }) => setState({ open });
  let time = moment().format('YYYY-MM-DD'+'T'+'11:59:59'+'Z')
  const { open } = state;
  const { tasks,rooms,goods, createTask, createGoods, checkin,own, Booking } = useTasks();
  const [room_type, setroom_type] = useState(tasks);

  console.log('own: ', own)
   
  const ForReserve = Booking.filter(item => {
    const itemData = item.status;
    const textData = 'For Reservation';
    return itemData.indexOf(textData) > -1
  });

  const ConfirmReserve = Booking.filter(item => {
    const itemDataConfirm = item.status;
    const textDataConfirm = 'Confirmed';
    return itemDataConfirm.indexOf(textDataConfirm) > -1
  });


  const TodayReserve = Booking.filter(item =>item.status === 'Confirmed' && item.in_check < moment(time).add(7, 'days').unix()).length



  const searchData = (text) => {
  
    const newData = tasks.filter(item => {
      const itemData = item.room_type.toUpperCase();
      const textData = text.toUpperCase();
     
      return itemData.indexOf(textData) > -1
    });
  
    setroom_type(newData)  
    }
  


const vacnt = (item) => {

  const filter = item.temp_id;
  const filterRes = rooms.filter((item) => {return(item.room_type_id.indexOf(filter) >= 0 && item.status =="Available")})

  return filterRes.length
}


const occ = (item) => {

  const filter = item.temp_id;
  const filterRes = checkin.filter((item) => {return(item.room_type_id.indexOf(filter) >= 0 && item.status =="Available")})
 
  return filterRes.length
}

  return (
    <View style={{flex: 1,}}>
     <View style={{width: '100%'}}>
            <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item>
            <Ionicons name="search" size={20} color={Colors.BackColor}/>
            <Input placeholder="Search Room Type" style={{borderColor: 'red'}}    onChangeText={(text) => searchData(text)}/>
              </Item>
        
        </Header>
        </View>
 <FlatList
    
      ListHeaderComponent={
     <View style={style.headerContainer}>
   
   <View style={style.view1} >
       <View style={style.view2}> 

       <Card style={style.card1}>
 
       <CardItem style={{ paddingBottom: 0,marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,width:SCREEN_WIDTH/2-20,borderRadius: 10}}>
                    <TouchableOpacity style={style.reserve1} onPress={()=>navigation.navigate('ForConfirm')}>
                    <Left style={style.left1}>
                    <Body>
                  <Text style={style.text1}>Reservations</Text>
                  <Text style={style.text2}>For Confirmation</Text>
                </Body>
              </Left>
              <Right>
                <Text style={style.text3}>{ForReserve.length}</Text>
              </Right>
                  </TouchableOpacity>
                  </CardItem>
                  </Card>
        </View>
        <View > 
      
       <Card style={style.card1}>
       <CardItem style={{ paddingBottom: 0,marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,width:SCREEN_WIDTH/2-20,borderRadius: 10}}>
                   <View style={style.reserve1} >
                   
                    <Left style={style.left1}>
                     <Body>
                  <Text style={style.text1}>Reserved</Text>
                
  
                </Body>
              </Left>     
                 
             
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Confirmed')} >
            <Left style={{flexDirection: 'column', left: 6}}>
            <Text style={style.text2}>Confirmed</Text>
            <Text style={[style.text4,{left: 6}]}>{ConfirmReserve.length}</Text>
            </Left>
            </TouchableOpacity>
           
            <Right style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('TWConfirmed')} >
            <Text style={[style.text2,{left: -10}]}>This Week</Text>
            <Text style={[style.text4,{left: -10}]}>{TodayReserve}</Text>
            </TouchableOpacity>
            </Right>
           
            </View>
                  </View>
                  </CardItem>
                  </Card>
        </View>


        </View> 

        </View>}
      data={['1']}
      keyExtractor={() => "dummy"}
      renderItem={({item}) => room_type && room_type.length > 0 ?
        <FlatGrid
       style={style.scrollContainer}
            data={room_type}
            showsVerticalScrollIndicator={false}
          
            
            keyExtractor={item => item._id}
            renderItem={({item}) =>  
            <Card style={style.itemContainer}>
            <View >
      
             
  <TaskItem key={`${item._id}`} task={item} />
 

</View>

</Card>


          }
        /> :
        <FlatGrid
       style={style.scrollContainer}
            data={tasks}
            showsVerticalScrollIndicator={false}
          
            
            keyExtractor={item => item._id}
            renderItem={({item}) =>  
            <Card style={style.itemContainer}>
            <View >
                <TouchableOpacity>
             
  <TaskItem key={`${item._id}`} task={item} />
 
  </TouchableOpacity>
</View>

</Card>


          }
        />
    }


      ListFooterComponent={
             <View > 
                  <View style={{

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10}}> 
                    <Card style={style.card1}>
                                 <CardItem style={{ paddingBottom: 0,marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,width:SCREEN_WIDTH-20, borderRadius: 10,}}>
                                 <Left style={style.left1}>
                               <Body>
                               <Text style={{  fontSize: 15,fontWeight: 'bold',}}>Counts</Text>
                             </Body>
                           </Left>
                       
                               </CardItem>

                               <CardItem style={{ paddingBottom: 0,marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,width:SCREEN_WIDTH-20,}}>
                                 <Left style={style.left1}>
                               <Body>
                               <Text style={style.text1}>Chatrooms</Text>
                             </Body>
                           </Left>
                           <Right style={{paddingRight: 40}}>
                             <Text style={style.text3}>
                              0
                               </Text>
                           </Right>
                               </CardItem>
                               <CardItem style={{ paddingBottom: 0,marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,width:SCREEN_WIDTH-20,}}>
                                 <Left style={style.left1}>
                               <Body>
                               <Text style={style.text1}>Number of Guest</Text>
                             </Body>
                           </Left>
                           <Right style={{paddingRight: 40}}>
                             <Text style={style.text3}>
                              {checkin.reduce((acc,e)=>{e.status=='Available'?acc++:false; return acc},0)}
                               </Text>
                           </Right>
                               </CardItem>

                               <CardItem style={{ paddingBottom: 0,marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,width:SCREEN_WIDTH-20,}} button>
                                 <Left style={style.left1}>
                               <Body>
                               <Text style={style.text1}>Room/s for Cleaning</Text>
                             </Body>
                           </Left>
                           <Right style={{paddingRight: 40}}>
                             <Text style={style.text3}>
                             {rooms.reduce((acc,e)=>{e.status=='Cleaning'?acc++:false; return acc},0)}
                               </Text>
                           </Right>
                               </CardItem>

                               <CardItem style={{ paddingBottom: 0,marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,width:SCREEN_WIDTH-20,}} button>
                                 <Left style={style.left1}>
                               <Body>
                               <Text style={style.text1}>Room/s for Maintenance</Text>
                             </Body>
                           </Left>
                           <Right style={{paddingRight: 40}}>
                             
                             <Text style={style.text3}>
                             {rooms.reduce((acc,e)=>{e.status=='Under Maintenance'?acc++:false; return acc},0)}
                               </Text>
                            
                           
                           </Right>
                               </CardItem>

                               
                               
                               </Card>
                     </View>
             
             
             
             
             
                
             
             
                  
             
                     
             
             
             

             
             
             
                     </View>
      }/>
{      own === true? 


<Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'gesture-tap' : 'gesture-tap'}
          actions={
            [
            
              {
            
                icon: 'account-group',
                label: 'Add Admin',
                onPress: () => navigation.navigate('ManageAdminTeam'),
                
              },
              {
                icon: 'account-multiple-plus',
                label: 'Add Staff',
                onPress: () => navigation.navigate('ManageTeam'),
                
              },
              {
                icon: 'account-hard-hat',
                label: 'Add Maintenance Staff',
                onPress: () => navigation.navigate('ManageTeamCleaning'),
                
              },
              {
                icon: 'home-group',
                label: 'Add Room Type',
                onPress: () => {BusinessData.hot_city ==='*Edit' || BusinessData.hot_address==='*Edit'?Alert.alert('Update Business City and Business Address on Account Settings', 'You can Only Update it once.'): navigation.navigate('AddTask')},
                
              },
             
              {
                icon: 'shield-account',
                label: 'Account Information',
                onPress: () => navigation.navigate('Account'),
              },
         
             
            ]
        
        }
       
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
    :

    
<Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'gesture-tap' : 'gesture-tap'}
          actions={
            [
              {
                icon: 'shield-account',
                label: 'Account Information',
                onPress: () => navigation.navigate('Account'),
              },
             ,
             
            ]
        
        }
       
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>



}
      

    </View>
  );
}

const style = StyleSheet.create({
  view3:{
    marginLeft: -4,
    marginTop: 10,
    width:SCREEN_WIDTH/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lur:{
    paddingLeft: 5, paddingTop: 5, paddingRight: 10
  },
  viewg:{
    marginLeft: -5,
    width:SCREEN_WIDTH/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  },
  clean:{width:SCREEN_WIDTH-20},
  lview2:{
    marginLeft: -4,
    width:SCREEN_WIDTH/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  },

  text3:{
    color:  Colors.BackColor, fontSize: 20, fontWeight: 'bold',  backgroundColor: '#d8d7d7', paddingLeft: 10, paddingRight: 10, borderRadius:50, marginBottom: 5
  },
  
  text4:{
    color:  Colors.BackColor, fontSize: 20, fontWeight: 'bold',  backgroundColor: '#d8d7d7', paddingLeft: 10, paddingRight: 10, borderRadius:50, marginBottom: 5
  },
  text2:{
    fontSize: 12, fontWeight: 'bold'
  },
  text1:{
    fontSize: 15,fontWeight: 'bold', paddingLeft: 20
  },
  left1: {
    paddingLeft: 5, paddingTop: 5
  },
  reserve1:{
    width:SCREEN_WIDTH/2-15
  },
  carditem1:{
    paddingBottom: 0, 
    marginBottom: 0, 
    paddingLeft: 0, 
    paddingRight: 0, 
    paddingTop: 0 
  },
  card1: {
    paddingBottom: 10,
    borderRadius: 10
  },
view1: {
  flex: 1,
 flexDirection: 'row',
 flexWrap: 'wrap',
 paddingLeft: 7,
},
view2:{
  marginRight: 7,
  justifyContent: 'center',
  alignItems: 'center'
},
containers: {
 flex: 1,
 flexDirection: 'row',
 flexWrap: 'wrap',
 padding: 1,
},
scrollContainer: {
  flex: 1,
  
},
headerContainer: {
 marginTop: 5
},
inside: {
  margin: 0,
  justifyContent: 'center',
  alignItems: 'center',
},
gridView: {
  marginTop: 20,
  flex: 1,
},
itemContainer: {
  justifyContent: 'flex-end',
  padding: 10,
  marginBottom: -5,
  height: 110,
  borderRadius: 10
},
itemName: {
  fontSize: 16,
  color:Colors.bottom_nav_background,
  fontWeight: '700',
  
},
itemCode1: {
  color: Colors.bottom_nav_background,
  color: '#e87b1c', fontSize: 18,fontWeight: 'bold',
  textAlign: 'center'
},
itemCode2: {
  color: 'gray', fontSize: 18, fontWeight: 'bold',
  textAlign: 'center'
},
sectionHeader: {
  flex: 1,
  fontSize: 15,
  fontWeight: '600',
  alignItems: 'center',
  backgroundColor: '#636e72',
  color: 'black',
  padding: 10,
},
imgFeature: {
  width: '90%',
  height: '60%',
  resizeMode: 'contain',
  alignSelf: "center"
}

});
