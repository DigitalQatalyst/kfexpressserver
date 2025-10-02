import React from 'react';
interface Service {
  name: string;
  applications: number;
  percentage: number;
}
interface LatestService {
  name: string;
  addedDate: string;
}
export interface ServiceUptakeCardProps {
  services: Service[];
  latestService?: LatestService;
  'data-id'?: string;
}
export function ServiceUptakeCard({
  services,
  latestService,
  'data-id': dataId
}: ServiceUptakeCardProps) {
  return <div data-id={dataId} className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-lg border border-slate-300 shadow-sm p-6">
      <h3 className="text-xl font-medium mb-6">Top Services by Uptake</h3>
      <div className="space-y-6">
        {services.map((service, index) => <div key={index}>
            <div className="flex items-center mb-2">
              <div className="flex items-center justify-center h-7 w-7 flex-shrink-0 bg-gradient-to-r from-sky-500 to-sky-500/80 rounded-full text-sm font-medium text-white shadow-sm">
                {index + 1}
              </div>
              <div className="ml-3 flex-1">
                <h4 className="text-base font-medium">{service.name}</h4>
              </div>
              <div className="text-sm font-medium text-gray-900 ml-auto">
                {service.applications} applications
              </div>
            </div>
            <div className="ml-10">
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 to-sky-500/80 rounded-full transition-all duration-300" style={{
              width: `${service.percentage}%`
            }} />
              </div>
            </div>
          </div>)}
      </div>
      {latestService && <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-4">Latest Added Service</h4>
          <div className="flex items-start">
            <div className="flex-1">
              <h4 className="text-lg text-blue-800 font-medium">
                {latestService.name}
              </h4>
              <p className="text-sm text-blue-600 mt-0">
                Added: {latestService.addedDate}
              </p>
            </div>
          </div>
        </div>}
    </div>;
}