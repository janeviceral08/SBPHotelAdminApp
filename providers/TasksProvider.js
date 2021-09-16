import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import {Alert} from 'react-native'
import { Task, Good, Room, Category, vouchers} from "../schemas";
import { useAuth } from "./AuthProvider";
import Toast from "react-native-simple-toast";
import moment from "moment";

const TasksContext = React.createContext(null);

const TasksProvider = ({ children, projectPartition, expiration, name }) => {
  const [tasks, setTasks] = useState([]);
  const { user,signOut, BusinessData } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [goods, setGoods] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const [checkin, setCheckin] = useState([]);
  const [carts, setCarts] = useState([]);
  const [reserve, setReserve] = useState([]);
  const [category, setCategory] = useState([]);
  const [allRef, setAllRef] = useState([]);
  const [own, setown] = useState(false);
  const [Booking, setBooking] = useState([]);
  const [User_Info, setUser_Info] = useState();
  const [expiration_date, setexpiration] = useState(expiration);
  const [valueroom_checklist, setroom_checklist] = useState([]);
  const [House_Keeping_Data, setHouse_Keeping_Data] = useState([]);
  const [House_Keeping_Rooms, setHouse_Keeping_Rooms] = useState([]);
  const [LogsData, setLogsData] = useState([]);
  const [Get_Logs_Data, setGet_Logs_Data] = useState([]);
  const [Get_Voucher, setGet_Voucher] = useState([]);
  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.


//console.log('projectPartition: ', 'user='+projectPartition.slice(8))
  const realmRef = useRef(null);

  useEffect(() => {
  //  console.log('expiration: ', expiration)
  //  console.log('name: ', name)
    name == "My Hotel" ? setown(true) : setown(false)

    const configs = {
      sync: {
        user: user,
        partitionValue: 'user='+projectPartition.slice(8),
      },
    };
    //
    Realm.open(configs).then((projectRealm) => {
      realmRef.current = projectRealm;
      let dates = moment().add(-30, 'days').unix().toString()
      
      const syncUser = projectRealm.objects("User");
      let sortedUser = syncUser.sorted("name");
      console.log('sortedUser: ', sortedUser)
    setUser_Info(sortedUser);
    sortedUser.addListener(() => {
        setUser_Info(sortedUser);
    });


    });
expiration <= moment().unix()?signOut:null
    const config = {
      sync: {
        user: user,
        partitionValue: projectPartition,
      },
    };
    // open a realm for this particular project

 // console.log('tasks: ',tasks)
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;
      let dates = moment().add(-30, 'days').unix().toString()
      
      const syncTasks = projectRealm.objects("Task");
      let sortedTasks = syncTasks.sorted("name");
     // console.log('sortedTasks: ', sortedTasks)
      setTasks([...sortedTasks]);
      sortedTasks.addListener(() => {
        setTasks([...sortedTasks]);
      });

      const syncBooking = projectRealm.objects("Booking_Reservation");
      let sortedBooking = syncBooking.sorted("reservation_code");
     
      setBooking([...sortedBooking]);
      sortedBooking.addListener(() => {
        setBooking([...sortedBooking]);
      });
      const syncCarts = projectRealm.objects("Orders").filtered('updated_at >= '+ dates);
      let sortedCarts = syncCarts.sorted("item");
      //console.log('sortedCarts: ', sortedCarts)
     setCarts([...sortedCarts]);
      sortedCarts.addListener(() => {
        setCarts([...sortedCarts]);
      });





      const syncRoom = projectRealm.objects("Rooms").filtered('status!="Deleted"');
      let sortedRoom = syncRoom.sorted("name");
      setRooms([...sortedRoom]);
      sortedRoom.addListener(() => {
        setRooms([...sortedRoom]);
      });

      const syncGood = projectRealm.objects("Goods").filtered('status == "Available"');
      let sortedGood = syncGood.sorted("name");
      setGoods([...sortedGood]);
      sortedGood.addListener(() => {
        setGoods([...sortedGood]);
      });

//console.log('updated at: ', moment().add(-30, 'days').unix().toString())

      const syncCheckout = projectRealm.objects("Checkout").filtered('check_in >= '+ dates);
      let sortedCheckout = syncCheckout.sorted("check_in");
    //  console.log('sortedTasks: ', syncCheckout)
      setCheckout([...sortedCheckout]);
      sortedCheckout.addListener(() => {
        setCheckout([...sortedCheckout]);
      });

      const syncBooking_Reservation = projectRealm.objects("Booking_Reservation").filtered('in_check >= '+ dates+'&& status == "Cancelled"');
      let sortedBooking_Reservation = syncBooking_Reservation.sorted("in_check");
     console.log('sortedBooking_Reservation: ', sortedBooking_Reservation.length)
     // setCheckout([...sortedCheckout]);
      sortedBooking_Reservation.addListener(() => {
      //  setCheckout([...sortedCheckout]);
      });


    
    
      const syncCheckin = projectRealm.objects("Checkin");
      let sortedCheckin = syncCheckin.sorted("check_in");
      console.log('sortedCheckin: ', sortedCheckin.length)
     setCheckin([...sortedCheckin]);
      sortedCheckin.addListener(() => {
        setCheckin([...sortedCheckin]);
      });

      const syncCategory= projectRealm.objects("Category").filtered('status!="Deleted"');
      let sortedCategory = syncCategory.sorted("name");
      setCategory([...sortedCategory]);
      sortedCategory.addListener(() => {
        setCategory([...sortedCategory]);
      });


     
      const new_from = moment().add(-60, 'days').unix()
      const new_to = moment().unix()

      const syncroom_checklist = projectRealm.objects("room_checklist").filtered('date >= '+  new_from+' && '+'date <= '+  new_to );
      let sortedroom_checklist = syncroom_checklist.sorted("date", true);
 
      setroom_checklist([...sortedroom_checklist]);
      sortedroom_checklist.addListener(() => {
        setroom_checklist([...sortedroom_checklist]);
      });


      const syncLogsData = projectRealm.objects("logs").filtered('date >= '+  new_from+' && '+'date <= '+  new_to );
      let sortedLogsData = syncLogsData.sorted("date", true);
 
      setLogsData([...sortedLogsData]);
      sortedLogsData.addListener(() => {
        setLogsData([...sortedLogsData]);
      });

      const syncGet_Voucher = projectRealm.objects("vouchers");
      let sortedGet_Voucher = syncGet_Voucher.sorted("date", true);
 
      setGet_Voucher([...sortedGet_Voucher]);
      sortedGet_Voucher.addListener(() => {
        setGet_Voucher([...sortedGet_Voucher]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setTasks([]);
        setRooms([]);
        setGoods([]);
        setCheckout([]);
        setCheckin([]);
        setCarts([]);
        setCategory([]);
        setAllRef([]);
        setBooking([]);
        setroom_checklist([]);
        setUser_Info();
        setHouse_Keeping_Data([]);
        setHouse_Keeping_Rooms([]);
        setLogsData([]);
        setGet_Logs_Data([]);
        setGet_Voucher([]);
      }
    };
  }, [user, projectPartition]);

  const createTask = (newRoomType,newRoomPrice,RoomExtraPerson,RoomMaxPer,RoomHourDur,RoomHourPrice,PromoDuration,RoomPrice,Durationvalue,Durationitems,value,items, newExtension, image, MaxRes) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Task",
        new Task({
          rate_mode:value,
          name: newRoomType,
          room_type: newRoomType,
          extra_person_charge:RoomExtraPerson,
          max_person:RoomMaxPer,
          hour_duration:RoomHourDur,
          roomprice: newRoomPrice,
          partition: projectPartition,
          vacant: 0,
          occupied: parseFloat(MaxRes),
          extension:newExtension,
          promo_price_hour: newRoomPrice,
          roomprice_hour:RoomHourPrice,
          duration_mode:Durationvalue,
          promo_duration:PromoDuration,
          img: image,
          hotel_name: BusinessData.hot_name,
          hotel_address: BusinessData.hot_address + ' '+ BusinessData.hot_city,
          web: BusinessData.web,
          temp_id: projectPartition.slice(-6)+'-'+Math.floor(Math.random() * 999999),
          web_view: 0,
          show_website: 1,
        })
      );
      Alert.alert('Product Successfully Added!')
    });
  };

  const createGoods = (product,quantity,price) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Goods",
        new Good({
          name:product,
          price: parseFloat(price),
          product: product,
          quantity:parseFloat(quantity),
          partition: projectPartition,
        })
      );
      Alert.alert('Product Successfully Added!')
    });
  };

  const setTaskStatus = (task, status) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
  //  console.log('task: ', task)
    if (
      ![
        Task.STATUS_OPEN,
        Task.STATUS_IN_PROGRESS,
        Task.STATUS_COMPLETE,
      ].includes(status)
    ) {
      throw new Error(`Invalid status: ${status}`);
    }
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      task.status = status;
    });
  };


  const EditGoods = (GoodInfo, newproduct, newprice, newquantity, selectedItems) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
