import React, { useState } from "react";
import { Alert } from 'react-native';
import { Text, ListItem } from "react-native-elements";
import { useTasks } from "../providers/TasksProvider";
import { GoodSheet } from "./GoodSheet";
import { Good } from "../schemas";

export function GoodItem({ goods }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const { deleteGood, setTaskStatus } = useTasks();
  const actions = [
    {
      title: "Delete",
      action: () => {
        Alert.alert(
          "Delete the Good from database?",
          "You cannot undo the process if you proceed",
          [
            {
              text: "Cancel",
              onPress: () => this.componentDidMount(),
              style: "cancel"
            },
            { text: "OK", onPress: () =>   

            {
              deleteGood(goods);
            }
          }
          ],
          { cancelable: false }
          );
   

       
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the Good into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
 
  return (
    <>
      <GoodSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (goods.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
        GoodInfo={goods}
      />
      <ListItem
        key={goods.itemid}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        title={goods.name}
        bottomDivider
    
      />
    </>
  );
}
