
import React from "react";
import { Container, Header, Title,Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right, List, ListItem, Accordion,Separator, Picker, Button as Header_Button  } from 'native-base';
import { Pressable,View,Dimensions, StyleSheet, ScrollView, Image, TouchableOpacity,BackHandler, Keyboard,Alert,ActivityIndicator,TextInput, Modal, Button, RefreshControl, DeviceEventEmitter, NativeEventEmitter,Switch, FlatList} from 'react-native';
import Toast from "react-native-simple-toast";
import Fontisto from 'react-native-vector-icons/Fontisto'

import moment from 'moment'
import Colors from '../Colors';

import AntDesign from 'react-native-vector-icons/AntDesign';


export function Customer_Details({ navigation, route }) {

const checkinInfo = route.params.checkinInfo;
//console.log('const checkinInfo: ', checkinInfo)

const currencyFormat = (num) => {
    return '₱' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  return (
    <View>
    <View style={{alignItems: 'center',height: 60, paddingTop: 30, backgroundColor: Colors.BackColor, marginBottom: 10}}>

              <Text style={{fontSize: 18, fontWeight: 'bold', padding: 0.2}}>{checkinInfo.customer}</Text>
          </View>
          <ScrollView>
    <Card>
    <CardItem>
    <Body>
  
  <Text style={{  fontSize: 13,fontWeight: 'bold', color: '#898989'}}>
    Check In
  </Text> 
  <View style={{ paddingLeft: 10, flexDirection: 'row'}}>
                  <Text style={{fontSize: 20, color: Colors.BackColor}}>{moment(checkinInfo.check_in * 1000).format('D')}</Text>
                  <Text style={{fontSize: 15}}> {moment(checkinInfo.check_in * 1000).format('MMM')}</Text>
                  <Text style={{fontSize: 15}}> {moment(checkinInfo.check_in * 1000).format('YYYY')}</Text>
                  <Text  style={{fontSize: 12, color: '#8d8d8d', marginLeft: -50}}>{"\n"} {moment(checkinInfo.check_in * 1000).format('h:mm a')}</Text>                                 

                      </View>                                              
 
</Body>
      <Body>
  
        <Text style={{  fontSize: 13,fontWeight: 'bold', color: '#898989'}}>
          Check Out
        </Text> 
              <View style={{  fontSize: 12, paddingLeft: 10, flexDirection: 'row'}}>
                  <Text style={{fontSize: 20, color: Colors.BackColor}}>{moment(checkinInfo.check_out * 1000).format('D')}</Text>
                  <Text style={{fontSize: 15}}> {moment(checkinInfo.check_out * 1000).format('MMM')}</Text>
                  <Text style={{fontSize: 15}}> {moment(checkinInfo.check_out * 1000).format('YYYY')}</Text>
                  <Text  style={{fontSize: 12, color: '#8d8d8d', marginLeft: -50}}>{"\n"} {moment(checkinInfo.check_out * 1000).format('h:mm a')}</Text>                                 

                      </View>       
                             
      </Body>
      <Body>

        <Text style={{ fontSize: 13,fontWeight: 'bold',  alignSelf: 'center', color: '#898989'}}>
        Nights
        </Text>
        <Text style={{  fontSize: 13, paddingLeft: 10, alignSelf: 'center', color: Colors.BackColor}}>
        {checkinInfo.number_of_days}
                </Text>                                              
  
      </Body>
    </CardItem>
  </Card>

  <View style={{alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
      <Fontisto name={'room'} size={25} color={'#898989'} style={{paddingRight: 10}}/>
      <Text style={{fontSize: 15, fontWeight: 'bold',color: 'grey', marginTop: 5}}>{checkinInfo.room_type} | Room {checkinInfo.room_no} </Text>
      </View>
               </View>

  <Card>
    <CardItem>
    <Body>
  <Text style={{  fontSize: 14}}> Average Rate</Text>    
  <Text style={{  fontSize: 14}}> Mode of Payment</Text> 
  <Text style={{  fontSize: 14}}> Contact No.</Text>   
  <Text style={{  fontSize: 14}}> Address</Text>   
  <Text style={{  fontSize: 14}}> Nationality</Text>   
  <Text style={{  fontSize: 14}}> Email</Text>   
  <Text style={{  fontSize: 14}}> Company Name</Text>   
  <Text style={{  fontSize: 14}}> NOTE</Text>                                 
</Body>
      <Body>
        <Text style={{  fontSize: 16}}>             :</Text>  
        <Text style={{  fontSize: 16}}>             :</Text> 
        <Text style={{  fontSize: 16}}>             :</Text>
        <Text style={{  fontSize: 16}}>             :</Text>
        <Text style={{  fontSize: 16}}>             :</Text>                   
        <Text style={{  fontSize: 16}}>             :</Text>
        <Text style={{  fontSize: 16}}>             :</Text>
      </Body>
      <Body>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>₱{checkinInfo.hour_price  == '' || checkinInfo.hour_price  == undefined? checkinInfo.price +' / Night': checkinInfo.hour_price+' /'+ checkinInfo.hour_duration+ 'Hours'}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.payment_method == ""? 'Cash': checkinInfo.payment_method}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.contact}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.address}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold', width: 250}}>{checkinInfo.nationality}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.email}</Text>
        {checkinInfo.company == ''?   <Text  style={{ fontSize: 13,fontWeight: 'bold'}}>
        N/A
                </Text>:   <Text style={{ fontSize: 13,fontWeight: 'bold'}}>
        {checkinInfo.company} </Text>} 
        {checkinInfo.note == ''?   <Text style={{ fontSize: 13,fontWeight: 'bold'}}>
        N/A
                </Text>:   <Text style={{ fontSize: 13,fontWeight: 'bold'}}>
        {checkinInfo.note}
                </Text>}     
     
      
      
      </Body>
    </CardItem>
    
  </Card>


<Card>
<CardItem bordered>
                        <Body style={{alignItems: 'center'}}>
                          <Text style={{color: Colors.BackColor, fontWeight: 'bold'}}> ADDITIONAL INFORMATION</Text>
                               </Body>
                   
                     
                    </CardItem>
    <CardItem>
    <Body>
  <Text style={{  fontSize: 14}}> Extension Rate</Text>    
  <Text style={{  fontSize: 14, width: 150}}> Extend Person</Text>   
  <Text style={{  fontSize: 14}}> Extension Date</Text>   
  <Text style={{  fontSize: 14}}> No. of person/s</Text>   
  <Text style={{  fontSize: 14, width: 150}}> Extra person/s</Text>   
  <Text style={{  fontSize: 14}}> Discount</Text>   
  <Text style={{  fontSize: 14, width: 150}}> Discounted Person</Text>  
  <Text style={{  fontSize: 14, width: 150}}> Discount code/id</Text>                                 
</Body>
      <Body>
        <Text style={{  fontSize: 16}}>             :</Text>  
        <Text style={{  fontSize: 16}}>             :</Text>
        <Text style={{  fontSize: 16}}>             :</Text>
        <Text style={{  fontSize: 16}}>             :</Text>                   
        <Text style={{  fontSize: 16}}>             :</Text>
        <Text style={{  fontSize: 16}}>             :</Text>
        <Text style={{  fontSize: 16}}>             :</Text>
      </Body>
      <Body>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{currencyFormat(parseFloat(checkinInfo.extension_amount))}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.extension_person}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}> {checkinInfo.extension == 0 || checkinInfo.extension == undefined ? 'N/A':moment(checkinInfo.extension * 1000).format('MMM D, YYYY hh:mm a')}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold', width: 250}}>{checkinInfo.no_person}</Text>
        <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{checkinInfo.extra_person} ({currencyFormat(parseFloat(checkinInfo.extra_amount))})</Text>
        {checkinInfo.discount_value == ''?   <Text style={{ fontSize: 13,fontWeight: 'bold'}}>
        N/A
                </Text>:   <Text style={{ fontSize: 13,fontWeight: 'bold'}}>
            {Math.round(checkinInfo.discount_value* 100 /10)*10 +'%'}
                </Text>} 
        {checkinInfo.no_person_discount == ''?   <Text style={{ fontSize: 13,fontWeight: 'bold'}}>
        N/A
                </Text>:   <Text style={{ fontSize: 13,fontWeight: 'bold'}}>
        {checkinInfo.no_person_discount}
                </Text>}
        {checkinInfo.discount_code == ''?   <Text style={{ fontSize: 13,fontWeight: 'bold'}}>
        N/A
                </Text>:   <Text style={{ fontSize: 13,fontWeight: 'bold'}}>
        {checkinInfo.discount_code}
                </Text>}              
     
      
      
      </Body>
    </CardItem>
    
  </Card>




  <Card style={{marginBottom: 80}}>
