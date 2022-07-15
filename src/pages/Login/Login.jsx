import styled from "styled-components";
import { Button, Input, Title, LinkWord } from "../../styled";
import { Link } from "react-router-dom";
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
        <SubText>
          Don't have an account yet? Click{" "}
          <Link to="/signup" style={LinkWord}>
            here
          </Link>{" "}
          to sign up
        </SubText>
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

const SubText = styled.p`
  text-align: center;
  color: #1e3163;
  padding: 20px 0px 5px 0px;
`;
