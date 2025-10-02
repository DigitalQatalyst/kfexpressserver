# Microsoft Dynamics 365 Dataverse Integration Guide
## Overview
This document outlines the data model mapping between the dashboard's mock data structure and Microsoft Dynamics 365 Dataverse entities. All visualizations currently use sample data for demonstration purposes. In the final implementation, all metrics, charts, and KPIs will be sourced directly from Dataverse.
---
## Required Dataverse Entities
### 1. Custom Entity: `new_serviceentity` (Services)
**Purpose:** Tracks all services offered to SMEs
**Required Fields:**
- `new_serviceentityid` (Primary Key, GUID)
- `new_name` (Text, 100 chars) - Service name
- `new_servicetype` (Option Set) - Service category
  - Value 1: Financial Services
  - Value 2: Non-Financial Services
- `new_category` (Text, 50 chars) - Subcategory
- `new_description` (Multiline Text) - Service description
- `createdon` (DateTime) - Service creation date
- `modifiedon` (DateTime) - Last modification date
- `statecode` (Status) - Active/Inactive status
- `statuscode` (Status Reason) - Detailed status
**Dashboard Mappings:**
- **Total Services Card** → `COUNT(new_serviceentityid WHERE statecode = Active)`
- **Financial Services Card** → `COUNT(new_serviceentityid WHERE new_servicetype = 1 AND statecode = Active)`
- **Non-Financial Services Card** → `COUNT(new_serviceentityid WHERE new_servicetype = 2 AND statecode = Active)`
- **Service Growth Trend Chart** → Time-series aggregation by `createdon` grouped by month and `new_servicetype`
- **Latest Added Service** → `SELECT TOP 1 * FROM new_serviceentity ORDER BY createdon DESC`
---
### 2. Custom Entity: `new_application` (Service Applications)
**Purpose:** Tracks SME applications for services
**Required Fields:**
- `new_applicationid` (Primary Key, GUID)
- `new_name` (Text, 100 chars) - Application reference
- `new_serviceid` (Lookup to new_serviceentity) - Related service
- `new_accountid` (Lookup to account) - Applicant SME
- `new_applicationdate` (DateTime) - Submission date
- `new_approvaldate` (DateTime) - Approval/rejection date
- `new_decisiondate` (DateTime) - Final decision date
- `new_status` (Option Set) - Application status
  - Value 1: Submitted
  - Value 2: Under Review
  - Value 3: Approved
  - Value 4: Rejected
  - Value 5: Fulfilled
- `new_isfirsttime` (Two Options: Yes/No) - First-time applicant flag
- `createdon` (DateTime) - Record creation date
- `modifiedon` (DateTime) - Last modification date
**Dashboard Mappings:**
- **Total Applications (Financial)** → `COUNT(new_applicationid WHERE new_serviceid.new_servicetype = 1)`
- **Total Applications (Non-Financial)** → `COUNT(new_applicationid WHERE new_serviceid.new_servicetype = 2)`
- **Approval Rate** → `(COUNT(new_status = 3) / COUNT(*)) * 100`
- **Avg Time to Decision** → `AVG(DATEDIFF(day, new_applicationdate, new_decisiondate))`
- **Service Usage Trend Chart** → Time-series by `new_applicationdate` grouped by month and service type
- **Top Services by Applications** → `COUNT(*) GROUP BY new_serviceid ORDER BY COUNT DESC LIMIT 3`
- **First-time vs Repeat Users Chart** → Percentage calculation using `new_isfirsttime` grouped by month
---
### 3. Standard Entity: `account` (SME Profiles)
**Purpose:** Standard Dynamics 365 entity for customer accounts, extended with custom fields
**Standard Fields Used:**
- `accountid` (Primary Key, GUID)
- `name` (Text) - Company name
- `accountnumber` (Text) - Account reference
- `revenue` (Currency) - Annual revenue
- `numberofemployees` (Integer) - Employee count
- `industrycode` (Option Set) - Industry classification
- `address1_city` (Text) - City
- `address1_stateorprovince` (Text) - State/Emirate
- `createdon` (DateTime)
- `modifiedon` (DateTime)
**Custom Fields Required:**
- `new_businesssize` (Option Set) - Size classification
  - Value 1: Micro (1-9 employees)
  - Value 2: Small (10-49 employees)
  - Value 3: Medium (50-249 employees)
- `new_businessstage` (Option Set) - Business maturity
  - Value 1: Startup
  - Value 2: Growth
  - Value 3: Mature
**Dashboard Mappings:**
- **Size Distribution** → Percentage breakdown by `new_businesssize`
- **Sector Distribution** → Percentage breakdown by `industrycode`
- **Business Stage Distribution** → Percentage breakdown by `new_businessstage`
- **Region Distribution** → Percentage breakdown by `address1_city`
---
### 4. Standard Entity: `feedback` (Customer Reviews)
**Purpose:** Standard Dynamics 365 entity for feedback, extended with custom fields
**Standard Fields Used:**
- `feedbackid` (Primary Key, GUID)
- `rating` (Integer, 1-5) - Star rating
- `comments` (Multiline Text) - Review text
- `regardingobjectid` (Lookup) - Related record (service/application)
- `createdon` (DateTime) - Feedback date
- `source` (Option Set) - Feedback channel
**Custom Fields Required:**
- `new_sentiment` (Option Set) - Sentiment analysis
  - Value 1: Positive
  - Value 2: Neutral
  - Value 3: Negative
- `new_servicename` (Text, 100 chars) - Service name for display
**Dashboard Mappings:**
- **Overall Rating** → `AVG(rating WHERE rating IS NOT NULL)`
- **Rating Improvement** → Comparison of `AVG(rating)` between current period and 6 months ago
- **Customer Satisfaction Chart** → Time-series of `AVG(rating)` grouped by month
- **SME Reviews Panel** → Recent feedback records with `rating`, `comments`, `new_sentiment`, `new_servicename`, `createdon`
- **Sentiment Distribution** → Count of records grouped by `new_sentiment`
---
## Data Aggregation Queries
### Services Section