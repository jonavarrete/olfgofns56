import React, { useState } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Copy,
  Search,
  Filter,
  Save,
  X,
  MessageSquare,
  Gavel,
  Target,
  Crown,
  Radio
} from 'lucide-react';
import { AdminTemplate } from '../../types/admin';

export default function TemplateManagement() {
  const { data: templates, loading, createItem, updateItem, deleteItem } = useAdminData<AdminTemplate>('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | AdminTemplate['type']>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<AdminTemplate | null>(null);
  const [viewingTemplate, setViewingTemplate] = useState<AdminTemplate | null>(null);

  const templateTypes = [
    { value: 'message', label: 'Mensaje', icon: MessageSquare, color: 'neon-blue' },
    { value: 'penalty', label: 'Penalización', icon: Gavel, color: 'neon-red' },
    { value: 'mission', label: 'Misión PvE', icon: Target, color: 'neon-purple' },
    { value: 'alien_race', label: 'Raza Alienígena', icon: Crown, color: 'neon-orange' },
    { value: 'news', label: 'Noticia GNN', icon: Radio, color: 'neon-green' },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleSaveTemplate = async (templateData: Partial<AdminTemplate>) => {
    try {
      if (editingTemplate) {
        await updateItem(editingTemplate.id, templateData);
        setEditingTemplate(null);
      } else {
        await createItem({
          ...templateData,
          createdBy: 'current_admin_id',
          createdAt: Date.now(),
          usageCount: 0
        } as any);
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const duplicateTemplate = async (template: AdminTemplate) => {
    await createItem({
      name: `${template.name} (Copia)`,
      type: template.type,
      content: template.content,
      description: template.description,
      category: template.category,
      createdBy: 'current_admin_id',
      createdAt: Date.now(),
      usageCount: 0
    } as any);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Gestión de Plantillas
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Crear y administrar plantillas reutilizables
          </p>
        </div>
        
        <Button 
          variant="primary"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Plantilla
        </Button>
      </div>

      {/* Template Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {templateTypes.map((type) => (
          <AdminCard
            key={type.value}
            title={type.label}
            value={templates.filter(t => t.type === type.value).length.toString()}
            icon={type.icon}
            color={type.color}
            subtitle="plantillas"
          />
        ))}
      </div>

      {/* Filters */}
      <AdminCard title="Filtros" icon={Filter} color="neon-green">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar plantillas..."
              className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          >
            <option value="all">Todos los tipos</option>
            {templateTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </AdminCard>

      {/* Templates List */}
      <AdminCard title="Lista de Plantillas" icon={FileText} color="neon-purple">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="animate-pulse p-4 bg-space-700/30 rounded border border-space-600">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-space-600 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-space-600 rounded w-1/3"></div>
                    <div className="h-3 bg-space-600 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTemplates.map((template) => {
              const templateType = templateTypes.find(t => t.value === template.type);
              return (
                <div key={template.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg border bg-${templateType?.color}/20 border-${templateType?.color}/30`}>
                        {templateType && React.createElement(templateType.icon, {
                          className: `w-5 h-5 text-${templateType.color}`
                        })}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-3">
                          <h4 className="font-rajdhani font-semibold text-white">
                            {template.name}
                          </h4>
                          <span className="px-2 py-1 bg-space-600 text-gray-300 rounded text-xs font-rajdhani">
                            {templateType?.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {template.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>Categoría: {template.category}</span>
                          <span>Usado: {template.usageCount} veces</span>
                          <span>Creado: {new Date(template.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewingTemplate(template)}
                        className="p-2 text-gray-400 hover:text-neon-green transition-colors"
                        title="Ver plantilla"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => duplicateTemplate(template)}
                        className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                        title="Duplicar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingTemplate(template)}
                        className="p-2 text-gray-400 hover:text-neon-orange transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteItem(template.id)}
                        className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>

      {/* Template Editor */}
      {(showCreateForm || editingTemplate) && (
        <TemplateEditor
          template={editingTemplate}
          onSave={handleSaveTemplate}
          onClose={() => {
            setShowCreateForm(false);
            setEditingTemplate(null);
          }}
        />
      )}

      {/* Template Viewer */}
      {viewingTemplate && (
        <TemplateViewer
          template={viewingTemplate}
          onClose={() => setViewingTemplate(null)}
          onEdit={() => {
            setEditingTemplate(viewingTemplate);
            setViewingTemplate(null);
          }}
        />
      )}
    </div>
  );
}

interface TemplateEditorProps {
  template?: AdminTemplate | null;
  onSave: (template: Partial<AdminTemplate>) => void;
  onClose: () => void;
}

function TemplateEditor({ template, onSave, onClose }: TemplateEditorProps) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    type: template?.type || 'message' as AdminTemplate['type'],
    description: template?.description || '',
    category: template?.category || '',
    content: template?.content || {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              {template ? 'Editar Plantilla' : 'Nueva Plantilla'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Nombre de la Plantilla
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              >
                <option value="message">Mensaje</option>
                <option value="penalty">Penalización</option>
                <option value="mission">Misión PvE</option>
                <option value="alien_race">Raza Alienígena</option>
                <option value="news">Noticia GNN</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Categoría
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="Categoría de la plantilla"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Descripción
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="Descripción de la plantilla"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Contenido (JSON)
            </label>
            <textarea
              value={JSON.stringify(formData.content, null, 2)}
              onChange={(e) => {
                try {
                  setFormData({ ...formData, content: JSON.parse(e.target.value) });
                } catch (error) {
                  // Invalid JSON, keep typing
                }
              }}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono"
              rows={12}
              placeholder='{"title": "Plantilla de ejemplo", "content": "Contenido..."}'
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              {template ? 'Actualizar' : 'Crear'} Plantilla
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface TemplateViewerProps {
  template: AdminTemplate;
  onClose: () => void;
  onEdit: () => void;
}

function TemplateViewer({ template, onClose, onEdit }: TemplateViewerProps) {
  const templateTypes = [
    { value: 'message', label: 'Mensaje', icon: MessageSquare, color: 'neon-blue' },
    { value: 'penalty', label: 'Penalización', icon: Gavel, color: 'neon-red' },
    { value: 'mission', label: 'Misión PvE', icon: Target, color: 'neon-purple' },
    { value: 'alien_race', label: 'Raza Alienígena', icon: Crown, color: 'neon-orange' },
    { value: 'news', label: 'Noticia GNN', icon: Radio, color: 'neon-green' },
  ];

  const templateType = templateTypes.find(t => t.value === template.type);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg border bg-${templateType?.color}/20 border-${templateType?.color}/30`}>
                {templateType && React.createElement(templateType.icon, {
                  className: `w-6 h-6 text-${templateType.color}`
                })}
              </div>
              <div>
                <h2 className="text-xl font-orbitron font-bold text-white">
                  {template.name}
                </h2>
                <p className="text-gray-400 mt-1">
                  {templateType?.label} • {template.category}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-rajdhani font-semibold text-white mb-3">
              Información de la Plantilla
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-space-700/30 rounded border border-space-600">
                <span className="text-gray-400 text-sm">Descripción:</span>
                <p className="text-white mt-1">{template.description}</p>
              </div>
              <div className="p-3 bg-space-700/30 rounded border border-space-600">
                <span className="text-gray-400 text-sm">Uso:</span>
                <p className="text-white mt-1">{template.usageCount} veces</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-rajdhani font-semibold text-white mb-3">
              Contenido de la Plantilla
            </h3>
            <div className="p-4 bg-space-800/50 rounded-lg border border-space-600">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(template.content, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}