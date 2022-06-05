import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Modal from "@mui/material/Modal";
import { useState } from "react";
import axios from "axios";

import { Input } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "50%",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Login({ uu1, uu2, setUser, user }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = (e) => {
    e.preventDefault();

    var data = `password=${password}&Platform=g&Version=2.0.0&grant_type=password&Build=51&Api-Secret=68f779c5-4d39-411a-bd12-cbcc50dc83dd&Client-Secret=${uu1}&ClientUniqueId=${uu2}&username=${username}`;

    var config = {
      method: "post",
      url: "https://api.eksisozluk.com/Token",
      headers: {
        Host: "api.eksisozluk.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate",
        "User-Agent": "okhttp/3.12.1",
        Connection: "close",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const theme = createTheme();

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style} className="justify-center content-center"> */}
        {/*   <form className="flex justify-center items-center h-full flex-col space-y-2"> */}
        {/*     <label className="font-bold text-lg">Email-adress:</label> */}
        {/*     <Input */}
        {/*       onChange={(e) => setUsername(e.target.value)} */}
        {/*       className="m-2" */}
        {/*     /> */}
        {/*     <label className="font-bold text-lg">Password:</label> */}
        {/*     <Input */}
        {/*       type="password" */}
        {/*       onChange={(e) => setPassword(e.target.value)} */}
        {/*     /> */}
        {/*     <Button onClick={handleLogin}>Login</Button> */}
        {/*   </form> */}
        {/* </Box> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            className="bg-white p-4 w-full rounded-2xl"
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="bg-white"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}
