import React, { useState } from 'react';
import { AdminTemplate } from '../../types/admin';
import Button from '../../components/UI/Button';
import { 
  X, 
  Save, 
  FileText,
  MessageSquare,
  Mail,
  Gavel,
  Target,
  Crown,
  Radio,
  Code,
  Eye,
  Copy,
  Info,
  Plus,
  Minus,
  Settings,
  Globe,
  Users,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface TemplateEditorProps {
  template?: AdminTemplate | null;
  onSave: (template: Partial<AdminTemplate>) => void;
  onClose: () => void;
}

export default function TemplateEditor({ template, onSave, onClose }: TemplateEditorProps) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    type: template?.type || 'message' as AdminTemplate['type'],
    content: template?.content || {},
    description: template?.description || '',
    category: template?.category || '',
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'preview'>('basic');
  const [variables, setVariables] = useState<string[]>(['username', 'email', 'universe']);

  const templateTypes = [
    { value: 'message', label: 'Mensaje Global', icon: MessageSquare, color: 'neon-blue' },
    { value: 'email', label: 'Email', icon: Mail, color: 'neon-green' },
    { value: 'penalty', label: 'Penalización', icon: Gavel, color: 'neon-red' },
    { value: 'mission', label: 'Misión PvE', icon: Target, color: 'neon-purple' },
    { value: 'alien_race', label: 'Raza Alienígena', icon: Crown, color: 'neon-orange' },
    { value: 'news', label: 'Noticia GNN', icon: Radio, color: 'neon-blue' },
  ];

  const categories = [
    { value: 'sistema', label: 'Sistema', icon: Settings },
    { value: 'usuario', label: 'Usuario', icon: Users },
    { value: 'seguridad', label: 'Seguridad', icon: AlertTriangle },
    { value: 'contenido', label: 'Contenido', icon: Globe },
    { value: 'evento', label: 'Evento', icon: Star },
    { value: 'comercial', label: 'Comercial', icon: Target },
  ];

  const getDefaultContent = (type: AdminTemplate['type']) => {
    switch (type) {
      case 'message':
        return {
          title: '',
          content: '',
          type: 'announcement',
          priority: 'medium'
        };
      case 'email':
        return {
          subject: '',
          content: '',
          template: 'default'
        };
      case 'penalty':
        return {
          reason: '',
          type: 'warning',
          duration: 24,
          warning: ''
        };
      case 'mission':
        return {
          name: '',
          description: '',
          type: 'exploration',
          difficulty: 'medium',
          duration: 60,
          rewards: {}
        };
      case 'alien_race':
        return {
          name: '',
          description: '',
          homeworld: '',
          type: 'neutral',
          traits: {}
        };
      case 'news':
        return {
          title: '',
          summary: '',
          content: '',
          category: 'events',
          priority: 'medium'
        };
      default:
        return {};
    }
  };

  const handleTypeChange = (newType: AdminTemplate['type']) => {
    setFormData(prev => ({
      ...prev,
      type: newType,
      content: getDefaultContent(newType)
    }));
  };

  const addVariable = () => {
    const newVar = prompt('Nombre de la nueva variable:');
    if (newVar && !variables.includes(newVar)) {
      setVariables(prev => [...prev, newVar]);
    }
  };

  const removeVariable = (variable: string) => {
    setVariables(prev => prev.filter(v => v !== variable));
  };

  const insertVariable = (variable: string) => {
  const textarea = document.getElementById('template-content') as HTMLTextAreaElement;
  if (textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value; // Usar el valor actual del textarea
    const newValue = currentValue.substring(0, start) + `{{${variable}}}` + currentValue.substring(end);
    
    // Actualizar el valor del textarea directamente
    textarea.value = newValue;
    
    // También actualizar el estado, pero manejando el error
    try {
      const parsedContent = JSON.parse(newValue);
      setFormData(prev => ({ ...prev, content: parsedContent }));
    } catch (error) {
      // Mantener el contenido como string si el JSON es inválido
      setFormData(prev => ({ ...prev, content: newValue }));
    }
    
    // Restablecer la selección
    textarea.selectionStart = start + variable.length + 4; // +4 por {{ y }}
    textarea.selectionEnd = textarea.selectionStart;
    textarea.focus();
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const selectedType = templateTypes.find(t => t.value === formData.type);
  const selectedCategory = categories.find(c => c.value === formData.category);

  const renderPreview = () => {
    switch (formData.type) {
      case 'message':
        return (
          <div className="p-4 bg-space-800/50 rounded-lg border border-space-600">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-neon-blue/20 border border-neon-blue/30">
                <MessageSquare className="w-6 h-6 text-neon-blue" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-orbitron font-bold text-white mb-2">
                  {formData.content.title || 'Título del mensaje'}
                </h3>
                <div className="text-gray-300 whitespace-pre-wrap">
                  {formData.content.content || 'Contenido del mensaje aparecerá aquí...'}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'email':
        return (
          <div className="bg-white rounded-lg p-4 text-black">
            <div className="border-b border-gray-200 pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {formData.content.subject || 'Asunto del email'}
              </h2>
            </div>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800">
                {formData.content.content || 'Contenido del email aparecerá aquí...'}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
              {JSON.stringify(formData.content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div>
            <h2 className="text-xl font-orbitron font-bold text-white">
              {template ? 'Editar Plantilla' : 'Nueva Plantilla'}
            </h2>
            <p className="text-gray-400 mt-1">
              Crear plantilla reutilizable para contenido
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-space-600">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'basic', name: 'Información Básica', icon: Info },
              { id: 'content', name: 'Contenido', icon: FileText },
              { id: 'preview', name: 'Vista Previa', icon: Eye },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-rajdhani font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-neon-orange text-white'
                    : 'text-gray-400 hover:text-white hover:bg-space-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Nombre de la Plantilla
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    placeholder="Nombre descriptivo de la plantilla"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Categoría
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: category.value })}
                        className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                          formData.category === category.value
                            ? 'bg-neon-green/20 border-neon-green/30 text-neon-green'
                            : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white hover:border-neon-blue/30'
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        <span className="text-sm font-rajdhani font-medium">{category.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  rows={3}
                  placeholder="Describe el propósito y uso de esta plantilla"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-3">
                  Tipo de Plantilla
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {templateTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleTypeChange(type.value)}
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 ${
                        formData.type === type.value
                          ? `bg-${type.color}/20 border-${type.color}/30 text-${type.color}`
                          : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white hover:border-neon-blue/30'
                      }`}
                    >
                      <type.icon className="w-5 h-5" />
                      <div className="text-left">
                        <p className="font-rajdhani font-medium">{type.label}</p>
                      </div>
                      {formData.type === type.value && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variables */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-rajdhani font-medium text-gray-400">
                    Variables Disponibles
                  </label>
                  <button
                    type="button"
                    onClick={addVariable}
                    className="p-1 text-gray-400 hover:text-neon-green transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variables.map(variable => (
                    <div key={variable} className="flex items-center space-x-1 px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full">
                      <span className="text-sm font-rajdhani font-medium">
                        {variable}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeVariable(variable)}
                        className="text-neon-blue/70 hover:text-neon-red transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Usa {{variable}} en el contenido para insertar datos dinámicos
                </p>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Contenido de la Plantilla
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Tipo:</span>
                  <span className={`px-2 py-1 rounded text-sm font-rajdhani font-medium ${selectedType ? `text-${selectedType.color}` : 'text-gray-400'}`}>
                    {selectedType?.label || 'No seleccionado'}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-rajdhani font-medium text-gray-400">
                    Contenido (JSON)
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Variables:</span>
                    {variables.slice(0, 5).map(variable => (
                      <button
                        key={variable}
                        onClick={() => insertVariable(variable)}
                        className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded text-xs font-rajdhani font-medium hover:bg-neon-blue/30 transition-colors"
                        title={`Insertar {{${variable}}}`}
                      >
                        {variable}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  id="template-content"
                  value={JSON.stringify(formData.content, null, 2)}
                  onChange={(e) => {
                    try {
                      setFormData({ ...formData, content: JSON.parse(e.target.value) });
                    } catch (error) {
                      // Invalid JSON, keep typing
                    }
                  }}
                  className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono text-sm"
                  rows={15}
                  placeholder="Contenido en formato JSON"
                />
              </div>

              {/* Content Examples */}
              <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
                <h4 className="font-rajdhani font-semibold text-white mb-3">
                  Ejemplos de Contenido por Tipo
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-space-700/30 rounded">
                    <span className="text-neon-green font-rajdhani font-medium">Mensaje:</span>
                    <code className="text-gray-300 ml-2">{"{ title: '', content: '', type: 'announcement' }"}</code>
                  </div>
                  <div className="p-2 bg-space-700/30 rounded">
                    <span className="text-neon-green font-rajdhani font-medium">Email:</span>
                    <code className="text-gray-300 ml-2">{"{ subject: '', content: '', template: 'default' }"}</code>
                  </div>
                  <div className="p-2 bg-space-700/30 rounded">
                    <span className="text-neon-green font-rajdhani font-medium">Penalización:</span>
                    <code className="text-gray-300 ml-2">{"{ reason: '', type: 'warning', duration: 24 }"}</code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Vista Previa de la Plantilla
                </h3>
                {renderPreview()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <FileText className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <p className="text-lg font-orbitron font-bold text-white">
                    {selectedType?.label || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-400">Tipo</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Target className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <p className="text-lg font-orbitron font-bold text-white">
                    {selectedCategory?.label || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-400">Categoría</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Code className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                  <p className="text-lg font-orbitron font-bold text-white">
                    {variables.length}
                  </p>
                  <p className="text-xs text-gray-400">Variables</p>
                </div>
              </div>

              <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                <h4 className="font-rajdhani font-semibold text-white mb-3">
                  Información de la Plantilla
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nombre:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {formData.name || 'Sin nombre'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tipo:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {selectedType?.label || 'No seleccionado'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Categoría:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {selectedCategory?.label || 'No seleccionada'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Variables:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {variables.length} configuradas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-space-600 p-6">
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={!formData.name || !formData.description || !formData.category}
            >
              <Save className="w-4 h-4 mr-2" />
              {template ? 'Actualizar' : 'Crear'} Plantilla
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}