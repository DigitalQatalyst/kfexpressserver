import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface UserAnalyticsData {
  month: string;
  firstTime: number;
  repeat: number;
}
interface KeyInsight {
  label: string;
  value: string;
  percentage: number;
}
interface UserAnalyticsProps {
  title?: string;
  data?: UserAnalyticsData[];
  insights?: KeyInsight[];
  footerText?: string;
  'data-id'?: string;
}
const defaultData: UserAnalyticsData[] = [{
  month: 'Apr',
  firstTime: 45,
  repeat: 55
}, {
  month: 'May',
  firstTime: 42,
  repeat: 58
}, {
  month: 'Jun',
  firstTime: 40,
  repeat: 60
}, {
  month: 'Jul',
  firstTime: 38,
  repeat: 62
}, {
  month: 'Aug',
  firstTime: 35,
  repeat: 65
}, {
  month: 'Sep',
  firstTime: 32,
  repeat: 68
}];
const defaultInsights: KeyInsight[] = [{
  label: 'Repeat User Rate',
  value: '68%',
  percentage: 68
}, {
  label: 'Avg. Services Per SME',
  value: '2.4',
  percentage: 60
}, {
  label: 'Cross-Service Adoption',
  value: '42%',
  percentage: 42
}];
export const UserAnalytics: React.FC<UserAnalyticsProps> = ({
  title = 'First-time vs Repeat Users',
  data = defaultData,
  insights = defaultInsights,
  footerText = 'Repeat user rate has increased by 13 percentage points over the last 6 months, indicating growing loyalty and satisfaction.',
  'data-id': dataId
}) => {
  return <div data-id={dataId} className="w-full bg-white/80 backdrop-blur-xl shadow-sm border border-slate-200 rounded-lg p-6">
      <h3 className="text-xl font-medium mb-6">{title}</h3>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }} />
              <Legend verticalAlign="bottom" height={36} iconType="square" iconSize={14} />
              <Bar dataKey="repeat" stackId="a" fill="#0EA5E9" name="Repeat Users" />
              <Bar dataKey="firstTime" stackId="a" fill="#94A3B8" name="First-time Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Key Insights Section */}
        <div className="flex flex-col justify-center">
          <h4 className="text-lg font-medium mb-4">Key Insights</h4>
          <div className="space-y-4">
            {insights.map((insight, index) => <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{insight.label}</span>
                  <span className="text-sm font-bold text-sky-500">
                    {insight.value}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full transition-all duration-300" style={{
                width: `${insight.percentage}%`
              }} />
                </div>
              </div>)}
          </div>
          <p className="text-sm text-gray-600 mt-4">{footerText}</p>
        </div>
      </div>
    </div>;
};