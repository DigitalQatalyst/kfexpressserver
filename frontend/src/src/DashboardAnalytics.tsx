import React, { useState, useRef, cloneElement, Component } from 'react';
import { PartnerInsightHeader } from '../components/section1/PartnerInsightHeader';
import { LineChart } from '../components/sgt/LineChart';
import { StackedBarChart } from '../components/ftru/StackedBarChart';
import { CustomerSatisfactionChart } from '../components/cst/CustomerSatisfactionChart';
import { UserAnalytics } from '../components/test/UserAnalytics';
import { ServiceUptakeCard } from '../components/test1/ServiceUptakeCard';
import { ServiceUsageTrend } from '../components/sut/ServiceUsageTrend';
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8, Icon9, Icon10, Icon11, Icon12, Icon13, Icon14, Icon15, Icon16, Icon17, Icon18, Icon19, Icon20, Icon21, Icon22, Icon23, Icon24, Icon25, Icon26, Icon27, Icon28, Icon29, Icon30, Icon31, Icon32, Icon33, Icon34, Icon35, Icon36, Icon37, Icon38, Icon44, Icon50, Icon56, Icon62, Icon63, Icon64, Icon65, Icon66, Icon67 } from './icons';
/**
 * IMPORTANT: DATA SOURCE NOTES
 * ============================
 * This component currently uses MOCK/SAMPLE DATA for demonstration purposes.
 *
 * FINAL IMPLEMENTATION:
 * All charts, KPIs, and metrics must be sourced directly from Microsoft Dynamics 365 Dataverse.
 *
 * DATAVERSE MAPPING:
 * - Services data → Custom entity: new_serviceentity
 * - Applications data → Custom entity: new_application
 * - SME profiles → Standard entity: account (with custom fields)
 * - Reviews/Feedback → Standard entity: feedback (with custom fields)
 * - KPIs → Calculated from aggregated Dataverse queries
 *
 * See DATAVERSE_MAPPING.md for detailed field mappings and entity relationships.
 */
