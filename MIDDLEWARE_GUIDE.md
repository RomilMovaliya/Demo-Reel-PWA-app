# AWS Cognito Middleware Guide

## 🔍 The Challenge with AWS Cognito + Middleware

AWS Cognito stores authentication tokens in **localStorage** with dynamic user IDs like:
```
CognitoIdentityServiceProvider.78usab440hhp2f16mvnnqmh8ce.d1f3bdda-d0d1-70ab-0449-fc4b043600b7.accessToken
```

**Problems:**
1. **Dynamic User IDs**: Each user has a unique ID in the token key
2. **localStorage vs Cookies**: Middleware runs server-side, can't access localStorage
3. **Token Structure**: Cognito tokens are complex and change per user

## ✅ Solution Implemented

### 1. **Hybrid Approach**: Client-Side + Server-Side Protection

**Client-Side (Primary)**: `RouteGuard` component
- Uses React Context to check authentication
- Handles redirects based on auth state
- Works with Cognito's localStorage tokens

**Server-Side (Secondary)**: Simplified middleware
- Uses custom `auth-status` cookie
- Provides basic route protection
- Fallback for direct URL access

### 2. **Custom Auth Cookie System**

**File**: `src/lib/auth-cookies.ts`
```typescript
// Sets simple cookie that middleware can read
setAuthCookie(true/false)
```

**Updated**: `AuthContext` automatically manages this cookie
- Sets cookie when user logs in
- Clears cookie when user logs out
- Syncs with Cognito's actual auth state

### 3. **Route Protection Layers**

**Layer 1**: Middleware (`middleware.ts`)
```typescript
// Simple cookie-based check
const isAuthenticated = authCookie?.value === 'true';
```

**Layer 2**: RouteGuard (`src/components/RouteGuard.tsx`)
```typescript
// Full Cognito integration
const { isLoggedIn } = useAuth();
```

## 🛡️ How It Works

### Protected Route Access:
1. **User visits `/reels`**
2. **Middleware checks** `auth-status` cookie
3. **If not authenticated**: Redirect to `/login`
4. **If authenticated**: Allow through
5. **RouteGuard double-checks** with actual Cognito tokens
6. **If Cognito says not authenticated**: Redirect to `/login`

### Authentication Flow:
1. **User logs in** via Cognito
2. **AuthContext detects** successful login
3. **Sets auth-status cookie** to `true`
4. **Middleware now allows** access to protected routes
5. **RouteGuard confirms** with Cognito tokens

## 📁 File Structure

```
middleware.ts                 # Server-side route protection
src/
├── lib/
│   ├── auth.ts              # Cognito auth functions
│   └── auth-cookies.ts      # Cookie management
├── contexts/
│   └── AuthContext.tsx      # Auth state + cookie sync
└── components/
    ├── RouteGuard.tsx       # Client-side protection
    └── ProtectedRoute.tsx   # Individual route wrapper
```

## 🔧 Configuration

### Routes Configuration:

**Public Routes** (redirect authenticated users):
- `/login`
- `/signup` 
- `/forgot-password`

**Protected Routes** (require authentication):
- `/reels`

**Neutral Routes** (accessible to all):
- `/` (home page)
- `/debug`

### Middleware Behavior:

| Route | Unauthenticated | Authenticated |
|-------|----------------|---------------|
| `/` | Allow | Redirect to `/reels` |
| `/login` | Allow | Redirect to `/reels` |
| `/signup` | Allow | Redirect to `/reels` |
| `/reels` | Redirect to `/login` | Allow |

## 🚀 Benefits of This Approach

1. **Works with Cognito**: Doesn't fight against localStorage storage
2. **Fast Redirects**: Middleware provides immediate server-side redirects
3. **Accurate State**: RouteGuard ensures Cognito tokens are actually valid
4. **Fallback Protection**: Multiple layers prevent unauthorized access
5. **Simple Maintenance**: Easy to add new protected routes

## 🔄 Adding New Routes

### Protected Route:
```typescript
// In middleware.ts
const protectedRoutes = ["/reels", "/profile", "/settings"];

// In RouteGuard.tsx  
const protectedRoutes = ['/reels', '/profile', '/settings'];
```

### Public Route:
```typescript
// In middleware.ts
const publicRoutes = ["/login", "/signup", "/forgot-password", "/about"];

// In RouteGuard.tsx
const publicRoutes = ['/login', '/signup', '/forgot-password', '/about'];
```

## 🐛 Troubleshooting

### Issue: Middleware not working
**Check**: Cookie is being set by AuthContext
```javascript
// In browser console
document.cookie
// Should show: auth-status=true
```

### Issue: Infinite redirects
**Check**: Route arrays in middleware and RouteGuard match

### Issue: Still accessing protected routes
**Check**: Both middleware and RouteGuard are active

## 💡 Alternative Approaches

If you prefer a different approach:

1. **API Route Authentication**: Move auth checks to API routes
2. **Server Actions**: Use Next.js server actions for auth
3. **Custom JWT Cookies**: Extract Cognito tokens to HTTP-only cookies

The current implementation provides the best balance of security, performance, and compatibility with AWS Cognito.