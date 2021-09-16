import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { getRealmApp } from "../getRealmApp";
import moment from "moment";

// Access the Realm App.
const app = getRealmApp();

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);
  const realmRef = useRef(null);
  const [projectData, setProjectData] = useState([]);
  const [userData, setUserData] = useState({});
  const [RoomPlanData, setRoomPlanData] = useState({});
  const [BusinessData, setBusinessData] = useState({});

  //console.log("user: ",userData)
  useEffect(() => {
    
    if (!user) {
      return;
    }




    // The current user always has their own project, so we don't need
    // to wait for the user object to load before displaying that project.
   // const myProject = { name: "My Project", partition: `project=${user.id}` };
   // setProjectData([myProject]);

    const config = {
      sync: {
        user,
        partitionValue: `user=${user.id}`,
      },
    };
    
  

    // Open a realm with the logged in user's partition value in order
    // to get the projects that the logged in user is a member of


    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
      const users = userRealm.objects("User");
      let sortedusers= users.sorted("name");
      setUserData([...sortedusers]);
      console.log('sortedusers: ', sortedusers)
      users.addListener(() => {
        setUserData([...sortedusers]);
        // The user custom data object may not have been loaded on
        // the server side yet when a user is first registered.
        //if (users.length === 0) {

         // setProjectData([myProject]);
        //} else {
        //  const { memberOf } = users[0];
       
        //  setProjectData([...memberOf]);
        //}

        console.log('users: ', users)

        if (users.length > 0) {
          const { memberOf, _id,address,
            age,
            full_name,
            hot_name,
            hot_mobile,
            hotel_tel,
            hotel_email,
            hot_address,
            hot_website,
            hot_logo,
            hot_city,
            name,
            gender,
            promo_goods,
            promo,
            id_goods_promo,
            expiration,
off,
price,
name_goods_promo,
number,
description,
id_room_plan,
off_room_plan,
price_room_plan,
name_room_plan,
number_room_plan,
description_room_plan,
web,
            website_pass,
            mobile, userType,} = users[0];
            setBusinessData({
              hot_name,
              hot_mobile,
              hotel_tel,
              hotel_email,
              hot_address,
              hot_website,
              hot_logo,
              hot_city,
              web,
            })
              setRoomPlanData({id_room_plan,
                off_room_plan,
                price_room_plan,
                name_room_plan,
                number_room_plan,
                description_room_plan,number})
          setUserData({ address,
            age,
            name,
            full_name,
          expiration,
            gender,
            mobile,
            promo_goods,
            promo,
            userType,
            website_pass,
            _id,
             });
          setProjectData([...memberOf]);
         } 

      });
    });

    return () => {
      // cleanup function
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
        setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
        setUserData([]);
        setBusinessData({}) 
        setRoomPlanData({})
        // set project data to an empty array (this prevents the array from staying in state on logout)
      }
    };
  }, [user]);

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.
  const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);

    setUser(newUser);

    
  };
  const ups = async () => {
    Alert.alert('Success!', 'Login To Verify your Account')
  };
  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password) => {
    await app.emailPasswordAuth.registerUser(email, password);
  };



  const EditUser = async (name, address,age, full_name,  gender,mobile) => {

    try {
     
      await user.functions.EditAccount(name, address,age, full_name,  gender,mobile);
      setUserData({ address,
        age,
        name,
        full_name,
        gender,
        mobile,
         });
    } catch (err) {
     
      Alert.alert("An error occurred while Updating", err.message);
      console.log('err.message: ',err.message)
    }
    
  };



  const EditBusiness = async (name, hot_name, hot_mobile, hotel_tel, hotel_email,hot_address,hot_website, hot_logo,selectedItems,hot_city, orig_add) => {

console.log('hot_city EditBusiness: ', hot_city)
console.log('selectedItems[0]EditBusiness: ', selectedItems[0])
if(orig_add === hot_address ){
  try {
     
    await user.functions.EditBusinesswoaddress(name, hot_name, hot_mobile, hotel_tel, hotel_email,hot_address,hot_website, hot_logo);
    setBusinessData({    hot_name,
      hot_mobile,
      hotel_tel,
      hotel_email,
      hot_address,
      hot_website,
      hot_logo,
      hot_city: selectedItems[0] === undefined? hot_city: selectedItems[0],
      web: BusinessData.web
       });
  } catch (err) {
   
    Alert.alert("An error occurred while Updating", err.message);
    console.log('err.message: ',err.message)
  }

}else{
console.log('here')
  try {
     
    await user.functions.EditBusinessData( name,hot_name, hot_mobile, hotel_tel, hotel_email,hot_address,hot_website, hot_logo,selectedItems[0]);
    setBusinessData({    hot_name,
      hot_mobile,
      hotel_tel,
      hotel_email,
      hot_address,
      hot_website,
      hot_logo,
      hot_city: selectedItems[0],
      web: BusinessData.web
       });
  } catch (err) {
   
    Alert.alert("An error occurred while Updating", err.message);
    console.log('err.message: ',err.message)
  }

}



    
  
    
  };



  

  const EditRoomPlan = async (name, id_room_plan,
    off_room_plan,
    price_room_plan,
    name_room_plan,
    number_room_plan,
    description_room_plan) => {

    try {
     
      await user.functions.Room_Plan(name, id_room_plan,
        off_room_plan,
        price_room_plan,
        name_room_plan,
        number_room_plan,
        description_room_plan);
      setRoomPlanData({id_room_plan,
        off_room_plan,
        price_room_plan,
        name_room_plan,
        number_room_plan,
        number})
    } catch (err) {
     
      Alert.alert("An error occurred while Updating", err.message);
      console.log('err.message: ',err.message)
    }
    
  };


  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };


  

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        ups,
        EditUser,
        EditRoomPlan,
        EditBusiness,
        user,
        RoomPlanData,
        projectData, // list of projects the user is a memberOf
        userData,
        BusinessData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
