import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyMetrics from "../../components/KeyMetrics/KeyMetrics";
import { NavigationPages } from "../../components/Navbar/NavbarPages";
import { fetchwindTurbinesPerformance } from "../../store/windfarms/thunk";
import styled from "styled-components";
import CumulativeProduction from "../../components/CumulativeProduction/CumulativeProduction";
import Availability from "../../components/ Availability/ Availability";
import PowerCurve from "../../components/PowerCurve/PowerCurve";
import { selectTurbinesPerformanceFarms } from "../../store/windfarms/selector";
import WindFarmPerformanceToggle from "../../components/WindFarmPerformanceToggle/WindFarmPerformanceToggle";

const PerformancePage = () => {
  const dispatch = useDispatch();
  const windFarms = useSelector(selectTurbinesPerformanceFarms());

  useEffect(() => {
    dispatch(fetchwindTurbinesPerformance());
  }, [dispatch]);

  return (
    <div>
      <NavigationPages />
      <Title>
        Windmills<span>Dashboard</span>
      </Title>

      <PageDisplay>
        <Filters>
          {windFarms.length === 0
            ? "loading"
            : windFarms.map((wf) => (
                <WindFarmPerformanceToggle windfarm={wf} />
              ))}
        </Filters>

        <CentralPage>
          <Boxes>
            <KeyMetrics windFarms={windFarms} />
            <CumulativeProduction />
          </Boxes>
          <Boxes>
            <Availability />
            <PowerCurve />
          </Boxes>
        </CentralPage>
      </PageDisplay>
    </div>
  );
};
export default PerformancePage;

const Boxes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const CentralPage = styled.span`
  width: 80%;
`;

const Filters = styled.span`
  background-color: #ececec;
  width: 15%;
  margin-top: 30px;
  margin-bottom: 50px;
  margin-left: 2%;
`;

const PageDisplay = styled.div`
  display: flex;
`;

const Title = styled.div`
  padding: 1rem 0;
  color: #a9a9a9;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  justify-content: center;
  align-items: center;
  display: flex;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;
