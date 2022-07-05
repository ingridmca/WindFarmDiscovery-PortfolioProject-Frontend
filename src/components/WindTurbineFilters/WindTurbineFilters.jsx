import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectWindTurbines } from "../../store/windfarms/selector";

const WindTurbineFilters = (props) => {
  const windTurbines = useSelector(selectWindTurbines);
  const [supplier, setSupplier] = useState("");
  const [ratedPower, setRatedPower] = useState(0);
  const [year, setYear] = useState(0);
  const [height, setheight] = useState(0);

  const handleChange = (event) => {
    setSupplier(event.target.value);
  };

  if (supplier === "" && ratedPower === 0 && year === 0 && height === 0) {
    props.setWindTurbines(windTurbines);
  } else {
    const filteredbySupplier =
      windTurbines.filter((wt) => wt.p_name === supplier).length === 0
        ? windTurbines
        : windTurbines.filter((wt) => wt.p_name === supplier);

    const filteredbySupplierAndPower =
      filteredbySupplier.filter((wt) => wt.t_cap <= ratedPower).length === 0
        ? filteredbySupplier
        : filteredbySupplier.filter((wt) => wt.t_cap <= ratedPower);

    const filteredbySupplierPowerAndYear =
      filteredbySupplierAndPower.filter((wt) => wt.p_year <= year).length === 0
        ? filteredbySupplierAndPower
        : filteredbySupplierAndPower.filter((wt) => wt.p_year <= year);

    const filteredbySupplierPoweYearAndHeight =
      filteredbySupplierPowerAndYear.filter((wt) => wt.t_hh <= height)
        .length === 0
        ? filteredbySupplierPowerAndYear
        : filteredbySupplierPowerAndYear.filter((wt) => wt.t_hh <= height);

    props.setWindTurbines(filteredbySupplierPoweYearAndHeight);
  }
  return (
    <Filters>
      <label>Filter by supplier</label>
      <select value={supplier} onChange={(event) => handleChange(event)}>
        <option value="">All Suppliers</option>
        <option value="GE Wind">GE</option>
        <option value="Vestas">Vestas</option>
        <option value="Gamesa">Gamesa</option>
      </select>
    </Filters>
  );
};
export default WindTurbineFilters;

const Filters = styled.div`
  background: rgba(0, 0, 0, 0.5);
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
