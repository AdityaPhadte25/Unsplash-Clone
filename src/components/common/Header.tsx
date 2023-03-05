import { FormControl, InputAdornment, Tab, Tabs, TextField } from '@mui/material'
import axios from 'axios'
import { isEmpty } from 'lodash'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface data{
  map(arg0: (item: any) => void): React.ReactNode
  title: string
  slug: string
}

const Header = (props:{onSearchSubmit:Function,searchTerm:string,setSearchTerm: any}) => {

  const navigate = useNavigate()

  const [value, setValue] = React.useState(0);
  const [topics,setTopics] = React.useState<data>()
  const [showClearIcon,setShowClearIcon] = React.useState(false)

  React.useEffect(() => {
    axios.get('https://api.unsplash.com/topics?',{
        params:{client_id: 'TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80'}
    })
    .then((response) =>{
       setTopics(response.data)
    })
},[])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const handleTopic = (title:string) => {
      navigate(`/t/${title}`)
  }

  const handleClick = () => {
    props.setSearchTerm("")
    setShowClearIcon(false)
  }

  return ( <header>
    <nav className="navbar">
      <div className="left">
        <div className="logo">
          <a href="index.html">
            <h1>Unsplash</h1>
          </a>
        </div>
        <div className="nav-search-form">
        <FormControl>
        <TextField
          size="medium"
          variant="outlined"
          value={props.searchTerm}
          placeholder='Search high-resolution photos'
          onChange={(e) => {
            props.setSearchTerm(e.target.value)
            props.onSearchSubmit(e.target.value)
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
                {showClearIcon == true ? <ClearIcon /> : null}
              </InputAdornment>
            )
          }}
        />
      </FormControl>
        </div>
      </div>
      <ul className="nav">
        <li><Link to="/Collections">Collections</Link></li>
        <li><Link to="/Login">Login</Link></li>
      </ul>
    </nav>

    <div className="category-nav">
      <div className="category">
      <a href="/">Editorial</a>
      </div>
      {!isEmpty(topics) &&
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {topics.map((item) => {
         return <Tab label={item.title} onClick={() => handleTopic(item.slug)} />
         })
        }
      </Tabs>
     }
    </div>
  </header>
)
}

export default Header