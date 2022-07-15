import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectPerformanceFilters,
  selectTurbinesAvailability,
  selectwindTurbinesAvailabilityConcat,
} from "../../store/windfarms/selector";
import _ from "lodash";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.history.map((row) => (
                    <TableRow key={row.case_id}>
                      <TableCell component="th" scope="row">
                        {row.case_id}
                      </TableCell>
                      <TableCell>{row.avgAvailability}</TableCell>
                      <TableCell>{row.avgPerformance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

function createData(name, avgAvaiability, avgPerformance, data) {
  if (!data) {
    return;
  }
  return {
    name,
    avgAvaiability,
    avgPerformance,

    history: data
      .filter((el) => el.p_name === name)
      .map((el) => {
        return {
          case_id: `${el.p_name} ${el.case_id}`,
          avgAvailability: el.avgAvaiability,
          avgPerformance: el.avgPerformance,
        };
      }),
  };
}

const PowerCurve = () => {
  const performance = useSelector(selectTurbinesAvailability());
  const performanceConcat = useSelector(selectwindTurbinesAvailabilityConcat());
  console.log(performanceConcat);

  if (!performance) {
    return;
  }

  const data = performance.map((el) => {
    return {
      p_name: el.p_name,
      case_id: el.case_id,
      avgAvailability: el.avgAvaiability,
      avgPerformance: el.avgPerformance,
    };
  });
  const rows = performanceConcat.map((el) =>
    createData(
      el.p_name,
      el.avgAvaiability.toFixed(2),
      el.avgPerformance.toFixed(2),
      data
    )
  );

  console.log(rows, performanceConcat);

  return (
    <BackgroundBox>
      Asset Performance Comparasion
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Wind Farm</TableCell>
              <TableCell align="right">Performance Index %</TableCell>
              <TableCell align="right">
                Time-Based system availability %
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BackgroundBox>
  );
};

export default PowerCurve;

const BackgroundBox = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  background: #dcdcdc;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
