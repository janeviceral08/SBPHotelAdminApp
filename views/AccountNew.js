import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Button, Modal, StyleSheet, TouchableOpacity, Image, Alert, BackHandler  } from "react-native";
import { Left, Body, Right, List,Header } from 'native-base';
import { ListItem, Overlay, Input, Text} from "react-native-elements";
import MultiSelect from 'react-native-multiple-select';
import { Picker } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../components/styles/styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTasks } from "../providers/TasksProvider";
import Colors from '../components/styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Toast from "react-native-simple-toast";
import { useAuth } from "../providers/AuthProvider";
import ImagePicker from "react-native-image-picker";
import {imgDefault} from "../components/styles/images";
import Loader from '../components/styles/Loader'
import city from '../components/city.json'
import Clipboard from '@react-native-community/clipboard';
import HColors from '../HColors';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { RotationGestureHandler } from "react-native-gesture-handler";

export function AccountNew({ navigation }) {
  const { userData, user,BusinessData, EditUser, EditBusiness,RoomPlanData } = useAuth();
const [full_name, setfull_name]= useState(userData.full_name)
const [address, setaddress]= useState(userData.address)
const [gender, setgender]= useState(userData.gender)
const [age, setage]= useState(userData.age)
const [hot_name, sethot_name]= useState(BusinessData.hot_name)
const [hot_mobile, sethot_mobile]= useState(BusinessData.hot_mobile)
const [hotel_tel, sethotel_tel]= useState(BusinessData.hotel_tel)
const [hotel_email, sethotel_email]= useState(BusinessData.hotel_email)
const [hot_address, sethot_address]= useState(BusinessData.hot_address)
const [hot_website, sethot_website]= useState(BusinessData.hot_website)
const [hot_logo, sethot_logo]= useState(BusinessData.hot_logo)
const [mobile, setmobile]= useState(userData.mobile)
const [image, setimage] = useState(null);

const [Loading, setLoading] = useState(false);

const [selectedItems, setSelectedItems] = useState([]);
  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
 // console.log('User_Info: ', selectedItems)
  //console.log('selectedItems output: ', selectedItems[0])

  
  };


const selectImage =()=>{
    ImagePicker.showImagePicker({
      maxWidth: 500,
      maxHeight: 500,
      mediaType: 'photo',
  }, image => {
    sethot_logo(image.data)
  })
  }


  const UpdateUser = async()=>{
    if(full_name === '*Edit' || mobile === '*Edit' ){
      Alert.alert("Update Your Information","Enter Your Full Name and Mobile Number")
    }else{
    try {
        setLoading(true)
        await  EditUser(userData.name, address,age, full_name, gender,mobile);
        setLoading(false)
    } catch (err) {
        setLoading(false)
        Alert.alert("An error occurred while Updating", err.message);
      }
    }
  }

  
  const UpdateBusiness = async()=>{
    
    try {
        setLoading(true)
        await  EditBusiness(userData.name, hot_name, hot_mobile, hotel_tel, hotel_email,hot_address,hot_website, hot_logo,selectedItems, BusinessData.hot_city, BusinessData.hot_address);
        setLoading(false)
    } catch (err) {
        setLoading(false)
        Alert.alert("An error occurred while Updating", err.message);
      }
  }
//console.log('userData: ', userData)

console.log('hot_address ', hot_address)

