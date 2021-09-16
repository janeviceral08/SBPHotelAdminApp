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
import { Report_Logs_Items } from './Report_Logs_Items';



export function Report_Logs({navigation}) {
  
    const {Get_Logs_Data, House_Keeping_Rooms, checkout, getResult, getResultGoods, Res_Ref, res_out,Res_In,FD_Ref, FD_out, FD_in, ewallet, Debit,Credit,Cash,Cancel_Res,All_Ref  } = useTasks();
    const customers=Get_Logs_Data;
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [check_out_value, setcheck_out_value] = useState("");
  const [check_in_value, setcheck_in_value] = useState("");
  const [check_in, setcheck_in] = useState("");
  const [check_out, setcheck_out] = useState("");
  const [category, setcategory] = useState("");
  const [overlayVisibleCheckin, setOverlayVisibleCheckin] = useState(false);

  const reports_info = customers.map( ({staff, description, date}) => ({ staff, description, date}) )

console.log('Get_Logs_Data: ', Get_Logs_Data.length)


  const resultData = Get_Logs_Data.map(a => a.staff);


  const newDataDuplicate = resultData.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);


  const newDataDuplicateData =  newDataDuplicate.map( (item) => ({id: item, item}) )

  const [NewDataDuplicateDataNew, setNewDataDuplicateData] = useState([]);
const newDataUnique = resultData.filter(function(val) {
  return resultData.indexOf(val) == -1;
});

//console.log('newDataDuplicate: ', resultData.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]));
//console.log('newDataUnique: ', resultData.reduce(function(a,b){if(a.indexOf(b)>0)a.push(b);return a;},[]));

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible_checkout, setDatePickerVisibility_checkout] = useState(false);
  const DDP = DownloadDirectoryPath + '/';

  const input = res => res;
  const output =str => str;



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
    const name = 'Logs ('+ date_now +' )'+'.xlsx'
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
    
    
    <h2>Generated Logs Report on ${moment().format('MMM D, YYYY h:mm a')}</h2>
  <table style="margin-top:-40px">
  <tbody>
  <tr><th>Staff </th>
  <th>Date </th>
  <th>Description </th>
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
  return Get_Logs_Data.map((arrNote, index) => {
     return (
      `<tr>
        <td style=" word-break: break-all;">${arrNote.staff}</td>
        <td style=" word-break: break-all;">${moment(arrNote.date * 1000).format('MMM D YYYY h:mm a')}</td>
        <td style=" word-break: break-all;">${arrNote.description}</td>
    
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
  
  const newData = newDataDuplicateData.filter(item => {
    const itemData = item.id.toUpperCase();
    const textData = text.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });

  setNewDataDuplicateData(newData)  
  
 

  }

  return (

   <View style={styles.mainContainer}>


                      <View style={[styles.toolbar,{marginBottom: 10}]}>
               
                <View style={{width: '100%'}}>
                <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item>
            <Ionicons name="search" size={20} color={Colors.BackColor}/>
            <Input placeholder="Search Staff" style={{borderColor: 'red', fontSize: 13}}    onChangeText={(text) => searchData(text)}/>
           
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
      
     
{NewDataDuplicateDataNew && NewDataDuplicateDataNew.length > 0 ?
           <FlatList
           
           style={styles.viewList}
           data={NewDataDuplicateDataNew}
           showsVerticalScrollIndicator={false}
          
           keyExtractor={(item, index) => index.toString()}
           renderItem={({item})  =>  
           <Report_Logs_Items key={`${item}`} room={item} />

         }
       />:
                <FlatList
           
                style={styles.viewList}
                data={newDataDuplicateData}
                showsVerticalScrollIndicator={false}
               
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item})  =>  
                <Report_Logs_Items key={`${item.id}`} room={item} />
    
              }
            />
            }
        
         
      

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

