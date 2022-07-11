import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectFilters } from "../../store/windfarms/selector";
import {
  setHeight,
  setOperationalYear,
  setRatedPower,
  setSupplier,
} from "../../store/windfarms/slice";
import WindFarmsList from "../WindFarmsList/WindFarmsList";
import "./WindTurbineFilter.css";

const WindTurbineFilters = (props) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(false);

  const { supplier, ratedPower, year, height } = useSelector(selectFilters);

  const handleChange = (event) => {
    dispatch(setSupplier(event.target.value));
  };
  const filterRatedPowerHandler = (event) => {
    dispatch(setRatedPower(Number(event.target.value)));
    // console.log(ratedPower);
  };
  const filterYearHandler = (event) => {
    dispatch(setOperationalYear(Number(event.target.value)));
    //  console.log(year);
  };
  const filterHeightHandler = (event) => {
    dispatch(setHeight(Number(event.target.value)));
    //  console.log(year);
  };

  return (
    <>
      <FilterButton onClick={() => setFilters(!filters)}>
        <span className=".mobile-ovr-select">Filter</span>
      </FilterButton>
      {filters && (
        <FiltersandFilteredWF>
          <Filters>
            <div>
              <label>Supplier</label>
            </div>
            <div>
              <select
                className="selector"
                value={supplier}
                onChange={(event) => handleChange(event)}
              >
                <option value="">All Suppliers</option>
                <option value="GE Wind">GE</option>
                <option value="Vestas">Vestas</option>
                <option value="Gamesa">Gamesa</option>
              </select>
            </div>

            <div>
              <label>Rated Power</label>
              <Slider>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.1"
                  value={ratedPower}
                  id="ratedPower"
                  onChange={filterRatedPowerHandler}
                />
                {ratedPower}
              </Slider>
            </div>
            <div>
              <label>Operational Year</label>
              <Slider>
                <input
                  type="range"
                  min="1990"
                  max="2021"
                  step="1"
                  value={year}
                  id="operacionalYear"
                  onChange={filterYearHandler}
                />
                {year}
              </Slider>
            </div>
            <div>
              <label>Wind Turbines Height</label>
              <Slider>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="1"
                  value={height}
                  id="ratedPower"
                  onChange={filterHeightHandler}
                />
                {height}
              </Slider>
            </div>
          </Filters>
          <Results>
            Wind Farms:
            <WindFarmsList />
          </Results>
        </FiltersandFilteredWF>
      )}
    </>
  );
};
export default WindTurbineFilters;

const FilterButton = styled.div`
  background: rgba(169, 169, 169, 0.5);
  color: white;
  z-index: 2;
  -ms-flex-align: start;
  -ms-flex-pack: center;
  display: -ms-flexbox;
  -ms-flex-direction: column;
  flex-direction: column;
  top: 11%;
  position: absolute;
  right: 10px;
  height: 30px;
  border-radius: 34px;
  background-color: rgba(68, 65, 65, 0.84);
  padding: 6.5px 40px 0 15px;
  line-height: 1;
  text-align: right;
  letter-spacing: 0.05em;
  font-size: 20px;
  max-width: 60%;
  white-space: nowrap;
  display: inline-block;
  transform: scale(0.6, 0.6);
  transform-origin: right;
  margin-top: 5px;
  cursor: pointer;
`;

const FiltersandFilteredWF = styled.div`
  background: rgba(68, 65, 65, 0.84);
  border-radius: 34px;
  width: 180px;
  color: white;
  padding: 0 2rem;
  z-index: 2;
  bottom: 10%;
  align-items: start;
  justify-content: start;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 17%;
  right: 0;
`;
const Slider = styled.div`
  padding: 2 0rem;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
  height: 40%;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top:50%
  height: 50%;
  margin-top:20px;
`;
