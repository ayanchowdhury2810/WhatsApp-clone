import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';         // To make icon clickable, import IconButton
import {SearchOutlined} from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

    // to show chatrooms directly from realtime database(firebase)
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>
            setRooms(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data(),
                }))
            )
        );
        return () =>{
            unsubscribe();
        }
    },[]);

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_headerRight'>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <input placeholder='Search or start new chat' type='text'/>
                </div>
            </div>

            <div className='sidebar_chats'>
                    <SidebarChat addNewChat/>
                    {rooms.map(room=>(
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    ))}
            </div>
        </div>
    )
}

export default Sidebar
