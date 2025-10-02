import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface ServiceUsageData {
  month: string;
  financialServices: number;
  nonFinancialServices: number;
}
interface ServiceUsageTrendProps {
  data?: ServiceUsageData[];
  title?: string;
  description?: string;
  height?: number;
  'data-id'?: string;
}
const defaultData: ServiceUsageData[] = [{
  month: 'Apr',
  financialServices: 87,
  nonFinancialServices: 130
}, {
  month: 'May',
  financialServices: 100,
  nonFinancialServices: 147
}, {
  month: 'Jun',
  financialServices: 99,
  nonFinancialServices: 154
}, {
  month: 'Jul',
  financialServices: 101,
  nonFinancialServices: 162
}, {
  month: 'Aug',
  financialServices: 112,
  nonFinancialServices: 171
}, {
  month: 'Sep',
  financialServices: 113,
  nonFinancialServices: 174
}];
export const ServiceUsageTrend: React.FC<ServiceUsageTrendProps> = ({
  data = defaultData,
  title = 'Service Usage Trend',
  description = 'Usage trend over the last 6 months shows consistent growth in both financial and non-financial service applications.',
  height = 320,
  'data-id': dataId
}) => {
  return <div data-id={dataId} className="bg-white/80 backdrop-blur-xl shadow-sm border border-slate-200 rounded-lg p-6 w-full">
      <h3 className="text-xl font-medium mb-6">{title}</h3>
      <div style={{
      height: `${height}px`
    }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#666" tick={{
            fill: '#666'
          }} tickLine={{
            stroke: '#666'
          }} />
            <YAxis stroke="#666" tick={{
            fill: '#666'
          }} tickLine={{
            stroke: '#666'
          }} label={{
            value: 'Applications',
            angle: -90,
            position: 'insideLeft',
            style: {
              fill: '#808080'
            }
          }} />
            <Tooltip contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} />
            <Legend verticalAlign="bottom" height={36} iconType="square" wrapperStyle={{
            paddingTop: '20px'
          }} />
            <Bar dataKey="financialServices" stackId="a" fill="#0EA5E9" name="Financial Services" />
            <Bar dataKey="nonFinancialServices" stackId="a" fill="#14B8A6" name="Non-Financial Services" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>{description}</p>
      </div>
    </div>;
};