//   console.log('newproduct: ', newproduct)
  // console.log('newprice: ', newprice)
  // console.log('newquantity: ', newquantity)
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      GoodInfo.name = newproduct ==""?GoodInfo.name:newproduct ;
      GoodInfo.product = newproduct ==""?GoodInfo.name:newproduct ;
      GoodInfo.price = newprice ==""?parseFloat(GoodInfo.price):parseFloat(newprice);
      GoodInfo.quantity = newquantity==""?parseFloat(GoodInfo.quantity):parseFloat(newquantity);
      GoodInfo.cat = selectedItems[0]
    });
    Alert.alert('Successfully Edited!')
  };


  // Define the function for deleting a task.
  const deleteTask = (task) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(task);
      setTasks([...projectRealm.objects("Task").sorted("name")]);
    });
  };

  const deleteGood = (good) => {
    const projectRealm = realmRef.current;
   

    projectRealm.write(() => {
      good.status = "Deleted";
       
    });
    const new_val = goods.filter(function( obj ) {
      return obj.itemid !== good.itemid;
    });

//console.log('new_val: ', new_val)

 //   projectRealm.write(() => {
  //    projectRealm.delete(good);
  //    setTasks([...projectRealm.objects("Goods").sorted("name")]);
  //  });
  };


  const createCat = (newName) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Category",
        new Category({
           name: newName,
          status: 'Available',
          partition: projectPartition,
          catid:projectPartition.slice(-6)+'-'+moment().unix().toString()
        })
      );
      Alert.alert('Category Successfully Added!')
    });
  };

  const deleteCat = (room) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {

  room.status = 'Deleted';
    });
  };
  const createRoom = (newName,newFloor,selectedItems, RoomTypeId, checkList) => {
   
  console.log('checkList: ', checkList)


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
          room_id:projectPartition.slice(-6)+'-'+moment().unix().toString(),
          img: [''],
          note: '',
          checkList: checkList,
        })
      );
      Alert.alert('Room Successfully Added!')
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
  const EditRoom = (roomInfo,newFloor, newRoomNumber,selectedItems,room_type_id, tagsEdit) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
 
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
  
        roomInfo.room_type_id=selectedItems;
        roomInfo.floor = newFloor;
        roomInfo.name = newRoomNumber;
        roomInfo.checkList = tagsEdit;
    }
   
    );
    Alert.alert('Sucessfully Updated!')
  };


  const Edit_Room_Type = (roomTypeInfo, newRoomType, value, newRoomPrice,Durationvalue,newExtension,newExtraPerson,newMaxPerson,image, newhour_duration, newroomprice_hour, newpromo_duration, isEnabled) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
 
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
  
      roomTypeInfo.rate_mode= value == null?   roomTypeInfo.rate_mode: value,
      roomTypeInfo.name=newRoomType,
      roomTypeInfo.room_type=newRoomType,
      roomTypeInfo.extra_person_charge=newExtraPerson,
      roomTypeInfo.max_person=newMaxPerson,
      roomTypeInfo.hour_duration=newhour_duration,
      roomTypeInfo.roomprice_hour=newroomprice_hour
      roomTypeInfo.roomprice= newRoomPrice,
      roomTypeInfo.extension=newExtension,
      roomTypeInfo.promo_price_hour= newRoomPrice,
      roomTypeInfo.duration_mode=Durationvalue == null?roomTypeInfo.duration_mode:Durationvalue,
      roomTypeInfo.promo_duration=newpromo_duration,
      roomTypeInfo.img= image,
      roomTypeInfo.show_website= isEnabled === true? 1: 0
    }
   
    );
    Alert.alert('Sucessfully Updated!')
  };


  const createGood = (Product,Price,Quantity, selectedItems) => {
   
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new Good in the same partition -- that is, in the same project.
      projectRealm.create(
        "Goods",
        new Good({
          name: Product,
          price: parseFloat(Price),
          quantity:parseFloat(Quantity),
          product:Product,
          itemid: moment().unix().toString()+projectPartition,
          partition: projectPartition,
          cat: selectedItems[0],
        })
      );
      Alert.alert('Product Successfully Added!')
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

  // Define the function for deleting a room.
  const deleteRoom = (room) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {

  room.status = 'Deleted';
    });
  };

  const getResult = (from, to, label ) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.

    const config_task = {
      sync: {
        user,
        partitionValue: `project=${user.id}`,
      },
    };
   // console.log('label: ', label)
