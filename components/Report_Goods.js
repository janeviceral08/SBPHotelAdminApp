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
import { DataTable } from 'react-native-paper';
// The AddTask is a button for adding checkout. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function Report_Goods({navigation, route}) {
  
    const {carts, getResult, getResultGoods, Res_Ref, res_out,Res_In,FD_Ref, FD_out, FD_in, ewallet, Debit,Credit,Cash,Cancel_Res,All_Ref  } = useTasks();
    const [customers, setCustomer] = useState(carts)
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [check_out_value, setcheck_out_value] = useState("");
  const [check_in_value, setcheck_in_value] = useState("");
  const [check_in, setcheck_in] = useState("");
  const [check_out, setcheck_out] = useState("");
  const [overlayVisibleCheckin, setOverlayVisibleCheckin] = useState(false);
  const [category, setcategory] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible_checkout, setDatePickerVisibility_checkout] = useState(false);
  const DDP = DownloadDirectoryPath + '/';
  const reports_info = carts.map( ({item, quantity, price, method,customer,room, customer_id}) => ({item, quantity, price, method,customer,room, customer_id }) )
console.log('reports_info Goods: ', reports_info)
  const input = res => res;
  const output =str => str;
  const key ="itemid"
  const item_types = [...new Map(carts.map(item => [item[key], item])).values()]
  const [ columns, setColumns ] = useState([
    "Item",
    "QTY",
    "Price",
    "Sub",
    "Customer",
    "Date"
  ])
  const [ direction, setDirection ] = useState(null)
  const [ selectedColumn, setSelectedColumn ] = useState(null)
 
  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(customers, [column],[newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setCustomer(sortedData)
  }
  const tableHeader = () => (
    <View style={styles_table.tableHeader}>
      
        <TouchableOpacity 

        style={{...styles_table.columnHeader,  width: "20%",}} 
        >
        <Text style={styles_table.columnHeaderTxt}>Item </Text>
      </TouchableOpacity>
      <TouchableOpacity 
 style={{...styles_table.columnHeader,  width: "10%",}} 
      >
      <Text style={styles_table.columnHeaderTxt}>Qty </Text>
    </TouchableOpacity>
    <TouchableOpacity 
     style={{...styles_table.columnHeader,  width: "12%",}} 
    >
    <Text style={styles_table.columnHeaderTxt}>Price</Text>
  </TouchableOpacity>

<TouchableOpacity 
                style={{...styles_table.columnHeader,  width: "15%",}} 
                >
                <Text style={styles_table.columnHeaderTxt}>Sub </Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={{...styles_table.columnHeader,  width: "30%",}} 
              >
              <Text style={styles_table.columnHeaderTxt}>Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity 
               style={{...styles_table.columnHeader,  width: "15%",}} 
              >
              <Text style={styles_table.columnHeaderTxt}>Date</Text>
            </TouchableOpacity>
    </View>
  )
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
    const name = 'Goods ('+ date_now +' )'+'.xlsx'
    const sheet2JSONOpts = {
      /** Default value for null/undefined values */
      defval: ''//Assign empty string to defval
}
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
    
    
    <h1>Generated Report on Goods ${moment().format('MMM-D-YYYY h:mm a')}</h1>
  <table style="margin-top:-40px">
  <tbody>
  <tr><th>Product Name </th>
  <th>Price </th>
  <th>Qty </th>
  <th>Subtotal </th>
  <th>Customer </th>
  <th>Date </th>
  
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
        <td style=" word-break: break-all;">${arrNote.item}</td>
        <td>${arrNote.price}</td>
        <td style=" word-break: break-all;">${arrNote.quantity}</td>
        <td style=" word-break: break-all;">${arrNote.price*arrNote.quantity}</td>
        <td style=" word-break: break-all;">${arrNote.customer}</td>
        <td style=" word-break: break-all;">${moment(arrNote.updated_at * 1000).format('M/D/YY h:mm a')}</td>
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
  
  const newData = carts.filter(item => {
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
            <Input placeholder="Goods Report Search Customer Name" style={{borderColor: 'red', fontSize: 13}}    onChangeText={(text) => searchData(text)}/>
         
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
     
 
   <FlatList 
   data={customers}
   style={{width:"100%"}}
   keyExtractor={(item, index) => index+""}
   ListHeaderComponent={tableHeader}
   stickyHeaderIndices={[0]}
   renderItem={({item, index})=> {
     return (
       <View style={{...styles_table.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
         <Text style={{  textAlign:"left", fontWeight:"bold",width:"20%"}} numberOfLines={1}>{item.item}</Text>
         <Text style={{  textAlign:"center",width:"10%"}}>{item.quantity}</Text>
         <Text style={{  textAlign:"center",width:"10%"}}>{item.price}</Text>
         <Text style={{textAlign:"center",width:"15%"}}>{item.price * item.quantity}</Text>
         <Text style={{textAlign:"left",width:"30%"}} numberOfLines={1}>{item.customer}</Text>
         <Text style={{textAlign:"left",width:"15%"}}>{moment(item.updated_at * 1000).format('M/D/YY')}</Text>
       </View>
     )
   }}
 />
             
              
   
       
    
 
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
        
        
        
                {carts && carts.length ? carts.reduce((sum, i) => (
              
                                      sum +=  parseFloat(i.quantity)*parseFloat(i.price)
                                    ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):null}
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
             
           
<Card style={{flex: 1}} >
  <ScrollView>
<CardItem bordered>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Items</Text>
                                                            
                                                        </Left>
                                                        <Body>
                                                            <Text style={{fontSize: 14, fontWeight: 'bold'}}>QTY</Text>
                                                            </Body>
                                                            <Right>
                                                            <Text style={{fontSize: 14, fontWeight: 'bold'}}>SubTotal</Text>
                                                            </Right>
                                                      </CardItem>
{item_types.map((item) => 
                                                      <CardItem key={item._id}>
                                                        <Left  style={{marginTop: -10, marginBottom: -10}}>
                                                
                                                         
                                                            <Text style={{fontSize: 13}}>{item.item}</Text>
                                                          
                                                        </Left>
                                                        <Body>
                                                            <Text style={{fontSize: 13}}>{  carts && carts.length ? carts.reduce((sum, i) => (
              
              sum +=  i.itemid == item.itemid ?1 : 0
            ), 0) : carts.reduce((sum, i) => (

              sum +=  i.itemid == item.itemid ? 1 : 0
            ), 0)}</Text>
                                                            </Body>
                                                        <Right>
                                                    <Text style={{fontSize: 13}}>{  carts && carts.length ? carts.reduce((sum, i) => (
              
              sum +=   i.itemid == item.itemid ? parseFloat(i.quantity)*parseFloat(i.price) : 0
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : carts.reduce((sum, i) => (

              sum +=  i.itemid == item.itemid ? parseFloat(i.quantity)*parseFloat(i.price) : 0
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
                                                    <Text style={{fontSize: 13, fontWeight:'bold'}}>{carts && carts.length ? carts.reduce((sum, i) => (

              sum +=  parseFloat(i.quantity)*parseFloat(i.price)
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):null}</Text>  
                                                     </Right>
                                                      </CardItem>


                                                  
</ScrollView>

                                                    </Card>

          </Tab>
      
        </Tabs>
      </Container>      
        
   


</View>
    
   
  );
}

const styles_table = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:0
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
   
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  
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

