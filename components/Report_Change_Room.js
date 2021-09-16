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

export function Report_Change_Room({navigation}) {
  
    const {checkout,  } = useTasks();
    const [customers, setCustomer] = useState(checkout)
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [check_out_value, setcheck_out_value] = useState("");
  const [check_in_value, setcheck_in_value] = useState("");
  const [check_in, setcheck_in] = useState("");
  const [check_out, setcheck_out] = useState("");
  const [category, setcategory] = useState("");
  const [overlayVisibleCheckin, setOverlayVisibleCheckin] = useState(false);

  const reports_info = checkout.map( ({check_in, check_out, room_no,room_type, customer,company,contact,control_num,discount,discount_code,discount_less, email, extension_total_amount, extension_person,extension_price,extension_rate,  nationality,extra_person, checkin_stat , hour_duration, no_person, no_person_discount, number_of_days, number_of_hours, note, overall_total, payment, payment_method, penalty, penalty_description, res_code, stay_total, total_addtional,temp_id}) => ({ check_in,check_out, room_no,room_type, customer,company,contact,control_num,discount,discount_code,discount_less, email, extension_total_amount, extension_person,extension_price,extension_rate,  nationality,extra_person, checkin_stat , hour_duration, no_person, no_person_discount, number_of_days, number_of_hours, note, overall_total, payment, payment_method, penalty, penalty_description, res_code, stay_total, total_addtional,temp_id }) )

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible_checkout, setDatePickerVisibility_checkout] = useState(false);
  const DDP = DownloadDirectoryPath + '/';

  const input = res => res;
  const output =str => str;
  const key ="room_type"
  const room_types = [...new Map(checkout.map(item => [item[key], item])).values()]
  const key_nat ="nationality"
