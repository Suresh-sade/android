import React from "react";
import { useState,useEffect,useRef } from "react";
import { View, Text,Image, TouchableOpacity, StyleSheet, Modal, ImageBackground } from 'react-native';
import Ionicons from 'react-native-ionicons';
import * as SecureStore from 'expo-secure-store';
import { useSelector,useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';

const Navbar = ()=>{
    const [user, setUser] = useState('');
    const [showAllRequests, setShowAllRequests] = useState(false);
    const [request,setRequest] = useState()
    const [showAllNotification,setShowAllNotification] = useState(false);
    // const [showAllMessages,setShowAllMessages] = useState(false);
    const [notification,setNotifications] = useState();
    const iconHome = <Ionicons name="ios-home" size={30} color="#000" />;
    const iconPersonAdd = <Ionicons name="ios-home" size={30} color="#000" />;
    const iconNotifications = <Ionicons name="ios-home" size={30} color="#000" />;
    const iconMessageText = <Ionicons name="ios-home" size={30} color="#000" />;
    const userId = useSelector((state) => state.auth.userId);
    const [notificationCount,setNotificationCount] = useState(null)
    const [requestCount , setRequestCount] = useState(null);
    const [isSidebarOpen,setisSidebarOpen] = useState(false)
    const [users, setUsers] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [token,setToken] = useState()

    const getToken = async () => {
        try {
          const token = await SecureStore.getItemAsync('Token');  // Ensure you're using the correct key
          if (token !== null) {
            console.log("Token retrieved:", token);
            return token;
          } else {
            console.log("No token found");
            return null;
          }
        } catch (error) {
          console.error("Error retrieving token:", error);
          return null;
        }
      };


    // Fetch the dark mode preference from localStorage on initial render
    useEffect(() => {
    //   const savedMode = localStorage.getItem("darkMode") === "true";
      getToken
    }, []);
  
    const toggle = ()=>{
      setisSidebarOpen(!isSidebarOpen)
    }
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users',{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        const data = await response.json()
        setUsers(data);
  
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    useEffect(() => {
      fetchUsers();
    }, []);
    const headers = [
      {
        id: 1, 
        title: 'Home',
        path:'/newsfeed',
        icon: iconHome, 
        dropdownContent: null,
        count:null
      },
      {
        id: 2, 
        title: 'Friend Request', 
        icon: iconPersonAdd,
        count:requestCount,
        path:'/friendrequest'
      },
      {
        id: 3, 
        title: 'Notifications', 
        icon: iconNotifications, 
        count:notificationCount,
        path:'/notifications'
      },
      {
        id: 4, 
        title: 'Messages', 
        icon: iconMessageText, 
        count:null,
        path:'/messages'
      },
    ];
    const sidebarRef = useRef(null);
    const [activeSection, setActiveSection] = useState(headers.id=1);
    const dropdownRef = useRef(null);
    const [activeTitle,setActiveTitle] = useState(null);
    const navigation = useNavigation();
    // const {messages} = useSelector((state)=>state.message)
    const dispatch = useDispatch();
  
    const onClose = ()=>{
      setisSidebarOpen(false)
    }
  
    const handleFriend = (id) => {
      // navigation.navigate to user details page with the user ID
      navigation.navigate(`/user/${id}`);
    };
  // Check if the token exists
  if (token) {
    console.log('Token retrieved:', token);
  } else {
    console.log('No token found in localStorage.');
  }
  useEffect(() => {
    const routeName = location.pathname.split('/').pop();
    const type = parseInt(routeName,10) === Number
    console.log(routeName)
      setActiveTitle(routeName.toUpperCase());
  }, [location.pathname]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveSection(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
  
    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);
  
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const fetchUserName = async () => {
    try {
    //   const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
  
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched user data:', data); // Log fetched data
        setUser(data);
      } else {
        console.error('Failed to fetch user data:', response.status);
        // Optionally handle different status codes (e.g., unauthorized, not found)
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const fetchNotification = async () => {
    try {
    //   const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await fetch(`http://localhost:8080/follows/notifications/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        setNotificationCount(data.count);
        // Check if the user is followed
        // setIsRequested(data.sentRequests.find((follower) => follower.recipientId === parseInt(userID)));
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    };
  
    const handleBirthday = ()=>{
      navigation.navigate('/birthdays')
      onClose()
    }
  
    const handleWeather = ()=>{
      navigation.navigate('/weather')
      onClose()
    }
  
    const handleReels = ()=>{
      navigation.navigate('/reels')
      onClose()
    }
  
   const widgets= [
      { id: 1, title: 'Birthdays',icon:<Ionicons name="ios-home" size={30} color="#000" />, onClick: handleBirthday },
      { id: 2, title: 'Weather',icon:  <Ionicons name="ios-home" size={30} color="#000" />, onClick: handleWeather},
      { id: 3, title: 'Events',icon: <Ionicons name="ios-home" size={30} color="#000" />, onClick: '/notificationsettings'},
      { id: 4, title: 'Reels',icon:<Ionicons name="ios-home" size={30} color="#000" />, onClick: handleReels },
      { id: 5, title: 'Blogs',icon:  <Ionicons name="ios-home" size={30} color="#000" />, onClick: '/Privacydata' },
  ]
  
    const handleIconClick = (id) => {
      setActiveSection(id === activeSection ? null : id);
  
      if (id === 2) { // Assuming 2 is the ID for 'Friend Requests'
        setRequestCount(null);
      } else if (id === 3) { // Assuming 3 is the ID for 'Notifications'
        setNotificationCount(null);
      }
    };
  
    const openNotifications = ()=>{
      navigation.navigate(`/notifications/${userId}`)
    }
    const gotoRequestpage =()=>{
      closeDropdown();
      navigation.navigate(`/friendrequest/${userId}`)
      setShowAllRequests(!showAllRequests)
    }
    const closeDropdown = ()=>{
      setActiveSection(null);
    }
    const handleViewAll = (title)=>{
      setActiveTitle(title);
    }
    const openMessages = ()=>{
      navigation.navigate('/messages/1')
    }
  
    const fetchRequest = async () => {
      try {
        // const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        const response = await fetch(`http://localhost:8080/friend-requests/${userId}/pending-requests`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      
        if (response.ok) {
          const data = await response.json();
          setRequest(data);
          setRequestCount(data.pendingCount)
  
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      };
  
  
      const acceptRequest = async (acceptID)=>{
        // const token = localStorage.getItem('token')
        const payload={
          senderId:userId,
          recipientId:acceptID
        }
        try{
          const response = await fetch(`http://localhost:8080/friend-requests/accept?senderId=${acceptID}&recipientId=${userId}`,{
            method:'POST',
            headers:{
              'Authorization':`bearer${token}`
            },
            body:JSON.stringify(payload)
          })
          if(response.ok){
            console.log('')
            fetchRequest()
          }
          else{
            console.log('error in posting data')
          }
        }
        catch(error){
          console.error(error)
        }
      }
  
      const cancelRequest = async (cancelID)=>{
        // const token = localStorage.getItem('token')
        const payload={
          senderId:userId,
          recipientId:cancelID
        }
        try{
          const response = await fetch(`http://localhost:8080/friend-requests/decline?senderId=${cancelID}&recipientId=${userId}`,{
            method:'POST',
            headers:{
              'Authorization':`bearer${token}`
            },
            body:JSON.stringify(payload)
          })
          if(response.ok){
            console.log('')
            fetchRequest()
          }
          else{
            console.log('error in posting data')
          }
        }
        catch(error){
          console.error(error)
        }
      }
      useEffect(() => {
        if (userId) {
          fetchUserName();
          fetchRequest();
          fetchNotification();
        }
      }, [userId]);
      
    return (
        <View className='relative sticky top-0 z-10 bg-gradient-to-tr max-w-[30rem] w-full from-span-start to-span-end'>
            <nav className={`flex to-span-end   px-4 w-full sm:text-md   justify-between items-center h-12 flex-row`}>
            <View className='flex items-center gap-20'>
          <View className='flex items-center'>
         <img className='w-40 h-12 ' src={`/${'logo.png'}`} alt='logo' />
          </View>
            </View>
          <TouchableOpacity onPress={navigation.navigate('')}
                  type="submit"
                  className=" p-1 bg-white bg-opacity-30 rounded-full text-white focus:outline-none">
                 <Ionicons name="ios-home" size={30} color="#000" />
                </TouchableOpacity>
            </nav>
        <nav className='flex  px-4 w-full sm:text-md justify-between items-center h-16 flex-row'>
    
          <View className='flex items-center  gap-8'>
            <ul className='flex items-center h-11 justify-center gap-6'>
              {headers.map((header) => (
                <li key={header.id} className='cursor-pointer'>
                  <View className="relative">
                    <TouchableOpacity
                      className={`relative cursor-pointer py-2 w-7  rounded-full transition-colors duration-500 ease-in-out ${activeSection === header.id ? '' : ''}`}>
                      <span className="">
                        {React.cloneElement(header.icon, {
                          'data-tooltip-content': header.title,
                          'data-tooltip-id': `tooltip-${header.id}`,
                          style: {
                            color: activeSection === header.id ? 'white' : '',
                            height:'2rem',
                            width:'1.6rem'
                          },
                        })}
                        <span className={`absolute top-1 right-0 w-4 h-4 text-xs rounded-full ${header.count > 0 ?'bg-red' : ''} text-white flex items-center justify-center`}> {header.count > 0 ? header.count : ''}</span>
                      </span>
                    </TouchableOpacity>
                    {activeSection === header.id && header.title==='Friend Request' && (
                      <View ref={dropdownRef} className="absolute top-full overflow-y-auto overflow-x-hidden -right-20 w-[360px] h-[433px] bg-white rounded-md slide-in-down drop shadow-lg z-10 overflow-hidden">
                        <ul className="">
      <View className='flex absolute sticky top-0 bg-white justify-between items-center text-sm py-2 px-4'><Text>Requests</Text><Text className='text-cta' onClick={()=>{gotoRequestpage()}}>ViewAll</Text></View>
      {request.pendingCount===0 && (
        <>
        <View className='flex items-center justify-center'>
          <Text>No Requests</Text></View></>
      )}
    {request?.pendingRequests.map((item) => (
                            <View key={item.id} className=" text-sm notification-item text-gray-800 flex flex-col hover:bg-gray-50 justify-between cursor-pointer">
                              <View className='flex flex-col px-4 h-20 border:gray-300 py-4  border-b text-sm '>
                              <View className='flex justify-between items-center justify-center'>
                                <View className='flex gap-2 items-center'>
                              <img className='rounded-full w-8 h-8' alt='alt' src='profile.jpg' />
                              <View className='flex flex-col '><View className='hover:text-cta'>{item.senderName}</View> <View className='text-gray-400 text-[12px]'>{}</View></View>
                              </View>
                              <View className='flex items-end flex-col '>
                             <View className='flex gap-5'>
                              <TouchableOpacity onClick={()=>{acceptRequest(item.senderId)}} className=" text-sm">
                              <Icon className='hover:text-cta text-gray-500' icon="mdi:people-tick" width="1.4em" height="1.4em" /></TouchableOpacity>                
                               <TouchableOpacity onClick={()=>{cancelRequest(item.senderId)}} className='text-sm hover:text-red'><Icon icon="material-symbols-light:delete" width="1.2em" height="1.2em" /></TouchableOpacity>
                              </View>
                              <View className=' text-gray-400 text-time'>{item.time}</View>
                              </View>
                              </View>
                              </View>
                            </View>
                          ))}
                        </ul>
                        <View className='flex  justify-center items-center'>
                        {request.pendingCount >=5 && (
      <TouchableOpacity className="flex w-full items-center justify-center text-cta hover:bg-gray-100 text-sm py-1.5 px-4">
         <Text onClick={() => setShowAllRequests(true)} >Show more</Text>
      </TouchableOpacity>
    )}
                        </View>
                      </View>
                    )}
    {activeSection === header.id && header.title === 'Notifications' && (
                      <View ref={dropdownRef} className="absolute top-full overflow-y-auto overflow-x-hidden top-full -right-20 h-[470px] w-[360px] bg-white rounded-md slide-in-down drop shadow-lg z-10 overflow-hidden">
                        <ul className="">
                        <View className='flex absolute sticky top-0 bg-white justify-between text-sm py-2 px-4'><Text>Notifications</Text> <View className='flex items-center justify-center text-cta hover:bg-gray-100 text-sm px-4' onClick={()=>{openNotifications();handleViewAll('NOTIFICATIONS');closeDropdown()}}><Text>Show All</Text></View></View>
    {notification?.count===0 && <View className='flex items-center justify-center'><Text>No Notifications</Text></View>}
    {notification?.notifications.map((item) =>{ 
      
      return(
                            <View key={item.id} className=" text-sm text-gray-800 flex flex-col  hover:bg-gray-50 justify-between cursor-pointer">
                              <View className='flex flex-col px-4 justify-center border:gray-300 h-20 py-2 border-b text-sm '>
                              <View className='flex justify-between items-center'>
                                <View className='flex gap-2 items-center'>
                                  <View>
                              <img className='rounded-full w-8 h-8' alt='alt' src={`http://localhost:8080${item.profileImagePath}`} />
                              </View>
                              <View className='flex flex-col'>
                                <View className='hover:text-cta'>{item.name}</View> 
                                <View className='text-gray-600 font-semibold text-md'>{item.message}</View>
                                {item.message.includes('birthday')&&(<Text className='text-xs text-cta'> Wish him a Happy birthday!</Text>)}
                                </View>
                              </View>
                              <View className='flex flex-col gap-1 items-end'>
                            <View className=' text-gray-400 text-xs'>{item.time}</View>
                            {/* <View><img alt='' className='w-12 h-11' src={item.target} /></View> */}
                              </View>
                              </View>
                              </View>
                            </View>
                          )})}
                        </ul>
                        {notification.length>=5&& <View className='flex items-center justify-center  text-cta hover:bg-gray-100 text-sm py-1.5 px-4' onClick={()=>{ setShowAllNotification(true)}}><Text>Show more</Text></View>}
                      </View>
                    )}
                    {activeSection === header.id && header.title==='Messages' && (
                      <View ref={dropdownRef} className="absolute w-inherit left-0 text-sm top-full bg-white  h-96 rounded-md slide-in-down  shadow-lg z-10 overflow-hidden">
                        <View className='flex sticky items-center  justify-between  py-2 px-4'><Text>Messages</Text><Text className='text-read text-xs hover:underline'>Mark All As Read</Text><View onClick={()=>{openMessages();closeDropdown()}} className='flex items-center justify-center text-cta hover:bg-gray-100 text-sm px-4'><Text>View All</Text></View></View>
                        {users.length<=0 && <><View className='flex items-center justify-center'><Text>No Messages</Text></View></>}
    {users.map((item) => (
                            <View key={item.id} className=" text-sm text-gray-800 flex flex-col hover:bg-gray-50 justify-between cursor-pointer">
                              <View className='flex flex-col px-4 justify-center w-full  border:gray-300 py-3 border-b text-sm '>
                              <View className='flex justify-between items-center'>
                                <View className='flex gap-2 w-full items-center'>
                                  <View>
                              <img className='rounded-full w-9 h-9' alt='alt' src={item.profileImagePath} />
                              </View>
                              <View className='flex w-full flex-col'>
                                <View className='hover:text-cta  w-max'>{item.name}</View> 
                                <View className='flex w-full items-center justify-between'>
                                <View className='text-gray-400 truncate-text text-[12px]'>{item.message}</View>
                                <View className=' text-gray-400 text-xs'>{item.time}</View>
                                </View>
                                </View>
                              </View>
                              </View>
                              </View>
                            </View>
                          ))}
    {/* {showMessages.length>=5 &&<Text onClick={()=>{ setShowAllMessages(true)}} className='flex items-center justify-center text-cta hover:bg-gray-100 text-sm py-1.5 px-4'>Show more</Text>} */}
                      </View>
                    )}
                  </View>
                </li>
              ))}
            </ul>
            </View>
            <View className='flex items-center gap-4 '>
            <View onClick={() => handleIconClick('dashboard')}
                    className={`cursor-pointer hover:bg-transparent px-3 py-3 rounded-full transition-colors duration-500 ease-in-out ${
                      activeSection === 'dashboard' ? 'bg-black-300' : ''
                    }`}>
          <Icon onClick={toggle} className='outline-none' data-tooltip-id="my-tooltip" data-tooltip-content="" icon="radix-icons:dashboard" width="1.5rem" height="2rem"  style={{color: 'white'}} />
          </View>
            {/* <View onClick={()=>handleIconClick('settings')} data-tooltip-id="my-tooltip" data-tooltip-content="Settings" className='p-3 rounded-full cursor-pointer duration-500 ease-in-out hover:bg-transparent'>
            <Icon  icon="carbon:settings" width="1.4em" height="1.4em"  style={{color: 'white'}} />
            
            </View> */}
           <View className='flex items-center gap-4'>
            <img src={`http://localhost:8080${user?.profileImagePath}`} data-tooltip-id="my-tooltip" data-tooltip-content="Profile" alt='' className='cursor-pointer rounded-full h-9 w-9 bg-gray-300'/>
          {/* <Text data-tip="Profile" className='text-white w-28 truncate font-semibold'>{user.name}</Text>  */}
          </View>
          </View>

     {isSidebarOpen && (
      <View ref={sidebarRef} className={`absolute ${isDarkMode ? 'gray-bg' : 'white-bg'} flex flex-wrap w-72 h-96 p-4 shadow-lg top-28 right-0 justify-between gap-2`}>
        <View className='flex flex-wrap h-max gap-6'>
    {widgets.map((widget)=>(
      <View className='flex flex-col items-center'>
     <View onClick={widget.onClick}>{widget.icon} </View> 
     <View className='text-xs' onClick={widget.onClick}>{widget.title} </View> 
      </View>
    ))}
      
      </View>
    </View>
    
    
    )
    
    }
            <Tooltip id="my-tooltip" />
            {headers.map((header) => (
            <Tooltip key={`tooltip-${header.id}`} id={`tooltip-${header.id}`}>
              {header.title}
            </Tooltip>
          ))}
        </nav>
        </View>
      );
}

export default Navbar;