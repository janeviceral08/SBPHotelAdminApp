import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Room } from "../schemas";
import { useAuth } from "./AuthProvider";

const RoomsContext = React.createContext(null);

const RoomsProvider = ({ children, projectPartition }) => {
  const [rooms, setRooms] = useState([]);
  const { user } = useAuth();

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    const config = {
      sync: {
        user: user,
        partitionValue: projectPartition,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const syncTasks = projectRealm.objects("Rooms");
      let sortedTasks = syncTasks.sorted("name");
      setRooms([...sortedTasks]);
      sortedTasks.addListener(() => {
        setRooms([...sortedTasks]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setRooms([]);
      }
    };
  }, [user, projectPartition]);

  const createRoom = (newName,newFloor,selectedItems, RoomTypeId) => {
   
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new room in the same partition -- that is, in the same project.
      projectRealm.create(
        "Rooms",
        new Room({
          name: newName,
          floor: newFloor,
          room_type_id:selectedItems,
          partition: projectPartition,
        })
      );
    });
  };

  const setRoomStatus = (room, status) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    if (
      ![
        Room.STATUS_OPEN,
        Room.STATUS_IN_PROGRESS,
        Room.STATUS_COMPLETE,
      ].includes(status)
    ) {
      throw new Error(`Invalid status: ${status}`);
    }
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      room.status = status;
    });
  };
  const EditRoom = (roomInfo,newFloor, newRoomNumber) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
 
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
        roomInfo.floor = newFloor;
        roomInfo.name = newRoomNumber;
    });
  };


  // Define the function for deleting a room.
  const deleteRoom = (room) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(room);
      setRooms([...projectRealm.objects("Rooms").sorted("name")]);
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useRooms hook.
  return (
    <RoomsContext.Provider
      value={{
        createRoom,
        deleteRoom,
        setRoomStatus,
        EditRoom,
      
        rooms,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

// The useRooms hook can be used by any descendant of the RoomsProvider. It
// provides the rooms of the RoomsProvider's project and various functions to
// create, update, and delete the rooms in that project.
const useRooms = () => {
  const room = useContext(RoomsContext);
  if (room == null) {
    throw new Error("useRooms() called outside of a RoomsProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return room;
};

export { RoomsProvider, useRooms };
