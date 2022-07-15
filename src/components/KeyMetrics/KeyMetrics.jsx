import { useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import {
  selectPerformanceFilters,
  selectTurbinesPerformanceAvaiability,
  selectTurbinesPerformancePerformanceIndex,
  selectTurbinesPerformanceProduction,
} from "../../store/windfarms/selector";

const Metric = (props) => {
  return (
    <div
      style={{ border: "1px solid black", borderRadius: 25, width: "120px" }}
    >
      <div
        style={{
          width: "100%",
          background: "rgb(204, 203, 242)",
          borderRadius: 25,
        }}
      >
        <div
          style={{
            width: `${props.value - 20}%`,
            background: "rgb(90, 89, 237)",
            borderRadius: 25,
            height: "20px",
            color: "white",
            textAlign: "center",
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

const KeyMetrics = (props) => {
  let filteredWindFarm = useSelector(selectPerformanceFilters());
  filteredWindFarm = _.keys(_.pickBy(filteredWindFarm, _.identity));
  // console.log(filteredWindFarm);

  let windfarm;

  if (filteredWindFarm.length === 0) {
    windfarm = props.windFarms;
  } else {
    windfarm = filteredWindFarm;
  }

  const power = useSelector(selectTurbinesPerformanceProduction(windfarm));

  const availability = useSelector(
    selectTurbinesPerformanceAvaiability(windfarm)
  );

  const performanceIndex = useSelector(
    selectTurbinesPerformancePerformanceIndex(windfarm)
  );

  return (
    <Box>
      <Title2>Key Metrics</Title2>
      <Title>
        <span> Production</span>
      </Title>
      <div></div>
      <Title>
        {power} <span> GWh</span>
      </Title>

      <Boxes>
        <Card>
          <Title2>{availability} %</Title2>
          <Title2>
            <span>System availability</span>
          </Title2>
          <Metric value={availability} />
        </Card>
        <Card>
          <Title2>{Math.floor((availability - 0.37) * 100) / 100} %</Title2>
          <Title2>
            <span>Contractual availability </span>
          </Title2>

          <Metric value={Math.floor((availability - 0.37) * 100) / 100} />
        </Card>
        <Card>
          <Title2>{performanceIndex} %</Title2>
          <Title2>
            <span>Performance Index </span>
          </Title2>

          <Metric value={performanceIndex} />
        </Card>
      </Boxes>
    </Box>
  );
};

export default KeyMetrics;

const Box = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  background: #f4f4f4;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Boxes = styled.div`
  display: flex;
  width: 500px;
  height: 100px;
  background: #f4f4f4;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  width: 160px;
  height: 100px;
  background: #f4f4f4;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const Title2 = styled.div`
  padding: 0.5rem 0;
  color: #083241;
  text-decoration: none;
  font-weight: 800;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  display: flex;

  span {
    font-weight: 300;
    font-size: 0.8rem;
  }
`;
