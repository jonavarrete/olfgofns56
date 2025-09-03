import React, { useState } from 'react';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import { 
  Languages, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Download,
  Upload,
  Search,
  Save,
  X,
  Globe,
  FileText,
  CheckCircle,
  AlertTriangle,
  Filter
} from 'lucide-react';

interface LanguageEntry {
  id: string;
  key: string;
  es: string;
  en: string;
  fr: string;
  de: string;
  category: string;
  lastUpdated: number;
}

export default function LanguageManagement() {
  const [translations, setTranslations] = useState<LanguageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<LanguageEntry | null>(null);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const categories = [
    'navigation', 'resources', 'buildings', 'ships', 'research', 
    'common', 'notifications', 'errors', 'admin'
  ];

  React.useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock translation data
      const mockTranslations: LanguageEntry[] = [
        {
          id: '1',
          key: 'empire',
          es: 'Imperio',
          en: 'Empire',
          fr: 'Empire',
          de: 'Reich',
          category: 'navigation',
          lastUpdated: Date.now() - 86400000
        },
        {
          id: '2',
          key: 'buildings',
          es: 'Edificios',
          en: 'Buildings',
          fr: 'Bâtiments',
          de: 'Gebäude',
          category: 'navigation',
          lastUpdated: Date.now() - 86400000 * 2
        },
        {
          id: '3',
          key: 'metal',
          es: 'Metal',
          en: 'Metal',
          fr: 'Métal',
          de: 'Metall',
          category: 'resources',
          lastUpdated: Date.now() - 86400000 * 3
        },
        {
          id: '4',
          key: 'crystal',
          es: 'Cristal',
          en: 'Crystal',
          fr: 'Cristal',
          de: 'Kristall',
          category: 'resources',
          lastUpdated: Date.now() - 86400000 * 4
        },
        {
          id: '5',
          key: 'buildingComplete',
          es: 'Construcción completada',
          en: 'Building completed',
          fr: 'Construction terminée',
          de: 'Gebäude fertiggestellt',
          category: 'notifications',
          lastUpdated: Date.now() - 86400000 * 5
        }
      ];
      
      setTranslations(mockTranslations);
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTranslations = translations.filter(entry => {
    const matchesSearch = entry.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         Object.values(entry).some(val => 
                           typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveEntry = async (entryData: Partial<LanguageEntry>) => {
    try {
      if (editingEntry) {
        setTranslations(prev => prev.map(entry => 
          entry.id === editingEntry.id 
            ? { ...entry, ...entryData, lastUpdated: Date.now() }
            : entry
        ));
        setEditingEntry(null);
      } else {
        const newEntry: LanguageEntry = {
          id: Date.now().toString(),
          ...entryData,
          lastUpdated: Date.now()
        } as LanguageEntry;
        setTranslations(prev => [newEntry, ...prev]);
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error saving translation:', error);
    }
  };

  const exportTranslations = () => {
    const data = JSON.stringify(translations, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translations.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCompletionPercentage = (entry: LanguageEntry) => {
    const totalLanguages = 4;
    const completedLanguages = languages.filter(lang => 
      entry[lang.code as keyof LanguageEntry] && 
      String(entry[lang.code as keyof LanguageEntry]).trim() !== ''
    ).length;
    return Math.round((completedLanguages / totalLanguages) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Gestión de Idiomas
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Administrar traducciones y localización
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={exportTranslations}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button 
            variant="primary"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Traducción
          </Button>
        </div>
      </div>

      {/* Language Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {languages.map((lang) => (
          <AdminCard
            key={lang.code}
            title={`${lang.flag} ${lang.name}`}
            value={translations.filter(t => t[lang.code as keyof LanguageEntry]).length.toString()}
            icon={Globe}
            color="neon-blue"
            subtitle="traducciones"
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
              placeholder="Buscar traducciones..."
              className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </AdminCard>

      {/* Translations Table */}
      <AdminCard title="Traducciones" icon={Languages} color="neon-purple">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="animate-pulse p-4 bg-space-700/30 rounded border border-space-600">
                <div className="grid grid-cols-6 gap-4">
                  <div className="h-4 bg-space-600 rounded"></div>
                  <div className="h-4 bg-space-600 rounded"></div>
                  <div className="h-4 bg-space-600 rounded"></div>
                  <div className="h-4 bg-space-600 rounded"></div>
                  <div className="h-4 bg-space-600 rounded"></div>
                  <div className="h-4 bg-space-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-space-600">
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">Clave</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">🇪🇸 Español</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">🇺🇸 English</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">🇫🇷 Français</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">🇩🇪 Deutsch</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTranslations.map((entry) => {
                  const completion = getCompletionPercentage(entry);
                  return (
                    <tr key={entry.id} className="border-b border-space-600/50 hover:bg-space-700/30 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-rajdhani font-medium text-white">
                            {entry.key}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">{entry.category}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              completion === 100 ? 'bg-neon-green' : 
                              completion >= 75 ? 'bg-neon-orange' : 'bg-neon-red'
                            }`}></div>
                            <span className="text-xs text-gray-400">{completion}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-300">{entry.es}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-300">{entry.en}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-300">{entry.fr}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-300">{entry.de}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingEntry(entry)}
                            className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setTranslations(prev => prev.filter(t => t.id !== entry.id))}
                            className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      {/* Translation Editor */}
      {(showCreateForm || editingEntry) && (
        <TranslationEditor
          entry={editingEntry}
          onSave={handleSaveEntry}
          onClose={() => {
            setShowCreateForm(false);
            setEditingEntry(null);
          }}
        />
      )}
    </div>
  );
}

interface TranslationEditorProps {
  entry?: LanguageEntry | null;
  onSave: (entry: Partial<LanguageEntry>) => void;
  onClose: () => void;
}

function TranslationEditor({ entry, onSave, onClose }: TranslationEditorProps) {
  const [formData, setFormData] = useState({
    key: entry?.key || '',
    es: entry?.es || '',
    en: entry?.en || '',
    fr: entry?.fr || '',
    de: entry?.de || '',
    category: entry?.category || 'common',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-3xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              {entry ? 'Editar Traducción' : 'Nueva Traducción'}
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
                Clave de Traducción
              </label>
              <input
                type="text"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="translation_key"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              >
                <option value="common">Común</option>
                <option value="navigation">Navegación</option>
                <option value="resources">Recursos</option>
                <option value="buildings">Edificios</option>
                <option value="ships">Naves</option>
                <option value="research">Investigación</option>
                <option value="notifications">Notificaciones</option>
                <option value="errors">Errores</option>
                <option value="admin">Administración</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-rajdhani font-semibold text-white">
              Traducciones por Idioma
            </h3>
            
            {[
              { code: 'es', name: 'Español', flag: '🇪🇸' },
              { code: 'en', name: 'English', flag: '🇺🇸' },
              { code: 'fr', name: 'Français', flag: '🇫🇷' },
              { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            ].map((lang) => (
              <div key={lang.code}>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  {lang.flag} {lang.name}
                </label>
                <input
                  type="text"
                  value={formData[lang.code as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [lang.code]: e.target.value })}
                  className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  placeholder={`Traducción en ${lang.name}`}
                  required={lang.code === 'es'} // Spanish is required as base language
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              {entry ? 'Actualizar' : 'Crear'} Traducción
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}