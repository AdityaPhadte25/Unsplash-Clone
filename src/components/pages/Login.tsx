import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { useUserAuth } from "../redux/userContext";
import axios from "axios";

const theme = createTheme();

const auth = "GBliEO7ayx677aA2n4Qc6apSfTBeUYaxq5EpxMGYVC0"

const Login = () => {

const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const [isVisible, setIsVisible] = useState(false);
//   const { logIn } = useUserAuth()

  const navigate = useNavigate();

  const getUserDetails = (access_token: string) => {
    axios.get('https://unsplash.com/me',{
      params:{ Authorization: `Bearer ${access_token}`,
              scope: "read_user"
            }
    }
    )
    .then((response) =>{
      console.log(response)
    })
  }
 
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");
    //   const res = await logIn(email, password);
    //   if(remember){
    //     localStorage.setItem("accessToken", res.user.accessToken);
    //   }
    axios.post('https://unsplash.com/oauth/token?client_id=TuwibQCMYQ71s3ukgdcRjsuj60lA5AHivD572oWVP80&client_secret=cyXFdF6QTTjReOPccPOs8luMPTgWXh6S7MitieePTL0&redirect_uri=urn:ietf:wg:oauth:2.0:oob&code=5BgraqWGEDTZQkkTain4HYVvZV3jeL0UWNiLh0Dqv6E&grant_type=authorization_code'
    )
    .then((response) =>{
        getUserDetails(response.data.access_token)
        navigate("/");
    })
  };

  const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setRemember(event.target.checked);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={remember} onChange={handleChange} color="primary" />}
              label="Remember me"
            />
           
            <Button
              type="submit"
              onSubmit={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )
}

export default Login
