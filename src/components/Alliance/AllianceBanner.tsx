import React, { useRef, useEffect } from 'react';
import { BannerElement } from '../../types/game';

interface AllianceBannerProps {
  elements: BannerElement[];
  background: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function AllianceBanner({ 
  elements, 
  background, 
  width = 100, 
  height = 75, 
  className = '' 
}: AllianceBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawBanner();
  }, [elements, background, width, height]);

  const drawBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale factor for smaller display
    const scaleX = width / 400;
    const scaleY = height / 300;

    // Clear and set background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    // Sort elements by layer
    const sortedElements = [...elements].sort((a, b) => a.layer - b.layer);

    // Draw elements
    sortedElements.forEach(element => {
      ctx.save();
      ctx.translate(element.x * scaleX, element.y * scaleY);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.fillStyle = element.color;
      ctx.strokeStyle = element.color;
      ctx.lineWidth = 1;

      const scaledSize = element.size * Math.min(scaleX, scaleY);

      if (element.type === 'shape') {
        drawShape(ctx, element.shape!, scaledSize);
      } else if (element.type === 'symbol') {
        drawSymbol(ctx, element.symbol!, scaledSize);
      } else if (element.type === 'text' && element.text) {
        ctx.font = `${scaledSize * 0.6}px Orbitron`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(element.text, 0, 0);
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
        ctx.fillRect(-2, -15, 4, 20);
        ctx.fillRect(-6, 5, 12, 4);
        ctx.fillRect(-3, 9, 6, 6);
        break;
      case 'lightning':
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

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`rounded border border-space-600 ${className}`}
    />
  );
}