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

  //console.log("windTurbineType", windTurbineType, "windFarmData", windFarmData);

  if (!windFarmData || !windTurbineType) {
    return;
  }

  return (
    <div>
      <NavigationPages />
      <div>
        <PageStructure>
          <TechnicalSpecification>
            {windFarmData.p_name}
            <div>
              <>Technical</>
              <>Specifications</>
            </div>
            <div>Wind farm rated rower: {windFarmData.p_cap}</div>
            <div>Wind farm number of turbines: {windFarmData.p_tnum}</div>
            <div>Wind farm operational start: {windFarmData.p_year}</div>
            <div>Wind turbine supplier {windTurbineType.supplier} </div>
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
          <Map>
            <WindFarmWindyMap
              xlong={windFarmData.xlong}
              ylat={windFarmData.ylat}
              p_name={windFarmData.p_name}
            />
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
`;
