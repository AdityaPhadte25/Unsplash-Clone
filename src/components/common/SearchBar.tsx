import {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import * as React from 'react';

export default function SearchBar(props:{query: any}) {

  const [input, setInput] = useState("");
  const handleSubmit = (e:{
    preventDefault: any;target:{value: string}}) => {
    e.preventDefault();
    setInput(e.target.value)
    props.query(input)
  };

  return (
      <>
            <Box p={1} color={'white'} width={'100%'}  display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                <form className="search" onSubmit={(e: any) => handleSubmit(e)}>
                  <input
                      type="text"
                      className="searchTerm"
                      placeholder="Search high-resolution photos"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                  />
                  <button type="submit" className="searchButton">
                    <SearchIcon />
                  </button>
                </form>
              </Box>
      </>
  );
}