import React, { useState, useEffect } from 'react';
import { MapPin, Activity, AlertTriangle, Navigation } from 'lucide-react';
import { AgroBot, Alert } from '../types';

interface InteractiveMapProps {
  onBotSelect: (bot: AgroBot) => void;
  selectedBot: AgroBot | null;
}

// Mock data for demonstration
const mockAgrobots: AgroBot[] = [
  {
    id: 'bot-1',
    name: 'Agro-Bot Alpha',
    latitude: -20.0,
    longitude: 57.5,
    status: 'active',
    lastUpdate: '2024-01-15T10:30:00Z',
    data: {
      temperature: 24.5,
      salinity: 35.2,
      ph: 8.1,
      oxygenLevel: 7.2,
      pollutionIndex: 2.1,
      currentSpeed: 0.8,
      currentDirection: 120
    }
  },
  {
    id: 'bot-2',
    name: 'Agro-Bot Beta',
    latitude: -15.5,
    longitude: 60.2,
    status: 'active',
    lastUpdate: '2024-01-15T10:28:00Z',
    data: {
      temperature: 26.1,
      salinity: 34.8,
      ph: 7.9,
      oxygenLevel: 6.8,
      pollutionIndex: 3.2,
      currentSpeed: 1.2,
      currentDirection: 95
    }
  },
  {
    id: 'bot-3',
    name: 'Agro-Bot Gamma',
    latitude: -25.3,
    longitude: 55.8,
    status: 'maintenance',
    lastUpdate: '2024-01-15T09:15:00Z',
    data: {
      temperature: 23.2,
      salinity: 35.5,
      ph: 8.3,
      oxygenLevel: 7.5,
      pollutionIndex: 1.8,
      currentSpeed: 0.5,
      currentDirection: 145
    }
  },
  {
    id: 'bot-4',
    name: 'Agro-Bot Delta',
    latitude: -18.7,
    longitude: 63.1,
    status: 'active',
    lastUpdate: '2024-01-15T10:32:00Z',
    data: {
      temperature: 25.8,
      salinity: 34.9,
      ph: 8.0,
      oxygenLevel: 7.0,
      pollutionIndex: 2.5,
      currentSpeed: 0.9,
      currentDirection: 80
    }
  }
];

const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'cyclone',
    severity: 'high',
    title: 'Cyclone Warning',
    description: 'Tropical cyclone detected 200km southeast',
    location: { latitude: -22.0, longitude: 59.0 },
    timestamp: '2024-01-15T10:00:00Z',
    isRead: false
  },
  {
    id: 'alert-2',
    type: 'pollution',
    severity: 'medium',
    title: 'Pollution Spike',
    description: 'Elevated pollution levels detected',
    location: { latitude: -16.0, longitude: 61.0 },
    timestamp: '2024-01-15T09:45:00Z',
    isRead: false
  }
];

