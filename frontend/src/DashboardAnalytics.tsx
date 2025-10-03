import React, { useState, useRef, useEffect } from 'react';
import { PartnerInsightHeader } from './components/section1/PartnerInsightHeader';
import { ServicesSection } from './components/dashboard/ServicesSection';
import { PerformanceSection } from './components/dashboard/PerformanceSection';
import { UsersSection } from './components/dashboard/UsersSection';
import { FeedbackSection } from './components/dashboard/FeedbackSection';
import { Icon1, Icon2, Icon3, Icon4, Icon6 } from './icons';
import { fetchProducts } from './services/products/productApi';

interface DashboardAnalyticsProps {
  'data-id'?: string;
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  'data-id': dataId
}) => {
  const [activeSection, setActiveSection] = useState('services');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [totalServices, setTotalServices] = useState<string>('Loading...');
  const [partners, setPartners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
    console.log('Metric selected:', metric);
  };

  const handlePartnerChange = async (partner: string) => {
    setSelectedPartner(partner);
    console.log('Partner changed to:', partner);
    
    // Update total services for selected partner
    if (partner) {
      try {
        const { fetchProductsByPartner } = await import('./services/products/productApi');
        const data = await fetchProductsByPartner(partner);
        setTotalServices(data.totalCount.toString());
      } catch (error) {
        console.error('Failed to load partner data:', error);
        setTotalServices('Error');
      }
    } else {
      // Reset to all services if no partner selected
      try {
        const data = await fetchProducts();
        setTotalServices((data.totalCount || 0).toString());
      } catch (error) {
        console.error('Failed to load all data:', error);
        setTotalServices('Error');
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProducts();
        const count = data.totalCount || 0;
        setTotalServices(count.toString());
        
        // Load unique partners
        const products = data.data || [];
        const uniquePartners = [...new Set(products.map((p: any) => p.kf_partner).filter(Boolean))];
        setPartners(uniquePartners);
        
        // Set first partner as default if none selected
        if (!selectedPartner && uniquePartners.length > 0) {
          setSelectedPartner(uniquePartners[0]);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        setTotalServices('Error');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  return (
    <main data-id={dataId} className="relative w-full bg-white text-black">
      <PartnerInsightHeader 
        partnerName={selectedPartner || 'Select Partner'} 
        selectedPeriod="2023-09" 
        selectedRegion="All Regions" 
        onPartnerChange={handlePartnerChange} 
      />
      <div className="relative min-h-screen bg-white font-sans text-slate-900 pt-16">
        {/* Partner Selection Bar */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center gap-3">
              <label htmlFor="partner-select" className="text-sm font-medium text-gray-700">
                Select Partner:
              </label>
              <div className="relative">
                <select 
                  id="partner-select" 
                  value={selectedPartner} 
                  onChange={(e) => handlePartnerChange(e.target.value)} 
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent cursor-pointer"
                >
                  <option value="">Select Partner</option>
                  {partners.map(partner => (
                    <option key={partner} value={partner}>
                      {partner}
                    </option>
                  ))}
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
              <button 
                onClick={() => scrollToSection('services', servicesRef)} 
                className={`w-full flex items-start p-3 rounded-lg transition-colors ${
                  activeSection === 'services' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon1 className="mr-3 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-sm">Services</div>
                  <div className="text-xs opacity-75">What Services Do I Have?</div>
                </div>
              </button>
              <button 
                onClick={() => scrollToSection('performance', performanceRef)} 
                className={`w-full flex items-start p-3 rounded-lg transition-colors ${
                  activeSection === 'performance' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon2 className="mr-3 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-sm">Performance</div>
                  <div className="text-xs opacity-75">How Are My Services Performing?</div>
                </div>
              </button>
              <button 
                onClick={() => scrollToSection('users', usersRef)} 
                className={`w-full flex items-start p-3 rounded-lg transition-colors ${
                  activeSection === 'users' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon3 className="mr-3 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-sm">Users</div>
                  <div className="text-xs opacity-75">Who Is Using My Services?</div>
                </div>
              </button>
              <button 
                onClick={() => scrollToSection('feedback', feedbackRef)} 
                className={`w-full flex items-start p-3 rounded-lg transition-colors ${
                  activeSection === 'feedback' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
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
              <div ref={servicesRef} id="services">
                <ServicesSection 
                  totalServices={totalServices}
                  selectedMetric={selectedMetric}
                  onMetricClick={handleMetricClick}
                  selectedPartner={selectedPartner}
                />
              </div>
            )}

            {/* Performance Section */}
            {activeSection === 'performance' && (
              <div ref={performanceRef} id="performance">
                <PerformanceSection />
              </div>
            )}

            {/* Users Section */}
            {activeSection === 'users' && (
              <div ref={usersRef} id="smeProfile">
                <UsersSection />
              </div>
            )}

            {/* Feedback Section */}
            {activeSection === 'feedback' && (
              <div ref={feedbackRef} id="feedback">
                <FeedbackSection />
              </div>
            )}
          </main>
        </div>
      </div>
    </main>
  );
};