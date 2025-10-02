## Exports

- `DashboardAnalytics` - Named export, React functional component
  - Signature: `function DashboardAnalytics(props: DashboardAnalyticsProps): JSX.Element`

## Component Props & Types

```typescript
interface DashboardAnalyticsProps {
  'data-id'?: string
}
```

- `data-id` is optional - applied as a data attribute on the root main element for testing or tracking purposes
- No default values specified
- The prop is passed directly to the main element as `data-id={dataId}`

## Import Patterns

```typescript
import { DashboardAnalytics } from './src/index'
```

## Usage Requirements

No special requirements - the component is completely self-contained:
- No React context providers required
- No external state management needed  
- All event handlers are presentational (console.log only)
- No refs or imperative APIs exposed
- No error boundaries required
- Uses standard DOM APIs only

The component imports and uses several child components (`PartnerInsightHeader`, `LineChart`, `StackedBarChart`, `CustomerSatisfactionChart`, `UserAnalytics`, `ServiceUptakeCard`, `ServiceUsageTrend`) and icon components, but these are handled internally.

## Component Behavior

The DashboardAnalytics component is a comprehensive analytics dashboard with these behaviors:

- **Internal State Management**: Uses `useState` to track:
  - `activeSection` (string) - currently active navigation tab, defaults to 'services'
  - `selectedMetric` (string | null) - clicked metric card for highlighting, defaults to null
  - `selectedPartner` (string) - partner filter selection, defaults to 'acme-corp'

- **Navigation Behavior**: Sticky navigation with smooth scroll to sections:
  - Four navigation buttons (Services, Performance, Users, Feedback) with active state highlighting
  - Each button calls `scrollToSection()` which updates `activeSection` and scrolls to the corresponding ref
  - Active section gets `bg-sky-500 text-white` styling, inactive gets `text-gray-600 hover:bg-gray-100`

- **Metric Selection**: 
  - Stat cards are clickable and call `handleMetricClick()` 
  - Selected metric gets border highlighting (`border-sky-500 ring-2 ring-sky-200`)
  - Clicking same metric deselects it (toggles between selected and null)

- **Partner Filtering**:
  - Header component receives `selectedPartner` prop and `onPartnerChange` callback
  - `handlePartnerChange()` updates selectedPartner state and logs the change (no actual data filtering)

- **Mock Data Display**: All charts and metrics show hardcoded demo data with comments indicating they should be replaced with Microsoft Dynamics 365 Dataverse queries

- **Responsive Layout**: Automatically adjusts grid layouts and text visibility based on screen size using Tailwind responsive classes

- **No Side Effects**: No data fetching, timers, or subscriptions - purely presentational with mock interactions

- **Section Scrolling**: Uses `useRef` hooks for four sections (services, performance, users, feedback) with smooth scrolling behavior and scroll margin top offset of 128px

## Layout & Visual Behavior

**Container Structure:**
- Root main element with full width and white background (`w-full bg-white text-black`)
- Inner container with minimum full screen height (`min-h-screen`) and 64px top padding (`pt-16`)
- Max width of 1280px (`max-w-7xl`) centered with 24px horizontal padding (`px-6`)

**Sticky Navigation:**
- Positioned at 64px from top (`top-16`) with z-index 30 (`z-30`)
- Height of 56px (`h-14`) with white background, shadow, and bottom border
- Navigation buttons have responsive text hiding on mobile (`hidden sm:block` for full text, `sm:hidden` for short text)

**Section Layout:**
- Four main sections with 64px top margin (`mt-16`) and 128px scroll margin (`scroll-mt-32`)
- Section headings are `text-3xl font-semibold font-serif` with 24px bottom margin (`mb-6`)
- Description paragraphs are `text-lg text-gray-600` with 32px bottom margin (`mb-8`)
- Each section has proper spacing with 32px top padding (`pt-8`)

**Grid Layouts:**
- Stats cards: 1 column → 3 columns at md breakpoint (768px) with 24px gap (`gap-6`)
- Charts section: 1 column → 2/3 split at lg breakpoint (1024px) with 32px gap (`gap-8`)
- Performance section: 1 → 2 columns at lg breakpoint with 32px gap
- SME profile cards: 1 → 2 → 4 columns progression with 24px gap
- User analytics: 1 → 2 columns at lg breakpoint

**Card Dimensions:**
- Stat cards: Auto height with 20px padding (`p-5`)
- Main chart containers: 360px height for LineChart, 256px for ServiceUsageTrend
- Review panel: 384px max height with scrollable overflow (`max-h-96 overflow-y-auto`)
- Distribution cards in SME section: Auto height with 16px padding (`p-4`)
- KPI cards: 24px padding (`p-6`) with nested cards having 24px padding

**Progress Bars and Visual Elements:**
- Progress bars: 10px height (`h-2.5`) with rounded corners (`rounded-full`)
- Star ratings: 14px width/height (`w-3.5 h-3.5`) with 2px margin (`mr-0.5`)
- Badge pills: Rounded full with 12px horizontal and 6px vertical padding (`px-3 py-1.5`)
- Service ranking circles: 28px width/height (`w-7 h-7`) with gradient backgrounds

## Styling & Theming

**Base Component Classes:**
- Main container: `relative w-full bg-white text-black`
- Content wrapper: `relative min-h-screen bg-white font-sans text-slate-900 pt-16`
- Sticky navigation: `sticky top-16 z-30 bg-white shadow-sm border-b border-slate-200`

**Glassmorphism Card Effect:**
- Applied to most content cards: `bg-white/80 backdrop-blur-xl rounded-lg border border-slate-200 shadow-sm`
- Padding varies: `p-5` for stat cards, `p-6` for larger content cards, `p-4` for smaller cards

