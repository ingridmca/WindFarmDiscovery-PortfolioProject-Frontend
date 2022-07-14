import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectPerformanceFilters,
  selectTurbinesPerformanceAvaiability,
  selectTurbinesPerformancePerformanceIndex,
  selectTurbinesPerformanceProduction,
} from "../../store/windfarms/selector";

const Metric = (props) => {
  return (
    <div style={{ border: "1px solid black", width: "300px" }}>
      <div
        style={{
          width: "100%",
          background: "rgb(204, 203, 242)",
        }}
      >
        <div
          style={{
            width: `${props.value}%`,
            background: "rgb(90, 89, 237)",
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
  const filteredWindFarm = useSelector(selectPerformanceFilters());
  console.log(filteredWindFarm);
  let windfarms =
    filteredWindFarm.length === 0 ? props.windFarms : filteredWindFarm;

  const power = useSelector(selectTurbinesPerformanceProduction(windfarms));

  const availability = useSelector(
    selectTurbinesPerformanceAvaiability(windfarms)
  );

  const performanceIndex = useSelector(
    selectTurbinesPerformancePerformanceIndex(windfarms)
  );

  return (
    <Box>
      <div>Key Metrics</div>
      <div>Production</div>
      <div>{power} GWh</div>
      <Boxes>
        <Card>
          <div>{availability} %</div>
          <div>System availability </div>
        </Card>
        <Card>
          <div>{availability - 0.5} %</div>
          <div>Contractual availability </div>
        </Card>
        <Card>
          <div>{performanceIndex} %</div>
          <div>Performance Index </div>
        </Card>
      </Boxes>
      <Metric value={availability}>System availability {availability}%</Metric>
      <Metric value={availability - 0.5}>
        Contractual availability {availability - 0.5}%
      </Metric>
      <Metric value={performanceIndex}>
        Performance Index {performanceIndex}%
      </Metric>
    </Box>
  );
};

export default KeyMetrics;

const Box = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  background: #dcdcdc;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Boxes = styled.div`
  display: flex;
  width: 500px;
  height: 100px;
  background: #dcdcdc;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  width: 160px;
  height: 100px;
  background: #dcdcdc;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
