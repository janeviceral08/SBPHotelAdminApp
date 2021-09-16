import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Good } from "../schemas";
import { useAuth } from "./AuthProvider";

const GoodsContext = React.createContext(null);

const GoodsProvider = ({ children, projectPartition }) => {
  const [Goods, setGoods] = useState([]);
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

      const syncTasks = projectRealm.objects("Goods");
      let sortedTasks = syncTasks.sorted("name");
      setGoods([...sortedTasks]);
      sortedTasks.addListener(() => {
        setGoods([...sortedTasks]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setGoods([]);
      }
    };
  }, [user, projectPartition]);

  const createGood = (newName,newFloor,selectedItems, GoodTypeId) => {
   
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new Good in the same partition -- that is, in the same project.
      projectRealm.create(
        "Goods",
        new Good({
          name: newName,
          floor: newFloor,
          Good_type_id:selectedItems,
          partition: projectPartition,
        })
      );
    });
  };

  const setGoodStatus = (Good, status) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    if (
      ![
        Good.STATUS_OPEN,
        Good.STATUS_IN_PROGRESS,
        Good.STATUS_COMPLETE,
      ].includes(status)
    ) {
      throw new Error(`Invalid status: ${status}`);
    }
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      Good.status = status;
    });
  };
  const EditGood = (GoodInfo,newFloor, newGoodNumber) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
 
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
        GoodInfo.floor = newFloor;
        GoodInfo.name = newGoodNumber;
    });
  };


  // Define the function for deleting a Good.
  const deleteGood = (Good) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(Good);
      setGoods([...projectRealm.objects("Goods").sorted("name")]);
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useGoods hook.
  return (
    <GoodsContext.Provider
      value={{
        createGood,
        deleteGood,
        setGoodStatus,
        EditGood,
      
        Goods,
      }}
    >
      {children}
    </GoodsContext.Provider>
  );
};

// The useGoods hook can be used by any descendant of the GoodsProvider. It
// provides the Goods of the GoodsProvider's project and various functions to
// create, update, and delete the Goods in that project.
const useGoods = () => {
  const Good = useContext(GoodsContext);
  if (Good == null) {
    throw new Error("useGoods() called outside of a GoodsProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return Good;
};

export { GoodsProvider, useGoods };
