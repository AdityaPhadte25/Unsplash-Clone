import { Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import axios from 'axios';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Header from "./Header"

interface data {
    map(arg0: (item: any) => JSX.Element): React.ReactNode;
    urls: {
        title:string;
        full: string;
        alt_description: string;
    }
}

export default function SearchedPhotos(){

    return (
        <>
        <div>
            <Header onSearchSubmit={null} searchTerm={null} setSearchTerm={null}/>
        </div>
        <section className="hero2">
            <h3>{""}</h3>
            <div id="gallery">
            <Container maxWidth={false} sx={{ paddingTop: '2rem' }}>
            <ImageList variant='standard' cols={3} gap={15} sx={{ marginY: 0 }}>
            { !isEmpty([]) && [].map((item:any) => (
                <ImageListItem key={item.id}>
                <img
                    src={`${item.urls.full}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.urls.full}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.urls.title}
                    loading="lazy"
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