
import React, { useState, useEffect } from "react";

import { Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, Button, PermissionsAndroid,Alert, BackHandler, Pressable, Modal, FlatList } from 'react-native';
import { Container, Content, View, Left, Right, Icon, Card, CardItem, Badge, Text, Body, Thumbnail, Item, Input, Label, Header, SwipeRow} from 'native-base';
var {height, width } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../Colors';
import { useTasks} from "../providers/TasksProvider";
import Toast from "react-native-simple-toast";
import styles from '../components/styles/styles';


export function TWConfirmedItem({ navigation, route }) {
 const { checkin, CancelRes, Booking, tasks, ConfirmRes, rooms, createCheckin, HourCheckin, PromoCheckin, Checked } = useTasks();
 const [guest, setguest] = useState(checkin);
 const [dt, setDt] = useState(new Date().toLocaleString());
 const checkinInfo= Booking.find(x => x.reservation_code === route.params.checkinInfo) ;

const newdar = tasks.find(x => x.temp_id === checkinInfo.room)


 const [newRoomType, setNewRoomType] = useState(newdar.room_type);
 const [newRoomPrice, setNewRoomPrice] = useState(newdar.roomprice);
 const [newExtraPerson, setNewExtraPerson] = useState(newdar.extra_person_charge);
 const [newMaxPerson, setNewMaxPerson] = useState(newdar.max_person);
 const [id, setId] = useState(newdar._id);
 const [Durationvalue, setDurationValue] = useState(null);
 const [RoomID, setRoomID] = useState("");
 const [RoomFloor, setRoomFloor] = useState("");
 const [RoomName, setRoomName] = useState("");
 const [check_in, setCheckin] = useState(checkinInfo.in_check *1000);
 const [check_out, setCheckout] = useState(checkinInfo.out_check *1000);
 const [Company, setCompany] = useState("");
 const [Customer, setCustomer] = useState(checkinInfo.name);
 const [Address, setAddress] = useState(checkinInfo.address);
 const [Contact, setContact] = useState(checkinInfo.phone_no);
 const [Nationality, setNationality] = useState(checkinInfo.nationality);
 const [Email, setEmail] = useState(checkinInfo.email);
 const [NoPerson, setNoPerson] = useState(checkinInfo.guest);
 const [ExtraPerson, setExtraPerson] = useState("");
 const [PersonWDiscount, setPersonWDiscount] = useState("");
 const [Discount, setDiscount] = useState("");
 const [DiscountID, setDiscountID] = useState("");
 const [Note, setNote] = useState("");
 const [control_num, setcontrol_num] = useState("");
 const [visibleRMModal, setvisibleRMModal] = useState(false);
 const [room_set, setRoomSet] = useState([]);
 const [RoomTypeIds, setRoomTypeIds] = useState([]);
 const [RoomIDTemp, setRoomIDTemp] = useState("");
 const [Editcheckin, setEditcheckin] = useState(false);
 const [OutButton, setOutButton] = useState(true);

 const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 const [isDatePickerVisible_checkout, setDatePickerVisibility_checkout] = useState(false);



//return newData.


const CancelButton =()=>{


  Alert.alert(
    "This Process Cannot be Undone.",
    "Are you sure you want to CANCEL the Reservation?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "OK", onPress: () =>   {CancelRes(checkinInfo);
}         
}
],
{ cancelable: false }

);

 
}



const ConfirmButton =()=>{

  Alert.alert(
    "Make sure to Contact the Guest.",
    "Are you sure you want to CONFIRM the Reservation?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "OK", onPress: () =>   {ConfirmRes(checkinInfo)
}         
}
],
{ cancelable: false }

);

 
}

const showDatePicker = () => {
  setDatePickerVisibility(true);
 };

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
  setCheckin(date)
  setEditcheckin(true);
  if(newdar.rate_mode == 'Daily'){
  setOutButton(false)
   }
 if(newdar.rate_mode == 'Hour'){
  setCheckout(moment(date).add(parseFloat(newdar.hour_duration), 'hours')); setOutButton(true)
 }
 if(newdar.rate_mode =='Promo' && newdar.duration_mode== 'Daily'){
  setCheckout(moment(date).add(parseFloat(newdar.promo_duration), 'days')); setOutButton(true)
 }
 if(newdar.rate_mode =='Promo' && newdar.duration_mode== 'Hour'){
  setCheckout(moment(date).add(parseFloat(newdar.promo_duration), 'hours')); setOutButton(true)
 }
  hideDatePicker();
};


