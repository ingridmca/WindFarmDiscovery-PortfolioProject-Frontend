import styled from "styled-components";
import { Button, Input, Title } from "../../styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/user/thunks";
import { selectToken } from "../../store/user/selectors";
import { NavigationPages } from "../../components/Navbar/NavbarPages";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      navigate("/login");
    }
  }, [token, navigate]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    if (token) {
      navigate(`/`);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <NavigationPages />
      <Container>
        <Title>Login</Title>
        <form onSubmit={submitForm}>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button type="submit">Login</Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;

const Container = styled.div`
  display: "flex";
  flex-direction: "column";
  margin: 15%;
`;
