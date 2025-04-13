
-- Schema: zebraops
-- Purpose: Unified AI inventory + workflow stack for Zebra Industries

-- Drop existing (for refresh)
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS logs CASCADE;

-- User Authentication Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('admin', 'staff')) DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT now()
);

-- Product inventory table (raw + retail-ready)
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT UNIQUE NOT NULL,
    title TEXT,
    description TEXT,
    category TEXT,
    photo_url TEXT,
    brandkit_status BOOLEAN DEFAULT FALSE,
    ai_description_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

-- Pricing, COGS, platform listings
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id UUID REFERENCES inventory(id) ON DELETE CASCADE,
    business_unit TEXT CHECK (business_unit IN ('enzebra', 'garlandworkshop', 'zexclusive')),
    qty INTEGER DEFAULT 1,
    retail_price NUMERIC,
    wholesale_price NUMERIC,
    cogs NUMERIC,
    platform TEXT[] DEFAULT '{}',
    shopify_push BOOLEAN DEFAULT FALSE,
    temu_push BOOLEAN DEFAULT FALSE,
    etsy_push BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

-- Workflow + AI Logs
CREATE TABLE logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task TEXT,
    status TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT now()
);
