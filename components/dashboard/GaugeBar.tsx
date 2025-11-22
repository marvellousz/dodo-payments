import React from 'react';

interface GaugeBarProps {
  value?: number;
  max?: number;
  label?: string;
  size?: number;
  thickness?: number;
  colors?: string[];
  segments?: Array<{ limit: number; color: string }>;
}

const GaugeBar: React.FC<GaugeBarProps> = ({ 
  value = 1800, 
  max = 3000, 
  label = "SPEND",
  size = 300,
  thickness = 40,
  colors = ['#3B4EF5', '#5BA8FF', '#E8EAED'],
  segments
}) => {
  // Calculate percentage and angle
  const percentage = Math.min((value / max) * 100, 100);
  const angle = (percentage / 100) * 180; // Semi-circle is 180 degrees
  
  // SVG parameters
  const center = size / 2;
  const radius = (size - thickness) / 2;
  
  // Create path for semi-circle
  const createArc = (startAngle: number, endAngle: number, color: string) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return (
      <path
        key={`${startAngle}-${endAngle}-${color}`}
        d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="butt"
      />
    );
  };
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  // Calculate segment angles
  let arcSegments: Array<{ start: number; end: number; color: string }> = [];
  
  if (segments) {
    // Use provided segments - calculate angles based on limits
    let previousLimit = 0;
    segments.forEach((segment) => {
      const startPercentage = (previousLimit / max) * 100;
      const endPercentage = (segment.limit / max) * 100;
      const startAngle = (startPercentage / 100) * 180;
      const endAngle = (endPercentage / 100) * 180;
      
      // Only add segment if it's within the filled portion (value)
      if (segment.limit <= value) {
        arcSegments.push({
          start: startAngle,
          end: Math.min(endAngle, angle),
          color: segment.color
        });
      } else if (previousLimit < value) {
        // Partial segment if value is between previousLimit and segment.limit
        arcSegments.push({
          start: startAngle,
          end: angle,
          color: segment.color
        });
      }
      previousLimit = segment.limit;
    });
  } else {
    // Default: divide into three equal segments
    arcSegments = [
      { start: 0, end: Math.min(angle, 60), color: colors[0] },
      { start: 60, end: Math.min(angle, 120), color: colors[1] },
      { start: 120, end: Math.min(angle, 180), color: colors[2] }
    ];
  }
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg width={size} height={size / 2 + 20} className="transform">
          {/* Background arc */}
          {createArc(0, 180, '#E8EAED')}
          
          {/* Filled segments */}
          {arcSegments.map((segment, index) => (
            segment.end > segment.start && (
              <React.Fragment key={index}>
                {createArc(segment.start, segment.end, segment.color)}
              </React.Fragment>
            )
          ))}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ top: '40%' }}>
          <div className="text-gray-500 text-xs font-medium tracking-wider mb-1 uppercase">
            {label}
          </div>
          <div className="text-center" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>
            ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeBar;
