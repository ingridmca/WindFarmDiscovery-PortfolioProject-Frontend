import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectTurbinesPerformanceTurbines } from "../../store/windfarms/selector";
import { windFarmsFilteredforPerformancePage } from "../../store/windfarms/slice";

const WindFarmPerformanceToggle = (props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [showTurbines, setShowTurbines] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const dispatch = useDispatch();
  const p_name = props.windfarm;

  const performances = useSelector(selectTurbinesPerformanceTurbines(p_name));

  const handleToggle = () => {
    setShowTurbines(!showTurbines);
  };

  const handleFilter = () => {
    dispatch(windFarmsFilteredforPerformancePage({ [p_name]: checkBox }));
    setCheckBox(!checkBox);
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <Checkbox
        {...label}
        defaultChecked
        value={checkBox}
        onClick={() => handleFilter()}
      />
      {p_name}
      <Switch {...label} value={!showTurbines} onClick={() => handleToggle()} />
      <div>
        {showTurbines &&
          performances.map((t) => (
            <WindTurbinesList>Wind Turbine: {t}</WindTurbinesList>
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
