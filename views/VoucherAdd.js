import React, { useState,useRef } from "react";
import { ScrollView, View, Button, Dimensions, TouchableOpacity,TextInput,Pressable,Alert  } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Overlay, Input, Text } from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../components/styles/styles';
import Toast from "react-native-simple-toast";
import { useTasks} from "../providers/TasksProvider";
import Colors from '../components/styles/colors';
import moment from "moment";

import Ionicons from 'react-native-vector-icons/Ionicons'
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function VoucherAdd({ navigation, route }) {

  const { tasks, createVoucher, User_Info,rooms } = useTasks();
  const [code, setcode] = useState("");
  const [min, setmin] = useState("");
  const [max, setmax] = useState("");
  const [vvalue, setvvalue] = useState("");
  const [expiration, setexpiration] = useState("");
  const [vdescription, setvdescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Durationvalue, setDurationValue] = useState(null);
  
  const [Durationitems, setDurationItems] = useState([
    {label: 'Percentage', value: 'Percentage',},
    {label: 'Amount', value: 'Amount',},
]);
let Durationcontroller;
  

const generate = () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 12; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
     }

    setcode(result);
 
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
 
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if(moment(date).unix()> moment().unix()){
      setexpiration(moment(date).unix())
      hideDatePicker();
    }
  else{
      hideDatePicker();
      Toast.show('Expiration Date Invalid')
  
  }
  
};

  const goInsert = () => {

           

      if (!code.trim()) {
        Toast.show('Please Enter Code');
        return;
      }
   
      if (!Durationvalue.trim()) {
        Toast.show('Please Enter Voucher Mode');
        return;
      }
      if (expiration === "") {
        Toast.show('Please Set Expiration Date');
        return;
      }
      if (vvalue === "") {
        Toast.show('Please Set Voucher Value');
        return;
      }
      Alert.alert(
        "Create Voucher?",
        "Are you sure to create voucher?",
        [
            { text: "Cancel", onPress: () =>  null
        },
          { text: "OK", onPress: () =>  {  navigation.goBack(),
          createVoucher(code,min,max,Durationvalue,vvalue,vdescription,expiration)}
    }
    ],
    { cancelable: false }
    
    );
  
  };


  console.log('Durationvalue: ', Durationvalue)
  console.log('expiration: ', expiration)
  return (
    <View style={{margin: 10}}>
    
        <ScrollView>
          <Text>Voucher Code</Text>
          <View style={{flexDirection: 'row'}}>
          <TextInput
                        style={{...styles.textInputTitle,width: '55%'}}
                        autoCorrect={true}
                        keyboardType='default'
                        returnKeyType={'next'}
                        placeholder="Voucher Code"
                        onChangeText={text => setcode(text.replace(/ /g,''))}
                        autoFocus={true}
                        value={code}
                    />
               
                       <Pressable style={{   alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 32,
    borderRadius: 4,
marginLeft: 10,
    backgroundColor: '#49aaeb',}} onPress={generate}>
      <Text style={{ fontSize: 15,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',}}>{'Generate'}</Text>
    </Pressable>
  </View>
           <Text>Minimum Stay</Text>
           <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Minimum Stay"
                        onChangeText={(text) => isNaN(text)? null:setmin(text)}
                        autoFocus={true}
                        value={min}
                    />
         <Text style={{marginBottom: 20}}>Maximum Stay</Text>
         <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Maximum Stay"
                        onChangeText={(text) => isNaN(text)? null:setmax(text)}
                        autoFocus={true}
                        value={max}
                    />
 <Text style={{marginBottom: 20}}>Voucher Mode</Text>
 <DropDownPicker
                  placeholder="Select Voucher Mode"
                    items={Durationitems}
                    controller={instance => Durationcontroller = instance}
                    onChangeList={(items, callback) => {
                        new Promise((resolve, reject) => resolve(setDurationItems(Durationitems)))
                            .then(() => callback())
                            .catch(() => {});
                    }}
        
                    defaultValue={Durationvalue}
                    onChangeItem={item => setDurationValue(item.value)}
                  />
           <Text style={{marginBottom: 20}}>Voucher Value</Text>
           <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Voucher Value"
                       
                        onChangeText={(text) => isNaN(text)? null:setvvalue(text)}
                        autoFocus={true}
                        value={vvalue}
                    />
           <Text style={{marginBottom: 20}}>Description</Text>

             <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        keyboardType='default'
                        returnKeyType={'next'}
                        placeholder="Description"
                        onChangeText={text => setvdescription(text)}
                        autoFocus={true}
                        numberOfLines={4}
                      defaultValue={vdescription}
                    />
           <Text style={{marginBottom: 20}}>Expiration Date</Text>
           <Button title={expiration == ""?"Show Date Picker": moment(expiration * 1000).format('MMMM D, YYYY hh:mm a')} onPress={showDatePicker} color={Colors.buttons}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
         <Text style={{margin: 5}}>&nbsp;</Text>
          <Button
            title="Create"
            onPress={goInsert}
            color={Colors.buttons}
          />
        </ScrollView>
    
    </View>
  );


}
