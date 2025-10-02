import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Star } from 'lucide-react';
interface ChartDataPoint {
  month: string;
  financialServices: number;
  nonFinancialServices: number;
}
interface CustomerSatisfactionChartProps {
  data?: ChartDataPoint[];
  overallRating?: number;
  improvement?: number;
  summaryText?: string;
  'data-id'?: string;
}
const defaultData: ChartDataPoint[] = [{
  month: 'Apr',
  financialServices: 3.8,
  nonFinancialServices: 3.95
}, {
  month: 'May',
  financialServices: 4.0,
  nonFinancialServices: 4.2
}, {
  month: 'Jun',
  financialServices: 4.05,
  nonFinancialServices: 4.25
}, {
  month: 'Jul',
  financialServices: 3.95,
  nonFinancialServices: 4.2
}, {
  month: 'Aug',
  financialServices: 4.1,
  nonFinancialServices: 4.15
}, {
  month: 'Sep',
  financialServices: 4.0,
  nonFinancialServices: 4.22
}];
const StarRating: React.FC<{
  rating: number;
}> = ({
  rating
}) => {
  return <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3 h-3" fill={star <= Math.floor(rating) ? '#F59E0B' : 'none'} stroke="#F59E0B" style={{
      opacity: star <= Math.floor(rating) ? 1 : 0.4
    }} />)}
    </div>;
};
export const CustomerSatisfactionChart: React.FC<CustomerSatisfactionChartProps> = ({
  data = defaultData,
  overallRating = 4.2,
  improvement = 0.3,
  summaryText = 'Overall satisfaction has increased by 7.5% over the last 6 months.',
  'data-id': dataId
}) => {
  return <div data-id={dataId} className="w-full bg-white/80 backdrop-blur-xl shadow-sm border border-slate-200 rounded-lg p-6 mb-10">
      <h3 className="text-xl font-medium mb-6">Customer Satisfaction Trend</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#666" tick={{
            fill: '#666'
          }} />
            <YAxis domain={[3, 5]} stroke="#666" tick={{
            fill: '#666'
          }} />
            <Tooltip contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} />
            <Legend verticalAlign="bottom" height={36} iconType="line" />
            <Line type="monotone" dataKey="financialServices" name="Financial Services" stroke="#0EA5E9" strokeWidth={2} dot={{
            fill: '#fff',
            stroke: '#0EA5E9',
            strokeWidth: 2,
            r: 6
          }} activeDot={{
            r: 8
          }} />
            <Line type="monotone" dataKey="nonFinancialServices" name="Non-Financial Services" stroke="#14B8A6" strokeWidth={2} dot={{
            fill: '#fff',
            stroke: '#14B8A6',
            strokeWidth: 2,
            r: 6
          }} activeDot={{
            r: 8
          }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">{summaryText}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-sky-500 mr-2">
              {overallRating.toFixed(1)}
            </div>
            <div className="text-sm">
              <div className="text-gray-600">Overall</div>
              <StarRating rating={overallRating} />
            </div>
          </div>
          <div className="h-10 w-px bg-gray-200" />
          <div className="flex items-center">
            <div className="text-2xl font-bold text-green-500 mr-2">
              {improvement > 0 ? '+' : ''}
              {improvement.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">vs. Last Period</div>
          </div>
        </div>
      </div>
    </div>;
};