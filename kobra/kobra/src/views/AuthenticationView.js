import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Box, Paper, Typography, LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuthenticationViewModel } from "../viewModels/useAuthenticationViewModel";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.primary.main,
}));

const StyledLogo = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  maxHeight: "25%",
  marginTop: "13%",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: "75%",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  width: "50%",
  backgroundColor: theme.palette.common.white,
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));

function AuthenticationView() {
  const authViewModel = useAuthenticationViewModel();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selection, setSelection] = useState(0);

  useEffect(() => {
    if (authViewModel.isAuthenticated) {
      navigate("/home");
    }
  }, [authViewModel.isAuthenticated, navigate]);

  const handleAction = () => {
    if (selection === 0) {
      authViewModel.signIn(email, password);
    } else {
      authViewModel.signUp(email, password, confirmPassword);
    }
  };
  return (
    <StyledContainer maxWidth="sm">
      <StyledLogo src="kobracoding-logo.png" alt="KobraCoding Logo" />
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
      <form>
        <StyledTextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <StyledTextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {selection === 1 && (
          <StyledTextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        )}
        {authViewModel.isError && <ErrorText>{authViewModel.errorMessage}</ErrorText>}
        <StyledButton onClick={handleAction} disabled={authViewModel.isLoading}>
          {selection === 0 ? "Sign In" : "Sign Up"}
        </StyledButton>
        {authViewModel.isLoading && <LinearProgress />}
      </form>
    </StyledContainer>
  );

}

export default AuthenticationView;
