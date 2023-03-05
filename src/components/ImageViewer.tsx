import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { isEmpty } from 'lodash';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import { Avatar, Grid } from '@mui/material';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import * as moment from 'moment';
import {saveAs} from "file-saver";
import UserInfo from './UserInfo';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface imageData {
    alt_description: string
    downloads: number
    views: number
    created_at: string
    urls: {
        full: string
    }
    user:{
        name: string
        username: string
        profile_image:{
            small: string
        }
    }
    location:{
        city: string
        country: string
        name: string
    }
}

export default function ImageViewer(props:{open: boolean,setOpen: any,imageId: string}) {

    const navigate = useNavigate()

    const [imageDisplay,setImageDisplay] = React.useState<imageData>()

    React.useEffect(() => {
        if(!isEmpty(props.imageId)){
        axios.get('https://api.unsplash.com/photos/'+ props.imageId,{
            params:{client_id: 'TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80'}
        })
        .then((response) =>{
            setImageDisplay(response.data)
        })
    }
    },[props.imageId])

    const handleClose = () => {
        props.setOpen(false)
        setImageDisplay(null)
    }

    const download = (url:string,name: string)=>{
      saveAs(url,name)
   }

   const userInfo = () => {
    return navigate(`/UserInfo/${imageDisplay.user.username}`)
   }

   const likeImage = () => {
    // return axios.get('https://api.unsplash.com/photos/'+ props.imageId,{
    //             params:{client_id: 'TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80'}
    //         })
    //         .then((response) =>{
    //             setImageDisplay(response.data)
    //         })
   }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            {
             !isEmpty(imageDisplay) ? 
                <>
                <Grid container spacing={2} columns={24}>
                <Grid columnGap={4}>
                <span onClick={userInfo}><Avatar src={imageDisplay.user.profile_image.small} sizes="small"/></span>
                </Grid>
                <Grid xs={18}>
                    <h5 style={{marginRight: 500}}>{imageDisplay.user.name}</h5>
                    <p>{imageDisplay.alt_description}</p>
                </Grid>
                <Grid xs={1}>
                    <span onClick={likeImage}><FavoriteBorderIcon/></span>
                </Grid>
                <Grid xs={1}>
                    <span onClick={() => download(imageDisplay.urls.full,imageDisplay.user.name)}><DownloadIcon/></span>
                </Grid>
                </Grid>
                <div>
                    {
                    <img src={imageDisplay.urls.full} style={{width: 600,height: 350, marginLeft: 180,top: 200}}/>
                    }
                </div>
                <div style={{marginTop: 50}}>
                <Grid container columnGap={8}>
                <Grid>
                    <h5>Views</h5>
                    {imageDisplay.views}
                </Grid>
                <Grid>
                    <h5>Downloads</h5>
                    {imageDisplay.downloads}
                </Grid>
                </Grid>
                </div>
                <div style={{marginTop: 50}}>
                <Grid container columnGap={4}>
                    <LocationOnTwoToneIcon fontSize='small' color='primary'/>{imageDisplay.location.name}
                </Grid>
                <Grid container columnGap={4}>
                    <CalendarTodayOutlinedIcon fontSize='small' color='primary'/>{moment(imageDisplay.created_at).format('LL')}
                </Grid>
                </div>
                </>
                :
                <></>
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
