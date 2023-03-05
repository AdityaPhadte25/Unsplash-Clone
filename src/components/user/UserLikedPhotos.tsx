import { Container, ImageList, ImageListItem } from '@mui/material'
import axios from 'axios';
import { isEmpty } from 'lodash'
import * as React from 'react'

function srcset(image: string, size: number, rows = 1, cols = 3) {
    return {
      src: `${image}?w=248&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  interface data {
    map(arg0: (item: any) => JSX.Element): React.ReactNode;
    urls: any;
    alt_description: string;
  }

export default function UserLikedPhotos(props:any){

    const [userLikedPhotos,setUserLikedPhotos] = React.useState<data>()
    
    React.useEffect(() => {
        axios.get('https://api.unsplash.com//users/' + props.username + '/likes',{
            params:{client_id: 'TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80'}
        })
        .then((response) =>{
            setUserLikedPhotos(response.data)
        })
    },[])

    return (
    <>
        <Container maxWidth={false} sx={{ paddingTop: '2rem' }}>
            <ImageList variant='standard' cols={3} gap={15} sx={{ marginY: 0 }}>
            {!isEmpty(userLikedPhotos) && userLikedPhotos.map((item:any) => (
                <ImageListItem key={item.id} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                    {...srcset(item.urls.full, 121, item.rows, item.cols)}
                    alt={item.alt_description}
                    loading="lazy"
                    // onClick={() => viewImage(item.id)}
                    />
                </ImageListItem>
            ))}
            </ImageList>
        </Container>
    </>
    )
}