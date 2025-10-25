# AWS Cognito Setup Guide

## Prerequisites
- AWS Account
- AWS CLI installed (optional but recommended)

## Step 1: Create AWS Cognito User Pool

1. **Go to AWS Console**
   - Navigate to AWS Cognito service
   - Click "Create user pool"

2. **Configure Sign-in Experience**
   - Choose "Email" as sign-in option
   - Click "Next"

3. **Configure Security Requirements**
   - Password policy: Use default or customize
   - Multi-factor authentication: Choose "No MFA" for now (can enable later)
   - User account recovery: Select "Email only"
   - Click "Next"

4. **Configure Sign-up Experience**
   - Self-service sign-up: Enable
   - Cognito-assisted verification: Enable
   - Verifying attribute changes: Enable
   - Required attributes: Select "email", "given_name", "family_name"
   - Click "Next"

5. **Configure Message Delivery**
   - Email provider: Use "Send email with Cognito" (for testing)
   - SES Configuration: Skip for now
   - Click "Next"

6. **Integrate Your App**
   - User pool name: `reel-app-users` (or your preferred name)
   - App client name: `reel-app-client`
   - Client secret: **Don't generate** (uncheck this box)
   - Advanced app client settings:
     - Authentication flows: Enable "ALLOW_USER_PASSWORD_AUTH"
     - OAuth 2.0 settings: Can skip for now
   - Click "Next"

7. **Review and Create**
   - Review all settings
   - Click "Create user pool"

## Step 2: Get Your Configuration Values

After creating the user pool:

1. **User Pool ID**
   - Go to your user pool
   - Copy the "User pool ID" (format: us-east-1_xxxxxxxxx)

2. **App Client ID**
   - Go to "App integration" tab
   - Under "App clients and analytics"
   - Copy the "Client ID"

3. **Region**
   - Note the AWS region where you created the pool (e.g., us-east-1)

## Step 3: Configure Your Application

1. **Create Environment File**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_AWS_REGION=us-east-1
   NEXT_PUBLIC_AWS_USER_POOL_ID=us-east-1_xxxxxxxxx
   NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID=your-client-id-here
   ```

## Step 4: Test Your Setup

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Authentication Flow**
   - Go to `/signup` and create a test account
   - Check your email for verification code
   - Complete email verification
   - Try logging in with your credentials
   - Test password reset functionality

## Common Issues & Solutions

### Issue: "User does not exist" error
- **Solution**: Make sure the user completed email verification

### Issue: "Invalid verification code"
- **Solution**: Check spam folder, code expires in 24 hours

### Issue: "Password does not conform to policy"
- **Solution**: Check password requirements in Cognito console

### Issue: Environment variables not loading
- **Solution**: Restart development server after changing .env.local

## Security Best Practices

1. **Enable MFA** (after testing)
   - Go to User Pool → Sign-in experience → Multi-factor authentication
   - Enable SMS or TOTP

2. **Configure Advanced Security**
   - Enable advanced security features
   - Set up risk-based authentication

3. **Set up Custom Domain** (production)
   - Configure custom domain for hosted UI
   - Set up SSL certificate

4. **Monitor Usage**
   - Set up CloudWatch monitoring
   - Configure alerts for suspicious activity

## Production Considerations

1. **Use SES for Email**
   - Configure Amazon SES for production email delivery
   - Set up custom email templates

2. **Custom Attributes**
   - Add any additional user attributes needed
   - Configure attribute permissions

3. **Lambda Triggers**
   - Set up pre/post authentication triggers if needed
   - Configure custom authentication flows

## Testing Checklist

- [ ] User can sign up with email
- [ ] Email verification works
- [ ] User can sign in
- [ ] Password reset works
- [ ] User can sign out
- [ ] Protected routes redirect to login
- [ ] Authentication state persists on refresh