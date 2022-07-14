import styled from "styled-components";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CumulativeProduction = () => {
  const data = [
    {
      name: "Page A",
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Box>
      Cumulative Production
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
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="pv"
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
  background: #dcdcdc;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
