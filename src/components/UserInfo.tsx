import { Avatar, Grid } from '@mui/material';
import axios from 'axios';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Header from './common/Header';
import UserInfoTabs from './common/userInfoTabs';

interface userInfo{
    bio: string
    name: string
    profile_image:{
        large: string
    }
    photos:[{
        id: string
    }]
}

export default function UserInfo(props:{onSearchSubmit: Function}) {

    const userName = useParams()

    const [userData,setUserData] = React.useState<userInfo>()
    const [userSlug,setUserSlug] = React.useState(userName.slug)

    React.useEffect(() => {
        console.log(userSlug)
    },[userSlug])
    
    React.useEffect(() => {
            axios.get('https://api.unsplash.com//users/' + userSlug,{
                params:{client_id: 'TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80'}
            })
            .then((response) =>{
                return setUserData(response.data)
            })
    },[])

    return (
        <>
        <div>
            <Header onSearchSubmit={props.onSearchSubmit} searchTerm={null} setSearchTerm={null}/>
        </div>
        <section className="hero1">
        <div className="hero-container1">
            <div className="hero-content1">
            {userData && <Grid container spacing={2} columns={24}>
                <Grid columnGap={24}>
                <Avatar src={userData.profile_image.large} sizes="large" sx={{ width: 200, height: 200 }}/>
                </Grid>
                <Grid xs={18}>
                    <h2 style={{marginRight: 500}}>{userData.name}</h2>
                    <p>{userData.bio}</p>
                </Grid>
            </Grid>
            }
            </div>
        </div>
        </section>
        <div>
            {userData && 
                <UserInfoTabs {...userData}/>
            }
        </div>
        </>
    )
}