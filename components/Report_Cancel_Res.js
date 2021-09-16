import React, { useState } from "react";
import { Dimensions, StyleSheet, FlatList, Image, TouchableOpacity, Button, PermissionsAndroid,Alert, BackHandler, Pressable, Modal } from 'react-native';
import { Container, Content, View, Left, Right, Icon, Card, CardItem, Badge, Text, Body, Thumbnail, Item, Input, Label, Header, SwipeRow, Tab, Tabs,ScrollableTab} from 'native-base';
var {height, width } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import styles from './styles/Home.Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import styless from './styles/styles_component';
import { useTasks} from "../providers/TasksProvider";
import Colors from '../Colors';
import RNPrint from 'react-native-print';
import XLSX from 'xlsx';
import { writeFile, DownloadDirectoryPath } from 'react-native-fs';
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";

export function Report_Cancel_Res({navigation}) {
  
    const { tasks, getResult, getResultGoods, Res_Ref, res_out,Res_In,FD_Ref, FD_out, FD_in, ewallet, Debit,Credit,Cash,Cancel_Res,All_Ref, reserve  } = useTasks();
    const [customers, setCustomer] = useState(reserve)
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [check_out_value, setcheck_out_value] = useState("");
  const [check_in_value, setcheck_in_value] = useState("");
  const [check_in, setcheck_in] = useState("");
  const [check_out, setcheck_out] = useState("");
  const [category, setcategory] = useState("");
  const [overlayVisibleCheckin, setOverlayVisibleCheckin] = useState(false);
  const reports_info = reserve.map( ({in_check, out_check,reservation_code, room,mode, name,phone_no, address, nationality, guest,reason }) => ({in_check, out_check,reservation_code, room,mode, name,phone_no, address, nationality, guest,reason}) )
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible_checkout, setDatePickerVisibility_checkout] = useState(false);
  const DDP = DownloadDirectoryPath + '/';

  const input = res => res;
  const output =str => str;
  const key ="room"
  const room_types = [...new Map(reserve.map(item => [item[key], item])).values()]
  const key_nat ="nationality"
