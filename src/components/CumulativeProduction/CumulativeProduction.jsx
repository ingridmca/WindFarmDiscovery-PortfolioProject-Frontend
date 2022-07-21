import styled from "styled-components";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import { selectPowerGraph } from "../../store/windfarms/selector";
import CircularColor from "../Loading/CircularColor";

const CumulativeProduction = () => {
  const allData = useSelector(selectPowerGraph());
  // console.log(allData[0]);
  const data = allData.map((e) => {
    return {
      timestamp: e.timestamp,
      avgPower: Math.floor(e.avgPower / 1000) / 100,
    };
  });

  if (data.length === 0 || !data) {
    return (
      <Box>
        <CircularColor />
      </Box>
    );
  }

  return (
    <Box>
      <Title>
        <span> Cumulative Production</span>
      </Title>

      <div>
        <AreaChart
          width={500}
          height={350}
          data={data}
          fontSize={10}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#5a59ed" stopOpacity={0.8} />
              <stop offset="90%" stopColor="#5a59ed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="avgPower"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    </Box>
  );
};

export default CumulativeProduction;

const Box = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  background: #f4f4f4;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
