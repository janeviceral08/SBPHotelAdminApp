
import React from "react";
import { Container, Header, Title,Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right, List, ListItem, Accordion,Separator, Picker, Button as Header_Button  } from 'native-base';
import { Pressable,View,Dimensions, StyleSheet, ScrollView, Image, TouchableOpacity,BackHandler, Keyboard,Alert,ActivityIndicator,TextInput, Modal, Button, RefreshControl, DeviceEventEmitter, NativeEventEmitter,Switch, FlatList} from 'react-native';
import Toast from "react-native-simple-toast";
import Fontisto from 'react-native-vector-icons/Fontisto'

import moment from 'moment'
import Colors from '../Colors';

import AntDesign from 'react-native-vector-icons/AntDesign';


export function Reservation_details({ navigation, route }) {

const checkinInfo = route.params.checkinInfo;
//console.log('const checkinInfo: ', checkinInfo)

const currencyFormat = (num) => {
    return '₱' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  return (
    <View>
    <View style={{alignItems: 'center',height: 60, paddingTop: 30, backgroundColor: Colors.BackColor, marginBottom: 10}}>

              <Text style={{fontSize: 18, fontWeight: 'bold', padding: 0.2}}>{checkinInfo.name}</Text>
          </View>
          <View style={{alignItems: 'center', borderRadius: 10, borderWidth: 1, width: '80%', marginLeft: '10%', backgroundColor: Colors.bottom_nav_background, borderColor: Colors.bottom_nav_background}}>
<Text style={{fontSize: 12, fontWeight: 'bold', padding: 0.2, color: Colors.BackColor}}>Res. Code: {checkinInfo.reservation_code}</Text>
</View>
          <ScrollView>
    <Card>
    <CardItem>
    <Body>
  
  <Text style={{  fontSize: 13,fontWeight: 'bold', color: '#898989'}}>
    Check In
  </Text> 
  <View style={{ paddingLeft: 10, flexDirection: 'row'}}>
                  <Text style={{fontSize: 20, color: Colors.BackColor}}>{moment(checkinInfo.in_check * 1000).format('D')}</Text>
                  <Text style={{fontSize: 15}}> {moment(checkinInfo.in_check * 1000).format('MMM')}</Text>
                  <Text style={{fontSize: 15}}> {moment(checkinInfo.in_check * 1000).format('YYYY')}</Text>
                  <Text  style={{fontSize: 12, color: '#8d8d8d', marginLeft: -50}}>{"\n"} {moment(checkinInfo.in_check * 1000).format('h:mm a')}</Text>                                 

                      </View>                                              
 
</Body>
      <Body>
  
        <Text style={{  fontSize: 13,fontWeight: 'bold', color: '#898989'}}>
          Check Out
        </Text> 
              <View style={{  fontSize: 12, paddingLeft: 10, flexDirection: 'row'}}>
                  <Text style={{fontSize: 20, color: Colors.BackColor}}>{moment(checkinInfo.out_check * 1000).format('D')}</Text>
                  <Text style={{fontSize: 15}}> {moment(checkinInfo.out_check * 1000).format('MMM')}</Text>
                  <Text style={{fontSize: 15}}> {moment(checkinInfo.out_check * 1000).format('YYYY')}</Text>
                  <Text  style={{fontSize: 12, color: '#8d8d8d', marginLeft: -50}}>{"\n"} {moment(checkinInfo.out_check * 1000).format('h:mm a')}</Text>                                 

                      </View>       
                             
      </Body>
      <Body>

<Text style={{ fontSize: 13,fontWeight: 'bold',  alignSelf: 'center', color: '#898989'}}>
Guest
</Text>
<Text style={{  fontSize: 20, paddingLeft: 10, alignSelf: 'center', color: Colors.BackColor}}>
{checkinInfo.guest}
        </Text>                                              

</Body>
    </CardItem>
  </Card>

  <View style={{alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
      <Fontisto name={'room'} size={25} color={'#898989'} style={{paddingRight: 10}}/>
      <Text style={{fontSize: 15, fontWeight: 'bold',color: 'grey', marginTop: 5}}>{checkinInfo.room_name} Room </Text>
      </View>
               </View>

  <Card>
    <CardItem>
    <Body>
  <Text style={{  fontSize: 14}}> Contact No.</Text>   
  <Text style={{  fontSize: 14}}> Address</Text>   
  <Text style={{  fontSize: 14}}> Nationality</Text>   
  <Text style={{  fontSize: 14}}> Email</Text>     
                         
</Body>
      <Body>
        <Text style={{  fontSize: 16}}>             :</Text>  
        <Text style={{  fontSize: 16}}>             :</Text>
        <Text style={{  fontSize: 16}}>             :</Text>
        <Text style={{  fontSize: 16}}>             :</Text> 
   
      </Body>
      <Body>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.phone_no}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.address}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold', width: 250}}>{checkinInfo.nationality}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.email}</Text>
       
      
      </Body>
    </CardItem>

    {checkinInfo.voucher_mode === ''? null:

<CardItem>
<Body>
<Text style={{  fontSize: 14}}> Voucher Code</Text>   
<Text style={{  fontSize: 14}}> Voucher Value</Text>   
<Text style={{  fontSize: 14}}> Expiration Date</Text>       
                     
</Body>
  <Body>
    <Text style={{  fontSize: 16}}>             :</Text>  
    <Text style={{  fontSize: 16}}>             :</Text>
    <Text style={{  fontSize: 16}}>             :</Text>

  </Body>
  <Body>
    <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.voucher_code}</Text>
    <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.voucher_value}{checkinInfo.voucher_mode === 'Percentage'?'%':null}</Text>
    <Text style={{ fontSize: 13,fontWeight: 'bold', width: 250}}>{moment(checkinInfo.voucher_exp * 1000).format('MMM D, YYYY h:mm a')}</Text>
   
  
  </Body>
</CardItem>
    }
    
  </Card>


<Card>
<CardItem bordered>
                        <Body style={{alignItems: 'center'}}>
                          <Text style={{color: Colors.BackColor, fontWeight: 'bold'}}> REASON</Text>
                               </Body>
                   
                     
                    </CardItem>
    <CardItem>
    <Body>
  <Text style={{  fontSize: 14}}>{checkinInfo.reason}</Text>                                     
</Body>
    
    </CardItem>
    
  </Card>




  
  </ScrollView>

  </View>


  

  );
}
