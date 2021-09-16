import React, { useState } from "react";
import { View, Button, ScrollView,TouchableOpacity, Alert, Modal,TextInput, StyleSheet, Dimensions } from "react-native";
import {  Overlay, Input, Text } from "react-native-elements";
import { Thumbnail, List, ListItem,Separator, Col, Card, CardItem, Body, Left, Content, Right,Grid, Icon,  Container, Header,Badge, Item } from 'native-base';
import { useTasks} from "../providers/TasksProvider";
import Colors from '../components/styles/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from '../components/styles/styles';
import Toast from "react-native-simple-toast";
import moment from 'moment'

// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function VoucherSheet({ actions, visible, closeOverlay, roomInfo }) {
  const { EditRoom, tasks, valueroom_checklist, updateVoucher} = useTasks();
  const [code, setcode] = useState(roomInfo.code);
  const [min, setmin] = useState(roomInfo.min_stay.toString());
  const [max, setmax] = useState(roomInfo.max_stay.toString());
  const [vvalue, setvvalue] = useState(roomInfo.vouchvalue.toString());
  const [expiration, setexpiration] = useState(roomInfo.expiration_date);
  const [vdescription, setvdescription] = useState(roomInfo.description);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Durationvalue, setDurationValue] = useState(roomInfo.mode);
  
  const [Durationitems, setDurationItems] = useState([
    {label: 'Percentage', value: 'Percentage',},
    {label: 'Amount', value: 'Amount',},
]);
let Durationcontroller;

const newval_filtered = valueroom_checklist.filter(item =>item.room_id == roomInfo.room_id)
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
  return (
    
    <Overlay
      overlayStyle={{ width: "90%", maxHeight: "85%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
          
      <ScrollView>
      <View>
      <Text>Voucher Code</Text>
          <TextInput
                        style={{...styles.textInputTitle,width: '55%'}}
                        placeholder="Voucher Code"
                        autoFocus={true}
                        value={code}
                    />
       
           <Text>Minimum Stay</Text>
           <TextInput
                        style={styles.textInputTitle}
                        placeholder="Minimum Stay"
                        keyboardType='numeric'
                        onChangeText={(text) => isNaN(text)? null:setmin(text)}
                        autoFocus={true}
                        value={min}
                    />
         <Text style={{marginBottom: 20}}>Maximum Stay</Text>
         <TextInput
                        style={styles.textInputTitle}
                        placeholder="Maximum Stay"
                        keyboardType='numeric'
                        onChangeText={(text) => isNaN(text)? null:setmax(text)}
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
            title="Update Voucher"
            onPress={() => {


              Alert.alert(
                "Proceed?",
                "Are you sure to proceed this action?",
                [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                      },
                  { text: "OK", onPress: () => {  closeOverlay() ;updateVoucher(roomInfo,min,max,Durationvalue,vvalue,vdescription,expiration); }
            }
            ],
            { cancelable: false }
            
            );
           
            }}
            color={Colors.buttons}
          />  
         
        
      </View>
      </ScrollView>
    </Overlay>
  );
}
