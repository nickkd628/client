# Architecture Diagram

## Current Architecture (with Port Mismatch Issue)

```mermaid
graph TD
    subgraph Client Side
        A[Next.js App] --> B[RTK Query API]
        B --> C[API Base URL: http://localhost:8000]
        C --> D[Product Fetch Request]
    end
    
    subgraph Server Side
        E[Express Server] --> F[Port 3001]
        F --> G[Product Routes]
        G --> H[Product Controller]
        H --> I[Prisma ORM]
        I --> J[PostgreSQL DB]
    end
    
    D -.->|404 Error - Wrong Port| F
```

## Proposed Solution (Fixed Port Configuration)

```mermaid
graph TD
    subgraph Client Side
        A[Next.js App] --> B[RTK Query API]
        B --> C[API Base URL: http://localhost:8000]
        C --> D[Product Fetch Request]
    end
    
    subgraph Server Side
        E[Express Server] --> F[Port 8000]
        F --> G[Product Routes]
        G --> H[Product Controller]
        H --> I[Prisma ORM]
        I --> J[PostgreSQL DB]
    end
    
    D -->|Success - Correct Port| F
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant Client as Next.js Client
    participant API as RTK Query
    participant Server as Express Server
    participant Controller as Product Controller
    participant DB as PostgreSQL Database
    
    Client->>API: useGetProductsQuery(searchTerm)
    API->>Server: GET /products?search=searchTerm
    Server->>Controller: getProducts(req, res)
    Controller->>DB: prisma.products.findMany()
    DB-->>Controller: Product data
    Controller-->>Server: JSON response
    Server-->>API: Product data
    API-->>Client: Product data
    Client->>Client: Render products
```

## Error Flow (Current Issue)

```mermaid
sequenceDiagram
    participant Client as Next.js Client
    participant API as RTK Query
    participant Server as Express Server
    
    Client->>API: useGetProductsQuery(searchTerm)
    API->>Server: GET http://localhost:8000/products
    Note over API,Server: Server is running on port 3001
    Server-->>API: 404 Not Found
    API-->>Client: isError = true
    Client->>Client: Display "Failed to fetch products"