const new_from = moment(from).unix()
const new_to = moment(to).unix()
//console.log('new_from: ',new_from)
      //  console.log('new_to: ', new_to)


      Realm.open(config_task).then((projectRealm) => {
        realmRef.current = projectRealm;
    
        const syncCheckout = projectRealm.objects("Checkout").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to);
        let sortedCheckout = syncCheckout.sorted("check_in");
        //console.log('sortedTasks: ', sortedCheckout)
        setCheckout([...sortedCheckout]);
        sortedCheckout.addListener(() => {
          setCheckout([...sortedCheckout]);
        });
    
        
      });
    
  };
  const getResultin = (from, to, label ) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.

    const config_task = {
      sync: {
        user,
        partitionValue: `project=${user.id}`,
      },
    };
   // console.log('label: ', label)
const new_from = moment(from).unix()
const new_to = moment(to).unix()
//console.log('new_from: ',new_from)
      //  console.log('new_to: ', new_to)


      Realm.open(config_task).then((projectRealm) => {
        realmRef.current = projectRealm;
    
        const syncCheckout = projectRealm.objects("Checkout").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to);
        let sortedCheckout = syncCheckout.sorted("check_in");
        console.log('sortedTasks checkin: ', sortedCheckout)
        setCheckout([...sortedCheckout]);
        sortedCheckout.addListener(() => {
          setCheckout([...sortedCheckout]);
        });
    
        
      });
    
  };
  const getResultout = (from, to, label ) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.

    const config_task = {
      sync: {
        user,
        partitionValue: `project=${user.id}`,
      },
    };
   // console.log('label: ', label)