const copyToClipboard = () => {
    Clipboard.setString(userData._id);
    Toast.show('Copied!')
  };

  const goods = RoomPlanData.number ===""?null: 'and '+  RoomPlanData.number+ " Store Items" ;


  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  };

  const onNextStep = async() => {
      
    console.log('called next step');

      try {
          setLoading(true)
          await  EditUser(userData.name, address,age, full_name, gender,mobile);
          setLoading(false)
      } catch (err) {
          setLoading(false)
          Alert.alert("An error occurred while Updating", err.message);
        }
      
  };
  const onNextStepBusiness = async() => {
      console.log(userData.name, hot_name, hot_mobile, hotel_tel, hotel_email,hot_address,hot_website,selectedItems, BusinessData.hot_city, BusinessData.hot_address)
    try {
        setLoading(true)
        await  EditBusiness(userData.name, hot_name, hot_mobile, hotel_tel, hotel_email,hot_address,hot_website, "*Edit",selectedItems, BusinessData.hot_city, BusinessData.hot_address);
        setLoading(false)
    } catch (err) {
        setLoading(false)
        Alert.alert("An error occurred while Updating", err.message);
      }

  };

  const onPrevStep = () => {
    console.log('called previous step');
  };

  const onSubmitSteps = () => {
    navigation.navigate('Hotels')
  };
  const progressStepsStyle = {
    activeStepIconBorderColor: HColors.BackColor,
    activeLabelColor: HColors.BackColor,
    completedStepIconColor: HColors.BackColor,
    completedProgressBarColor: HColors.BackColor,
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => console.log('nope'));
  }, []);
  return (

    <View>

<Loader loading={Loading} />
        <ScrollView style={{height: "98%", padding: 10}}>
        <ProgressSteps  {...progressStepsStyle}>
          <ProgressStep
            label="Account Information"
            onNext={onNextStep}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            completedCheckColor={HColors.BackColor}
          > 
                                <View style={{margin: 10, padding: 15}}> 
                            
                                <Text>User ID</Text>
                            <TouchableOpacity onPress={copyToClipboard} style={{borderColor: 'gray', borderWidth: 1, padding: 15, borderRadius: 5,backgroundColor: 'white',  elevation: 15,
                            shadowColor: '#52006A', }}><Text style={{ opacity: 0.8, color: 'gray'}}>{userData._id}</Text></TouchableOpacity>
                            
                            <Text>Email</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                editable={false}
                                                value={userData.name}
                                            />
                                            <Text>Expiration Date</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                editable={false}
                                                value={moment(userData.expiration * 1000).format('MMMM D, YYYY hh:mm a')}
                                            />
                                        
                                            <Text>Full Name *</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                returnKeyType={'next'}
                                                placeholder="Full Name"
                                                defaultValue={userData.full_name}
                                                onChangeText={(text) => setfull_name(text)}
                                            />
                                            <Text>Gender</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                returnKeyType={'next'}
                                                placeholder="Gender"
                                                defaultValue={userData.gender}
                                                onChangeText={(text) => setgender(text)}
                                            />
                                            <Text>Mobile Number *</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                keyboardType={'number-pad'}
                                                placeholder="Mobile Number"
                                                defaultValue={userData.mobile}
                                                onChangeText={(text) => setmobile(text)}
                                            />
                                            <Text>Age</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                keyboardType={'number-pad'}
                                                placeholder="Age"
                                                defaultValue={userData.age}
                                                onChangeText={(text) => setage(text)}
                                            />
                                       
                                            
                                
                                            </View>
                                
          </ProgressStep>
          <ProgressStep
            label="Business Information"
            onNext={onNextStepBusiness}
            previousBtnDisabled
            nextBtnDisabled={hot_name === '*Edit' ||hot_mobile === '*Edit' ||hotel_tel === '*Edit' ||hotel_email === '*Edit' ||hot_address === '*Edit' ||hot_website === '*Edit'? true: false}
            scrollViewProps={defaultScrollViewProps}
          >
                                            <View style={{margin: 10, padding: 15}}> 
                                
                            
                                            
                                      
                                                <Text style={{marginBottom: 10}}> Business City *</Text>
                                                {BusinessData.hot_city ==='*Edit'? <MultiSelect
                                    
                                    items={city}
                                    uniqueKey='values'
                                    onSelectedItemsChange={onSelectedItemsChange}
                                    selectedItems={selectedItems}
                                    selectText='Choose City'
                                    searchInputPlaceholderText='Search City...'
                                    onChangeInput={(text) => console.log(text)}
                                    tagRemoveIconColor={Colors.buttons}
                                    tagBorderColor={Colors.buttons}
                                    tagTextColor={Colors.buttons}
                                    selectedItemTextColor='white'
                                    selectedItemIconColor='white'
                                    itemTextColor='#000'
                                    displayKey='values'
                                    searchInputStyle={{ color: Colors.buttons }}
                                    submitButtonColor={Colors.buttons}
                                    submitButtonText='Submit'
                                    removeSelected
                                    single
                                    />: <TextInput
                                    style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                    value={BusinessData.hot_city}
                                    editable={false}
                                />}


                                                
                                            <Text> Business Address *</Text>
                                            {BusinessData.hot_address ==='*Edit'?       <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                placeholder="Hotel Address"
                                                defaultValue={BusinessData.hot_address}
                                                onChangeText={(text) => sethot_address(text)}
                                            />:       <TextInput
                                            style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                        
                                            value={BusinessData.hot_address}
                                            editable={false}
                                        />}

                                                    <Text>Business Name *</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                placeholder="Business Name"
                                                defaultValue={BusinessData.hot_name}
                                                onChangeText={(text) => sethot_name(text)}
                                            />

                                            <Text>Business Mobile Number *</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                keyboardType={'number-pad'}
                                                placeholder="Business Mobile Number"
                                                defaultValue={BusinessData.hot_mobile}
                                                onChangeText={(text) => sethot_mobile(text)}
                                            />
                                            <Text>Business Telephone Number *</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                keyboardType={'phone-pad'}
                                                placeholder="Business Telephone Number"
                                                defaultValue={BusinessData.hotel_tel}
                                                onChangeText={(text) => sethotel_tel(text)}
                                            />
                                            <Text>Business Email *</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                keyboardType={'email-address'}
                                                placeholder="Business Email"
                                                defaultValue={BusinessData.hotel_email}
                                                onChangeText={(text) => sethotel_email(text)}
                                            />
                                            <Text>Business Website</Text>
                                <TextInput
                                                style={[styles.textInputTitle,{backgroundColor: 'white', elevation: 15,
                                                shadowColor: '#52006A',}]}
                                                keyboardType={'url'}
                                                placeholder="Business Website"
                                                defaultValue={BusinessData.hot_website}
                                                onChangeText={(text) => sethot_website(text)}
                                            />
                                   
                                        
                                </View>
          </ProgressStep>
          <ProgressStep
            label="Subscription Plan"
            onPrevious={onPrevStep}
            onSubmit={RoomPlanData.number_room_plan ===""? null:onSubmitSteps}
            scrollViewProps={defaultScrollViewProps}
          >
                  <Text>Select Subscription Plan</Text>
                                            <Button
                                    title={RoomPlanData.number_room_plan ===null?"Select a subscription plan": RoomPlanData.number_room_plan+ " Rooms " + goods}
                                    onPress={()=> navigation.navigate('Room_Plan')}
                                    color={Colors.buttons}
                                />
          </ProgressStep>
        </ProgressSteps>
     
      
     
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
  