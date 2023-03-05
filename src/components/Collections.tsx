import { Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import axios from 'axios';
import { isEmpty } from 'lodash';
import * as React from 'react';
import Header from './common/Header';

interface data {
    map(arg0: (item: any) => JSX.Element): React.ReactNode;
    img: string
    title: string
    author: string
    cover_photo:{
        urls:{
            full: string
        }
    }
    user:{
        name: string
    }
}

export default function Collections(){

    const [itemData,setItemData] = React.useState<data>()

    React.useEffect(() => {
        axios.get('https://api.unsplash.com/collections?',{
            params:{client_id: 'TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80'}
        })
        .then((response) =>{
            setItemData(response.data)
        })
    },[])

    return (
        <>
        <div>
            <Header onSearchSubmit={null} searchTerm={null} setSearchTerm={null}/>
        </div>
        <section className="hero2">
            <h3>Collections</h3>
            <div id="gallery">
            <Container maxWidth={false} sx={{ paddingTop: '2rem' }}>
            <ImageList variant='standard' cols={3} gap={15} sx={{ marginY: 0 }}>
            { !isEmpty(itemData) && itemData.map((item:any) => (
                <ImageListItem key={item.id}>
                <img
                    src={`${item.cover_photo.urls.full}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.cover_photo.urls.full}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={item.title}
                    subtitle={<span>by: {item.user.name}</span>}
                    position="below"
                />
                </ImageListItem>
            ))}
            </ImageList>
            </Container>
            </div>
        </section>
        </>
    )
}