interface DashboardAnalyticsProps {
  'data-id'?: string;
}
export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  'data-id': dataId
}) => {
  const [activeSection, setActiveSection] = useState('services');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState('acme-corp');
  const partners = [{
    id: 'acme-corp',
    name: 'Acme Corporation'
  }, {
    id: 'tech-innovations',
    name: 'Tech Innovations Ltd'
  }, {
    id: 'global-ventures',
    name: 'Global Ventures Inc'
  }, {
    id: 'smart-solutions',
    name: 'Smart Solutions Group'
  }, {
    id: 'future-enterprises',
    name: 'Future Enterprises'
  }];
  const servicesRef = useRef<HTMLElement>(null);
  const performanceRef = useRef<HTMLElement>(null);
  const usersRef = useRef<HTMLElement>(null);
  const feedbackRef = useRef<HTMLElement>(null);
  const scrollToSection = (sectionId: string, ref: React.RefObject<HTMLElement>) => {
    setActiveSection(sectionId);
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const handleMetricClick = (metric: string) => {
    setSelectedMetric(metric === selectedMetric ? null : metric);
    // In a real implementation, this would highlight related charts
    console.log('Metric selected:', metric);
  };
  const handlePartnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPartner(e.target.value);
    // In a real implementation, this would filter the data by partner
    console.log('Partner changed to:', e.target.value);
  };
  const currentPartner = partners.find(p => p.id === selectedPartner);
  return <main data-id={dataId} className="relative w-full bg-white text-black">
      <PartnerInsightHeader partnerName={currentPartner?.name || 'Select Partner'} selectedPeriod="2023-09" selectedRegion="All Regions" onPartnerChange={handlePartnerChange} partners={partners} selectedPartnerId={selectedPartner} />
      <div className="relative min-h-screen bg-white font-sans text-slate-900 pt-16">
        {/* Partner Selection Bar */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center gap-3">
              <label htmlFor="partner-select" className="text-sm font-medium text-gray-700">
                Select Partner:
              </label>
              <div className="relative">
                <select id="partner-select" value={selectedPartner} onChange={handlePartnerChange} className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent cursor-pointer">
                  {partners.map(partner => <option key={partner.id} value={partner.id}>
                      {partner.name}
                    </option>)}
                </select>
                <Icon6 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        {/* Layout with Sidebar */}
        <div className="flex">
          {/* Sidebar */}
          <aside className="fixed left-0 top-16 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto z-30">
            <nav className="p-4 space-y-2">
              <button onClick={() => scrollToSection('services', servicesRef)} className={`w-full flex items-start p-3 rounded-lg transition-colors ${activeSection === 'services' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <Icon1 className="mr-3 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-sm">Services</div>
                  <div className="text-xs opacity-75">What Services Do I Have?</div>
                </div>
              </button>
              <button onClick={() => scrollToSection('performance', performanceRef)} className={`w-full flex items-start p-3 rounded-lg transition-colors ${activeSection === 'performance' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <Icon2 className="mr-3 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-sm">Performance</div>
                  <div className="text-xs opacity-75">How Are My Services Performing?</div>
                </div>
              </button>
              <button onClick={() => scrollToSection('users', usersRef)} className={`w-full flex items-start p-3 rounded-lg transition-colors ${activeSection === 'users' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <Icon3 className="mr-3 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-sm">Users</div>
                  <div className="text-xs opacity-75">Who Is Using My Services?</div>
                </div>
              </button>
              <button onClick={() => scrollToSection('feedback', feedbackRef)} className={`w-full flex items-start p-3 rounded-lg transition-colors ${activeSection === 'feedback' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <Icon4 className="mr-3 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-sm">Feedback</div>
                  <div className="text-xs opacity-75">How Do SMEs Feel About My Services?</div>
                </div>
              </button>
            </nav>
          </aside>
          {/* Main Content */}
          <main className="ml-64 flex-1 px-6 py-8">
            {/* Services Section */}
            {activeSection === 'services' && (
              <section ref={servicesRef} id="services" className="pt-8">
                <h2 className="text-3xl font-semibold font-serif mb-6">
                  What Services Do I Have?
                </h2>
                <p className="max-w-3xl text-lg text-gray-600 mb-8">
                  Overview of your service portfolio, including distribution between
                  financial and non-financial offerings and their usage trends.
                </p>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div onClick={() => handleMetricClick('total-services')}>
                    <StatCard title="Total Services" value="8" icon={<Icon7 />} momChange="0.0%" yoyChange="+33.3%" yoyIcon={<Icon8 />} isSelected={selectedMetric === 'total-services'} />
                  </div>
                  <div onClick={() => handleMetricClick('financial-services')}>
                    <StatCard title="Financial Services" value="3" icon={<Icon9 />} momChange="0.0%" yoyChange="+50.0%" yoyIcon={<Icon10 />} isSelected={selectedMetric === 'financial-services'} />
                  </div>
                  <div onClick={() => handleMetricClick('non-financial-services')}>
                    <StatCard title="Non-Financial Services" value="5" icon={<Icon11 />} momChange="0.0%" yoyChange="+25.0%" yoyIcon={<Icon12 />} isSelected={selectedMetric === 'non-financial-services'} />
                  </div>
                </div>
                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                  <div className="lg:col-span-2 [&>*]:mb-0">
                    <LineChart data={[{
                    name: 'Apr',
                    financial: 3,
                    nonFinancial: 5,
                    total: 8
                  }, {
                    name: 'May',
                    financial: 3,
                    nonFinancial: 5,
                    total: 8
                  }, {
                    name: 'Jun',
                    financial: 3,
                    nonFinancial: 5,
                    total: 8
                  }, {
                    name: 'Jul',
                    financial: 3,
                    nonFinancial: 6,
                    total: 9
                  }, {
                    name: 'Aug',
                    financial: 3,
                    nonFinancial: 6,
                    total: 9
                  }, {
                    name: 'Sep',
                    financial: 4,
                    nonFinancial: 6,
                    total: 10
                  }]} series={[{
                    dataKey: 'financial',
                    name: 'Financial Services',
                    stroke: '#0EA5E9'
                  }, {
                    dataKey: 'nonFinancial',
                    name: 'Non-Financial Services',
                    stroke: '#14B8A6'
                  }, {
                    dataKey: 'total',
                    name: 'Total Services',
                    stroke: '#94A3B8',
                    strokeDasharray: '5 5'
                  }]} title="Service Growth Trend" description="Trend of newly added sub-services over the last 6 months across financial and non-financial categories." yAxisLabel="Count" height={360} />
                  </div>
                  <div>
                    <ServiceUptakeCard services={[{
                    name: 'Industry Networking Events',
                    applications: 85,
                    percentage: 100
                  }, {
                    name: 'Startup Seed Grant',
                    applications: 68,
                    percentage: 80
                  }, {
                    name: 'Digital Transformation Workshop',
                    applications: 52,
                    percentage: 61
                  }]} />
                    <h3 className="text-xl font-medium mt-8 mb-4">
                      Latest Added Service
                    </h3>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h4 className="text-lg text-blue-900 font-medium">
                            Digital Transformation Workshop
                          </h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Added: Aug 2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Performance Section */}
            {activeSection === 'performance' && (
              <section ref={performanceRef} id="performance" className="pt-8">
                <h2 className="text-3xl font-semibold font-serif mb-6">
                  How Are My Services Performing?
                </h2>
                <p className="max-w-3xl text-lg text-gray-600 mb-8">
                  Analysis of application flow, approval rates, processing times,
                  and overall performance metrics for your services.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <KPICard />
                  <ApplicationsTrendCard />
                </div>
                <InsightsPanel />
              </section>
            )}

            {/* Users Section */}
            {activeSection === 'users' && (
              <section ref={usersRef} id="smeProfile" className="pt-8">
                <h2 className="text-3xl font-semibold font-serif mb-6">
                  Who Is Using My Services?
                </h2>
                <p className="max-w-3xl text-lg text-gray-600 mb-8">
                  Profile of SMEs engaging with your services, including size,
                  sector, stage, and regional distribution.
                </p>
                <SMEProfileDashboard />
                <UserAnalytics title="First-time vs Repeat Users" data={[{
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
              }]} insights={[{
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
              }]} footerText="Repeat user rate has increased by 13 percentage points over the last 6 months, indicating growing loyalty and satisfaction." />
              </section>
            )}

            {/* Feedback Section */}
            {activeSection === 'feedback' && (
              <section ref={feedbackRef} id="feedback" className="pt-8">
                <h2 className="text-3xl font-semibold font-serif mb-6">
                  How Do SMEs Feel About My Services?
                </h2>
                <p className="max-w-3xl text-lg text-gray-600 mb-8">
                  Analysis of customer satisfaction, feedback themes, and detailed
                  reviews from SMEs using your services.
                </p>
                <CustomerSatisfactionChart overallRating={4.2} improvement={0.3} summaryText="Overall satisfaction has increased by 7.5% over the last 6 months." />
                <ReviewsPanel />
                <FeedbackInsights />
              </section>
            )}
          </main>
        </div>
      </div>
    </main>;
};
// ... existing code ...
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
}) => <div className={`relative bg-white/80 backdrop-blur-xl rounded-lg border shadow-sm p-5 cursor-pointer transition-all hover:shadow-md ${isSelected ? 'border-sky-500 ring-2 ring-sky-200' : 'border-slate-200'}`}>
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
  </div>;
// ... existing code ...
const TopServicesList = () => {
  const services = [{
    name: 'Industry Networking Events',
    applications: 85,
    width: '100%'
  }, {
    name: 'Startup Seed Grant',
    applications: 68,
    width: '80%'
  }, {
    name: 'Digital Transformation Workshop',
    applications: 52,
    width: '61%'
  }];
  return <div>
      {services.map((service, idx) => <div key={idx} className={idx > 0 ? 'mt-6' : ''}>
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-sky-500 to-sky-400 text-white text-sm font-medium shadow-sm">
              {idx + 1}
            </div>
            <h4 className="ml-3 text-base font-medium flex-1">
              {service.name}
            </h4>
            <div className="text-sm font-medium text-gray-900">
              {service.applications} applications
            </div>
          </div>
          <div className="ml-10">
            <div className="h-2.5 w-full max-w-xs bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full" style={{
            width: service.width
          }} />
            </div>
          </div>
        </div>)}
    </div>;
};
// ... existing code ...
const InsightsPanel = () => {
  const insights = [{
    text: '60% conversion rate from start to fulfillment, up 9.1% year-over-year',
    type: 'positive' as const,
    icon: <Icon17 />
  }, {
    text: 'Financial services take 2.5x longer to process than non-financial services',
    type: 'neutral' as const,
    icon: <Icon18 />
  }, {
    text: 'Advisory services have highest approval rate at 95%',
    type: 'positive' as const,
    icon: <Icon19 />
  }, {
    text: 'Loan applications have lowest approval rate at 72%',
    type: 'negative' as const,
    icon: <Icon20 />
  }, {
    text: 'Average time to decision reduced by 32.7% compared to last year',
    type: 'positive' as const,
    icon: <Icon21 />
  }];
  return <div className="bg-gradient-to-br from-teal-500 to-sky-500 rounded-lg border border-slate-200 shadow-sm backdrop-blur-xl p-6">
      <h3 className="text-xl font-normal font-serif mb-4">
        Performance Insights
      </h3>
      <div className="flex flex-wrap gap-3">
        {insights.map((insight, idx) => <InsightBadge key={idx} {...insight} />)}
      </div>
    </div>;
};
const InsightBadge: React.FC<{
  text: string;
  type: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}> = ({
  text,
  type,
  icon
}) => {
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
  return <div className={`flex items-start ${bgColors[type]} border rounded-full px-3 py-1.5 text-sm`}>
      <span className={`mt-0.5 flex-shrink-0 ${iconColors[type]}`}>
        {cloneElement(icon as React.ReactElement, {
        className: 'block mr-1.5'
      })}
      </span>
      <span>{text}</span>
    </div>;
};
// KPI Card Component
const KPICard = () => <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-slate-200 shadow-sm p-6">
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
            <div className="text-3xl font-bold text-blue-900">350</div>
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
            <div className="text-3xl font-bold text-purple-900">780</div>
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
  </div>;
// Applications Trend Card Component
const ApplicationsTrendCard = () => <ServiceUsageTrend data={[{
  month: 'Apr',
  financialServices: 80,
  nonFinancialServices: 140
}, {
  month: 'May',
  financialServices: 100,
  nonFinancialServices: 150
}, {
  month: 'Jun',
  financialServices: 100,
  nonFinancialServices: 155
}, {
  month: 'Jul',
  financialServices: 105,
  nonFinancialServices: 160
}, {
  month: 'Aug',
  financialServices: 115,
  nonFinancialServices: 170
}, {
  month: 'Sep',
  financialServices: 120,
  nonFinancialServices: 175
}]} title="Service Usage Trend" description="" height={256} />;
// ... existing code ...
const SMEProfileDashboard = () => <div className="mb-8 bg-white rounded-lg border border-slate-200 shadow-sm p-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      SME Profile Dashboard
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DistributionCard title="Size Distribution" items={[{
      label: 'Micro (1-9)',
      value: 45
    }, {
      label: 'Small (10-49)',
      value: 40
    }, {
      label: 'Medium (50-249)',
      value: 15
    }]} color="blue" />
      <DistributionCard title="Sector Distribution" items={[{
      label: 'Technology',
      value: 35
    }, {
      label: 'Retail',
      value: 25
    }, {
      label: 'Manufacturing',
      value: 20
    }, {
      label: 'Services',
      value: 15
    }, {
      label: 'Other',
      value: 5
    }]} color="purple" />
      <DistributionCard title="Business Stage" items={[{
      label: 'Startup',
      value: 45
    }, {
      label: 'Growth',
      value: 35
    }, {
      label: 'Mature',
      value: 20
    }]} color="green" />
      <DistributionCard title="Region Distribution" items={[{
      label: 'Dubai',
      value: 45
    }, {
      label: 'Abu Dhabi',
      value: 30
    }, {
      label: 'Sharjah',
      value: 15
    }, {
      label: 'Others',
      value: 10
    }]} color="amber" />
    </div>
  </div>;
const DistributionCard: React.FC<{
  title: string;
  items: Array<{
    label: string;
    value: number;
  }>;
  color: 'blue' | 'purple' | 'green' | 'amber';
}> = ({
  title,
  items,
  color
}) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
    amber: 'bg-amber-600'
  };
  return <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm text-gray-700 mb-3">{title}</h4>
      <div>
        {items.map((item, idx) => <div key={idx} className={idx > 0 ? 'mt-3' : ''}>
            <div className="flex items-center justify-between mb-1 text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">{item.value}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full ${colorMap[color]} rounded-full`} style={{
            width: `${item.value}%`
          }} />
            </div>
          </div>)}
      </div>
    </div>;
};
// ... existing code ...
const UserComparisonChart = () => <div className="mb-10 bg-white/80 backdrop-blur-xl rounded-lg border border-slate-200 shadow-sm p-6">
    <h3 className="text-xl font-medium mb-6">First-time vs Repeat Users</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-64">
        <StackedBarChart data={[{
        month: 'Apr',
        repeatUsers: 55,
        firstTimeUsers: 45
      }, {
        month: 'May',
        repeatUsers: 58,
        firstTimeUsers: 42
      }, {
        month: 'Jun',
        repeatUsers: 60,
        firstTimeUsers: 40
      }, {
        month: 'Jul',
        repeatUsers: 62,
        firstTimeUsers: 38
      }, {
        month: 'Aug',
        repeatUsers: 65,
        firstTimeUsers: 35
      }, {
        month: 'Sep',
        repeatUsers: 68,
        firstTimeUsers: 32
      }]} height={256} />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-lg mb-4">Key Insights</h4>
        <div>
          <MetricBar label="Repeat User Rate" value={68} color="sky" />
          <MetricBar label="Avg. Services Per SME" value={60} color="sky" />
          <MetricBar label="Cross-Service Adoption" value={42} color="sky" />
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Repeat user rate has increased by 13 percentage points over the last 6
          months, indicating growing loyalty and satisfaction.
        </p>
      </div>
    </div>
  </div>;
const MetricBar: React.FC<{
  label: string;
  value: number;
  color: string;
}> = ({
  label,
  value,
  color
}) => <div className="mb-4">
    <div className="flex items-center justify-between mb-1 text-sm">
      <span className="font-medium">{label}</span>
      <span className="font-bold text-sky-500">{value}%</span>
    </div>
    <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
      <div className="h-full bg-sky-500 rounded-full" style={{
      width: `${value}%`
    }} />
    </div>
  </div>;
// ... existing code ...
const ReviewsPanel = () => {
  const reviews = [{
    rating: 5,
    date: 'Sep 15, 2023',
    service: 'Business Advisory Program',
    text: 'The advisor was incredibly knowledgeable and provided actionable insights that helped us restructure our business model. Highly recommended!',
    sentiment: 'positive',
    icon: <Icon38 />
  }, {
    rating: 3,
    date: 'Sep 10, 2023',
    service: 'SME Growth Loan',
    text: 'The funding helped us expand, but the documentation requirements were excessive. Simplifying the process would make a big difference.',
    sentiment: 'neutral',
    icon: <Icon44 />
  }, {
    rating: 4,
    date: 'Sep 5, 2023',
    service: 'Digital Transformation Workshop',
    text: 'Great content and practical exercises. Would have preferred more follow-up support after the workshop concluded.',
    sentiment: 'positive',
    icon: <Icon50 />
  }, {
    rating: 5,
    date: 'Aug 28, 2023',
    service: 'Industry Networking Events',
    text: 'Made valuable connections that led to new business opportunities. The format was perfect for meaningful interactions.',
    sentiment: 'positive',
    icon: <Icon56 />
  }, {
    rating: 2,
    date: 'Aug 22, 2023',
    service: 'Startup Seed Grant',
    text: 'Approval process took much longer than indicated. Better communication about timeline expectations would help applicants plan accordingly.',
    sentiment: 'negative',
    icon: <Icon62 />
  }];
  return <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium">SME Reviews</h3>
      </div>
      <div className="max-h-96 overflow-y-auto pr-2">
        {reviews.map((review, idx) => <ReviewCard key={idx} {...review} isFirst={idx === 0} />)}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>Showing 5 of 120 reviews</span>
        <button className="text-sky-500 hover:text-sky-600 hover:underline transition-colors">
          View All Reviews
        </button>
      </div>
    </div>;
};
const ReviewCard: React.FC<{
  rating: number;
  date: string;
  service: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  icon: React.ReactNode;
  isFirst: boolean;
}> = ({
  rating,
  date,
  service,
  text,
  sentiment,
  icon,
  isFirst
}) => {
  const sentimentColors: Record<string, string> = {
    positive: 'text-green-600',
    neutral: 'text-blue-600',
    negative: 'text-red-600'
  };
  return <div className={`bg-gray-50 rounded-lg p-4 ${!isFirst ? 'mt-5' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex mb-1">
            {[...Array(5)].map((_, i) => <Icon33 key={i} className={`w-3.5 h-3.5 mr-0.5 ${i < rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} />)}
          </div>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <span className="bg-blue-100 text-blue-900 text-xs font-medium px-2 py-1 rounded-full">
          {service}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{text}</p>
      <div className={`flex items-center text-xs font-medium ${sentimentColors[sentiment]}`}>
        {cloneElement(icon as React.ReactElement, {
        className: 'block mr-1 w-3 h-3'
      })}
        <span className="capitalize">{sentiment}</span>
      </div>
    </div>;
};
// ... existing code ...
const FeedbackInsights = () => {
  const insights = [{
    text: 'Non-financial services consistently receive higher satisfaction ratings than financial services',
    icon: <Icon63 />,
    type: 'neutral' as const
  }, {
    text: 'Documentation complexity is the most common negative feedback for financial services',
    icon: <Icon64 />,
    type: 'negative' as const
  }, {
    text: 'Advisory services receive the highest praise for staff expertise and knowledge',
    icon: <Icon65 />,
    type: 'positive' as const
  }, {
    text: 'SMEs request more post-service follow-up and continued support across all service types',
    icon: <Icon66 />,
    type: 'neutral' as const
  }, {
    text: 'Overall satisfaction has increased by 7.5% in the last 6 months',
    icon: <Icon67 />,
    type: 'positive' as const
  }];
  return <div className="mt-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-lg border border-slate-200 shadow-sm backdrop-blur-xl p-6">
      <h3 className="text-xl font-normal font-serif mb-4">Feedback Insights</h3>
      <div className="flex flex-wrap gap-3">
        {insights.map((insight, idx) => <InsightBadge key={idx} {...insight} />)}
      </div>
    </div>;
};