const showDatePicker_checkout = () => {
  setDatePickerVisibility_checkout(true);

};

const hideDatePicker_checkout = () => {
  setDatePickerVisibility_checkout(false);
};

const handleConfirm_checkout = (date) => {
  setCheckout(date)
  hideDatePicker_checkout();
};
    
const GoToIn = () =>{



const out = Editcheckin==false?  newdar.rate_mode =='Daily'?moment(check_out).unix(): newdar.rate_mode == 'Hour'?moment(check_in).add(parseFloat(newdar.hour_duration), 'hours').unix(): newdar.rate_mode =='Promo' && newdar.duration_mode== 'Daily'?moment(check_in).add(parseFloat(newdar.promo_duration), 'days').unix(): moment(check_in).add(parseFloat(newdar.promo_duration), 'hours').unix(): moment(check_out).unix()


  if (!RoomName.trim()) {
    Toast.show('Please Choose Room no.');
    return;
  }
  Toast.show('Please Wait')
  if(newdar.rate_mode == 'Daily'){
    
    createCheckin(newRoomType,newRoomPrice,newMaxPerson,id,RoomID,RoomFloor,RoomName,check_in,out*1000,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note,newExtraPerson,control_num, newdar, RoomTypeIds, RoomIDTemp, checkinInfo.reservation_code, "Reservation");
    Checked(checkinInfo)
    BackPage()
     }
   if(newdar.rate_mode == 'Hour'){
    HourCheckin(newRoomType,newdar.roomprice_hour,newMaxPerson,id,RoomID,RoomFloor,RoomName,check_in,out*1000,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note,newExtraPerson, control_num,newdar, RoomTypeIds, RoomIDTemp, checkinInfo.reservation_code, "Reservation");
    Checked(checkinInfo)
    BackPage()
  }
   if(newdar.rate_mode =='Promo' && newdar.duration_mode== 'Daily'){
    PromoCheckin(newRoomType,newRoomPrice,newMaxPerson,id,RoomID,RoomFloor,RoomName,check_in,out*1000,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note,newExtraPerson,control_num, newdar,RoomTypeIds, RoomIDTemp, checkinInfo.reservation_code, "Reservation");
    Checked(checkinInfo)
    BackPage()
   }
   if(newdar.rate_mode =='Promo' && newdar.duration_mode== 'Hour'){
    PromoCheckin(newRoomType,newRoomPrice,newMaxPerson,id,RoomID,RoomFloor,RoomName,check_in,out*1000,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note,newExtraPerson,control_num, newdar,RoomTypeIds, RoomIDTemp, checkinInfo.reservation_code, "Reservation");
    Checked(checkinInfo)
    BackPage()
  }



   
      }
      const BackPage = () => {
        navigation.goBack()
        }    

  return (
    <View>
              <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
            <TouchableOpacity
                style={{marginTop: 15,left: -70}}
                onPress={BackPage}
             >
                 <MaterialCommunityIcons name={'arrow-left'} size={30} color={'white'}/>
             </TouchableOpacity>
        <Text style={{marginTop: 20, fontWeight: 'bold', color: 'white'}}>Reservation Details</Text>
       
       </Header>
               
<ScrollView style={{marginBottom: 2}}>
              
        <View> 
                    <Card style={{flex: 0, marginTop: 10, width: '90%', marginLeft: '5%'}} >
                                        <CardItem bordered>
                                          <TouchableOpacity    onPress={()=> Details(checkin) } style={{width: '100%'}}>
                                          <Left  style={{marginTop: -10, marginBottom: -10}}>
                                  
                                          <Body>
                                              <Text>{checkinInfo.name}</Text>
                                              <View style={{flexDirection: 'row'}}>
                                              <Ionicons name="people-outline" size={16} color={Colors.BackColor}/>
                                              <Text note> {checkinInfo.guest}</Text>
                                              </View>
                                            </Body>
                                          </Left>
                                        
                                          </TouchableOpacity>
                                        </CardItem>
                                        <CardItem style={{marginBottom: -12}}>
                                          <Left>
                                          <SimpleLineIcons name={'login'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{moment(checkinInfo.in_check * 1000).format('MMM D YYYY h:mm a')}</Text>
                                      </Left>
                                        </CardItem>
                                        <CardItem style={{marginBottom: -12}}>
                                      <Body style={{ flexDirection: 'row',}}>
                                      <SimpleLineIcons name={'logout'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14, paddingLeft: 10, paddingTop: 4}}>{moment(checkinInfo.out_check * 1000).format('MMM D YYYY h:mm a')}</Text>
                                  </Body>
                                        </CardItem>
                                        <CardItem>
                                          <Left>
                                          <Ionicons name={'mail-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.email}</Text>
                                      </Left>
                                        </CardItem>
                                        <CardItem>
                                      <Body style={{ flexDirection: 'row',}}>
                                          <Ionicons name={'call-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.phone_no}</Text>
                                      </Body>
                                        </CardItem>
                                        <CardItem>
                                          <Left>
                                          <Ionicons name={'ios-people-circle-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.nationality}</Text>
                                      </Left>
                                        </CardItem>
                                        <CardItem>
                                      <Body style={{ flexDirection: 'row',}}>
                                          <Ionicons name={'md-location-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.address}</Text>
                                      </Body>
                                        </CardItem>
                                        <CardItem bordered>
                                          <Left>
                                          <Ionicons name={'card-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.mode}</Text>
                                      </Left>
                                      <Body style={{ flexDirection: 'row',}}>
                                          <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{newdar.room_type}</Text>
                                      </Body>
                                        </CardItem>
                                        
                                  
                                        <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                <Left>
                                                <Foundation name={'clipboard-notes'} size={18} color={'black'} />
                                            <Text style={{fontSize: 14, color: Colors.BackColor}}>Resv.: </Text>
                                            <Text style={{fontSize: 14}}>{checkinInfo.reservation_code}</Text>
                                            </Left>
                                              </CardItem>
                                              <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                            <Left style={{flexDirection: 'row'}}>
                                                <Ionicons name={'ellipsis-horizontal-circle'} size={18} color={'black'} />
                                            <Text style={{fontSize: 14, color: Colors.BackColor}}>Status: </Text>
                                            <Text style={{fontSize: 14}}>{checkinInfo.status}</Text>
                                            </Left>
                                              </CardItem>
                                              <CardItem bordered style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                
                                                <Left>
                                                <Foundation name={'clipboard-notes'} size={18} color={'black'} />
                                            <Text style={{fontSize: 14, color: Colors.BackColor}}>Date Booked.: </Text>
                                            <Text style={{fontSize: 14}}>{moment(checkinInfo.updatedAt * 1000).format('MMM D YYYY h:mm a')}</Text>
                                            </Left>
                                              </CardItem>
                                            
                                              <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                
                                                <TextInput
                          style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 200}]} 
                          autoCorrect={true}
                          returnKeyType={'next'}
                          placeholder="Reason Of Cancel"
                          autoFocus={true}
                          onChangeText={(text) => setReasons(text)}
                      />    
                           
                                            
                                                </CardItem>
                                              <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                
                                                <Left>
                                                <Button title={'Cancel'} onPress={CancelButton}  color={'#ca3433'}/>
                                            </Left>
                                          
                                              
                                          
                                              </CardItem>
                                             
                                      </Card>
                                    
                                      </View>
                                      <View style={{marginBottom: 100}}>

                                      </View>
  
  </ScrollView>

    </View>
  );
}

const styless = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
  
      alignItems: "flex-start",
      shadowColor: "#000",
    width: 300,
    height: 400,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 10,
      padding: 5,
      elevation: 2
    },
    textStyle: {
      color: "#b6a6fc",
      fontWeight: "bold",
      textAlign: "left"
    },
    modalText: {
      marginBottom: 10,
      textAlign: "center"
    }
  });
  

const stylesss = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
height: 300,
    alignItems: "flex-start",
    shadowColor: "#000",
  width: 300,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 5,
    elevation: 2
  },
  textStyle: {
    color: "#b6a6fc",
    fontWeight: "bold",
    textAlign: "left"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center"
  }
});

