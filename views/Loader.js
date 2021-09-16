import React, { useState, useEffect }  from "react";
import { View, Button , Text} from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
export function Loader({ navigation, route }) {



  return (
    <View>
  <LottieView source={require('./14521-hotel-booking.json')}  colorFilters={[{
          keypath: "button",
          color: "#F00000"
        },{
          keypath: "Sending Loader",
          color: "#F00000"
        }]}
        autoPlay
        loop/>
    </View>
  );
}
