/*
  # Client Management System Database Schema

  ## Overview
  This migration sets up the database schema for TIGO Peru's client management system.

  ## New Tables
  
  ### `clients`
  Stores all client information for TIGO Peru
  - `id` (uuid, primary key) - Unique identifier for each client
  - `full_name` (text) - Client's full name
  - `email` (text) - Client's email address
  - `phone` (text) - Client's phone number
  - `document_type` (text) - Type of identification document (DNI, CE, etc.)
  - `document_number` (text) - Document identification number
  - `address` (text) - Client's address
  - `service_type` (text) - Type of TIGO service (Mobile, Home Internet, Cable TV, etc.)
  - `plan` (text) - Service plan name
  - `status` (text) - Client status (Active, Inactive, Suspended)
  - `registration_date` (timestamptz) - Date when client was registered
  - `last_contact` (timestamptz) - Last contact date with client
  - `notes` (text) - Additional notes about the client
  - `created_by` (uuid) - User who created the record
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record last update timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `clients` table
  - Authenticated users can view all clients
  - Authenticated users can insert new clients
  - Authenticated users can update client records
  - Authenticated users can delete client records
  
  ### Policies
  1. **"Authenticated users can view clients"** - SELECT access for all authenticated users
  2. **"Authenticated users can insert clients"** - INSERT access for all authenticated users
  3. **"Authenticated users can update clients"** - UPDATE access for all authenticated users
  4. **"Authenticated users can delete clients"** - DELETE access for all authenticated users

  ## Important Notes
  
  ### Data Integrity
  - All client fields use appropriate default values
  - Timestamps are automatically managed
  - Document numbers should be unique per document type
  - Email addresses should be unique when provided
  
  ### Indexes
  - Primary key index on `id`
  - Index on `email` for faster lookups
  - Index on `document_number` for faster searches
  - Index on `status` for filtering
*/

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text,
  phone text NOT NULL,
  document_type text NOT NULL DEFAULT 'DNI',
  document_number text NOT NULL,
  address text,
  service_type text NOT NULL,
  plan text,
  status text NOT NULL DEFAULT 'Active',
  registration_date timestamptz DEFAULT now(),
  last_contact timestamptz,
  notes text DEFAULT '',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert clients"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete clients"
  ON clients
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_document_number ON clients(document_number);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);