import styled from "styled-components";
import { logInUser, signUpUser } from "../reducers/userSlice";
import { useAppDispatch } from "../app/store";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  input {
    margin: 5px;
  }
`;

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function getFormData() {
    return {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };
  }

  const signUp = () => dispatch(signUpUser(getFormData()));
  const logIn = () => {
    dispatch(logInUser(getFormData())).then(() => {
      navigate("/app");
    });
  };

  return (
    <>
      Login page:
      <StyledForm>
        <label htmlFor="email">email:</label>
        <input ref={emailRef} type="email" name="email" required />

        <label htmlFor="password">password:</label>
        <input ref={passwordRef} type="password" name="password" required />

        <input type="button" value="Login" onClick={logIn} />
        <input type="button" value="Signup" onClick={signUp} />
      </StyledForm>
    </>
  );
}

export default Login;
