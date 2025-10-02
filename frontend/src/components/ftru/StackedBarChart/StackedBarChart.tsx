import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
export interface StackedBarChartData {
  month: string;
  repeatUsers: number;
  firstTimeUsers: number;
}
export interface StackedBarChartProps {
  data: StackedBarChartData[];
  width?: number | string;
  height?: number | string;
  'data-id'?: string;
}
export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  width = '100%',
  height = 300,
  'data-id': dataId
}) => {
  return <div data-id={dataId} style={{
    width,
    height,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 30
      }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month" stroke="#666" tick={{
          fill: '#666'
        }} />
          <YAxis stroke="#666" tick={{
          fill: '#666'
        }} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
          <Bar dataKey="repeatUsers" stackId="a" fill="#0EA5E9" name="Repeat Users" />
          <Bar dataKey="firstTimeUsers" stackId="a" fill="#94A3B8" name="First-time Users" />
        </BarChart>
      </ResponsiveContainer>
    </div>;
};