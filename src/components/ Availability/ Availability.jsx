import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectPerformanceFilters,
  selectTurbinesAvailability,
} from "../../store/windfarms/selector";
import _ from "lodash";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Box from "@mui/material/Box";

const Metric = (props) => {
  const color =
    props.color === "red" ? "rgb(220, 101, 124)" : "rgb(89, 90, 236)";
  const bcColor =
    props.color === "red" ? "rgb(233, 204, 214)" : "rgb(203, 204, 241)";
  return (
    <div style={{ border: "1px solid black", width: "120px" }}>
      <div
        style={{
          width: "100%",
          background: bcColor,
        }}
      >
        <div
          style={{
            width: `${props.graph}%`,
            background: color,

            height: "20px",
            color: "white",
            textAlign: "right",
          }}
        >
          {/* {props.value} */}
          {props.children}
        </div>
      </div>
    </div>
  );
};

const Availability = () => {
  const windFarms = ["Groton", "Winchester", "Bear Creek"];
  const windfarmsfilters = useSelector(selectPerformanceFilters());
  const windfarmsfiltered =
    _.keys(_.pickBy(windfarmsfilters, _.identity)).length === 0
      ? windFarms
      : _.keys(_.pickBy(windfarmsfilters, _.identity));

  const availability = useSelector(selectTurbinesAvailability());
  // console.log(availability);

  if (!availability) {
    return;
  }

  const data = availability.map((el) => {
    return {
      p_name: el.p_name,
      case_id: el.case_id,
      avgAvailability:
        (((100 - el.avgAvaiability) / 100) * el.avgPower) / 100000,
      metricBarAvaiability: el.avgAvaiability,
      avgPower: el.avgPower / 100000,
      metricBarPower: ((100 - el.avgAvaiability) * el.avgPower) / el.avgPower,
    };
  });
  //console.log(data);
  const sortData = (a, b) => {
    return a.p_name.localeCompare(b.p_name);
  };
  return (
    <Box style={{ width: "100%", maxWidth: 500 }}>
      <List
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: "#dcdcdc",
          position: "relative",
          overflow: "auto",
          height: 500,
          "& ul": { padding: 0 },
        }}
        header={<li />}
        subheader={<li />}
      >
        <ul>
          <ListSubheader
            style={{
              background: "#083241",
              display: "flex",
              justifyContent: "space-between",
              color: "white",
              alignItems: "center",
              lineHeight: 1.3,
            }}
          >
            <div
              style={{
                maxWidth: 100,
                marginTop: 10,
                marginBottom: 10,
                fontWeight: "900",
              }}
            >{` Production Comparasion`}</div>
            <div
              style={{ maxWidth: 90, marginTop: 10, marginBottom: 10 }}
            >{`Energy Exported`}</div>{" "}
            <div
              style={{ maxWidth: 90, marginTop: 10, marginBottom: 10 }}
            >{`Lost Production `}</div>
          </ListSubheader>
          {data.sort(sortData).map((item) => (
            <ListItem
              style={{
                background: "#f4f4f4",
                fontSize: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
              key={`Wind Turbine: {sectionId}-${item.case_id}`}
            >
              <div style={{ width: "110px" }}>
                {" "}
                {`${item.p_name}: ${item.case_id}`}
              </div>

              <div style={{ width: "30px" }}>
                {Math.floor(item.avgPower * 100) / 100}
              </div>
              <Metric
                graph={
                  Math.floor(
                    (item.avgPower * 10000) /
                      (item.avgPower + item.avgAvailability)
                  ) / 100
                }
                value={Math.floor(item.avgPower * 100) / 100}
                color={"blue"}
              />
              <div style={{ width: "30px" }}>
                {Math.floor(item.avgAvailability * 100) / 100}
              </div>
              <Metric
                graph={Math.floor(item.metricBarPower * 100) / 100}
                value={Math.floor(item.avgAvailability * 100) / 100}
                color={"red"}
              />
            </ListItem>
          ))}
        </ul>
      </List>
    </Box>
  );
};

export default Availability;

const Boxes = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  background: #dcdcdc;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
