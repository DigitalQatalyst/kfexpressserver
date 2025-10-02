import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export interface LineChartDataPoint {
  name: string;
  [key: string]: string | number;
}
export interface LineChartSeries {
  dataKey: string;
  name: string;
  stroke: string;
  strokeDasharray?: string;
}
export interface LineChartProps {
  data: LineChartDataPoint[];
  series: LineChartSeries[];
  title?: string;
  description?: string;
  height?: number;
  yAxisLabel?: string;
  'data-id'?: string;
}
const CustomLegendIcon = ({
  color,
  dashed
}: {
  color: string;
  dashed?: boolean;
}) => <svg width="14" height="14" viewBox="0 0 32 32" style={{
  display: 'inline-block',
  marginRight: '4px'
}}>
    <path strokeWidth="4" fill="none" stroke={color} strokeDasharray={dashed ? '5 5' : undefined} d="M0,16h10.666666666666666
        A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
        H32M21.333333333333332,16
        A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16" />
  </svg>;
const CustomLegend = ({
  payload
}: any) => <div className="flex justify-center items-center gap-6 mt-4">
    {payload.map((entry: any, index: number) => <div key={`legend-${index}`} className="flex items-center">
        <CustomLegendIcon color={entry.color} dashed={entry.payload.strokeDasharray === '5 5'} />
        <span style={{
      color: entry.color
    }} className="text-sm">
          {entry.value}
        </span>
      </div>)}
  </div>;
export const LineChart: React.FC<LineChartProps> = ({
  data,
  series,
  title,
  description,
  height = 320,
  yAxisLabel,
  'data-id': dataId
}) => {
  return <div data-id={dataId} className="bg-white/80 backdrop-blur-xl shadow-sm border border-slate-200 rounded-lg p-6 w-full">
      {title && <h3 className="text-xl font-medium mb-6 text-gray-900">{title}</h3>}
      <div style={{
      height
    }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#666" tick={{
            fill: '#666'
          }} />
            <YAxis stroke="#666" tick={{
            fill: '#666'
          }} label={yAxisLabel ? {
            value: yAxisLabel,
            angle: -90,
            position: 'insideLeft',
            style: {
              fill: '#808080'
            }
          } : undefined} />
            <Tooltip contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} />
            <Legend content={<CustomLegend />} />
            {series.map((s, index) => <Line key={index} type="monotone" dataKey={s.dataKey} name={s.name} stroke={s.stroke} strokeWidth={2} strokeDasharray={s.strokeDasharray} dot={{
            fill: '#fff',
            strokeWidth: 2,
            r: 4
          }} activeDot={{
            r: 6
          }} />)}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      {description && <div className="mt-4 text-sm text-gray-600">
          <p>{description}</p>
        </div>}
    </div>;
};