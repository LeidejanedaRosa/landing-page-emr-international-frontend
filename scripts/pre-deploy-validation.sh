#!/bin/bash

# Pre-deployment validation script
# Checks for placeholder data and other production requirements

set -e

echo "🔍 Running pre-deployment validation checks..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to report error
report_error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    ((ERRORS++))
}

# Function to report warning
report_warning() {
    echo -e "${YELLOW}⚠️  WARNING: $1${NC}"
    ((WARNINGS++))
}

# Function to report success
report_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Check 1: Validate company legal information
echo "📋 Checking company legal information..."
if grep -q "00.000.000/0000-00" src/data/companyInfo.ts; then
    report_error "Placeholder CNPJ found in src/data/companyInfo.ts"
    echo "   Update COMPANY_LEGAL_INFO.cnpj with actual company CNPJ"
fi

if grep -q "creaRegistration: '000000'" src/data/companyInfo.ts; then
    report_error "Placeholder CREA registration found in src/data/companyInfo.ts"
    echo "   Update COMPANY_LEGAL_INFO.creaRegistration with actual CREA number"
fi

if grep -q "email: ''" src/data/companyInfo.ts; then
    report_warning "Empty contact email in src/data/companyInfo.ts"
    echo "   Consider adding official company email for legal compliance"
fi

if grep -q "street: ''" src/data/companyInfo.ts; then
    report_warning "Empty company address in src/data/companyInfo.ts"
    echo "   Consider adding complete address for legal compliance"
fi

# Check 2: Validate environment variables
echo ""
echo "🔐 Checking environment configuration..."
if [ -f .env.production ]; then
    report_success "Production environment file found (.env.production)"

    # Validate it's not just a copy of the example (contains actual values)
    if [ -f .env.production.example ]; then
        if diff -q .env.production .env.production.example > /dev/null 2>&1; then
            report_error ".env.production is identical to .env.production.example"
            echo "   Update .env.production with actual production values"
        fi
    fi
else
    report_error "No .env.production file found"
    echo "   Production environment configuration is required for deployment"
    if [ -f .env.production.example ]; then
        echo "   Copy .env.production.example to .env.production and configure with production values"
    else
        echo "   Create .env.production with production environment variables"
    fi
fi

# Check 2b: Validate social share image and site origin
echo ""
echo "🖼️  Checking social share image (Open Graph / Twitter card)..."
if [ -f public/social-image.jpg ]; then
    report_success "Social share image found (public/social-image.jpg)"
else
    report_error "Missing public/social-image.jpg — social preview (LinkedIn/Facebook/WhatsApp) will break"
    echo "   Run 'npm run og:image' to generate it, then commit the file"
fi

if [ -f .env.production ] && ! grep -qE '^VITE_SITE_URL=[[:space:]]*[^[:space:]]' .env.production; then
    report_warning "VITE_SITE_URL not set (or blank) in .env.production — canonical/OG tags fall back to the default origin"
    echo "   Also configure it in the Vercel dashboard (Production and Preview environments)"
fi

# Check 3: Check for TODO comments in production code
echo ""
echo "📝 Checking for TODO comments in production code..."
TODO_COUNT=$(grep -r "TODO:" src/ --exclude-dir=node_modules --exclude-dir=dist 2>/dev/null | grep -v "test" | grep -v ".spec" | wc -l || echo "0")
if [ "$TODO_COUNT" -gt 0 ]; then
    report_warning "Found $TODO_COUNT TODO comments in production code"
    echo "   Review and resolve TODO items before deployment:"
    grep -rn "TODO:" src/ --exclude-dir=node_modules --exclude-dir=dist 2>/dev/null | grep -v "test" | grep -v ".spec" | head -5
fi

# Check 4: Validate build
echo ""
echo "🏗️  Checking build configuration..."
if [ -f "dist/index.html" ]; then
    report_success "Build artifacts found in dist/"
else
    report_warning "No build artifacts found. Run 'npm run build' before deployment"
fi

# Check 5: Check for console.log statements
echo ""
echo "🐛 Checking for debug statements..."
CONSOLE_COUNT=$(grep -r "console\\.log" src/ --exclude-dir=node_modules --exclude-dir=dist 2>/dev/null | grep -v "eslint-disable" | grep -v "test" | grep -v ".spec" | wc -l || echo "0")
if [ "$CONSOLE_COUNT" -gt 0 ]; then
    report_warning "Found $CONSOLE_COUNT console.log statements not disabled by eslint"
    echo "   Consider removing or wrapping with eslint-disable comments"
fi

# Check 6: Verify security headers
echo ""
echo "🔒 Checking security configuration..."
if grep -q "Content-Security-Policy" src/plugins/security-headers.ts; then
    report_success "Security headers configured"
else
    report_error "Security headers not found in src/plugins/security-headers.ts"
fi

# Check 7: Validate accessibility
echo ""
echo "♿ Checking accessibility configuration..."
if grep -q "WCAG" README.md || grep -q "accessibility" README.md; then
    report_success "Accessibility documentation found"
else
    report_warning "No accessibility documentation in README.md"
fi

# Summary
echo ""
echo "================================"
echo "📊 Validation Summary"
echo "================================"
echo -e "${RED}Errors: $ERRORS${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo ""

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ Pre-deployment validation FAILED${NC}"
    echo "Please fix the errors above before deploying to production"
    echo ""
    echo "Critical issues to fix:"
    echo "1. Update company legal information in src/data/companyInfo.ts"
    echo "2. Review and resolve all error items listed above"
    echo ""
    exit 1
else
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Pre-deployment validation PASSED with warnings${NC}"
        echo "Review warnings above and fix if necessary"
    else
        echo -e "${GREEN}✅ All pre-deployment checks PASSED${NC}"
    fi
    echo ""
    echo "You can proceed with deployment, but review any warnings above."
    exit 0
fi