export function InteractiveMap({ onBotSelect, selectedBot }: InteractiveMapProps) {
  const [bots] = useState<AgroBot[]>(mockAgrobots);
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [currentLayer, setCurrentLayer] = useState<'temperature' | 'currents' | 'salinity'>('temperature');

  // Convert lat/lng to SVG coordinates
  const latToY = (lat: number) => ((90 - lat) / 180) * 600;
  const lngToX = (lng: number) => ((lng + 180) / 360) * 1000;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'maintenance': return '#F59E0B';
      case 'offline': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#DC2626';
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Indian Ocean - Live Data</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentLayer('temperature')}
              className={`px-3 py-1 rounded-full text-sm ${
                currentLayer === 'temperature' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Temperature
            </button>
            <button
              onClick={() => setCurrentLayer('currents')}
              className={`px-3 py-1 rounded-full text-sm ${
                currentLayer === 'currents' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Currents
            </button>
            <button
              onClick={() => setCurrentLayer('salinity')}
              className={`px-3 py-1 rounded-full text-sm ${
                currentLayer === 'salinity' 
                  ? 'bg-teal-100 text-teal-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Salinity
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-96 bg-gradient-to-br from-blue-500 to-blue-700"
        >
          {/* Background ocean */}
          <defs>
            <pattern id="waves" patternUnits="userSpaceOnUse" width="40" height="20">
              <path d="M0 10 Q10 0 20 10 T40 10" stroke="#ffffff20" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="1000" height="600" fill="url(#waves)" />

          {/* Land masses (simplified Indian Ocean) */}
          <path 
            d="M 0 0 L 200 0 L 180 100 L 160 150 L 140 180 L 120 200 L 100 180 L 80 160 L 60 140 L 40 120 L 20 100 L 0 80 Z" 
            fill="#8B7355" 
            opacity="0.7"
          />
          <path 
            d="M 800 0 L 1000 0 L 1000 200 L 950 180 L 900 160 L 850 140 L 820 120 L 800 100 Z" 
            fill="#8B7355" 
            opacity="0.7"
          />

          {/* Data layer visualization */}
          {currentLayer === 'temperature' && (
            <>
              {bots.map((bot, index) => (
                <circle
                  key={`temp-${bot.id}`}
                  cx={lngToX(bot.longitude)}
                  cy={latToY(bot.latitude)}
                  r="30"
                  fill={`rgba(${bot.data.temperature > 25 ? '239, 68, 68' : '59, 130, 246'}, 0.3)`}
                  stroke={bot.data.temperature > 25 ? '#EF4444' : '#3B82F6'}
                  strokeWidth="2"
                />
              ))}
            </>
          )}

          {currentLayer === 'currents' && (
            <>
              {bots.map((bot, index) => (
                <g key={`current-${bot.id}`}>
                  <line
                    x1={lngToX(bot.longitude)}
                    y1={latToY(bot.latitude)}
                    x2={lngToX(bot.longitude) + Math.cos(bot.data.currentDirection * Math.PI / 180) * bot.data.currentSpeed * 20}
                    y2={latToY(bot.latitude) + Math.sin(bot.data.currentDirection * Math.PI / 180) * bot.data.currentSpeed * 20}
                    stroke="#06B6D4"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              ))}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#06B6D4" />
                </marker>
              </defs>
            </>
          )}

          {/* Alert markers */}
          {alerts.map((alert) => (
            <g key={alert.id}>
              <circle
                cx={lngToX(alert.location.longitude)}
                cy={latToY(alert.location.latitude)}
                r="25"
                fill={getSeverityColor(alert.severity)}
                opacity="0.8"
                className="animate-pulse"
              />
              <text
                x={lngToX(alert.location.longitude)}
                y={latToY(alert.location.latitude)}
                textAnchor="middle"
                dy="0.3em"
                fill="white"
                fontSize="16"
                fontWeight="bold"
              >
                !
              </text>
            </g>
          ))}

          {/* Agro-bot markers */}
          {bots.map((bot) => (
            <g key={bot.id}>
              <circle
                cx={lngToX(bot.longitude)}
                cy={latToY(bot.latitude)}
                r="12"
                fill={getStatusColor(bot.status)}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:r-14 transition-all"
                onClick={() => onBotSelect(bot)}
              />
              {selectedBot?.id === bot.id && (
                <circle
                  cx={lngToX(bot.longitude)}
                  cy={latToY(bot.latitude)}
                  r="18"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  className="animate-ping"
                />
              )}
              <text
                x={lngToX(bot.longitude)}
                y={latToY(bot.latitude) - 20}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {bot.name.split(' ')[1]}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Legend</h3>
          <div className="space-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Active Agro-Bot</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Maintenance</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span>Alert Zone</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Active Bots: {bots.filter(b => b.status === 'active').length}</span>
            <span>Active Alerts: {alerts.length}</span>
            <span>Layer: {currentLayer.charAt(0).toUpperCase() + currentLayer.slice(1)}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Activity className="w-3 h-3 mr-1" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}