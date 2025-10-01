# KF Express Analytics Dashboard API

A Node.js/Express API server that provides analytics endpoints for fetching data directly from Microsoft Dataverse (Dynamics 365) for dashboard visualization.

## 🚀 Features

- **Direct Dataverse Integration**: Fetches real-time data from Microsoft Dataverse
- **Analytics Dashboard Endpoint**: Comprehensive dashboard metrics in a single API call
- **Flexible Data Filtering**: Date range and entity type filtering
- **OAuth 2.0 Authentication**: Secure token-based authentication with Microsoft
- **TypeScript Support**: Full TypeScript implementation for better development experience
- **Scalable Architecture**: Modular controller/route structure for easy maintenance

## 📊 Dashboard Metrics

The analytics endpoint provides:
- Total Accounts, Contacts, and Active Opportunities
- Revenue calculations and pipeline data
- Recent activities and top-performing accounts
- Customizable date range filtering
- Entity-specific metrics

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Authentication**: OAuth 2.0 (Microsoft Identity Platform)
- **Data Source**: Microsoft Dataverse (Dynamics 365)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Microsoft Dataverse environment
- Azure App Registration with appropriate permissions

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kfexpressserver
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   client_id=your_azure_app_client_id
   client_secret=your_azure_app_client_secret
   scope=https://your-org.crm.dynamics.com/.default
   grant_type=client_credentials
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📡 API Endpoints

### Authentication

#### Get Access Token
```http
POST /api/v1/auth/token
```

**Response:**
```json
{
  "message": "Token fetched successfully",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIs..."
}
```

### Analytics Dashboard

#### Get Dashboard Analytics
```http
POST /api/v1/analytics/dashboard
```

**Request Body:**
```json
{
  "token": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIs...",
  "dateFrom": "2024-01-01T00:00:00Z",
  "dateTo": "2024-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalAccounts": 150,
    "totalContacts": 320,
    "activeOpportunities": 45,
    "totalRevenue": 2500000,
    "recentActivities": [...],
    "topAccounts": [...],
    "opportunityPipeline": [...]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Get Entity Metrics
```http
POST /api/v1/analytics/metrics
```

**Request Body:**
```json
{
  "token": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIs...",
  "entityType": "accounts"
}
```

## 🏗️ Project Structure

```
kfexpressserver/
├── src/
│   ├── controllers/
│   │   ├── AuthController.ts      # Authentication logic
│   │   ├── accountController.ts   # Account operations
│   │   └── analyticsController.ts # Analytics dashboard logic
│   ├── routes/
│   │   ├── authRoute.ts          # Auth endpoints
│   │   ├── accountRoute.ts       # Account endpoints
│   │   └── analyticsRoute.ts     # Analytics endpoints
│   ├── services/
│   │   └── accountServices.ts    # Business logic services
│   └── index.ts                  # Application entry point
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── vercel.json                   # Deployment configuration
```

## 🔧 Configuration

### Azure App Registration Setup

1. **Register Application** in Azure Portal
2. **API Permissions**: Grant access to Dynamics CRM
   - `user_impersonation` for Dynamics CRM
3. **Client Secret**: Generate and store securely
4. **Redirect URIs**: Configure if needed

### Dataverse Configuration

Ensure your Dataverse environment has:
- Proper security roles assigned
- Required entities (accounts, contacts, opportunities)
- API access enabled

## 🔒 Security Considerations

- **Token Management**: Tokens are stored as HTTP-only cookies
- **Environment Variables**: Sensitive data stored in `.env`
- **CORS**: Configured for cross-origin requests
- **Error Handling**: Detailed error responses without exposing sensitive data

## 📈 Performance & Scalability

### Data Fetching Strategy
- **Parallel Requests**: Multiple Dataverse calls executed simultaneously
- **Selective Fields**: Only required fields fetched to minimize payload
- **Pagination**: Built-in support for large datasets
- **Caching**: Consider implementing Redis for frequently accessed data

### Optimization Tips
- Use `$select` to limit returned fields
- Implement proper `$filter` for date ranges
- Consider batch requests for multiple entities
- Monitor API rate limits

## 🚀 Deployment

### Vercel Deployment
```bash
vercel --prod
```

### Environment Variables (Production)
Set these in your deployment platform:
- `PORT`
- `client_id`
- `client_secret`
- `scope`
- `grant_type`

## 🧪 Testing

### Manual Testing
Use tools like Postman or curl:

```bash
# Get token
curl -X POST http://localhost:5000/api/v1/auth/token

# Get dashboard analytics
curl -X POST http://localhost:5000/api/v1/analytics/dashboard \
  -H "Content-Type: application/json" \
  -d '{"token":"Bearer YOUR_TOKEN"}'
```

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify Azure app registration
   - Check client_id and client_secret
   - Ensure proper scope configuration

2. **Dataverse Connection Issues**
   - Verify Dataverse URL in scope
   - Check security roles and permissions
   - Validate entity names and field access

3. **CORS Issues**
   - Configure CORS settings for your frontend domain
   - Check browser network tab for specific errors

## 📝 API Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response
```json
{
  "error": "Error description",
  "details": "Detailed error information"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review Dataverse API documentation

---

**Note**: This API is designed for direct Dataverse integration, making it highly manageable as data is fetched in real-time without additional database layers.