const natl = [...new Map(checkout.map(item => [item[key_nat], item])).values()]
console.log('checkout: ',checkout.length)
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
          console.log('customers: ', customers)
    const date_now = moment().format('MMM-D-YYYY=h-mm-a')
    const name = 'Change Room ('+ date_now +' )'+'.xlsx'
    
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
        console.warn(err);
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
    
    
    <h1>Generated Report on ${moment().format('MMM-D-YYYY h:mm a')}</h1>
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
  <th>Discount </th>
  <th>Total </th></tr>
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
  return customers.map((arrNote, index) => {
     return (
      `<tr>
        <td style=" word-break: break-all;">${arrNote.customer}</td>
        <td style=" word-break: break-all;">${moment(arrNote.check_in * 1000).format('MMM D YYYY h:mm a')}</td>
        <td style=" word-break: break-all;">${moment(arrNote.check_out * 1000).format('MMM D YYYY h:mm a')}</td>
        <td>${arrNote.room_type}-(${arrNote.room_no})</td>
        
        <td style=" word-break: break-all;">${arrNote.contact}</td>
        <td style=" word-break: break-all;">${arrNote.email}</td>
        <td style=" word-break: break-all;">${arrNote.nationality}</td>
        <td style=" word-break: break-all;">${arrNote.no_person}</td>
        <td style=" word-break: break-all;">${arrNote.discount}% (${arrNote.discount_code})</td>
        <td style=" word-break: break-all;">${arrNote.overall_total}</td>
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
  
  const newData = checkout.filter(item => {
    const itemData = item.customer.toUpperCase();
    const textData = text.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });

  setCustomer(newData)  
  
 

  }


  return (

   <View style={styles.mainContainer}>


                      <View style={styles.toolbar}>
               
                <View style={{width: '100%'}}>
                <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item>
            <Ionicons name="search" size={20} color={Colors.BackColor}/>
            <Input placeholder="Change Room Search Customer Name" style={{borderColor: 'red', fontSize: 13}}    onChangeText={(text) => searchData(text)}/>
           
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
                    <CardItem bordered button onPress={()=> navigation.navigate('Customer_Details', {checkinInfo: item})}>
                      <Left  style={{marginTop: -10, marginBottom: -10}}>
              
                        <Body>
                          <Text>{item.customer}</Text>
                          <Text note style={{width: '150%'}}>{currencyFormat(item.overall_total)} ({item.number_of_days != ''? item.number_of_days + ' Nights': item.number_of_hours + 'hours'})</Text>
                        </Body>
                      </Left>
                      <Right>
                      <MaterialCommunityIcons name={'dots-vertical'} size={18} color={'black'} style={{ paddingTop: 5}} onPress={()=> navigation.navigate('Customer_Details', {checkinInfo: item})}/>
                      </Right>
                    </CardItem>
                    <CardItem style={{marginBottom: -12}}>
                  <Left>
                  <SimpleLineIcons name={'login'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12}}>{moment(item.check_in * 1000).format('MMM D YYYY h:mm a')}</Text>
              </Left>
                </CardItem>
                <CardItem style={{marginBottom: -12}}>
              <Body style={{ flexDirection: 'row',}}>
              <SimpleLineIcons name={'logout'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12, paddingLeft: 10, paddingTop: 4}}>{moment(item.check_out * 1000).format('MMM D YYYY h:mm a')}</Text>
          </Body>
                </CardItem>
                    <CardItem style={{marginBottom: 5}}>
                      
                      <Left>
                      <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                  <Text style={{fontSize: 12}}>{item.room_type}- {item.room_no}</Text>
                  
                  </Left>
                  
                  <Right  style={{ flexDirection: 'row',}}>
                      <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 0}}/>
                  <Text style={{fontSize: 12}}>{item.checkin_stat}</Text>
                  
                  </Right>
                 
                    </CardItem>
              
                
                  </Card>
                   
                  }
                /> :
                <FlatList
           
                style={styles.viewList}
                data={checkout}
                showsVerticalScrollIndicator={false}
               
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item})  =>  
                <Card style={{flex: 0, marginTop: 10}} >
                <CardItem bordered button onPress={()=> navigation.navigate('Customer_Details', {checkinInfo: item})}>
                  <Left  style={{marginTop: -10, marginBottom: -10}}>
          
                    <Body>
                      <Text>{item.customer}</Text>
                      <Text note style={{width: '150%'}}>{currencyFormat(item.overall_total)} ({item.number_of_days != ''? item.number_of_days + ' Nights': item.number_of_hours + 'hours'})</Text>
                    </Body>
                  </Left>
                  <Right>
                  <MaterialCommunityIcons name={'dots-vertical'} size={18} color={'black'} style={{ paddingTop: 5}} onPress={()=> navigation.navigate('Customer_Details', {checkinInfo: item})}/>
                  </Right>
                </CardItem>
                <CardItem style={{marginBottom: -12}}>
                  <Left>
                  <SimpleLineIcons name={'login'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12}}>{moment(item.check_in * 1000).format('MMM D YYYY h:mm a')}</Text>
              </Left>
                </CardItem>
                <CardItem style={{marginBottom: -12}}>
              <Body style={{ flexDirection: 'row',}}>
              <SimpleLineIcons name={'logout'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12, paddingLeft: 10, paddingTop: 4}}>{moment(item.check_out * 1000).format('MMM D YYYY h:mm a')}</Text>
          </Body>
                </CardItem>
                <CardItem style={{marginBottom: 5}}>
                  
                  <Left>
                  <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
              <Text style={{fontSize: 12}}>{item.room_type}- {item.room_no}</Text>
              
              </Left>
              
              <Right  style={{ flexDirection: 'row',}}>
                      <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 0}}/>
                  <Text style={{fontSize: 12}}>{item.checkin_stat}</Text>
                  
                  </Right>
             
                </CardItem>
          
            
              </Card>
               
              }
            />
            }
        
    
 
    <SwipeRow
 style={{height: 50}}
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
              <TouchableOpacity
              style={{color: Colors.BackColor,marginTop: '5%', paddingLeft: 20}}
              onPress={requestRunTimePermission}
          >
            <MaterialCommunityIcons name={'microsoft-excel'} size={40} color={Colors.BackColor}/>
        
          </TouchableOpacity>   
            }
            body={
             
              <Body>
                <Text style={{fontFamily: 'monospace',fontSize: 15,fontWeight: 'bold', color: Colors.BackColor}}>
                 T O T A L:
                </Text>
                <Text style={{fontFamily: 'monospace',fontSize: 16,fontWeight: 'bold',alignSelf: 'flex-end', marginTop: -30, padding: 5,  color: Colors.BackColor}}>
        
        
        
                {customers && customers.length ? customers.reduce((sum, i) => (
              
                                      sum += parseFloat(i.overall_total)
                                    ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : checkout.reduce((sum, i) => (
              
                                      sum += parseFloat(i.overall_total)
                                    ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </Text>
               
                
              </Body>
          
            }
            right={
             
              <TouchableOpacity
              style={{color: Colors.BackColor, marginTop: '5%', paddingLeft: 5}}
              onPress={printHTML}
          >
            
            <Ionicons name={"ios-print"} size={40} color={Colors.BackColor}/>
          
            
          </TouchableOpacity> 
           
            }
          />

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
                                                            <Text style={{fontSize: 13}}>{item.room_type}</Text>
                                                            </Body>
                                                        </Left>
                                                        <Right>
                                                    <Text style={{fontSize: 13}}>{  customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.room_type == item.room_type ? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : checkout.reduce((sum, i) => (

              sum += parseFloat(i.room_type == item.room_type ? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>  
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
              
              sum += parseFloat(i.overall_total)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : checkout.reduce((sum, i) => (

              sum += parseFloat(i.overall_total)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>  
                                                     </Right>
                                                      </CardItem>


                                                      <CardItem style={{marginTop: 20}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                         
                                                            <Text style={{fontSize: 13,}}>Cash</Text>
                                                            
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.payment_method=='Cash' || i.payment_method == ""? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : checkout.reduce((sum, i) => (

              sum += parseFloat(i.payment_method=='Cash'? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                      <CardItem style={{marginTop: -10}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                         
                                                            <Text style={{fontSize: 13,}}>Debit Card</Text>
                                                            
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.payment_method=='Debit Card'? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : checkout.reduce((sum, i) => (

              sum += parseFloat(i.payment_method=='Debit Card'? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                      <CardItem style={{marginTop: -10}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                         
                                                            <Text style={{fontSize: 13,}}>Credit Card</Text>
                                                            
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.payment_method=='Credit Card'? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : checkout.reduce((sum, i) => (

              sum += parseFloat(i.payment_method=='Credit Card'? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                      <CardItem bordered style={{marginTop: -10}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                         
                                                            <Text style={{fontSize: 13,}}>E-Wallet</Text>
                                                            
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.payment_method=='E-Wallet'? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : checkout.reduce((sum, i) => (

              sum += parseFloat(i.payment_method=='E-Wallet'? i.overall_total: 0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                  


                                                      <CardItem>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                          
                                                            <Text style={{fontSize: 13, fontWeight: 'bold'}}>Over The Counter</Text>
                                                           
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13, fontWeight:'bold'}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.checkin_stat== 'Over The Counter' || i.checkin_stat==""|| i.checkin_stat==null?i.overall_total:0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : checkout.reduce((sum, i) => (

              sum += parseFloat(i.checkin_stat== 'Over The Counter'?i.overall_total:0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>  
                                                     </Body>
                                                      </CardItem>
                                                                                
<CardItem bordered style={{marginTop: -10}}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                            <Text style={{fontSize: 13, fontWeight: 'bold'}}>Reservation</Text>
                                                          
                                                        </Left>
                                                        <Body>
                                                    <Text style={{fontSize: 13, fontWeight:'bold'}}>{customers && customers.length ? customers.reduce((sum, i) => (
              
              sum += parseFloat(i.checkin_stat== 'Reservation'?i.overall_total:0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : checkout.reduce((sum, i) => (

              sum += parseFloat(i.checkin_stat== 'Reservation'?i.overall_total:0)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>  
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
            ), 0) : checkout.reduce((sum, i) => (

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
            ), 0) : checkout.reduce((sum, i) => (

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

