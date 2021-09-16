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

export function Goods_Promo({ navigation, route }) {
    const { userData,GoodsPlanData, EditGoodsPlan } = useAuth();
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

 console.log('GoodsPlanData: ', GoodsPlanData)
 const UpdateGoodsPlan= ()=>{
     if(GoodsPlanData.id_goods_promo != null){
        Alert.alert("You Already Have a Plan","Contact us at `sample@gmail.com` for plan update")
     }else{
    Alert.alert(
        "Do you Want to Proceed?",
        "You Have To Email Us to Update Goods Plan.",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "OK", onPress: async() =>   { try {
            setLoading(true)
            await  EditGoodsPlan(userData.name, goodsplan, off, price, name_goods_promo,number, description);
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
//cons

  const Good = [{
    "id": "1",
    "off": "0",
    "price": "0",
    "name": "Free",
    "number": "4",
    "description": "Goods",
},
{
    "id": "2",
    "off": "0",
    "price": "100",
    "name": "Silver Monthly",
    "number": "10",
    "description": "Goods",
},
{
    "id": "3",
    "off": "0",
    "price": "200",
    "name": "Gold Monthly",
    "number": "25",
    "description": "Goods",
},
{
    "id": "4",
    "off": "0",
    "price": "250",
    "name": "Platinum Monthly",
    "number": "30",
    "description": "Goods",
},
{
    "id": "5",
    "off": "0",
    "price": "350",
    "name": "Diamond Monthly",
    "number": "50",
    "description": "Goods",
},
{
    "id": "6",
    "off": "1300",
    "price": "1200",
    "name": "Silver Yearly",
    "number": "10",
    "description": "Goods",
},
{
    "id": "7",
    "off": "2400",
    "price": "2200",
    "name": "Gold Yearly",
    "number": "25",
    "description": "Goods",
},
{
    "id": "8",
    "off": "3000",
    "price": "2700",
    "name": "Platinum Yearly",
    "number": "30",
    "description": "Goods",
},
{
    "id": "9",
    "off": "4200",
    "price": "3800",
    "name": "Diamond Yearly",
    "number": "50",
    "description": "Goods",
}]


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
        <Text style={{marginTop: 20, fontWeight: 'bold', color: 'white'}}>Choose Goods Plan</Text>
       
       </Header>
        </View>
        <Loader loading={Loading} />
  {GoodsPlanData.id_goods_promo === null? null:
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
  </Text>{GoodsPlanData.price}  <Text style={{fontWeight: 'bold',fontSize: 11, color: 'gray', textDecorationLine: 'line-through'}}>{GoodsPlanData.off === '0'?null: '₱'+ GoodsPlanData.off} </Text></Text>
              <View >
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>{GoodsPlanData.name_goods_promo}</Text>
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>{GoodsPlanData.number} {GoodsPlanData.description}</Text>
              </View>
             
           </CardItem>
              </Card>
           
         }
       />
  
    </View>
  
  }

        <FlatList
           data={Good}
           keyExtractor={(item, index) => index.toString()}
           numColumns={2}
           renderItem={({item})  =>  
           <Card style={{marginLeft: 10, width: '45%', opacity: goodsplan === ''? 1 : goodsplan === item.id? 1 :0.4   }}>
          

           <CardItem  style={{flex:1,marginBottom: 0, flexDirection: 'column'}} button onPress={() =>{GoodsPlanData.id_goods_promo != null?Alert.alert("You Already Have a Plan","Contact us at `sample@gmail.com` for plan update"):setgoodsplan(item.id),setoff(item.off),setprice(item.price),setname_goods_promo(item.name),setnumber(item.number),setdescription(item.description)}}>
               {goodsplan === ''? null : goodsplan === item.id?  <MaterialCommunityIcons name={'check-decagram'} size={20} color={Colors.BackColor} style={{ alignSelf: 'flex-end', position: 'absolute'}}/> :null}
              
              <Text style={{fontWeight: 'bold', alignSelf: 'center',fontSize: 18}} numberOfLines={1}> <Text style={{fontSize:18 / 1.6, lineHeight:22 , marginTop: '-50%'}}>
              ₱
  </Text>{item.price}  <Text style={{fontWeight: 'bold',fontSize: 11, color: 'gray', textDecorationLine: 'line-through'}}>{item.off === '0'?null: '₱'+ item.off} </Text></Text>
              <View >
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>{item.name}</Text>
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>{item.number} {item.description}</Text>
              </View>
             
           </CardItem>
              </Card>
           
         }
       />

        
      
<View style={{flexDirection: 'row', marginBottom: 20, marginLeft: 20,}}>
      
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
