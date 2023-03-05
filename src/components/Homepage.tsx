import { Button, Container, FormControl, ImageList, ImageListItem, InputAdornment, TextField } from '@mui/material';
import axios,{AxiosResponse} from 'axios'
import * as React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {isEmpty, map} from "lodash"
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageViewer from './ImageViewer';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './common/SearchBar';
import Header from './common/Header';

function srcset(image: string, size: number, rows = 1, cols = 3) {
  return {
    src: `${image}?w=248&fit=crop&auto=format`,
    srcSet: `${image}&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface Data {
  map(arg0: (item: any) => JSX.Element): React.ReactNode;
  urls: any;
  alt_description: string;
  data: any;
  results: Array<Data>;
}

let page = 0;

const Homepage = () => {

  const navigate = useNavigate()

  const [resp,setResp] = React.useState<Data>(null);
  const [showClearIcon,setShowClearIcon] = React.useState(false);
  const [imageListLength,setImageListLength] = React.useState<number>(null)
  const [open, setOpen] = React.useState<boolean| any>(false);
  const [imageId,setImageId] = React.useState<string>("")
  const [searchTerm,setSearchTerm ] = React.useState("")

  React.useEffect(() => {
   getImageList();
  },[])

  const getImageList = () => {
    page++
    axios.get('https://api.unsplash.com/photos', {
      params: {page: page,per_page: 30, client_id: 'TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80'}
    }).then((response) =>{
      setResp(response.data)
      setImageListLength(response.data.length)
    })
  }

  const onSearchSubmit = async (searchTerm:string) => {
    if(!isEmpty(searchTerm)){
      await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: searchTerm,client_id: 'TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80'}
    }).then((response) =>{
      setResp(response.data.results)
    })
  }
  }

  const handleClick = () => {
    setSearchTerm("")
    setShowClearIcon(false)
  }

  const viewImage = (id: string) => {
    setImageId(id)
    setOpen(true)
  }

  return (
    <>
    <div>
      <Header onSearchSubmit={onSearchSubmit} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
  <section className="hero">
    <div className="hero-container">
      <div className="hero-content">
        <h1>Unsplash</h1>
        <p>
          The internet’s source of freely useable images.<br/>
          Powered by creators everywhere.
        </p>
        <div className="hero-search-form">
        <FormControl>
          <TextField
          size="small"
          variant="outlined"
          placeholder='Search high-resolution photos'
          onChange={(e) => {
            setSearchTerm(e.target.value)
            onSearchSubmit(e.target.value)
            setShowClearIcon(true)
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment 
              position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={handleClick}
              >
                <ClearIcon />
              </InputAdornment>
            )
          }}
        />
       </FormControl>
        </div>
        <div className="trending-search-tags">
          <p>Trending searches: <a href="#">flower</a>, <a href="#">wallpaper</a>, <a href="#">sad</a>, <a href="#">love</a></p>
        </div>
      </div>
    </div>
    <div className="hero-overlay"></div>
  </section>

  <section className="images">
    <div id="gallery">
    <InfiniteScroll
        dataLength={imageListLength}
        next={getImageList}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
    >
      <Container maxWidth={false} sx={{ paddingTop: '2rem' }}>
      <ImageList variant='masonry' cols={3} gap={15} sx={{ marginY: 0 }}>
      {!isEmpty(resp) && resp.map((item) => (
        <ImageListItem key={item.id} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(item.urls.full, 121, item.rows, item.cols)}
              alt={item.alt_description}
              loading="lazy"
              onClick={() => viewImage(item.id)}
            />
        </ImageListItem>
      ))}
      </ImageList>
      </Container>
    </InfiniteScroll>
    </div>
  </section>
  <ImageViewer open={open} setOpen={setOpen} imageId={imageId} />
  </>
  )
}

export default Homepage;