<CardItem bordered>
                        <Body style={{alignItems: 'center'}}>
                          <Text style={{color: Colors.BackColor, fontWeight: 'bold'}}>SUMMARY</Text>
                               </Body>
                   
                     
                    </CardItem>
    <CardItem>
    <Body>
  <Text style={{  fontSize: 14}}> Room Stay</Text>       
  <Text style={{  fontSize: 14}}> Other Charges</Text>   
  <Text style={{  fontSize: 14, width: 150}}> Extension</Text>   
  <Text style={{  fontSize: 14}}> Penalty</Text>   
  <Text style={{  fontSize: 14, width: 150}}> Discount</Text>  
  <Text style={{  fontSize: 14, width: 150, fontWeight: 'bold'}}> Total Charges</Text>                                 
</Body>
      <Body>
        <Text style={{  fontSize: 14}}>             :</Text>  
        <Text style={{  fontSize: 14}}>             :</Text>
        <Text style={{  fontSize: 14}}>             :</Text>
        <Text style={{  fontSize: 14}}>             :</Text>                   
        <Text style={{  fontSize: 14}}>             :</Text>
        <Text style={{  fontSize: 14}}>             :</Text>
      </Body>
      <Body>
      <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{currencyFormat(parseFloat(checkinInfo.stay_total))}</Text>
      <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{currencyFormat(parseFloat(checkinInfo.extra_person)*150*parseFloat(checkinInfo.number_of_days))}</Text>
      <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{currencyFormat(parseFloat(checkinInfo.extension_total_amount))}</Text>
      <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{currencyFormat(parseFloat(checkinInfo.penalty))}</Text>
      <Text style={{ fontSize: 13,fontWeight: 'bold'}}>-{currencyFormat(parseFloat(checkinInfo.discount_less))}</Text>
         <Text style={{ fontSize: 13,fontWeight: 'bold'}}>{currencyFormat(parseFloat(checkinInfo.overall_total))}</Text>
       
   
             
     
      
      
      </Body>
    </CardItem>
    
  </Card>
  </ScrollView>

  </View>


  

  );
}
