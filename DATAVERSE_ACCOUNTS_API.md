# Dataverse Accounts API Guide

Complete guide for fetching data from the `accounts` table in Microsoft Dataverse using the Web API.

## 🔗 Base Configuration

### Environment Details
- **Environment ID**: `3b095fb5-5afd-edef-9492-cc6f8add414e`
- **Organization ID**: `f1255e28-8de7-ef11-933e-6045bd6a2361`
- **Environment Name**: `unqf1255e288de7ef11933e6045bd6a2`

### API Endpoint Structure
```
https://kf-dev-a.api.crm15.dynamics.com/api/data/v9.2/accounts
```

### Required Headers
```typescript
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'OData-Version': '4.0',
  'OData-MaxVersion': '4.0'
};
```

## 📊 Basic Queries

### Get All Accounts
```typescript
GET /api/data/v9.2/accounts
```

### Get Specific Fields Only
```typescript
GET /api/data/v9.2/accounts?$select=name,revenue,accountid,createdon
```

### Get Single Account by ID
```typescript
GET /api/data/v9.2/accounts({account-guid})
```

## 🔍 Filtering Data

### Filter by Revenue
```typescript
// Accounts with revenue > 100,000
GET /api/data/v9.2/accounts?$filter=revenue gt 100000

// Accounts with revenue between 50K and 500K
GET /api/data/v9.2/accounts?$filter=revenue ge 50000 and revenue le 500000
```

### Filter by Date
```typescript
// Accounts created in 2024
GET /api/data/v9.2/accounts?$filter=createdon ge 2024-01-01T00:00:00Z

// Accounts created in last 30 days
GET /api/data/v9.2/accounts?$filter=createdon ge 2024-11-01T00:00:00Z
```

### Filter by Status
```typescript
// Active accounts only
GET /api/data/v9.2/accounts?$filter=statecode eq 0

// Inactive accounts
GET /api/data/v9.2/accounts?$filter=statecode eq 1
```

### Filter by Name
```typescript
// Accounts containing "Microsoft"
GET /api/data/v9.2/accounts?$filter=contains(name,'Microsoft')

// Accounts starting with "A"
GET /api/data/v9.2/accounts?$filter=startswith(name,'A')
```

## 📈 Sorting & Limiting

### Sort Results
```typescript
// Sort by revenue (highest first)
GET /api/data/v9.2/accounts?$orderby=revenue desc

// Sort by name (A-Z)
GET /api/data/v9.2/accounts?$orderby=name asc

// Multiple sort criteria
GET /api/data/v9.2/accounts?$orderby=revenue desc,name asc
```

### Limit Results
```typescript
// Get top 10 accounts
GET /api/data/v9.2/accounts?$top=10

// Get top 5 highest revenue accounts
GET /api/data/v9.2/accounts?$orderby=revenue desc&$top=5
```

### Get Count
```typescript
// Get total count with data
GET /api/data/v9.2/accounts?$count=true

// Get count only
GET /api/data/v9.2/accounts/$count
```

## 🔗 Related Data (Expand)

### Get Account with Primary Contact
```typescript
GET /api/data/v9.2/accounts?$expand=primarycontactid($select=fullname,emailaddress1)
```

### Get Account with Related Opportunities
```typescript
GET /api/data/v9.2/accounts?$expand=account_opportunities($select=name,estimatedvalue)
```

## 💡 Common Field Names

| Display Name | API Name | Type |
|--------------|----------|------|
| Account Name | `name` | string |
| Revenue | `revenue` | decimal |
| Account ID | `accountid` | guid |
| Created On | `createdon` | datetime |
| Status | `statecode` | int |
| Industry | `industrycode` | int |
| Phone | `telephone1` | string |
| Website | `websiteurl` | string |
| Primary Contact | `_primarycontactid_value` | guid |

## 🛠️ Implementation Examples

### Basic Account Fetching
```typescript
export const getAccounts = async (req: Request, res: Response) => {
  const { token } = req.body;
  
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'OData-Version': '4.0'
    };

    const response = await axios.get(
      `${process.env.WEB_API_URL}/accounts?$select=name,revenue,accountid&$top=50`,
      { headers }
    );

    res.status(200).json({
      success: true,
      data: response.data.value,
      count: response.data.value.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};
```

### Advanced Filtering
```typescript
export const getTopAccounts = async (req: Request, res: Response) => {
  const { token, minRevenue = 100000 } = req.body;
  
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'OData-Version': '4.0'
    };

    const filter = `revenue ge ${minRevenue} and statecode eq 0`;
    const select = 'name,revenue,accountid,createdon,industrycode';
    const orderby = 'revenue desc';
    
    const url = `${process.env.WEB_API_URL}/accounts?$select=${select}&$filter=${filter}&$orderby=${orderby}&$top=20`;

    const response = await axios.get(url, { headers });

    res.status(200).json({
      success: true,
      data: response.data.value,
      totalCount: response.data['@odata.count']
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top accounts' });
  }
};
```

### Search Accounts
```typescript
export const searchAccounts = async (req: Request, res: Response) => {
  const { token, searchTerm } = req.body;
  
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'OData-Version': '4.0'
    };

    const filter = `contains(name,'${searchTerm}')`;
    const url = `${process.env.WEB_API_URL}/accounts?$select=name,revenue,accountid&$filter=${filter}&$top=25`;

    const response = await axios.get(url, { headers });

    res.status(200).json({
      success: true,
      searchTerm,
      data: response.data.value,
      count: response.data.value.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search accounts' });
  }
};
```

## 📝 Response Format

### Successful Response
```json
{
  "success": true,
  "data": [
    {
      "accountid": "12345678-1234-1234-1234-123456789012",
      "name": "Contoso Ltd",
      "revenue": 1500000.00,
      "createdon": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

### Error Response
```json
{
  "error": "Failed to fetch accounts",
  "details": "Unauthorized access"
}
```

## ⚡ Performance Tips

1. **Use $select**: Only fetch fields you need
2. **Implement $top**: Limit results to prevent large payloads
3. **Use $filter**: Server-side filtering is more efficient
4. **Cache tokens**: Reuse authentication tokens
5. **Batch requests**: Use `$batch` for multiple operations

## 🔍 OData Query Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `eq` | Equal | `revenue eq 100000` |
| `ne` | Not equal | `statecode ne 1` |
| `gt` | Greater than | `revenue gt 50000` |
| `ge` | Greater or equal | `createdon ge 2024-01-01T00:00:00Z` |
| `lt` | Less than | `revenue lt 1000000` |
| `le` | Less or equal | `createdon le 2024-12-31T23:59:59Z` |
| `and` | Logical AND | `revenue gt 50000 and statecode eq 0` |
| `or` | Logical OR | `industrycode eq 1 or industrycode eq 2` |
| `contains` | Contains text | `contains(name,'Corp')` |
| `startswith` | Starts with | `startswith(name,'A')` |

## 🚨 Common Errors

### 401 Unauthorized
- Check token validity
- Verify token format (Bearer prefix)
- Ensure proper permissions

### 400 Bad Request
- Validate OData query syntax
- Check field names exist
- Verify GUID format for IDs

### 403 Forbidden
- Check security roles
- Verify entity permissions
- Ensure user has read access

---

## 🔧 Environment Configuration

Add to your `.env` file:
```env
WEB_API_URL=https://kf-dev-a.api.crm15.dynamics.com/api/data/v9.2
```

**Note**: Use `process.env.WEB_API_URL` in your code for the base API URL.