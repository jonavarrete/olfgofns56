import React, { useState, useRef, useEffect } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  Palette, 
  Download, 
  Upload, 
  RotateCcw, 
  Save, 
  Eye,
  Layers,
  Square,
  Circle,
  Triangle,
  Star,
  Shield,
  Crown,
  Sword,
  Zap
} from 'lucide-react';

import { BannerElement } from '../../types/game';

interface BannerCreatorProps {
  onSave: (bannerData: { elements: BannerElement[]; background: string }) => void;
  onCancel: () => void;
  initialData?: { elements: BannerElement[]; background: string };
}

export default function BannerCreator({ onSave, onCancel, initialData }: BannerCreatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<BannerElement[]>(initialData?.elements || []);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState(initialData?.background || '#1a1a2e');
  const [selectedTool, setSelectedTool] = useState<'shape' | 'symbol' | 'text'>('shape');
  const [selectedShape, setSelectedShape] = useState<BannerElement['shape']>('circle');
  const [selectedSymbol, setSelectedSymbol] = useState<BannerElement['symbol']>('crown');
  const [selectedColor, setSelectedColor] = useState('#00D4FF');
  const [textInput, setTextInput] = useState('');

  const colors = [
    '#00D4FF', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
    '#FFFFFF', '#6B7280', '#1F2937', '#FCD34D', '#F472B6'
  ];

  const shapes = [
    { type: 'circle' as const, icon: Circle, name: 'Círculo' },
    { type: 'square' as const, icon: Square, name: 'Cuadrado' },
    { type: 'triangle' as const, icon: Triangle, name: 'Triángulo' },
    { type: 'star' as const, icon: Star, name: 'Estrella' },
    { type: 'shield' as const, icon: Shield, name: 'Escudo' },
  ];

  const symbols = [
    { type: 'crown' as const, icon: Crown, name: 'Corona' },
    { type: 'sword' as const, icon: Sword, name: 'Espada' },
    { type: 'lightning' as const, icon: Zap, name: 'Rayo' },
    { type: 'star' as const, icon: Star, name: 'Estrella' },
    { type: 'shield' as const, icon: Shield, name: 'Escudo' },
  ];

  useEffect(() => {
    drawCanvas();
  }, [elements, backgroundColor]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sort elements by layer
    const sortedElements = [...elements].sort((a, b) => a.layer - b.layer);

    // Draw elements
    sortedElements.forEach(element => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.fillStyle = element.color;
      ctx.strokeStyle = element.color;
      ctx.lineWidth = 2;

      if (element.type === 'shape') {
        drawShape(ctx, element.shape!, element.size);
      } else if (element.type === 'symbol') {
        drawSymbol(ctx, element.symbol!, element.size);
      } else if (element.type === 'text' && element.text) {
        ctx.font = `${element.size}px Orbitron`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(element.text, 0, 0);
      }

      // Draw selection outline
      if (selectedElement === element.id) {
        ctx.strokeStyle = '#00D4FF';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(-element.size/2, -element.size/2, element.size, element.size);
        ctx.setLineDash([]);
      }

      ctx.restore();
    });
  };

  const drawShape = (ctx: CanvasRenderingContext2D, shape: BannerElement['shape'], size: number) => {
    const radius = size / 2;
    
    switch (shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(-radius, -radius, size, size);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -radius);
        ctx.lineTo(-radius, radius);
        ctx.lineTo(radius, radius);
        ctx.closePath();
        ctx.fill();
        break;
      case 'star':
        drawStar(ctx, 0, 0, 5, radius, radius * 0.5);
        ctx.fill();
        break;
      case 'shield':
        ctx.beginPath();
        ctx.moveTo(0, -radius);
        ctx.quadraticCurveTo(radius, -radius, radius, 0);
        ctx.quadraticCurveTo(radius, radius, 0, radius);
        ctx.quadraticCurveTo(-radius, radius, -radius, 0);
        ctx.quadraticCurveTo(-radius, -radius, 0, -radius);
        ctx.fill();
        break;
    }
  };

  const drawSymbol = (ctx: CanvasRenderingContext2D, symbol: BannerElement['symbol'], size: number) => {
    const scale = size / 40;
    ctx.scale(scale, scale);
    
    switch (symbol) {
      case 'crown':
        // Simple crown shape
        ctx.beginPath();
        ctx.moveTo(-15, 10);
        ctx.lineTo(-10, -10);
        ctx.lineTo(-5, 5);
        ctx.lineTo(0, -15);
        ctx.lineTo(5, 5);
        ctx.lineTo(10, -10);
        ctx.lineTo(15, 10);
        ctx.closePath();
        ctx.fill();
        break;
      case 'sword':
        // Simple sword shape
        ctx.fillRect(-2, -15, 4, 20);
        ctx.fillRect(-6, 5, 12, 4);
        ctx.fillRect(-3, 9, 6, 6);
        break;
      case 'lightning':
        // Lightning bolt
        ctx.beginPath();
        ctx.moveTo(-5, -15);
        ctx.lineTo(5, -5);
        ctx.lineTo(-2, -5);
        ctx.lineTo(5, 15);
        ctx.lineTo(-5, 5);
        ctx.lineTo(2, 5);
        ctx.closePath();
        ctx.fill();
        break;
      case 'star':
        drawStar(ctx, 0, 0, 5, 15, 7);
        ctx.fill();
        break;
      case 'shield':
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.quadraticCurveTo(12, -15, 12, 0);
        ctx.quadraticCurveTo(12, 15, 0, 15);
        ctx.quadraticCurveTo(-12, 15, -12, 0);
        ctx.quadraticCurveTo(-12, -15, 0, -15);
        ctx.fill();
        break;
    }
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      const x = cx + Math.cos(rot) * outerRadius;
      const y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      const x2 = cx + Math.cos(rot) * innerRadius;
      const y2 = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x2, y2);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if clicking on existing element
    const clickedElement = elements.find(element => {
      const distance = Math.sqrt(
        Math.pow(x - element.x, 2) + Math.pow(y - element.y, 2)
      );
      return distance <= element.size / 2;
    });

    if (clickedElement) {
      setSelectedElement(clickedElement.id);
      return;
    }

    // Create new element
    if (selectedTool === 'text' && !textInput.trim()) {
      alert('Por favor ingresa el texto para el estandarte');
      return;
    }

    const newElement: BannerElement = {
      id: Date.now().toString(),
      type: selectedTool,
      shape: selectedTool === 'shape' ? selectedShape : undefined,
      symbol: selectedTool === 'symbol' ? selectedSymbol : undefined,
      text: selectedTool === 'text' ? textInput : undefined,
      x,
      y,
      size: 40,
      color: selectedColor,
      rotation: 0,
      layer: elements.length,
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
    if (selectedTool === 'text') setTextInput('');
  };

  const updateSelectedElement = (updates: Partial<BannerElement>) => {
    if (!selectedElement) return;

    setElements(elements.map(element =>
      element.id === selectedElement
        ? { ...element, ...updates }
        : element
    ));
  };

  const deleteSelectedElement = () => {
    if (!selectedElement) return;
    setElements(elements.filter(element => element.id !== selectedElement));
    setSelectedElement(null);
  };

  const clearCanvas = () => {
    setElements([]);
    setSelectedElement(null);
  };

  const handleSave = () => {
    onSave({
      elements,
      background: backgroundColor
    });
  };

  const selectedElementData = elements.find(e => e.id === selectedElement);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-white">
            Creador de Estandarte
          </h2>
          <p className="text-gray-400 mt-1">
            Diseña el símbolo que representará a tu alianza
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Estandarte
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-2">
          <Card title="Lienzo del Estandarte" glowing>
            <div className="flex flex-col items-center space-y-4">
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
                onClick={handleCanvasClick}
                className="border-2 border-space-600 rounded-lg cursor-crosshair bg-space-800"
                style={{ backgroundColor }}
              />
              
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm" onClick={clearCanvas}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Limpiar
                </Button>
                {selectedElement && (
                  <Button variant="danger" size="sm" onClick={deleteSelectedElement}>
                    Eliminar Seleccionado
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Tools Panel */}
        <div className="space-y-4">
          {/* Tool Selection */}
          <Card title="Herramientas">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedTool('shape')}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    selectedTool === 'shape'
                      ? 'bg-neon-blue/20 border-neon-blue text-neon-blue'
                      : 'bg-space-700/50 border-space-600 text-gray-400 hover:text-white'
                  }`}
                >
                  <Square className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Formas</span>
                </button>
                <button
                  onClick={() => setSelectedTool('symbol')}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    selectedTool === 'symbol'
                      ? 'bg-neon-blue/20 border-neon-blue text-neon-blue'
                      : 'bg-space-700/50 border-space-600 text-gray-400 hover:text-white'
                  }`}
                >
                  <Crown className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Símbolos</span>
                </button>
                <button
                  onClick={() => setSelectedTool('text')}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    selectedTool === 'text'
                      ? 'bg-neon-blue/20 border-neon-blue text-neon-blue'
                      : 'bg-space-700/50 border-space-600 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg font-orbitron mx-auto mb-1 block">A</span>
                  <span className="text-xs">Texto</span>
                </button>
              </div>

              {/* Shape Selection */}
              {selectedTool === 'shape' && (
                <div className="space-y-2">
                  <h4 className="text-sm font-rajdhani font-medium text-gray-400">Formas</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {shapes.map(shape => (
                      <button
                        key={shape.type}
                        onClick={() => setSelectedShape(shape.type)}
                        className={`p-2 rounded border transition-all duration-200 ${
                          selectedShape === shape.type
                            ? 'bg-neon-purple/20 border-neon-purple text-neon-purple'
                            : 'bg-space-700/50 border-space-600 text-gray-400 hover:text-white'
                        }`}
                      >
                        <shape.icon className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs">{shape.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Symbol Selection */}
              {selectedTool === 'symbol' && (
                <div className="space-y-2">
                  <h4 className="text-sm font-rajdhani font-medium text-gray-400">Símbolos</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {symbols.map(symbol => (
                      <button
                        key={symbol.type}
                        onClick={() => setSelectedSymbol(symbol.type)}
                        className={`p-2 rounded border transition-all duration-200 ${
                          selectedSymbol === symbol.type
                            ? 'bg-neon-purple/20 border-neon-purple text-neon-purple'
                            : 'bg-space-700/50 border-space-600 text-gray-400 hover:text-white'
                        }`}
                      >
                        <symbol.icon className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs">{symbol.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Input */}
              {selectedTool === 'text' && (
                <div className="space-y-2">
                  <h4 className="text-sm font-rajdhani font-medium text-gray-400">Texto</h4>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Ingresa el texto..."
                    className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                    maxLength={10}
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Color Palette */}
          <Card title="Colores">
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded border-2 transition-all duration-200 ${
                      selectedColor === color ? 'border-white scale-110' : 'border-space-600'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-rajdhani font-medium text-gray-400">Fondo</h4>
                <div className="grid grid-cols-5 gap-2">
                  {['#1a1a2e', '#2d1b69', '#0f3460', '#16213e', '#0e4b99'].map(color => (
                    <button
                      key={color}
                      onClick={() => setBackgroundColor(color)}
                      className={`w-8 h-8 rounded border-2 transition-all duration-200 ${
                        backgroundColor === color ? 'border-white scale-110' : 'border-space-600'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Element Properties */}
          {selectedElementData && (
            <Card title="Propiedades del Elemento">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-rajdhani font-medium text-gray-400 block mb-1">
                    Tamaño
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={selectedElementData.size}
                    onChange={(e) => updateSelectedElement({ size: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-400">{selectedElementData.size}px</span>
                </div>

                <div>
                  <label className="text-sm font-rajdhani font-medium text-gray-400 block mb-1">
                    Rotación
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={selectedElementData.rotation}
                    onChange={(e) => updateSelectedElement({ rotation: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-400">{selectedElementData.rotation}°</span>
                </div>

                <div>
                  <label className="text-sm font-rajdhani font-medium text-gray-400 block mb-1">
                    Capa
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={selectedElementData.layer}
                    onChange={(e) => updateSelectedElement({ layer: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-400">Capa {selectedElementData.layer}</span>
                </div>

                <div>
                  <label className="text-sm font-rajdhani font-medium text-gray-400 block mb-1">
                    Color
                  </label>
                  <div className="grid grid-cols-5 gap-1">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => updateSelectedElement({ color })}
                        className={`w-6 h-6 rounded border transition-all duration-200 ${
                          selectedElementData.color === color ? 'border-white scale-110' : 'border-space-600'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}