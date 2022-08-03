import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyMetrics from "../../components/KeyMetrics/KeyMetrics";
import { NavigationPages } from "../../components/Navbar/NavbarPages";
import _ from "lodash";
import {
  fetchwindTurbinesAvailability,
  fetchwindTurbinesAvailabilityConcat,
  fetchwindTurbinesPerformance,
  fetchwindTurbinesPerformancePowerGraph,
} from "../../store/windfarms/thunk";
import styled from "styled-components";
import CumulativeProduction from "../../components/CumulativeProduction/CumulativeProduction";
import Availability from "../../components/ Availability/ Availability";
import PowerCurve from "../../components/PowerCurve/PowerCurve";
import { selectPerformanceFilters } from "../../store/windfarms/selector";
import WindFarmPerformanceToggle from "../../components/WindFarmPerformanceToggle/WindFarmPerformanceToggle2";
import { selectToken } from "../../store/user/selectors";
import { useNavigate } from "react-router-dom";

const PerformancePage = () => {
  const dispatch = useDispatch();
  const windfarmsfilters = useSelector(selectPerformanceFilters());
  const [windFarmsToShow] = useState(["Groton", "Winchester", "Bear Creek"]);

  const token = useSelector(selectToken);
  const navigate = useNavigate();

  if (!token) {
    navigate(`/`);
  }

  useEffect(() => {
    dispatch(
      fetchwindTurbinesPerformancePowerGraph(
        _.keys(_.pickBy(windfarmsfilters, _.identity)).length === 0
          ? windFarmsToShow
          : _.keys(_.pickBy(windfarmsfilters, _.identity))
      )
    );

    dispatch(
      fetchwindTurbinesAvailability(
        _.keys(_.pickBy(windfarmsfilters, _.identity)).length === 0
          ? windFarmsToShow
          : _.keys(_.pickBy(windfarmsfilters, _.identity))
      )
    );

    dispatch(fetchwindTurbinesPerformance());

    dispatch(
      fetchwindTurbinesAvailabilityConcat(
        _.keys(_.pickBy(windfarmsfilters, _.identity)).length === 0
          ? windFarmsToShow
          : _.keys(_.pickBy(windfarmsfilters, _.identity))
      )
    );
  }, [dispatch, windfarmsfilters, windFarmsToShow]);

  return (
    <div>
      <NavigationPages />
      <Title>
        Windmills<span> Dashboard</span>
      </Title>

      <PageDisplay>
        <Filters>
          {windFarmsToShow.length === 0 ? (
            "loading"
          ) : (
            <div>
              <Title>
                <span> Wind Farms</span>
              </Title>

              {windFarmsToShow.map((wf) => {
                return <WindFarmPerformanceToggle windfarm={wf} key={wf} />;
              })}
            </div>
          )}
        </Filters>

        <CentralPage>
          <Boxes>
            <KeyMetrics windFarms={windFarmsToShow} />
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
  color: #083241;
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
