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
  const [checkBox, setCheckBox] = useState(true);
  const dispatch = useDispatch();
  const p_name = props.windfarm;

  const turbines = useSelector(selectTurbinesPerformanceTurbines(p_name));

  const handleToggle = () => {
    setShowTurbines(!showTurbines);
  };

  useEffect(() => {
    dispatch(windFarmsFilteredforPerformancePage({ [p_name]: checkBox }));
  }, [dispatch, checkBox, p_name]);

  const handleFilter = () => {
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
