import React, { useRef, useEffect, useState } from 'react';
import { Avatar, ChatEngine } from 'react-chat-engine';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setloadinng] = useState(true);
    console.log(user);


    const handleLogout = async () => {
        await auth.signOut();
        history.push("");
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpg ' });

    }

    useEffect(() => {
        if (!user) {
            history.push('/');
            return
        }

        axios.get(
            'https://api.chatengine.io/users/me/',
            {
                headers: {
                    "project-id": process.env.REACT_APP_CHAT_ID,
                    "user-name": user.email,
                    "user-secret": user.uid
                }


            }).then(() => {


                setloadinng(false);

            }).catch(e => {
                {
                    let formdata = new FormData();
                    formdata.append('email', user.email);
                    formdata.append('username', user.email);
                    formdata.append('secret', user.uid);
                    getFile(user.photoURL)

                        .then((avatar) => {
                            formdata.append('avatar', avatar, avatar.name);
                            axios.post("https://api.chatengine.io/users/", formdata,
                                {
                                    headers: {
                                        "private-key":process.env.REACT_APP_CHAT_KEY
                                    }
                                }
                            ).then(() => setloadinng(false))
                                .catch((error) => console.log(error))

                        })

                }
            });


    }, [user, history])

    //if(!user || loading ) {return "loading...."}



    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    chitchat
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    logout

                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="2efb0b51-67d8-4dcb-8b94-8086baeb765f"
                userName={user.email}
                userSecret={user.uid}

            />
        </div>
    );
}

export default Chats;