**Dynamic Navigation States:**
- Active button: `bg-sky-500 text-white`
- Inactive buttons: `text-gray-600 hover:bg-gray-100`
- All buttons: `rounded-md px-3 py-2 transition-colors`

**Metric Card Selection:**
- Default state: `border-slate-200`
- Selected state: `border-sky-500 ring-2 ring-sky-200`
- Hover state: `hover:shadow-md`
- Cursor: `cursor-pointer`
- All cards: `transition-all` for smooth state changes

**Insight Badge Colors (based on type prop):**
- `positive`: `bg-green-50 border-green-200` container with `text-green-600` icons
- `negative`: `bg-red-50 border-red-200` container with `text-red-600` icons
- `neutral`: `bg-blue-50 border-blue-200` container with `text-blue-600` icons

**Gradient Backgrounds:**
- Insight panels: `bg-gradient-to-br from-teal-500 to-sky-500`
- Progress bars: `bg-gradient-to-r from-sky-500 to-sky-400`
- Service ranking numbers: `bg-gradient-to-r from-sky-500 to-sky-400`

**Distribution Card Colors:**
- `blue`: `bg-blue-600` for progress bars
- `purple`: `bg-purple-600` for progress bars
- `green`: `bg-green-600` for progress bars
- `amber`: `bg-amber-600` for progress bars

**KPI Section Styling:**
- Financial services container: `bg-blue-50 rounded-lg p-6` with blue text variants
- Non-financial services container: `bg-purple-50 rounded-lg p-6` with purple text variants
- Service badges in reviews: `bg-blue-100 text-blue-900 text-xs font-medium px-2 py-1 rounded-full`

**Typography System:**
- Section headings: `text-3xl font-semibold font-serif mb-6`
- Card titles: `text-xl font-medium` or `text-lg font-semibold`
- Descriptions: `text-lg text-gray-600 mb-8` for sections, `text-sm text-gray-600` for cards
- Metric values: `text-4xl font-bold` for large numbers, `text-3xl font-bold` for KPIs
- Labels: `text-sm font-medium text-gray-500` for card headers
- Small text: `text-xs text-gray-500` for dates and metadata

**Required Tailwind Colors:**
- Sky: 200 (#BAE6FD), 400 (#38BDF8), 500 (#0EA5E9), 600 (#0284C7)
- Teal: 500 (#14B8A6)
- Green: 50 (#F0FDF4), 200 (#BBF7D0), 500 (#22C55E), 600 (#16A34A)
- Blue: 50 (#EFF6FF), 100 (#DBEAFE), 600 (#2563EB), 700 (#1D4ED8), 900 (#1E3A8A)
- Purple: 50 (#FAF5FF), 600 (#9333EA), 900 (#581C87)
- Red: 50 (#FEF2F2), 200 (#FECACA), 600 (#DC2626)
- Amber: 500 (#F59E0B), 600 (#D97506)
- Gray: 50 (#F9FAFB), 100 (#F3F4F6), 300 (#D1D5DB), 500 (#6B7280), 600 (#4B5563), 700 (#374151), 900 (#111827)
- Slate: 200 (#E2E8F0), 900 (#0F172A)

**Tailwind Config Requirements:**
- Backdrop blur utilities: `backdrop-blur-xl`
- Font families: `font-sans`, `font-serif`
- No custom spacing, animations, or plugins required
- Standard responsive breakpoints: sm (640px), md (768px), lg (1024px)

## Code Examples

### Example 1: Basic Usage
```typescript
import { DashboardAnalytics } from './src/index'

function App() {
  return (
    <DashboardAnalytics />
  )
}
```

### Example 2: With Data ID for Testing
```typescript
import { DashboardAnalytics } from './src/index'

function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardAnalytics data-id="partner-analytics-dashboard" />
    </div>
  )
}
```

### Example 3: In Application Layout with Header
```typescript
import { DashboardAnalytics } from './src/index'

function BusinessPortal() {
  return (
    <div className="min-h-screen">
      {/* Fixed Header - needs higher z-index than dashboard navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Partner Portal</h1>
            <nav className="flex gap-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Overview
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Analytics
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Dashboard Content - component handles pt-16 internally */}
      <DashboardAnalytics data-id="main-dashboard" />
    </div>
  )
}
```

### Example 4: With Custom Background Styling
```typescript
import { DashboardAnalytics } from './src/index'

function StyledDashboard() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Background overlay to maintain readability */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
      
      {/* Dashboard - relative z-index to appear above overlay */}
      <div className="relative z-10">
        <DashboardAnalytics data-id="styled-dashboard" />
      </div>
      
      {/* Optional Footer */}
      <footer className="relative z-10 bg-white/95 backdrop-blur-sm border-t">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-gray-600">
            Analytics Dashboard © 2023
          </p>
        </div>
      </footer>
    </div>
  )
}
```

### Example 5: Full Page Integration with External Actions
```typescript
import { DashboardAnalytics } from './src/index'
import { useState } from 'react'

function CompleteDashboard() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    // Export logic would go here
    setTimeout(() => setIsExporting(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar - z-50 to stay above dashboard navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">
                Partner Analytics
              </h1>
              <span className="text-sm text-gray-500">
                Last updated: Sep 2023
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExport}
                disabled={isExporting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isExporting ? 'Exporting...' : 'Export Data'}
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Dashboard Content - component already has pt-16, but we need extra for our nav */}
      <div className="pt-16">
        <DashboardAnalytics data-id="complete-dashboard" />
      </div>
    </div>
  )
}
```