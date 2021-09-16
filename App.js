import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthProvider } from "./providers/AuthProvider";
import { TasksProvider } from "./providers/TasksProvider";
import { RoomsProvider } from "./providers/RoomsProvider";

import { Signup } from "./views/Signup";
import { WelcomeView } from "./views/WelcomeView";
import { ProjectsView } from "./views/ProjectsView";
import { TasksView } from "./views/TasksView";
import { RoomsView } from "./views/RoomsView";
import { GoodsView } from "./views/GoodsView";
import { GoodDetails } from "./views/GoodDetails";
import { Account } from "./views/Account";
import { AccountNew } from "./views/AccountNew";
import { BusinessInfo } from "./views/BusinessInfo";
import { Goods_Promo } from "./views/goods_promo";
import {Room_Plan} from "./views/room_plan";
import { Category } from "./views/Category";
import { AddCategory } from "./views/AddCategory";
import { Clean } from "./views/Clean";
import { Maintenance } from "./views/Maintenance";

import { Report_Res_Ref } from "./components/Report_Res_Ref";
import { Report_res_out } from "./components/Report_res_out";
import { Report_Res_In } from "./components/Report_Res_In";
import { Report_FD_Ref } from "./components/Report_FD_Ref";
import { Report_FD_out } from "./components/Report_FD_out";
import { Report_FD_in } from "./components/Report_FD_in";
import { Report_ewallet } from "./components/Report_ewallet";
import { Report_Debit } from "./components/Report_Debit";
import { Report_Credit } from "./components/Report_Credit";
import { Report_Change_Room } from "./components/Report_Change_Room";
import { Report_Cash } from "./components/Report_Cash";
import { Report_Cancel_Res } from "./components/Report_Cancel_Res";
import { Report_All_Ref } from "./components/Report_All_Ref";
import { Reservation_details } from "./components/Reservation_details";
import { Report_Cleaning_History } from "./components/Report_Cleaning_History";
import { Report_Logs } from "./components/Report_Logs";

import { Report_Goods_result } from "./components/Report_Goods_result";
import { Report_Goods } from "./components/Report_Goods";
import { Report_Result } from "./components/Report_Result";
import { Report_Result_Nationality } from "./components/Report_Result_Nationality";
import { Report_Result_Out } from "./components/Report_Result_Out";
import { Report_Details_Nationality } from "./components/Report_Details_Nationality";
import { AddRoom } from "./components/AddRoom";
import { UserInfo } from './components/UserInfo';
import { Customer_Details } from './components/Customer_Details';
import { Logout } from "./components/Logout";
import { AddTask } from "./components/AddTask";
import { AddGood } from "./components/AddGood";

import { ManageTeam } from "./components/ManageTeam";
import { ManageTeamCleaning } from "./components/ManageTeamCleaning";
import { ManageAdminTeam } from "./components/ManageAdminTeam";
import { RoomCleaningHistory } from "./components/RoomCleaningHistory";


import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from './Colors';


import { ForConfirm } from "./views/ForConfirm";
import { ConfirmItem } from "./views/ConfirmItem";
import { Confirmed } from "./views/Confirmed";
import { TWConfirmed } from "./views/TWConfirmed";
import { TWConfirmedItem } from "./views/TWConfirmedItem";
import { ConfirmedItem } from "./views/ConfirmedItem";
import { Loader } from "./views/Loader";
import { Voucher } from "./views/Voucher";
import { VoucherAdd } from "./views/VoucherAdd";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();




