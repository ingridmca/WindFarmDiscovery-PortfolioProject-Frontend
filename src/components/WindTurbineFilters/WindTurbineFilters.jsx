import { FilterAltOutlined } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
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

const WindTurbineFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(true);

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
        <FilterAltOutlined /> Filter
      </FilterButton>
      {filters && (
        <FiltersandFilteredWF>
          <div>
            <Box fullWidt sx={{ mb: 2, mx: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="suppliers">Supplier</InputLabel>
                <Select
                  labelId="suppliers"
                  value={supplier}
                  label="Supplier"
                  onChange={handleChange}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="GE Wind">GE</MenuItem>
                  <MenuItem value="Vestas">Vestas</MenuItem>
                  <MenuItem value="Gamesa">Gamesa</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box fullWidt sx={{ mb: 2, mx: 1 }}>
              <Typography fontSize={12}>Rated Power</Typography>
              <Slider
                aria-label="Rated power"
                valueLabelDisplay="auto"
                step={0.5}
                marks={[
                  {
                    value: 0,
                    label: "0",
                  },
                  {
                    value: 6,
                    label: "6",
                  },
                ]}
                min={0}
                max={6}
                size="small"
                onChange={filterRatedPowerHandler}
                value={ratedPower}
              />
            </Box>

            <Box fullWidt sx={{ mb: 2, mx: 1 }}>
              <Typography fontSize={12}>Wind Turbines Height</Typography>
              <Slider
                aria-label="Wind Turbines Height"
                valueLabelDisplay="auto"
                step={1}
                marks={[
                  {
                    value: 50,
                    label: "50m",
                  },
                  {
                    value: 150,
                    label: "150m",
                  },
                ]}
                min={50}
                max={150}
                size="small"
                onChange={filterHeightHandler}
                value={height}
              />
            </Box>

            <Box fullWidth sx={{ mb: 2, mx: 1 }}>
              <Typography fontSize={12}>Operational Year</Typography>
              <Slider
                aria-label="Operational Year"
                valueLabelDisplay="auto"
                step={1}
                marks={[
                  {
                    value: 1990,
                    label: "1990",
                  },
                  {
                    value: 2021,
                    label: "2021",
                  },
                ]}
                min={1990}
                max={2021}
                size="small"
                onChange={filterYearHandler}
                value={year}
              />
            </Box>
          </div>
          <Results>
            <Typography gutterBottom>Wind Farms</Typography>
            <WindFarmsList />
          </Results>
        </FiltersandFilteredWF>
      )}
    </>
  );
};
export default WindTurbineFilters;

const FilterButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 80px;
  padding: 5px 3px;
  color: white;
  z-index: 2;
  position: absolute;
  top: 75px;
  right: 10px;
  background-color: rgba(68, 65, 65, 0.84);
`;

const FiltersandFilteredWF = styled.div`
  background: rgba(255, 255, 255, 0.84);
  width: 250px;
  color: black;
  padding: 2rem 1rem;
  z-index: 2;
  position: fixed;
  bottom: 10%;
  top: 15%;
  right: 0;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top:50%
  height: 50%;
  margin-top:20px;
`;
