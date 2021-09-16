import React, { useState, useEffect } from "react";

import { View,StyleSheet, Dimensions, Button,Text, Image, TouchableOpacity, Alert ,TextInput, TouchableHighlight, ScrollView, RefreshControl, FlatList,Modal, Pressable } from "react-native";
import { Col, Card, CardItem, Body, Left, List, Content, Thumbnail, Right,Grid, Icon,  Container, Header,Toast, Root,Badge, Item,Input  } from 'native-base';
import styless from '../components/styles/styless';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB, Portal, Provider } from 'react-native-paper';
import styles from '../components/styles/Home.Style';
import Colors from '../components/styles/Color';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAuth } from "../providers/AuthProvider";
import ImagePicker from "react-native-image-picker";
import {imgDefault} from "../components/styles/images";
import Loader from '../components/styles/Loader'
import { createPayment } from "react-native-paypal-checkout";


export function Room_Plan({ navigation, route }) {
    const { userData,RoomPlanData, EditRoomPlan,user } = useAuth();
  const [visibleModal, setvisibleModal] = useState(false);
  const [state, setState] = useState({ open: false });
  const [Loading, setLoading] = useState(false);
  const { open } = state;
  const onStateChange = ({ open }) => setState({ open });
  const [goodsplan, setgoodsplan] = useState('');
  const [off, setoff] = useState('');
  const [price, setprice] = useState('');
  const [name_goods_promo, setname_goods_promo] = useState('');
  const [number, setnumber] = useState('');
  const [description, setdescription] = useState('');
 const [teamMemberList, setTeamMemberList] = useState([]);

console.log('number: ', number)

 const getTeam = async () => {
   try {
     const roomPlan = await user.functions.get_Promo_Plan([]);
     console.log('roomPlan: ', roomPlan)
     setTeamMemberList(roomPlan);
   } catch (err) {
     Alert.alert("An error occurred while getting team members", err);
   }
 };

 const UpdateGoodsPlan= ()=>{
     if(RoomPlanData.id_goods_promo != null){
        Alert.alert("You Already Have a Plan","Contact us at `sample@gmail.com` for plan update")
     }else{
    Alert.alert(
        "Do you Want to Proceed?",
        "You Have To Email Us to Update Room Plan.",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "OK", onPress: async() =>   { try {
            setLoading(true)
            await  EditRoomPlan(userData.name, goodsplan, off, price, name_goods_promo,number, description);
            setLoading(false)
            navigation.goBack()
        } catch (err) {
            setLoading(false)
            Alert.alert("An error occurred while Updating", err.message);
          }
    }         
    }
    ],
    { cancelable: false }
    
    );
     }
   
  }



  const payNow=()=>{

    createPayment({
      clientId: 'AbyfNDFV53djg6w4yYgiug_JaDfBSUiYI7o6NM9HE1CQ_qk9XxbUX0nwcPXXQHaNAWYtDfphQtWB3q4R',
      environment: PayPal.SANDBOX,
      price: '42.00',
      currency: 'USD',
      description: 'PayPal Test'
    }).then((confirm, payment) => console.log('Paid'))
    .catch((error_code) => console.error('Failed to pay through PayPal'));

  }
  console.log('RoomPlanData: ', RoomPlanData)

useEffect(() => {
  getTeam();
}, [user]);

  return (
    <View style={{height: '100%'}}>
      <View style={{width: '100%'}}>
      <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
             <TouchableOpacity
        style={{marginTop: 15,left: -90}}
        onPress={() =>  navigation.goBack()}
     >
         <MaterialCommunityIcons name={'arrow-left'} size={30} color={'white'}/>
     </TouchableOpacity>
        <Text style={{marginTop: 20, fontWeight: 'bold', color: 'white'}}>Choose Room Plan</Text>
       
       </Header>
        </View>
        <Loader loading={Loading} />
  {RoomPlanData.id_room_plan === null? null:
<View>

<FlatList
            data={['1']}
           keyExtractor={(item, index) => index.toString()}
           numColumns={2}
           renderItem={({item})  =>  
           <Card style={{marginLeft: 10, width: '45%', opacity: 1 }}>
           <CardItem  style={{flex:1,marginBottom: 0, flexDirection: 'column', height:'50%'}} button>
             <MaterialCommunityIcons name={'check-decagram'} size={20} color={Colors.BackColor} style={{ alignSelf: 'flex-end', position: 'absolute'}}/>
              
              <Text style={{fontWeight: 'bold', alignSelf: 'center',fontSize: 18}} numberOfLines={1}> <Text style={{fontSize:18 / 1.6, lineHeight:22 , marginTop: '-50%'}}>
              ₱
  </Text>{RoomPlanData.price_room_plan}  <Text style={{fontWeight: 'bold',fontSize: 11, color: 'gray', textDecorationLine: 'line-through'}}>{RoomPlanData.off_room_plan === '0'?null: '₱'+ RoomPlanData.off_room_plan} </Text></Text>
              <View >
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>{RoomPlanData.name_room_plan}</Text>
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>{RoomPlanData.number_room_plan} Rooms {RoomPlanData.number=="0"?null: 'and '+ RoomPlanData.number + ' Store Items'}</Text>
              </View>
             
           </CardItem>
              </Card>
           
         }
       />
  
    </View>
  
  }

        <FlatList
           data={teamMemberList}
           keyExtractor={(item, index) => index.toString()}
           numColumns={2}
           renderItem={({item})  =>  
           <Card style={{marginLeft: 10, width: '45%', opacity: goodsplan === ''? 1 : goodsplan === item.tepm_id? 1 :0.4   }}>
          

           <CardItem  style={{flex:1,marginBottom: 0, flexDirection: 'column'}} button onPress={() =>{RoomPlanData.id_room_plan != null?Alert.alert("You Already Have a Plan","Contact us at `sample@gmail.com` for plan update"):setgoodsplan(item.tepm_id),setoff(item.off),setprice(item.price),setname_goods_promo(item.name),setnumber(item.room_number),setdescription(item.goods_number)}}>
               {goodsplan === ''? null : goodsplan === item.tepm_id?  <MaterialCommunityIcons name={'check-decagram'} size={20} color={Colors.BackColor} style={{ alignSelf: 'flex-end', position: 'absolute'}}/> :null}
              
              <Text style={{fontWeight: 'bold', alignSelf: 'center',fontSize: 18}} numberOfLines={1}> <Text style={{fontSize:18 / 1.6, lineHeight:22 , marginTop: '-50%'}}>
              ₱
  </Text>{item.price}  <Text style={{fontWeight: 'bold',fontSize: 11, color: 'gray', textDecorationLine: 'line-through'}}>{item.off === '0'?null: '₱'+ item.off} </Text></Text>
              <View >
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>{item.name}</Text>
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>{item.room_number} Rooms {item.goods_number=="0"?null: 'and '+ item.goods_number + ' Store Items'}</Text>
              </View>
             
           </CardItem>
              </Card>
           
         }
       />

        
      
<View style={{flexDirection: 'row', marginBottom: 20, marginLeft: 20,}}>
<Button
            title="payNow"
      style={{ width: '50%'}}
            color={Colors.buttons}
            onPress={payNow}
          />
          <Text style={{marginLeft: 20,}}>&nbsp;</Text>
<Button
            title="Select Plan"
      style={{ width: '50%'}}
            color={Colors.buttons}
            onPress={UpdateGoodsPlan}
          />
                
      </View>
    </View>
  );
}
