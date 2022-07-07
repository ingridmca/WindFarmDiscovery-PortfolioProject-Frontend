import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterWindFarms } from "../../store/windfarms/selector";
import styled from "styled-components";
const loDash = require("lodash");

const WindFarmsList = () => {
  const windFarms = useSelector(filterWindFarms);
  const [pageNumber, setPageNumber] = useState(0);

  const windfarmsArray = loDash.chunk(windFarms, 14);

  //   if (windFarms.length !== 0) {
  //     for (let i = 0; i <= parseInt(windFarms.length / 14); i++) {
  //       windfarmsArray.push([]);
  //       const n = 14 * (i + 1);
  //       for (let j = n - 14; j <= n && j < windFarms.length; j++) {
  //         windfarmsArray[i].push(windFarms[j].p_name);
  //       }
  //     }
  //   }

  return (
    <div>
      {windfarmsArray.length !== 0 &&
        windfarmsArray[pageNumber].map((wf) => (
          <WindFarms key={wf.p_name}>
            <Link to={`/${wf.p_name}}`}>{wf.p_name}</Link>
          </WindFarms>
        ))}
    </div>
  );
};

export default WindFarmsList;

const WindFarms = styled.div`
  font-size: 10px;
  padding: 2px;
`;