const natl = [...new Map(reserve.map(item => [item[key_nat], item])).values()]

  const requestRunTimePermission=()=>{
   
    async function externalStoragePermission(){
      try{
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to storage data',
          }
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
        
    const date_now = moment().format('MMM-D-YYYY=h-mm-a')
    const name = 'Cancelled Reservation ('+ date_now +' )'+'.xlsx'
    
    const ws= XLSX.utils.json_to_sheet(reports_info);
    console.log('ws: ', ws)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, date_now+" report");
    const wbout =XLSX.write(wb, {type: 'binary', bookType: "xlsx"});
    const file = DDP + name;
  
  
    writeFile(file, output(wbout), 'ascii').then((res)=> {
      Alert.alert("Exportfile Success", "Exported to "+ file);
    }).catch((err) => {Alert.alert('exporting file error ', 'Export is not Available');});
  
  
        }else{
          alert('WRITE_EXTERNAL_STORAGE Permission Denied');
        }
      } catch(err){
        Alert.alert('Write Permission err: ', err);
        console.log(err);
      }
    }
  
    if (Platform.OS === 'android'){
      externalStoragePermission();
    }else{console.log('not android')
  
    }
  }



  const  printHTML = async () => {
    let html_content = 
    `<style>
 
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
      background-color: white;
      position: relative;
      z-index: 1000
    }
    tr{
      border: 1px solid black;
    }
    th, td {
      
      padding: 5px;
    }
    th {
      text-align: left;
    }
    </style>
    
    
    <h3>Generated Report on Cancelled Reservation ${moment().format('MMM-D-YYYY h:mm a')}</h3>
  <table style="margin-top:-40px">
  <tbody>
  <tr><th>Name </th>
  <th>Check-in </th>
  <th>Check-out </th>
  <th>Room Type </th>
  
  <th>Contact </th>
  <th>Email </th>
  <th>Nationality </th>
  <th>No. of Person </th>
  <th>Reason </th>
  <th>Date </th></tr>
  ${renderTableData()}
  </tbody>
  </table>`
    await RNPrint.print({
      html : html_content,
      fileName: 'Report',
      base64: true,
    })
 
  };



  
  const renderTableData = () => {
  return reserve.map((arrNote, index) => {
     return (
      `<tr>
        <td style=" word-break: break-all;">${arrNote.name}</td>
        <td style=" word-break: break-all;">${moment(arrNote.in_check * 1000).format('MMM D YYYY h:mm a')}</td>
        <td style=" word-break: break-all;">${moment(arrNote.out_check * 1000).format('MMM D YYYY h:mm a')}</td>
        <td>${room(arrNote.room)}</td>
        
        <td style=" word-break: break-all;">${arrNote.phone_no}</td>
        <td style=" word-break: break-all;">${arrNote.email}</td>
        <td style=" word-break: break-all;">${arrNote.nationality}</td>
        <td style=" word-break: break-all;">${arrNote.guest}</td>
        <td style=" word-break: break-all;">${arrNote.reason}</td>
        <td style=" word-break: break-all;">${moment(arrNote.createdAt * 1000).format('MMM D YYYY h:mm a')}</td>
      </tr>`
    )
  })
}
  const showDatePicker = () => {
    setDatePickerVisibility(true);
 
  };

  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDatePicked = (date) => {
    console.log("A date has been picked: ", date);
    setcheck_in_value(date)
    hideDateTimePicker();
  };
  const showDateTimePicker_check_out = () => {
    setDatePickerVisibility_checkout(true);
  };

  const hideDateTimePicker_check_out = () => {
    setDatePickerVisibility_checkout(false);
  };
  const handleDatePicked_check_out = (date) => {
    console.log("A date has been picked: ", date);
    setcheck_out_value(date)
    hideDateTimePicker_check_out();
  };
  const currencyFormat = (num) => {
    return '₱' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 const searchData = (text) => {
  
  const newData = reserve.filter(item => {
    const itemData = item.name.toUpperCase();
    const textData = text.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });

  setCustomer(newData)  
  
 

  }

  const room = (item) => {
   
    const filterRes= tasks.find(x => x.temp_id ===  item) ;
    console.log('filterRes: ', filterRes)

    return filterRes.name
  }
  return (

   <View style={styles.mainContainer}>


                      <View style={styles.toolbar}>
               
                <View style={{width: '100%'}}>
                <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item>
            <Ionicons name="search" size={20} color={Colors.BackColor}/>
            <Input placeholder="cancelled Reservation Search Customer Name" style={{borderColor: 'red', fontSize: 13}}    onChangeText={(text) => searchData(text)}/>
        
            <TouchableOpacity style={{paddingRight: 10}} onPress={requestRunTimePermission}>
            <MaterialCommunityIcons name="microsoft-excel" size={28} color={Colors.BackColor} />
            </TouchableOpacity>
            <TouchableOpacity  style={{paddingRight: 10}} onPress={printHTML}>
            <Ionicons name={"ios-print"} size={28} color={Colors.BackColor}/>
            </TouchableOpacity>
             </Item>
        
        </Header>
                </View>
               
                
            </View>
       
     
      
                                                      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab tabsContainerStyle={{backgroundColor: Colors.BackColor }}/>}>
          <Tab heading="Detailed" tabStyle={{backgroundColor: Colors.BackColor, color: 'white' }} activeTabStyle={{backgroundColor: Colors.BackColor, color: 'white'  }}>
           
{customers && customers.length > 0 ?
                <FlatList
           
                    style={styles.viewList}
                    data={customers}
                    showsVerticalScrollIndicator={false}
                   
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item})  =>  
                    <Card style={{flex: 0, marginTop: 10}} >
                <CardItem bordered button onPress={()=> navigation.navigate('Reservation_details', {checkinInfo: item})}>
                  <Left  style={{marginTop: -10, marginBottom: -10}}>
          
                    <Body>
                      <Text>{item.name}</Text>
                      </Body>
                  </Left>
                  <Right>
                  <MaterialCommunityIcons name={'dots-vertical'} size={18} color={'black'} style={{ paddingTop: 5}} onPress={()=> navigation.navigate('Reservation_details', {checkinInfo: item})}/>
                  </Right>
                </CardItem>
                <CardItem style={{marginBottom: -12}}>
                  <Left>
                  <SimpleLineIcons name={'login'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12}}>{moment(item.in_check * 1000).format('MMM D YYYY h:mm a')}</Text>
              </Left>
                </CardItem>
                <CardItem style={{marginBottom: -12}}>
              <Body style={{ flexDirection: 'row',}}>
              <SimpleLineIcons name={'logout'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12, paddingLeft: 10, paddingTop: 4}}>{moment(item.out_check * 1000).format('MMM D YYYY h:mm a')}</Text>
          </Body>
                </CardItem>
                <CardItem style={{marginBottom: 5}}>
                  
                  <Left>
                  <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12}}>{room(item.room)}</Text>
              
              </Left>
              
            
             
                </CardItem>
          
            
              </Card>
                   
                  }
                /> :
                <FlatList
           
                style={styles.viewList}
                data={reserve}
                showsVerticalScrollIndicator={false}
               
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item})  =>  
                <Card style={{flex: 0, marginTop: 10}} >
                <CardItem bordered button onPress={()=> navigation.navigate('Reservation_details', {checkinInfo: item})}>
                  <Left  style={{marginTop: -10, marginBottom: -10}}>
          
                    <Body>
                      <Text>{item.name}</Text>
                      </Body>
                  </Left>
                  <Right>
                  <MaterialCommunityIcons name={'dots-vertical'} size={18} color={'black'} style={{ paddingTop: 5}} onPress={()=> navigation.navigate('Reservation_details', {checkinInfo: item})}/>
                  </Right>
                </CardItem>
                <CardItem style={{marginBottom: -12}}>
                  <Left>
                  <SimpleLineIcons name={'login'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12}}>{moment(item.in_check * 1000).format('MMM D YYYY h:mm a')}</Text>
              </Left>
                </CardItem>
                <CardItem style={{marginBottom: -12}}>
              <Body style={{ flexDirection: 'row',}}>
              <SimpleLineIcons name={'logout'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12, paddingLeft: 10, paddingTop: 4}}>{moment(item.out_check * 1000).format('MMM D YYYY h:mm a')}</Text>
          </Body>
                </CardItem>
                <CardItem style={{marginBottom: 5}}>
                  
                  <Left>
                  <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12}}>{room(item.room)}</Text>
              
              </Left>
              
            
             
                </CardItem>
          
            
              </Card>
               
              }
            />
            }
        
    
 
          </Tab>
          <Tab heading="Summary" tabStyle={{backgroundColor: Colors.BackColor, color: 'white' }} activeTabStyle={{backgroundColor: Colors.BackColor, color: 'white'  }}>
             

