import React from 'react';

interface LineGraphProps {
  data?: number[];
  width?: number;
  height?: number;
  lineColor?: string;
  strokeWidth?: number;
}

const LineGraph: React.FC<LineGraphProps> = ({ 
  data = [45, 52, 38, 65, 48, 72, 55, 68, 52, 75, 62, 78],
  width = 150,
  height = 60,
  lineColor = "#4F63F6",
  strokeWidth = 2.5
}) => {
  // Generate smooth SVG path from data points
  const generatePath = () => {
    if (data.length === 0) return '';
    
    const padding = 5;
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const xStep = (width - padding * 2) / (data.length - 1);
    
    // Create points
    const points = data.map((value, index) => {
      const x = padding + index * xStep;
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return { x, y };
    });
    
    // Create smooth curve using quadratic bezier curves
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlX = (current.x + next.x) / 2;
      
      path += ` Q ${controlX} ${current.y}, ${controlX} ${(current.y + next.y) / 2}`;
      path += ` Q ${controlX} ${next.y}, ${next.x} ${next.y}`;
    }
    
    return path;
  };
  
  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={generatePath()}
        fill="none"
        stroke={lineColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LineGraph;