function Home() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name="TasksView" 
        component={TasksView} 
        options={{headerShown:false}}
        />  
          <Stack.Screen 
        name="AddTask" 
        component={AddTask} 
        options={{headerShown:false}}
        />  
          <Stack.Screen 
        name="Clean" 
        component={Clean} 
        options={{headerShown:false}}
        />
          <Stack.Screen 
        name="Maintenance" 
        component={Maintenance} 
        options={{headerShown:false}}
        />
              <Stack.Screen 
        name="ManageTeam" 
        component={ManageTeam} 
        options={{headerShown:false}}
        />  
          <Stack.Screen 
        name="ManageTeamCleaning" 
        component={ManageTeamCleaning} 
        options={{headerShown:false}}
        />  
             <Stack.Screen 
        name="ManageAdminTeam" 
        component={ManageAdminTeam} 
        options={{headerShown:false}}
        />  
             <Stack.Screen 
        name="Account" 
        component={Account} 
        options={{headerShown:false}}
        /> 
         <Stack.Screen 
        name="BusinessInfo" 
        component={BusinessInfo} 
        options={{headerShown:false}}
        /> 
          <Stack.Screen 
        name="AccountNew" 
        component={AccountNew} 
        options={{headerShown:false}}
        /> 
            <Stack.Screen 
        name="ForConfirm" 
        component={ForConfirm} 
        options={{headerShown:false}}
        /> 
        <Stack.Screen 
        name="Confirmed" 
        component={Confirmed} 
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="ConfirmItem" 
        component={ConfirmItem} 
        options={{headerShown:false}}
        /> 
        <Stack.Screen 
        name="ConfirmedItem" 
        component={ConfirmedItem} 
        options={{headerShown:false}}
        /> 
         <Stack.Screen 
        name="TWConfirmed" 
        component={TWConfirmed} 
        options={{headerShown:false}}
        /> 
           <Stack.Screen 
        name="TWConfirmedItem" 
        component={TWConfirmedItem} 
        options={{headerShown:false}}
        /> 
    </Stack.Navigator>
  );
}
function Goods() {
  return (
    <Stack.Navigator>
       <Stack.Screen 
        name="GoodsView" 
        component={GoodsView} 
        options={{headerShown:false}}
        />  
        <Stack.Screen 
        name="GoodDetails" 
        component={GoodDetails} 
        options={{headerShown:false}}
        />  
         <Stack.Screen 
        name="AddGood" 
        component={AddGood} 
        options={{headerShown:false}}
        />  
        <Stack.Screen 
        name="Category" 
        component={Category} 
        options={{headerShown:false}}
        />  
           <Stack.Screen 
        name="AddCategory" 
        component={AddCategory} 
        options={{headerShown:false}}
        />  
    </Stack.Navigator>
  );
}

function Reports() {
  return (
    <Stack.Navigator>
      <Stack.Screen
            name="UserInfo"
            component={UserInfo}
            options={{ headerShown: false}}
          />
       <Stack.Screen
            name="Report_Result"
            component={Report_Result}
            options={{headerShown:false}}
          />
 <Stack.Screen
            name="Report_Cleaning_History"
            component={Report_Cleaning_History}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_Logs"
            component={Report_Logs}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="Report_Result_Out"
            component={Report_Result_Out}
            options={{headerShown:false}}
          />

          <Stack.Screen
            name="Report_Result_Nationality"
            component={Report_Result_Nationality}
            options={{headerShown:false}}
          />

          <Stack.Screen
            name="Report_Details_Nationality"
            component={Report_Details_Nationality}
            options={{headerShown:false}}
          />
            <Stack.Screen
            name="Report_Goods"
            component={Report_Goods}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_Goods_result"
            component={Report_Goods_result}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_Res_Ref"
            component={Report_Res_Ref}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_Res_In"
            component={Report_Res_In}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_FD_Ref"
            component={Report_FD_Ref}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_FD_out"
            component={Report_FD_out}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_FD_in"
            component={Report_FD_in}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_ewallet"
            component={Report_ewallet}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_Debit"
            component={Report_Debit}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_Credit"
            component={Report_Credit}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_Change_Room"
            component={Report_Change_Room}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_Cash"
            component={Report_Cash}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_Cancel_Res"
            component={Report_Cancel_Res}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_All_Ref"
            component={Report_All_Ref}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Report_res_out"
            component={Report_res_out}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="Reservation_details"
            component={Reservation_details}
            options={{headerShown:false}}
          />
    </Stack.Navigator>
  );
}


