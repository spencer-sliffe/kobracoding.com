import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Box, Paper, Typography, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AuthenticationViewModel from "./viewModels/AuthenticationViewModel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    width: "100%",
    height: "auto",
    maxHeight: "25%",
    marginTop: "13%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  textField: {
    margin: theme.spacing(1),
    width: "75%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  button: {
    margin: theme.spacing(1),
    width: "50%",
    backgroundColor: theme.palette.common.white,
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

function AuthenticationView() {
  const classes = useStyles();
  const history = useHistory();
  const authViewModel = new AuthenticationViewModel();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selection, setSelection] = useState(0);

  useEffect(() => {
    authViewModel.startListening();

    return () => {
      authViewModel.stopListening();
    };
  }, []);

  useEffect(() => {
    if (authViewModel.isAuthenticated) {
      history.push("/home");
    }
  }, [authViewModel.isAuthenticated, history]);

  const handleAction = () => {
    if (selection === 0) {
      authViewModel.signIn(email, password);
    } else {
      authViewModel.signUp(email, password, confirmPassword);
    }
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <img className={classes.logo} src="kobracoding-logo.png" alt="KobraCoding Logo" />
      <Paper elevation={3} square>
        <Box display="flex" flexDirection="row">
          <Button onClick={() => setSelection(0)} variant={selection === 0 ? "contained" : "outlined"}>
            Sign In
          </Button>
          <Button onClick={() => setSelection(1)} variant={selection === 1 ? "contained" : "outlined"}>
            Sign Up
          </Button>
        </Box>
      </Paper>
      <form className={classes.form}>
        <TextField className={classes.textField} label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField className={classes.textField} label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {selection === 1 && (
          <TextField className={classes.textField} label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        )}
        {authViewModel.isError && <Typography className={classes.errorText}>{authViewModel.errorMessage}</Typography>}
        <Button className={classes.button} onClick={handleAction} disabled={authViewModel.isLoading}>
          {selection === 0 ? "Sign In" : "Sign Up"}
        </Button>
        {authViewModel.isLoading && <LinearProgress />}
      </form>
    </Container>
  );
}

export default AuthenticationView;


