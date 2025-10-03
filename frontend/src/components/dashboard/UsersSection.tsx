import React from 'react';
import { UserAnalytics } from '../test/UserAnalytics';

const DistributionCard: React.FC<{
  title: string;
  items: Array<{ label: string; value: number; }>;
  color: 'blue' | 'purple' | 'green' | 'amber';
}> = ({ title, items, color }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
    amber: 'bg-amber-600'
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm text-gray-700 mb-3">{title}</h4>
      <div>
        {items.map((item, idx) => (
          <div key={idx} className={idx > 0 ? 'mt-3' : ''}>
            <div className="flex items-center justify-between mb-1 text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">{item.value}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${colorMap[color]} rounded-full`} 
                style={{ width: `${item.value}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SMEProfileDashboard = () => (
  <div className="mb-8 bg-white rounded-lg border border-slate-200 shadow-sm p-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      SME Profile Dashboard
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DistributionCard 
        title="Size Distribution" 
        items={[
          { label: 'Micro (1-9)', value: 45 },
          { label: 'Small (10-49)', value: 40 },
          { label: 'Medium (50-249)', value: 15 }
        ]} 
        color="blue" 
      />
      <DistributionCard 
        title="Sector Distribution" 
        items={[
          { label: 'Technology', value: 35 },
          { label: 'Retail', value: 25 },
          { label: 'Manufacturing', value: 20 },
          { label: 'Services', value: 15 },
          { label: 'Other', value: 5 }
        ]} 
        color="purple" 
      />
      <DistributionCard 
        title="Business Stage" 
        items={[
          { label: 'Startup', value: 45 },
          { label: 'Growth', value: 35 },
          { label: 'Mature', value: 20 }
        ]} 
        color="green" 
      />
      <DistributionCard 
        title="Region Distribution" 
        items={[
          { label: 'Dubai', value: 45 },
          { label: 'Abu Dhabi', value: 30 },
          { label: 'Sharjah', value: 15 },
          { label: 'Others', value: 10 }
        ]} 
        color="amber" 
      />
    </div>
  </div>
);

export const UsersSection: React.FC = () => {
  return (
    <section className="pt-8">
      <h2 className="text-3xl font-semibold font-serif mb-6">
        Who Is Using My Services?
      </h2>
      <p className="max-w-3xl text-lg text-gray-600 mb-8">
        Profile of SMEs engaging with your services, including size,
        sector, stage, and regional distribution.
      </p>
      <SMEProfileDashboard />
      <UserAnalytics 
        title="First-time vs Repeat Users" 
        data={[
          { month: 'Apr', firstTime: 45, repeat: 55 },
          { month: 'May', firstTime: 42, repeat: 58 },
          { month: 'Jun', firstTime: 40, repeat: 60 },
          { month: 'Jul', firstTime: 38, repeat: 62 },
          { month: 'Aug', firstTime: 35, repeat: 65 },
          { month: 'Sep', firstTime: 32, repeat: 68 }
        ]} 
        insights={[
          { label: 'Repeat User Rate', value: '68%', percentage: 68 },
          { label: 'Avg. Services Per SME', value: '2.4', percentage: 60 },
          { label: 'Cross-Service Adoption', value: '42%', percentage: 42 }
        ]} 
        footerText="Repeat user rate has increased by 13 percentage points over the last 6 months, indicating growing loyalty and satisfaction." 
      />
    </section>
  );
};