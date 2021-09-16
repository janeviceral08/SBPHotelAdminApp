import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Alert,TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { Text, ListItem, Overlay } from "react-native-elements";
import Colors from '../Colors';
import { useAuth } from "../providers/AuthProvider";
import Loader from './styles/Loader'
import { useTasks } from "../providers/TasksProvider";
import { ManageTeamCleaningItem } from './ManageTeamCleaningItem';
export function ManageTeam({ navigation, route }) {
  
  const { user, userData } = useAuth();
  const [newTeamMember, setNewTeamMember] = useState(null);
  const [teamMemberList, setTeamMemberList] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { own,expiration_date } = useTasks();
  // getTeam calls the backend function getMyTeamMembers to retrieve the
  // team members of the logged in user's project

  console.log('expiration_date: ', expiration_date)
  console.log('own: ', own)
  const getTeam = async () => {
    try {
      const teamMembers = await user.functions.getMyTeamMembersStaff([]);
      setTeamMemberList(teamMembers);
    } catch (err) {
      Alert.alert("An error occurred while getting team members", err.message);
    }
  };

  // addTeamMember calls the backend function addTeamMember to add a
  // team member to the logged in user's project
  const addTeamMembers = async () => {
    try {
      setLoading(true)
      await user.functions.addTeamMember(newTeamMember, userData.expiration, "Staff");
      setLoading(false)
      getTeam();
    } catch (err) {
      setLoading(false)
      Alert.alert("An error occurred while adding", err.message);
    }
  };

  // removeTeamMember calls the backend function removeTeamMember to remove a
  // team member from the logged in user's project
  const removeTeamMember = async (email) => {
    try {
      await user.functions.removeStaff(email);
      getTeam();
    } catch (err) {
      Alert.alert("An error occurred while removing a team member", err.message);
    }
  };

  const openDeleteDialogue = (member) => {
    Alert.alert("Remove the following member from your team?", member.name, [
      {
        text: "Remove",
        onPress: () => {
          removeTeamMember(member.name);
        },
      },
      { text: "cancel", style: "cancel" },
    ]);
  };

  // Load the team when the component is first mounted or when the user changes.
  useEffect(() => {
    getTeam();
  }, [user]);

  return (
    <View style={{margin: 10}}>
      {own == false? null:
        <View>
     <Loader loading={Loading} />
  <View style={styles.manageTeamWrapper}>
    <View style={styles.manageTeamTitle}>
      <Text h3>Staffs</Text>
    </View>
    {teamMemberList.map((member) => (
      <TouchableOpacity  onPress={() => openDeleteDialogue(member)} key={`${member._id}`}>
     <ManageTeamCleaningItem  key={`${member._id}`} room={member} /></TouchableOpacity>
    ))}

    <Text h4> Add Staff:</Text>
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={(text) => setNewTeamMember(text)}
        value={newTeamMember}
        placeholder="New Team Member Email"
        style={styles.addTeamMemberInput}
        keyboardType={'email-address'}
      />
    </View>
    <Button onPress={() => addTeamMembers(newTeamMember)} title="Add Staff" color={Colors.buttons}/>
      
  </View>
    </View>
      }

  </View>
  );
}
