import * as React from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./components/pages/Login"
import Homepage from "./components/Homepage"
import UserInfo from "./components/UserInfo"
import { isEmpty } from "lodash"
import axios from "axios"
import UserPhotos from "./components/user/userPhotos"
import UserLikedPhotos from "./components/user/userLikedPhotos"
import UserCollection from "./components/user/userCollection"
import Collections from "./components/Collections"
import Topics from "./components/Topics"
import SearchedPhotos from "./components/common/SearchedPhotos"

interface Data {
  map(arg0: (item: any) => JSX.Element): React.ReactNode;
  urls: any;
  alt_description: string;
  data: any;
  results: Array<Data>;
}

function App() {
    return (
    <div>
      <BrowserRouter basename={"/Unsplash-Clone"}>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/UserInfo/:slug" element={<UserInfo onSearchSubmit={undefined}/>}/>
        <Route path="/Photos" element={<UserPhotos/>}/>
        <Route path="/LikedPhotos" element={<UserLikedPhotos/>}/>
        <Route path="/UserCollection" element={<UserCollection/>}/>
        <Route path="/Collections" element={<Collections/>}/>
        <Route path="/t/:slug" element={<Topics/>}/>
        <Route path="/search" element={<SearchedPhotos/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    )
}

export default App