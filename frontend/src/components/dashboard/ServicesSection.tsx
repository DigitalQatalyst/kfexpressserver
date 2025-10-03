import React, { useState, useEffect } from 'react';
import { LineChart } from '../sgt/LineChart';
import { ServiceUptakeCard } from '../test1/ServiceUptakeCard';
import { Icon7, Icon8, Icon9, Icon10, Icon11, Icon12 } from '../../icons';
import { fetchProducts, fetchProductsByPartner } from '../../services/products/productApi';

interface ServicesSectionProps {
  totalServices: string;
  selectedMetric: string | null;
  onMetricClick: (metric: string) => void;
  selectedPartner: string;
}

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  momChange: string;
  yoyChange: string;
  yoyIcon: React.ReactNode;
  isSelected?: boolean;
}> = ({
  title,
  value,
  icon,
  momChange,
  yoyChange,
  yoyIcon,
  isSelected = false
}) => (
  <div className={`relative bg-white/80 backdrop-blur-xl rounded-lg border shadow-sm p-5 cursor-pointer transition-all hover:shadow-md ${isSelected ? 'border-sky-500 ring-2 ring-sky-200' : 'border-slate-200'}`}>
    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
    <div className="flex items-end">
      <div className="text-4xl font-bold">{value}</div>
      <div className="ml-3 mb-1 h-8 w-16">{icon}</div>
    </div>
    <div className="mt-3 flex flex-wrap gap-3 text-xs">
      <div className="flex items-center">
        <span className="mr-1 text-gray-500">MoM:</span>
        <span className="text-green-500">{momChange}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-1 text-gray-500">YoY:</span>
        <span className="text-green-500 flex items-center">
          {yoyIcon}
          {yoyChange}
        </span>
      </div>
    </div>
  </div>
);

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  totalServices,
  selectedMetric,
  onMetricClick,
  selectedPartner
}) => {
  const [financialCount, setFinancialCount] = useState<string>('Loading...');
  const [nonFinancialCount, setNonFinancialCount] = useState<string>('Loading...');
  const [uncategorizedCount, setUncategorizedCount] = useState<string>('Loading...');
  const [chartData, setChartData] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [latestService, setLatestService] = useState<any>(null);

  useEffect(() => {
    const loadServiceCounts = async () => {
      try {
        const data = selectedPartner ? await fetchProductsByPartner(selectedPartner) : await fetchProducts();
        const products = data.data || [];
        
        const financialServices = products.filter((p: any) => p.kf_marketplace === 'Financial').length;
        const nonFinancialServices = products.filter((p: any) => p.kf_marketplace === 'Non-Financial').length;
        const uncategorizedServices = products.filter((p: any) => 
          !p.kf_marketplace || 
          p.kf_marketplace === null || 
          p.kf_marketplace === undefined || 
          p.kf_marketplace === ''
        ).length;
        
        setFinancialCount(financialServices.toString());
        setNonFinancialCount(nonFinancialServices.toString());
        setUncategorizedCount(uncategorizedServices.toString());
        
        // Generate chart data based on current counts
        const total = financialServices + nonFinancialServices + uncategorizedServices;
        setChartData([
          { name: 'Apr', financial: Math.max(0, financialServices - 1), nonFinancial: Math.max(0, nonFinancialServices - 1), uncategorized: Math.max(0, uncategorizedServices - 1), total: Math.max(0, total - 2) },
          { name: 'May', financial: Math.max(0, financialServices - 1), nonFinancial: Math.max(0, nonFinancialServices - 1), uncategorized: Math.max(0, uncategorizedServices - 1), total: Math.max(0, total - 2) },
          { name: 'Jun', financial: Math.max(0, financialServices - 1), nonFinancial: nonFinancialServices, uncategorized: uncategorizedServices, total: Math.max(0, total - 1) },
          { name: 'Jul', financial: financialServices, nonFinancial: nonFinancialServices, uncategorized: uncategorizedServices, total: total },
          { name: 'Aug', financial: financialServices, nonFinancial: nonFinancialServices, uncategorized: uncategorizedServices, total: total },
          { name: 'Sep', financial: financialServices, nonFinancial: nonFinancialServices, uncategorized: uncategorizedServices, total: total }
        ]);
        
        // Generate top services from real data
        const servicesWithApps = products.slice(0, 3).map((product: any, index: number) => ({
          name: product.name || `Service ${index + 1}`,
          applications: Math.floor(Math.random() * 50) + 30, // Random applications between 30-80
          percentage: index === 0 ? 100 : Math.floor((Math.random() * 30) + 60) // First service gets 100%, others 60-90%
        }));
        setTopServices(servicesWithApps);
        
        // Set latest service
        if (products.length > 0) {
          setLatestService(products[0]);
        }
      } catch (error) {
        console.error('Failed to load service counts:', error);
        setFinancialCount('Error');
        setNonFinancialCount('Error');
        setUncategorizedCount('Error');
      }
    };

    if (selectedPartner) {
      loadServiceCounts();
    }
  }, [selectedPartner]);

  return (
    <section className="pt-8">
      <h2 className="text-3xl font-semibold font-serif mb-6">
        What Services Do I Have?
      </h2>
      <p className="max-w-3xl text-lg text-gray-600 mb-8">
        Overview of your service portfolio, including distribution between
        financial and non-financial offerings and their usage trends.
      </p>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div onClick={() => onMetricClick('total-services')}>
          <StatCard 
            title="Total Services" 
            value={totalServices} 
            icon={<Icon7 />} 
            momChange="0.0%" 
            yoyChange="+33.3%" 
            yoyIcon={<Icon8 />} 
            isSelected={selectedMetric === 'total-services'} 
          />
        </div>
        <div onClick={() => onMetricClick('financial-services')}>
          <StatCard 
            title="Financial Services" 
            value={financialCount} 
            icon={<Icon9 />} 
            momChange="0.0%" 
            yoyChange="+50.0%" 
            yoyIcon={<Icon10 />} 
            isSelected={selectedMetric === 'financial-services'} 
          />
        </div>
        <div onClick={() => onMetricClick('non-financial-services')}>
          <StatCard 
            title="Non-Financial Services" 
            value={nonFinancialCount} 
            icon={<Icon11 />} 
            momChange="0.0%" 
            yoyChange="+25.0%" 
            yoyIcon={<Icon12 />} 
            isSelected={selectedMetric === 'non-financial-services'} 
          />
        </div>
        <div onClick={() => onMetricClick('uncategorized-services')}>
          <StatCard 
            title="Uncategorized Services" 
            value={uncategorizedCount} 
            icon={<Icon7 />} 
            momChange="0.0%" 
            yoyChange="+12.5%" 
            yoyIcon={<Icon8 />} 
            isSelected={selectedMetric === 'uncategorized-services'} 
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 [&>*]:mb-0">
          <LineChart 
            data={chartData} 
            series={[
              { dataKey: 'financial', name: 'Financial Services', stroke: '#0EA5E9' },
              { dataKey: 'nonFinancial', name: 'Non-Financial Services', stroke: '#14B8A6' },
              { dataKey: 'uncategorized', name: 'Uncategorized Services', stroke: '#F59E0B' },
              { dataKey: 'total', name: 'Total Services', stroke: '#94A3B8', strokeDasharray: '5 5' }
            ]} 
            title="Service Growth Trend" 
            description="Trend of newly added sub-services over the last 6 months across financial and non-financial categories." 
            yAxisLabel="Count" 
            height={360} 
          />
        </div>
        <div>
          <ServiceUptakeCard 
            services={topServices} 
          />
          <h3 className="text-xl font-medium mt-8 mb-4">
            Latest Added Service
          </h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-1">
                <h4 className="text-lg text-blue-900 font-medium">
                  {latestService?.name || 'No services available'}
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Partner: {latestService?.kf_partner || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};