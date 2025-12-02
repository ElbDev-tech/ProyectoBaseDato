import { Edit2, Trash2, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { Client } from '../types/client';

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  const statusColors = {
    Active: 'bg-green-100 text-green-800 border-green-200',
    Inactive: 'bg-gray-100 text-gray-800 border-gray-200',
    Suspended: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusLabels = {
    Active: 'Activo',
    Inactive: 'Inactivo',
    Suspended: 'Suspendido'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{client.full_name}</h3>
          <p className="text-sm text-gray-500">
            {client.document_type}: {client.document_number}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[client.status]}`}>
          {statusLabels[client.status]}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {client.phone && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-sky-500" />
            <span>{client.phone}</span>
          </div>
        )}
        {client.email && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-sky-500" />
            <span>{client.email}</span>
          </div>
        )}
        {client.address && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-sky-500" />
            <span>{client.address}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Servicio</p>
            <p className="font-medium text-gray-800">{client.service_type}</p>
          </div>
          {client.plan && (
            <div>
              <p className="text-gray-500 text-xs">Plan</p>
              <p className="font-medium text-gray-800">{client.plan}</p>
            </div>
          )}
        </div>
      </div>

      {client.last_contact && (
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
          <Calendar className="w-3 h-3" />
          <span>Último contacto: {new Date(client.last_contact).toLocaleDateString('es-PE')}</span>
        </div>
      )}

      <div className="flex space-x-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(client)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition"
        >
          <Edit2 className="w-4 h-4" />
          <span className="text-sm font-medium">Editar</span>
        </button>
        <button
          onClick={() => onDelete(client.id)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm font-medium">Eliminar</span>
        </button>
      </div>
    </div>
  );
}
