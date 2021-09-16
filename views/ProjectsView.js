import React, { useState, useEffect }  from "react";
import { View, Button , Text, Alert, ScrollView} from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { ListItem } from "react-native-elements";
import moment from "moment";
import { FAB, Portal, Provider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";




export function ProjectsView({ navigation }) {
  const { projectData, userData,BusinessData, signOut,RoomPlanData } = useAuth();
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const navigations = useNavigation();
  const { open } = state;
  // the onClickProject navigates to the Task List with the project name
  // and project partition value
  const onClickProject = async (project) => {
 
    navigation.replace("Task List", {
      name: project.name,
      projectPartition: project.partition,
      expiration: project.expiration
    });
  };

  useEffect(() => {

if(JSON.stringify(userData) === '{}'){

  console.log('empty');
  return;
}

if(BusinessData.hot_logo === '*Edit'){
// BusinessData.hot_name === '*Edit'|| BusinessData.hot_mobile === '*Edit'|| BusinessData.hot_address === '*Edit' || BusinessData.hot_city === '*Edit' || BusinessData.hot_city === undefined || price ===null
  console.log('hot_logo');
  navigation.navigate('AccountNew')
  return;
}
    if (userData.full_name === '*Edit' || userData.mobile === '*Edit' || BusinessData.hot_name === '*Edit'|| BusinessData.hot_mobile === '*Edit'|| BusinessData.hot_address === '*Edit' || BusinessData.hot_city === '*Edit' || BusinessData.hot_city === undefined) {
      //navigation.replace("Hotels");
      console.log('hey Change')
      navigation.navigate('Account')
    }else{
      console.log('okey')
    }
  }, []);

console.log('userData: ', userData)
console.log('BusinessData: ', BusinessData)


  return (
    <View style={{height: '100%'}}>
      <ScrollView>
      {userData.userType=="Admin"?
      
      
      projectData.map((project) => (
        project.name ==='My Hotel' && userData.expiration == null?
        
        <View key={project.name}>
        <ListItem
          title={project.name}
          onPress={() =>{ if(BusinessData.hot_name === '*Edit'|| BusinessData.hot_mobile === '*Edit'|| BusinessData.hot_address === '*Edit' || BusinessData.hot_city === '*Edit' || BusinessData.hot_city === undefined || RoomPlanData.price_room_plan ===null){
            // BusinessData.hot_name === '*Edit'|| BusinessData.hot_mobile === '*Edit'|| BusinessData.hot_address === '*Edit' || BusinessData.hot_city === '*Edit' || BusinessData.hot_city === undefined || price ===null
              console.log('hot_logo');
              navigation.navigate('AccountNew')
              return;
            }else {Alert.alert('You Sucessfully Created an account!','Email us for setting up.')}}}
          bottomDivider
          key={project.name}
        />
      
      </View>:project.name ==='My Hotel' && userData.expiration <= moment().unix() ?
        <View key={project.name}>
          <ListItem
            title={project.name}
            onPress={() => Alert.alert('Account Expired','Email us for extension or any questions.')}
            bottomDivider
            key={project.name}
          />
        
        </View>
        :project.name ==='My Hotel' && userData.expiration >= moment().unix() ?
        <View key={project.name}>
          <ListItem
            title={project.name}
            onPress={() => onClickProject(project)}
            bottomDivider
            key={project.name}
          />
        
        </View>
      :
        project.expiration <= moment().unix() ?
        <View key={project.name}>
          <ListItem
            title={project.name}
            onPress={() => Alert.alert('Duration Already Expired','Email us for extension or any questions.')}
            bottomDivider
            key={project.name}
          />
        
        </View>
        
      :
        
      <View key={project.name}>
      <ListItem
        title={project.name}
        onPress={() => onClickProject(project)}
        bottomDivider
        key={project.name}
      />
    
    </View>
      ))
    
    : null
    
    }


</ScrollView>
      
<Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'gesture-tap' : 'gesture-tap'}
          actions={
            [
            
              {
                icon: 'logout-variant',
                label: 'Logout',
                onPress: () =>{  Alert.alert("Log Out", null, [
                  {
                    text: "Yes, Log Out",
                    style: "destructive",
                    onPress: () => {
                      signOut();
                      navigations.replace('Welcome View');
                    },
                  },
                  { text: "Cancel", style: "cancel" },
                ]);},
              },
                {
                icon: 'file-cog',
                label: 'steps Information',
                onPress: () => navigation.navigate('AccountNew'),
              },
              {
                icon: 'file-cog',
                label: 'Business Information',
                onPress: () => navigation.navigate('BusinessInfo'),
              },
              {
                icon: 'shield-account',
                label: 'Account Information',
                onPress: () => navigation.navigate('Account'),
              },
            
            ]
        
        }
       
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>

    </View>
  );
}
