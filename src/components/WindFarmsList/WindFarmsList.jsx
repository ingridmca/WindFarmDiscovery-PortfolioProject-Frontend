import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterWindFarms } from "../../store/windfarms/selector";
import styled from "styled-components";
import "./WindFarmsList.css";
const loDash = require("lodash");

const WindFarmsList = () => {
  const windFarms = useSelector(filterWindFarms);
  const [pageNumber, setPageNumber] = useState(0);

  const windfarmsArray = loDash.chunk(windFarms, 14);

  const pageNumberHendler = (event) => {
    const click = event.target.text;
    console.log(click);
    if (click === "«" && pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    } else if (click === "»" && pageNumber < windfarmsArray.length - 1) {
      setPageNumber(pageNumber + 1);
    } else {
      return;
    }
  };

  useEffect(() => {
    setPageNumber(0);
  }, [windFarms]);

  return (
    <div>
      <div style={{ height: 230, marginTop: 10 }}>
        {windfarmsArray.length !== 0 &&
          windfarmsArray[pageNumber] &&
          windfarmsArray[pageNumber].length !== 0 &&
          windfarmsArray[pageNumber].map((wf) => (
            <WindFarms key={wf.p_name}>
              <Link to={`/${wf.p_name}}`}>{wf.p_name}</Link>
            </WindFarms>
          ))}
      </div>
      <Pagination>
        <a onClick={(event) => pageNumberHendler(event)} value={pageNumber - 1}>
          &laquo;
        </a>

        <a onClick={(event) => pageNumberHendler(event)} value={pageNumber + 1}>
          &raquo;
        </a>
      </Pagination>
    </div>
  );
};

export default WindFarmsList;

const WindFarms = styled.div`
  font-size: 10px;
  padding: 2px;
`;

const Pagination = styled.div`
  cursor: pointer;
`;