function Rooms() {
  return (
    <Stack.Navigator>
       <Stack.Screen 
        name="RoomsView" 
        component={RoomsView} 
        options={{headerShown:false}}
        /> 
         <Stack.Screen 
        name="AddRoom" 
        component={AddRoom} 
        options={{headerShown:false}}
        />  
          <Stack.Screen 
        name="RoomCleaningHistory" 
        component={RoomCleaningHistory} 
        options={{headerShown:false}}
        />  
    </Stack.Navigator>
  );
}
function Voucherscreen() {
  return (
    <Stack.Navigator>
       <Stack.Screen 
        name="Voucher" 
        component={Voucher} 
        options={{headerShown:false}}
        /> 
          <Stack.Screen 
        name="VoucherAdd" 
        component={VoucherAdd} 
        options={{headerShown:false}}
        />  
    </Stack.Navigator>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: Colors.BackColor,
      inactiveTintColor: '#ffffff',
      style: {
        backgroundColor: Colors.bottom_nav_background,
        
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
    }}>
        <Tab.Screen 
          name="Home" 
          component={Home}
          style={{backgroundColor: 'black'}}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size, tintColor}) => (
              <AntDesign name={'home'} size={25} color={color}  style={{ paddingTop: 2}} active={focused}/>
            ),
          }}
        
        />    
        <Tab.Screen 
            name="Goods" 
            component={Goods} 
            options={{
              tabBarLabel: 'Store Items',
              tabBarIcon: ({focused, color, size, tintColor}) => (
                <AntDesign name={'shoppingcart'} size={25} color={color}  style={{ paddingTop: 2}} active={focused}/>
              ),
            }}
            />    
             <Tab.Screen 
            name="Rooms" 
            component={Rooms}
            options={{
              tabBarLabel: 'Rooms',
              tabBarIcon: ({focused, color, size, tintColor}) => (
                <AntDesign name={'key'} size={25} color={'white'} style={{ paddingTop: 2}}/>
              ),
            }} 
            />   
                  <Tab.Screen 
            name="Vouchers" 
            component={Voucherscreen}
            options={{
              tabBarLabel: 'Vouchers',
              tabBarIcon: ({focused, color, size, tintColor}) => (
                <MaterialCommunityIcons name={'ticket-percent-outline'} size={25} color={'white'} style={{ paddingTop: 2}}/>
              ),
            }} 
            />
        <Tab.Screen 
            name="Reports" 
            component={Reports}
            options={{
              tabBarLabel: 'Reports',
              tabBarIcon: ({focused, color, size, tintColor}) => (
                <AntDesign name={'copy1'} size={25} color={'white'} style={{ paddingTop: 2}}/>
              ),
            }} 
            />    
    </Tab.Navigator>
  );
}




const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome View"
            component={WelcomeView}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown:false}}
          />
             <Stack.Screen
            name="Loader"
            component={Loader}
            options={{headerShown:false}}
          />
            
           <Stack.Screen
            name="Customer_Details"
            component={Customer_Details}
            options={{ headerShown: false}}
          />
          <Stack.Screen
            name="Hotels"
            component={ProjectsView}
            title="Hotels"
           
          />
          <Stack.Screen 
        name="Account" 
        component={Account} 
        options={{headerShown:false}}
        /> 
         <Stack.Screen 
        name="BusinessInfo" 
        component={BusinessInfo} 
        options={{headerShown:false}}
        /> 
        <Stack.Screen 
        name="AccountNew" 
        component={AccountNew} 
        options={{headerShown:false}}
        /> 
        <Stack.Screen 
        name="Goods_Promo" 
        component={Goods_Promo} 
        options={{headerShown:false}}
        /> 
        <Stack.Screen 
        name="Room_Plan" 
        component={Room_Plan} 
        options={{headerShown:false}}
        /> 
          <Stack.Screen name="Task List" options={{headerShown: false}}>
            {(props) => {
              const { navigation, route } = props;
              const { user, projectPartition, expiration, name } = route.params;
   
              return (
                <TasksProvider user={user} projectPartition={projectPartition} expiration={expiration} name={name}>
                  <TabScreen navigation={navigation} route={route} />
                </TasksProvider>
              );
            }}
          </Stack.Screen>
    
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
