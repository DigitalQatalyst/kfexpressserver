import React, { cloneElement, useState, useEffect } from 'react';
import { ServiceUsageTrend } from '../sut/ServiceUsageTrend';
import { Icon17, Icon18, Icon19, Icon20, Icon21 } from '../../icons';
import { fetchProducts } from '../../services/products/productApi';

const KPICard = ({ financialApps, nonFinancialApps }: { financialApps: number; nonFinancialApps: number }) => (
  <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-slate-200 shadow-sm p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Financial Services KPIs */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="text-xl font-semibold text-blue-600 mb-6">
          Financial Services
        </h4>
        <div className="space-y-6">
          <div>
            <div className="text-base text-blue-600 mb-2">
              Total Applications
            </div>
            <div className="text-3xl font-bold text-blue-900">{financialApps}</div>
          </div>
          <div>
            <div className="text-base text-blue-600 mb-2">Approval Rate</div>
            <div className="text-3xl font-bold text-blue-900">68%</div>
          </div>
          <div>
            <div className="text-base text-blue-600 mb-2">
              Avg Time to Decision
            </div>
            <div className="text-3xl font-bold text-blue-900">5.2 days</div>
          </div>
        </div>
      </div>
      {/* Non-Financial Services KPIs */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h4 className="text-xl font-semibold text-purple-600 mb-6">
          Non-Financial Services
        </h4>
        <div className="space-y-6">
          <div>
            <div className="text-base text-purple-600 mb-2">
              Total Applications
            </div>
            <div className="text-3xl font-bold text-purple-900">{nonFinancialApps}</div>
          </div>
          <div>
            <div className="text-base text-purple-600 mb-2">Approval Rate</div>
            <div className="text-3xl font-bold text-purple-900">76%</div>
          </div>
          <div>
            <div className="text-base text-purple-600 mb-2">
              Avg Time to Decision
            </div>
            <div className="text-3xl font-bold text-purple-900">2.8 days</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ApplicationsTrendCard = ({ trendData }: { trendData: any[] }) => (
  <ServiceUsageTrend 
    data={trendData} 
    title="Service Usage Trend" 
    description="" 
    height={256} 
  />
);

const InsightBadge: React.FC<{
  text: string;
  type: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}> = ({ text, type, icon }) => {
  const bgColors: Record<string, string> = {
    positive: 'bg-green-50 border-green-200',
    negative: 'bg-red-50 border-red-200',
    neutral: 'bg-blue-50 border-blue-200'
  };
  const iconColors: Record<string, string> = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-blue-600'
  };
  return (
    <div className={`flex items-start ${bgColors[type]} border rounded-full px-3 py-1.5 text-sm`}>
      <span className={`mt-0.5 flex-shrink-0 ${iconColors[type]}`}>
        {cloneElement(icon as React.ReactElement, { className: 'block mr-1.5' })}
      </span>
      <span>{text}</span>
    </div>
  );
};

const InsightsPanel = () => {
  const insights = [
    {
      text: '60% conversion rate from start to fulfillment, up 9.1% year-over-year',
      type: 'positive' as const,
      icon: <Icon17 />
    },
    {
      text: 'Financial services take 2.5x longer to process than non-financial services',
      type: 'neutral' as const,
      icon: <Icon18 />
    },
    {
      text: 'Advisory services have highest approval rate at 95%',
      type: 'positive' as const,
      icon: <Icon19 />
    },
    {
      text: 'Loan applications have lowest approval rate at 72%',
      type: 'negative' as const,
      icon: <Icon20 />
    },
    {
      text: 'Average time to decision reduced by 32.7% compared to last year',
      type: 'positive' as const,
      icon: <Icon21 />
    }
  ];
  
  return (
    <div className="bg-gradient-to-br from-teal-500 to-sky-500 rounded-lg border border-slate-200 shadow-sm backdrop-blur-xl p-6">
      <h3 className="text-xl font-normal font-serif mb-4">
        Performance Insights
      </h3>
      <div className="flex flex-wrap gap-3">
        {insights.map((insight, idx) => (
          <InsightBadge key={idx} {...insight} />
        ))}
      </div>
    </div>
  );
};

export const PerformanceSection: React.FC = () => {
  const [financialApps, setFinancialApps] = useState(0);
  const [nonFinancialApps, setNonFinancialApps] = useState(0);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const loadPerformanceData = async () => {
      try {
        const data = await fetchProducts();
        const products = data.data || [];
        
        const financialServices = products.filter((p: any) => p.kf_marketplace === 'Financial').length;
        const nonFinancialServices = products.filter((p: any) => p.kf_marketplace === 'Non-Financial').length;
        
        // Calculate applications based on service counts
        const financialApplications = financialServices * 15; // Avg 15 apps per financial service
        const nonFinancialApplications = nonFinancialServices * 12; // Avg 12 apps per non-financial service
        
        setFinancialApps(financialApplications);
        setNonFinancialApps(nonFinancialApplications);
        
        // Generate trend data
        setTrendData([
          { month: 'Apr', financialServices: Math.max(0, financialApplications - 50), nonFinancialServices: Math.max(0, nonFinancialApplications - 60) },
          { month: 'May', financialServices: Math.max(0, financialApplications - 30), nonFinancialServices: Math.max(0, nonFinancialApplications - 40) },
          { month: 'Jun', financialServices: Math.max(0, financialApplications - 20), nonFinancialServices: Math.max(0, nonFinancialApplications - 30) },
          { month: 'Jul', financialServices: Math.max(0, financialApplications - 10), nonFinancialServices: Math.max(0, nonFinancialApplications - 20) },
          { month: 'Aug', financialServices: Math.max(0, financialApplications - 5), nonFinancialServices: Math.max(0, nonFinancialApplications - 10) },
          { month: 'Sep', financialServices: financialApplications, nonFinancialServices: nonFinancialApplications }
        ]);
      } catch (error) {
        console.error('Failed to load performance data:', error);
      }
    };

    loadPerformanceData();
  }, []);

  return (
    <section className="pt-8">
      <h2 className="text-3xl font-semibold font-serif mb-6">
        How Are My Services Performing?
      </h2>
      <p className="max-w-3xl text-lg text-gray-600 mb-8">
        Analysis of application flow, approval rates, processing times,
        and overall performance metrics for your services.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <KPICard financialApps={financialApps} nonFinancialApps={nonFinancialApps} />
        <ApplicationsTrendCard trendData={trendData} />
      </div>
      <InsightsPanel />
    </section>
  );
};