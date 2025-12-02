export interface Client {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  document_type: string;
  document_number: string;
  address: string | null;
  service_type: string;
  plan: string | null;
  status: 'Active' | 'Inactive' | 'Suspended';
  registration_date: string;
  last_contact: string | null;
  notes: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientFormData {
  full_name: string;
  email: string;
  phone: string;
  document_type: string;
  document_number: string;
  address: string;
  service_type: string;
  plan: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  last_contact: string;
  notes: string;
}
