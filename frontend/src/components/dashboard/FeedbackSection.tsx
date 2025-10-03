import React, { cloneElement } from 'react';
import { CustomerSatisfactionChart } from '../cst/CustomerSatisfactionChart';
import { Icon33, Icon38, Icon44, Icon50, Icon56, Icon62, Icon63, Icon64, Icon65, Icon66, Icon67 } from '../../icons';

const ReviewCard: React.FC<{
  rating: number;
  date: string;
  service: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  icon: React.ReactNode;
  isFirst: boolean;
}> = ({ rating, date, service, text, sentiment, icon, isFirst }) => {
  const sentimentColors: Record<string, string> = {
    positive: 'text-green-600',
    neutral: 'text-blue-600',
    negative: 'text-red-600'
  };
  
  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${!isFirst ? 'mt-5' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex mb-1">
            {[...Array(5)].map((_, i) => (
              <Icon33 
                key={i} 
                className={`w-3.5 h-3.5 mr-0.5 ${i < rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <span className="bg-blue-100 text-blue-900 text-xs font-medium px-2 py-1 rounded-full">
          {service}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{text}</p>
      <div className={`flex items-center text-xs font-medium ${sentimentColors[sentiment]}`}>
        {cloneElement(icon as React.ReactElement, { className: 'block mr-1 w-3 h-3' })}
        <span className="capitalize">{sentiment}</span>
      </div>
    </div>
  );
};

const ReviewsPanel = () => {
  const reviews = [
    {
      rating: 5,
      date: 'Sep 15, 2023',
      service: 'Business Advisory Program',
      text: 'The advisor was incredibly knowledgeable and provided actionable insights that helped us restructure our business model. Highly recommended!',
      sentiment: 'positive' as const,
      icon: <Icon38 />
    },
    {
      rating: 3,
      date: 'Sep 10, 2023',
      service: 'SME Growth Loan',
      text: 'The funding helped us expand, but the documentation requirements were excessive. Simplifying the process would make a big difference.',
      sentiment: 'neutral' as const,
      icon: <Icon44 />
    },
    {
      rating: 4,
      date: 'Sep 5, 2023',
      service: 'Digital Transformation Workshop',
      text: 'Great content and practical exercises. Would have preferred more follow-up support after the workshop concluded.',
      sentiment: 'positive' as const,
      icon: <Icon50 />
    },
    {
      rating: 5,
      date: 'Aug 28, 2023',
      service: 'Industry Networking Events',
      text: 'Made valuable connections that led to new business opportunities. The format was perfect for meaningful interactions.',
      sentiment: 'positive' as const,
      icon: <Icon56 />
    },
    {
      rating: 2,
      date: 'Aug 22, 2023',
      service: 'Startup Seed Grant',
      text: 'Approval process took much longer than indicated. Better communication about timeline expectations would help applicants plan accordingly.',
      sentiment: 'negative' as const,
      icon: <Icon62 />
    }
  ];
  
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium">SME Reviews</h3>
      </div>
      <div className="max-h-96 overflow-y-auto pr-2">
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} {...review} isFirst={idx === 0} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>Showing 5 of 120 reviews</span>
        <button className="text-sky-500 hover:text-sky-600 hover:underline transition-colors">
          View All Reviews
        </button>
      </div>
    </div>
  );
};

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

const FeedbackInsights = () => {
  const insights = [
    {
      text: 'Non-financial services consistently receive higher satisfaction ratings than financial services',
      icon: <Icon63 />,
      type: 'neutral' as const
    },
    {
      text: 'Documentation complexity is the most common negative feedback for financial services',
      icon: <Icon64 />,
      type: 'negative' as const
    },
    {
      text: 'Advisory services receive the highest praise for staff expertise and knowledge',
      icon: <Icon65 />,
      type: 'positive' as const
    },
    {
      text: 'SMEs request more post-service follow-up and continued support across all service types',
      icon: <Icon66 />,
      type: 'neutral' as const
    },
    {
      text: 'Overall satisfaction has increased by 7.5% in the last 6 months',
      icon: <Icon67 />,
      type: 'positive' as const
    }
  ];
  
  return (
    <div className="mt-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-lg border border-slate-200 shadow-sm backdrop-blur-xl p-6">
      <h3 className="text-xl font-normal font-serif mb-4">Feedback Insights</h3>
      <div className="flex flex-wrap gap-3">
        {insights.map((insight, idx) => (
          <InsightBadge key={idx} {...insight} />
        ))}
      </div>
    </div>
  );
};

export const FeedbackSection: React.FC = () => {
  return (
    <section className="pt-8">
      <h2 className="text-3xl font-semibold font-serif mb-6">
        How Do SMEs Feel About My Services?
      </h2>
      <p className="max-w-3xl text-lg text-gray-600 mb-8">
        Analysis of customer satisfaction, feedback themes, and detailed
        reviews from SMEs using your services.
      </p>
      <CustomerSatisfactionChart 
        overallRating={4.2} 
        improvement={0.3} 
        summaryText="Overall satisfaction has increased by 7.5% over the last 6 months." 
      />
      <ReviewsPanel />
      <FeedbackInsights />
    </section>
  );
};