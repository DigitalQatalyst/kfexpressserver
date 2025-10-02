import React from 'react';
import { Calendar, ChevronDown, Globe } from 'lucide-react';
interface PartnerInsightHeaderProps {
  'data-id'?: string;
  partnerName?: string;
  selectedPeriod?: string;
  selectedRegion?: string;
  onPeriodChange?: () => void;
  onRegionChange?: () => void;
}
export const PartnerInsightHeader: React.FC<PartnerInsightHeaderProps> = ({
  'data-id': dataId,
  partnerName = 'partner-001',
  selectedPeriod = '2023-09',
  selectedRegion = 'All Regions',
  onPeriodChange,
  onRegionChange
}) => {
  return <header data-id={dataId} className="fixed left-0 right-0 top-0 z-50 h-16 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 w-full">
      <div className="mx-auto max-w-screen-xl h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold font-serif">
            Partner Insight Atlas
          </h1>
          <div className="h-6 w-px bg-slate-200" />
          <div className="text-sm font-medium text-slate-900">
            {partnerName}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onPeriodChange} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm transition-all">
            <Calendar className="w-3.5 h-3.5" />
            <span>{selectedPeriod}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button onClick={onRegionChange} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm transition-all">
            <Globe className="w-3.5 h-3.5" />
            <span>{selectedRegion}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 ml-3">
            <span className="text-xs text-gray-500">Peer Benchmark:</span>
            <span className="px-2 py-0.5 bg-sky-500/10 text-sky-500 text-xs font-medium rounded-full">
              Top Quartile
            </span>
            <span className="px-2 py-0.5 bg-teal-500/10 text-teal-500 text-xs font-medium rounded-full">
              Median
            </span>
          </div>
        </div>
      </div>
    </header>;
};