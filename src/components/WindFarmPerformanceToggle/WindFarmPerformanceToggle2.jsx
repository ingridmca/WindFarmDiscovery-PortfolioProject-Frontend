import * as React from "react";
import List from "@mui/material/List";

import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectTurbinesPerformanceTurbines } from "../../store/windfarms/selector";
import { windFarmsFilteredforPerformancePage } from "../../store/windfarms/slice";

const WindFarmPerformanceToggle = (props) => {
  const [showTurbines, setShowTurbines] = useState(false);
  const [checkBox, setCheckBox] = useState(true);
  const dispatch = useDispatch();
  const p_name = props.windfarm;

  const turbines = useSelector(selectTurbinesPerformanceTurbines(p_name));

  const handleToggleOpen = () => {
    setShowTurbines(!showTurbines);
  };

  useEffect(() => {
    dispatch(windFarmsFilteredforPerformancePage({ [p_name]: checkBox }));
  }, [dispatch, checkBox, p_name]);

  const handleToggle = () => {
    setCheckBox(!checkBox);
  };

  return (
    <div>
      <List
        sx={{
          width: "100%",
          maxWidth: 200,
          bgcolor: "#ececec",
          display: "flex",
          flexDirection: "row",
          marginLeft: 2,
        }}
      >
        <Checkbox
          edge="start"
          defaultChecked
          value={checkBox}
          color="default"
          onClick={() => handleToggle()}
        />
        <ListItemButton onClick={handleToggleOpen}>
          <ListItemText
            sx={{
              fontWeight: 300,
              color: "#083241",
            }}
            primary={p_name}
          />
          {showTurbines ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </List>
      <div>
        {showTurbines &&
          turbines.map((t) => (
            <WindTurbinesList key={t}>Wind Turbine: {t}</WindTurbinesList>
          ))}
      </div>
    </div>
  );
};
export default WindFarmPerformanceToggle;

const WindTurbinesList = styled.div`
  font-size: 10px;
  margin-top: 10px;
  margin-left: 20px;
`;
