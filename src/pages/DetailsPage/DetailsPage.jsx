import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "styled-components";
import { useParams } from "react-router-dom";
import {
  selectwindFarm,
  selectwindTurbineType,
} from "../../store/windfarms/selector";
import { fetchWindFarms } from "../../store/windfarms/thunk";
import WindFarmWindyMap from "../../components/WindFarmWindyMap/WindFarmWindyMap";
import { NavigationPages } from "../../components/Navbar/NavbarPages";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularColor from "../../components/Loading/CircularColor";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#073242",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const DetailsPage = () => {
  const dispatch = useDispatch();
  const windFarmName = useParams();
  const windFarmData = useSelector(selectwindFarm(windFarmName))[0];
  const turbineModel = windFarmData ? windFarmData.t_model : null;
  const windTurbineType = useSelector(selectwindTurbineType());

  useEffect(() => {
    dispatch(fetchWindFarms(turbineModel));
  }, [dispatch, turbineModel]);

  if (!windFarmData || !windTurbineType) {
    return <CircularColor />;
  }

  //console.log("windTurbineType", windTurbineType, "windFarmData", windFarmData);

  const rows = [
    createData("Wind farm number of turbines: ", windFarmData.p_tnum),
    createData("Wind turbine supplier: ", windTurbineType.supplier),
    createData("Wind farm operational start:", windFarmData.p_year),
    createData("Wind turbine model: ", windTurbineType.model),
    createData("Wind turbine gearbox: ", windTurbineType.gearbox),
    createData("Wind turbine rotor diameter: ", windTurbineType.rotorDiameter),
    createData(
      "Wind turbine blade dimension: ",
      windTurbineType.bladeDimension
    ),
    createData("Wind turbine description: ", windTurbineType.description),
  ];

  return (
    <div>
      <NavigationPages />
      <div>
        <PageStructure>
          <div>
            <Logo> {windFarmData.p_name}</Logo>

            <div>
              <Nav>
                <Logo>
                  Technical<span>Specifications</span>
                </Logo>
              </Nav>
            </div>
            <TechnicalSpecification>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell align="right">Value</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ width: 200 }}
                        >
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.calories}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TechnicalSpecification>
          </div>
          <Map>
            {windFarmData && (
              <WindFarmWindyMap
                xlong={windFarmData.xlong}
                ylat={windFarmData.ylat}
                p_name={windFarmData.p_name}
              />
            )}
          </Map>
        </PageStructure>
      </div>
    </div>
  );
};
export default DetailsPage;

const TechnicalSpecification = style.div`
 
  width: 650px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  margin-top: 20px;
  height: 700px;
`;

const PageStructure = style.div`
  display: flex;
  height: 700px;
  flex-direction: row;
  justify-content: space-around;
`;

const Map = style.div`
  display: flex;
  align-items: center;
  margin-top: 100px;
`;
const Nav = style.div`
color:#585858
  padding: 0 2rem;
  display: flex;
  justify-content: space-arround;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  max-width: 320px;
`;

const Logo = style.div`
  padding: 1rem 0;
  color: rgb(17, 64, 81);
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;
