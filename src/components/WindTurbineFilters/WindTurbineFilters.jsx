import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectWindTurbines,
  selectFilters,
} from "../../store/windfarms/selector";
import { setRatedPower, setSupplier } from "../../store/windfarms/slice";
import "./WindTurbineFilter.css";

const WindTurbineFilters = (props) => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(0);
  const [height, setheight] = useState(0);
  const { supplier, ratedPower } = useSelector(selectFilters);

  console.log({ supplier, ratedPower });

  const handleChange = (event) => {
    dispatch(setSupplier(event.target.value));
  };
  const filtersHandler = (event) => {
    dispatch(setRatedPower(Number(event.target.value)));
    console.log(ratedPower);
  };
  return (
    <Filters>
      <label>Supplier</label>
      <select value={supplier} onChange={(event) => handleChange(event)}>
        <option value="">All Suppliers</option>
        <option value="GE Wind">GE</option>
        <option value="Vestas">Vestas</option>
        <option value="Gamesa">Gamesa</option>
      </select>
      <label>Rated Power</label>
      <Slider>
        <input
          type="range"
          min="0"
          max="6"
          step="0.1"
          value={ratedPower}
          id="ratedPower"
          onChange={filtersHandler}
        />
        {ratedPower}
      </Slider>
      {/* <div>{windfarm}</div> */}
    </Filters>
  );
};
export default WindTurbineFilters;

const Filters = styled.div`
  background: rgba(169, 169, 169, 0.5);
  width: 160px;
  color: white;
  padding: 0 2rem;
  z-index: 2;
  bottom: 10%;
  align-items: start;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 11%;
  right: 0;
`;
const Slider = styled.div`
  padding: 2 0rem;
`;