<Card style={{flex: 0, marginTop: 10}} >
  <ScrollView>
<CardItem bordered>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                          <Body>
                                                            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Rooms</Text>
                                                            </Body>
                                                        </Left>
                                                     
                                                      </CardItem>
{room_types.map((item) => 
                                                      <CardItem key={item._id}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                          <Body>
                                                            <Text style={{fontSize: 13}}>{room(item.room)}</Text>
                                                            </Body>
                                                        </Left>
                                                        <Right>
                                                    <Text style={{fontSize: 13}}>{  customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.room == item.room ? 1: 0)
            ), 0) : reserve.reduce((sum, i) => (

              sum += parseFloat(i.room == item.room ? 1: 0)
            ), 0)}</Text>  
                                                     </Right>
                                                      </CardItem>
                                                 
                                                      
            
)}                                       

<CardItem bordered>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                          <Body>
                                                            <Text style={{fontSize: 13, fontWeight: 'bold'}}>TOTAL</Text>
                                                            </Body>
                                                        </Left>
                                                        <Right>
                                                    <Text style={{fontSize: 13, fontWeight:'bold'}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(1)
            ), 0) : reserve.reduce((sum, i) => (

              sum += parseFloat(1)
            ), 0)}</Text>  
                                                     </Right>
                                                      </CardItem>


                                                      <CardItem style={{marginTop: 20}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                         
                                                            <Text style={{fontSize: 13,}}>Cash</Text>
                                                            
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.mode=='Cash' || i.payment_method == ""? 1: 0)
            ), 0) : reserve.reduce((sum, i) => (

              sum += parseFloat(i.mode=='Cash'? 1: 0)
            ), 0)}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                      <CardItem style={{marginTop: -10}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                         
                                                            <Text style={{fontSize: 13,}}>Debit Card</Text>
                                                            
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.mode=='Debit Card'? 1: 0)
            ), 0) : reserve.reduce((sum, i) => (

              sum += parseFloat(i.mode=='Debit Card'? 1: 0)
            ), 0)}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                      <CardItem style={{marginTop: -10}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                         
                                                            <Text style={{fontSize: 13,}}>Credit Card</Text>
                                                            
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.mode=='Credit Card'? 1: 0)
            ), 0) : reserve.reduce((sum, i) => (

              sum += parseFloat(i.mode=='Credit Card'? 1: 0)
            ), 0)}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                      <CardItem bordered style={{marginTop: -10}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                         
                                                            <Text style={{fontSize: 13,}}>E-Wallet</Text>
                                                            
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.mode=='E-Wallet'? 1: 0)
            ), 0): reserve.reduce((sum, i) => (

              sum += parseFloat(i.mode=='E-Wallet'? 1: 0)
            ), 0)}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                  


                                                   
                                                      <CardItem style={{marginTop: 10}} >
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                          <Body>
                                                            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Nationalities</Text>
                                                            </Body>
                                                        </Left>
                                                     
                                                      </CardItem>     
                                                      {natl.map((item) => 
                                                      <CardItem key={item._id} style={{height: 35}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                          
                                                            <Text style={{fontSize: 13}}>{item.nationality}</Text>
                                                           
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13}}>{  customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.nationality == item.nationality ? 1: 0)
            ), 0) : reserve.reduce((sum, i) => (

              sum += parseFloat(i.nationality == item.nationality ? 1: 0)
            ), 0)}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                 
                                                      
            
)}                                   

<CardItem bordered>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                          
                                                            <Text style={{fontSize: 13, fontWeight: 'bold'}}>TOTAL GUEST</Text>
                                                        
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13, fontWeight:'bold'}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += 1
            ), 0) : reserve.reduce((sum, i) => (

              sum += 1
            ), 0)}</Text>  
                                                     </Body>
                                                      </CardItem>

</ScrollView>

                                                    </Card>



         
         
          </Tab>
      
        </Tabs>
      </Container>      
      


</View>
    
   
  );
}

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
height: 400,
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

