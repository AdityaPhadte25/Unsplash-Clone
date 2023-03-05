import { Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import axios from 'axios';
import { isEmpty } from 'lodash'
import * as React from 'react'

function srcset(image: string, size: number, rows = 1, cols = 3) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

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

export default function UserCollection(props:any){

    const [userCollections,setUserCollections] = React.useState<data>()
    
    React.useEffect(() => {
        axios.get('https://api.unsplash.com//users/' + props.username + '/collections',{
            params:{client_id: 'TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80'}
        })
        .then((response) =>{
            setUserCollections(response.data)
        })
    },[])

    return (
    <>
         <Container maxWidth={false} sx={{ paddingTop: '2rem' }}>
            <ImageList variant='standard' cols={3} gap={15} sx={{ marginY: 0 }}>
            { !isEmpty(userCollections) && userCollections.map((item:any) => (
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
    </>
    )
}