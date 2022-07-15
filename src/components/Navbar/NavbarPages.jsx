import styled from "styled-components";
// import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { logOut } from "../../store/user/slice";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";
import Popover from "@mui/material/Popover";
import WindPowerIcon from "@mui/icons-material/WindPower";
import Button from "@mui/material/Button";

export const NavigationPages = () => {
  //const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Nav>
      <Menu>
        {token ? (
          <MenuLink>
            <>
              <PersonIcon
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              />

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Button sx={{ p: 2 }} onClick={() => dispatch(logOut())}>
                  Logout
                </Button>
              </Popover>
            </>
          </MenuLink>
        ) : (
          <MenuLink href="/login">
            <AiOutlineUser />
          </MenuLink>
        )}
      </Menu>
      {token && (
        <MenuLink href="/performance">
          <WindPowerIcon />
        </MenuLink>
      )}
      <Logo href="/">
        Wind Farm<span>Discovery</span>
      </Logo>
    </Nav>
  );
};

const MenuLink = styled.a`
  padding: 1rem 1rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #ececec;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;

  &:hover {
    color: #9cc094;
  }
`;

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-arround;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: #dcdcdc;
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #ececec;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 780px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ open }) => (open ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;
