import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  selectwindFarm,
  selectwindTurbineType,
} from "../../store/windfarms/selector";
import { fetchWindFarms } from "../../store/windfarms/thunk";
import WindFarmWindyMap from "../../components/WindFarmWindyMap/WindFarmWindyMap";
import { NavigationPages } from "../../components/Navbar/NavbarPages";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const windFarmName = useParams();
  const windFarmData = useSelector(selectwindFarm(windFarmName))[0];
  const turbineModel = windFarmData ? windFarmData.t_model : null;
  const windTurbineType = useSelector(selectwindTurbineType());

  useEffect(() => {
    dispatch(fetchWindFarms(turbineModel));
  }, [dispatch, turbineModel]);

  console.log("windTurbineType", windTurbineType, "windFarmData", windFarmData);

  if (!windFarmData || !windTurbineType) {
    return;
  }

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
              <div>Wind farm rated rower: {windFarmData.t_cap / 1000}</div>
              <div>Wind farm number of turbines: {windFarmData.p_tnum}</div>
              <div>Wind farm operational start: {windFarmData.p_year}</div>
              <div>Wind turbine supplier: {windTurbineType.supplier} </div>
              <div>Wind turbine model: {windTurbineType.model}</div>
              <div>Wind turbine gearbox: {windTurbineType.gearbox}</div>
              <div>
                Wind turbine rotor diameter: {windTurbineType.rotorDiameter}
              </div>
              <div>
                Wind turbine blade dimension: {windTurbineType.bladeDimension}
              </div>
              <div>Wind turbine description: {windTurbineType.description}</div>
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

const TechnicalSpecification = styled.div`
  background: rgba(68, 65, 65, 0.84);
  width: 650px;
  color: white;
  display: flex;
  flex-direction: column;
  top: 17%;
  align-items: start;
  justify-content: space-around;
  padding: 0 2rem;
  height: 700px;
`;

const PageStructure = styled.div`
  display: flex;
  height: 700px;
  flex-direction: row;
  justify-content: space-around;
`;

const Map = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
`;
const Nav = styled.div`
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

const Logo = styled.div`
  padding: 1rem 0;
  color: #585858;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;