const new_from = moment(from).unix()
const new_to = moment(to).unix()
//console.log('new_from: ',new_from)
      //  console.log('new_to: ', new_to)


      Realm.open(config_task).then((projectRealm) => {
        realmRef.current = projectRealm;
    
        const syncCheckout = projectRealm.objects("Checkout").filtered('check_out >= '+  new_from+'&&'+'check_out <= '+  new_to);
        let sortedCheckout = syncCheckout.sorted("check_out");
        //console.log('sortedTasks: ', sortedCheckout)
        setCheckout([...sortedCheckout]);
        sortedCheckout.addListener(() => {
          setCheckout([...sortedCheckout]);
        });
    
        
      });
    
  };

  const getResultGoods = (from, to, label ) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.

    const config_Goods = {
      sync: {
        user,
        partitionValue: `project=${user.id}`,
      },
    };
  //  console.log('label: ', label)
const new_from = moment(from).unix()
const new_to = moment(to).unix()
//console.log('new_from: ',new_from)
 //       console.log('new_to: ', new_to)

      Realm.open(config_Goods).then((projectRealm) => {
        realmRef.current = projectRealm;
    
        const syncCarts = projectRealm.objects("Orders").filtered('updated_at >= '+  new_from+'&&'+'updated_at <= '+  new_to);
        let sortedCarts = syncCarts.sorted("item");
        //console.log('sortedTasks: ', sortedCheckout)
        setCarts([...sortedCarts]);
        sortedCarts.addListener(() => {
          setCarts([...sortedCarts]);
        });
    
        
      });
    
  };


  const Cleaning =(item)=> {
    //console.log('cleaned')
      const projectRealm = realmRef.current;
      projectRealm.write(() => {
  
        item.status = 'Cleaning';
      });
      Alert.alert('Success!')
    }

    const Under_Maintenance =(item)=> {
     // console.log('cleaned')
        const projectRealm = realmRef.current;
        projectRealm.write(() => {
          
          item.status = 'Under Maintenance';
        });
        Alert.alert('Success!')
      }

      const Available =(item)=> {
      //  console.log('Available')
          const projectRealm = realmRef.current;
          projectRealm.write(() => {
        
            item.status = 'Available';
          });
          Alert.alert('Success!')
        }


        const Res_Ref = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkin").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to +'&& checkin_stat == "Reservation" && status == "Refunded" ');
              let sortedCheckout = syncCheckout.sorted("check_in");
              //console.log('sortedTasks: ', sortedCheckout)
              setAllRef([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setAllRef([...sortedCheckout]);
              });
          
              
            });
       
        };

        const res_out = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkout").filtered('check_out >= '+  new_from+'&&'+'check_out <= '+  new_to +'&& checkin_stat == "Reservation"');
              let sortedCheckout = syncCheckout.sorted("check_in");
              //console.log('sortedTasks: ', sortedCheckout)
              setCheckout([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setCheckout([...sortedCheckout]);
              });
            });
       
        };


        const Res_In = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkout").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to +'&& checkin_stat == "Reservation"');
              let sortedCheckout = syncCheckout.sorted("check_in");
              //console.log('sortedTasks: ', sortedCheckout)
              setCheckout([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setCheckout([...sortedCheckout]);
              });
            });
       
        };






        const FD_Ref = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkin").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to +'&& checkin_stat != "Reservation" && status == "Refunded" ');
              let sortedCheckout = syncCheckout.sorted("check_in");
              //console.log('sortedTasks: ', sortedCheckout)
              setAllRef([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setAllRef([...sortedCheckout]);
              });
          
              
            });
       
        };

        const FD_out = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkout").filtered('check_out >= '+  new_from+'&&'+'check_out <= '+  new_to +'&& checkin_stat == "Over The Counter"');
              let sortedCheckout = syncCheckout.sorted("check_out");
              console.log('sortedCheckout: ', sortedCheckout)
              setCheckout([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setCheckout([...sortedCheckout]);
              });
            });
       
        };



        const FD_in = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkout").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to +'&& checkin_stat != "Reservation"');
              let sortedCheckout = syncCheckout.sorted("check_in");
              //console.log('sortedTasks: ', sortedCheckout)
              setCheckout([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setCheckout([...sortedCheckout]);
              });
            });
       
        };

        const ewallet = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkout").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to +'&& payment_method == "E-Wallet"');
              let sortedCheckout = syncCheckout.sorted("check_in");
              //console.log('sortedTasks: ', sortedCheckout)
              setCheckout([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setCheckout([...sortedCheckout]);
              });
            });
       
        };
        const Debit = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkout").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to +'&& payment_method == "Debit Card"');
              let sortedCheckout = syncCheckout.sorted("check_in");
              //console.log('sortedTasks: ', sortedCheckout)
              setCheckout([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setCheckout([...sortedCheckout]);
              });
            });
       
        };

        const Credit = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkout").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to +'&& payment_method == "Credit Card"');
              let sortedCheckout = syncCheckout.sorted("check_in");
              //console.log('sortedTasks: ', sortedCheckout)
              setCheckout([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setCheckout([...sortedCheckout]);
              });
            });
       
        };

        const Cash = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Checkout").filtered('check_in >= '+  new_from+'&&'+'check_in <= '+  new_to +'&& payment_method == "Cash"');
              let sortedCheckout = syncCheckout.sorted("check_in");
              //console.log('sortedTasks: ', sortedCheckout)
              setCheckout([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setCheckout([...sortedCheckout]);
              });
            });
       
        };

        

        const Cancel_Res = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
          
              const syncCheckout = projectRealm.objects("Booking_Reservation").filtered('in_check >= '+  new_from+'&&'+'in_check <= '+  new_to +'&&  status == "Cancelled" ');
              let sortedCheckout = syncCheckout.sorted("in_check");
              //console.log('sortedTasks: ', sortedCheckout)
              setReserve([...sortedCheckout]);
              sortedCheckout.addListener(() => {
                setReserve([...sortedCheckout]);
              });
          
              
            });
       
        };

        const All_Ref = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
      console.log('new_from: ', new_from)
      console.log('new_to: ', new_to)
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
              const syncAllRef = projectRealm.objects("Checkin").filtered('check_in >= '+  new_from+' && '+'check_in <= '+  new_to +' &&  status == "Refunded" ');
              let sortedAllRef = syncAllRef.sorted("check_in");
              console.log('sortedAllRef: ', sortedAllRef)
              setAllRef([...sortedAllRef]);
              sortedAllRef.addListener(() => {
                setAllRef([...sortedAllRef]);
              });
          
              
            });
       
        };

        const changed_room = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
      console.log('new_from: ', new_from)
      console.log('new_to: ', new_to)
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
              const syncAllRef = projectRealm.objects("Checkout").filtered('check_in >= '+  new_from+' && '+'check_in <= '+  new_to +' &&  room_change == "Changed"');
              let sortedAllRef = syncAllRef.sorted("check_in");
              console.log('sortedAllRef: ', sortedAllRef)
              setCheckout([...sortedAllRef]);
              sortedAllRef.addListener(() => {
                setCheckout([...sortedAllRef]);
              });
          
              
            });
       
        };


        const CancelRes= (info, res) => {
          // One advantage of centralizing the realm functionality in this provider is
          // that we can check to make sure a valid status was passed in here.
        
        
          const projectRealm = realmRef.current;
        
          projectRealm.write(() => {
            info.status = 'Cancelled';
            info.reason = res;
          });
        };
        
        
        
        const ConfirmRes= (info) => {
          // One advantage of centralizing the realm functionality in this provider is
          // that we can check to make sure a valid status was passed in here.
        
        
          const projectRealm = realmRef.current;
        
          projectRealm.write(() => {
            info.status = 'Confirmed';
          });
        };


        const get_room_checklist = (room_ids) => {
      console.log('room_id: ', room_ids)

          
      const new_from = moment().add(-60, 'days').unix()
      const new_to = moment().unix()
      
      console.log('new_from: ', new_from)
      console.log('new_to: ', new_to)
 
      const projectRealm = realmRef.current;
              const syncroom_checklist = projectRealm.objects("room_checklist").filtered('date >= '+  new_from+' && '+'date <= '+  new_to );
              let sortedroom_checklist = syncroom_checklist.sorted("date");
              console.log('sortedroom_checklist: ', sortedroom_checklist.length)
         
          //+' &&  room_id == '+ room_ids
              
          
           
        };




        const House_Keeping = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
      console.log('new_from: ', new_from)
      console.log('new_to: ', new_to)
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
              const syncroom_checklist = projectRealm.objects("room_checklist").filtered('date >= '+  new_from+' && '+'date <= '+  new_to );
      let sortedroom_checklist = syncroom_checklist.sorted("date");
 
      setHouse_Keeping_Data([...sortedroom_checklist]);
      sortedroom_checklist.addListener(() => {
        setHouse_Keeping_Data([...sortedroom_checklist]);
      });


      const syncroomInfo = projectRealm.objects("Rooms");
      let sortedroomInfo = syncroomInfo.sorted("name");
 
      setHouse_Keeping_Rooms([...sortedroomInfo]);
      sortedroomInfo.addListener(() => {
        setHouse_Keeping_Rooms([...sortedroomInfo]);
      });
          
              
            });
       
        };



        const Get_Logs = (from, to, label ) => {
      
          const config_task = {
            sync: {
              user,
              partitionValue: `project=${user.id}`,
            },
          };
      const new_from = moment(from).unix()
      const new_to = moment(to).unix()
      
      console.log('new_from: ', new_from)
      console.log('new_to: ', new_to)
            Realm.open(config_task).then((projectRealm) => {
              realmRef.current = projectRealm;
              const syncroom_checklist = projectRealm.objects("logs").filtered('date >= '+  new_from+' && '+'date <= '+  new_to );
      let sortedroom_checklist = syncroom_checklist.sorted("date", true);
 
      setGet_Logs_Data([...sortedroom_checklist]);
      sortedroom_checklist.addListener(() => {
        setGet_Logs_Data([...sortedroom_checklist]);
      });
          
              
            });
       
        };
        const createVoucher = (code,min_stay,max_stay,mode,vouchvalue,description,expiration_date) => {
  
        
        
            const projectRealm = realmRef.current;
            projectRealm.write(() => {
            
          
              // Create a new room in the same partition -- that is, in the same project.
              projectRealm.create(
                "vouchers",
                new vouchers({
                  mode,
                  vouchvalue: parseFloat(vouchvalue),
                  code,
                  date: moment().unix(),
                  expiration_date: parseFloat(expiration_date),
                  min_stay: parseFloat(min_stay),
                  max_stay: parseFloat(max_stay),
                  description,
                 partition: projectPartition,
                  createdAt:moment().unix(),
                  updatedAt: moment().unix(),
                  status: 'active'
                })
              );
              Alert.alert('Voucher Successfully Created!')
            });
          };




          const updateVoucher = (Info, min,max,Durationvalue,vvalue,vdescription,expiration) => {
            // One advantage of centralizing the realm functionality in this provider is
            // that we can check to make sure a valid status was passed in here.
        //   console.log('newproduct: ', newproduct)
          // console.log('newprice: ', newprice)
          // console.log('newquantity: ', newquantity)
            const projectRealm = realmRef.current;
        
            projectRealm.write(() => {
              Info.mode = Durationvalue;
              Info.vouchvalue = parseFloat(vvalue);
              Info.expiration_date = parseFloat(expiration);
              Info.min_stay = parseFloat(min);
              Info.max_stay = parseFloat(max);
              Info.description = vdescription;
            });
            Alert.alert('Successfully Edited!')
          };


          const changevoucherStatus = (Info) => {
            // One advantage of centralizing the realm functionality in this provider is
            // that we can check to make sure a valid status was passed in here.
        //   console.log('newproduct: ', newproduct)
          // console.log('newprice: ', newprice)
          // console.log('newquantity: ', newquantity)
            const projectRealm = realmRef.current;
        
            projectRealm.write(() => {
              Info.status =  Info.status ==='active'?'inactive':'active';
             
            });
            Alert.alert('Successfully updated!')
          };


  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TasksContext.Provider
      value={{
        createTask,
        createGoods,
        deleteTask,
        deleteGood,
        setTaskStatus,
        EditGoods,
        getResult,
        createGood,
        setGoodStatus,
        EditGood,
        getResultGoods,
        createRoom,
        deleteRoom,
        setRoomStatus,
        Edit_Room_Type,
        EditRoom,
        Cleaning,
        Under_Maintenance,
        Available,
        Res_Ref,
        res_out,
        Res_In,
        FD_Ref,
        FD_out,
        FD_in,
        ewallet,
        Debit,
        Credit,
        Cash,
        Cancel_Res,
        All_Ref,
        createCat,
        deleteCat,
        CancelRes,
        ConfirmRes,
        getResultout,
        getResultin,
        get_room_checklist,
        House_Keeping,
        Get_Logs,
        createVoucher,
        updateVoucher,
        changevoucherStatus,
        changed_room,
        checkout,
        tasks,
        rooms,
        goods,
        carts,
        checkin,
        own,
        Booking,
        expiration_date,
        reserve,
        category,
        allRef,
        User_Info,
        valueroom_checklist,
        House_Keeping_Data,
        House_Keeping_Rooms,
        LogsData,
        Get_Logs_Data,
        Get_Voucher
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTasks = () => {
  const task = useContext(TasksContext);
  if (task == null) {
    throw new Error("useTasks() called outside of a TasksProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return task;
};

export { TasksProvider, useTasks };
