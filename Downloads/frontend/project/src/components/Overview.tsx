import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Fish,
  Navigation,
  Satellite
} from 'lucide-react';
import { AgroBot } from '../types';

interface OverviewProps {
  selectedBot: AgroBot | null;
}

export function Overview({ selectedBot }: OverviewProps) {
  const stats = [
    {
      title: 'Active Agro-Bots',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Ocean Temperature',
      value: '24.8°C',
      change: '+0.3°C',
      trend: 'up',
      icon: Thermometer,
      color: 'text-red-500'
    },
    {
      title: 'Active Alerts',
      value: '3',
      change: '-1',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-yellow-500'
    },
    {
      title: 'Data Points',
      value: '2.4M',
      change: '+12K',
      trend: 'up',
      icon: Satellite,
      color: 'text-blue-600'
    }
  ];

  const recentData = [
    { time: '10:30', temp: 24.5, salinity: 35.2, ph: 8.1 },
    { time: '10:25', temp: 24.3, salinity: 35.1, ph: 8.1 },
    { time: '10:20', temp: 24.2, salinity: 35.0, ph: 8.0 },
    { time: '10:15', temp: 24.1, salinity: 34.9, ph: 8.0 },
    { time: '10:10', temp: 24.0, salinity: 34.8, ph: 7.9 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <div className={`ml-2 flex items-center ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Data Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Real-time Ocean Data</h3>
            <p className="text-sm text-gray-600">Last 30 minutes</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentData.map((data, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm text-gray-600">{data.time}</span>
                  <div className="flex space-x-4 text-sm">
                    <div className="flex items-center">
                      <Thermometer className="w-4 h-4 text-red-500 mr-1" />
                      <span>{data.temp}°C</span>
                    </div>
                    <div className="flex items-center">
                      <Droplets className="w-4 h-4 text-blue-500 mr-1" />
                      <span>{data.salinity}</span>
                    </div>
                    <div className="flex items-center">
                      <Fish className="w-4 h-4 text-teal-500 mr-1" />
                      <span>{data.ph}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Bot Details */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedBot ? selectedBot.name : 'No Bot Selected'}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedBot ? 'Live sensor data' : 'Select a bot from the map to view details'}
            </p>
          </div>
          <div className="p-6">
            {selectedBot ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Thermometer className="w-5 h-5 text-red-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-red-900">Temperature</p>
                        <p className="text-lg font-semibold text-red-700">{selectedBot.data.temperature}°C</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Droplets className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Salinity</p>
                        <p className="text-lg font-semibold text-blue-700">{selectedBot.data.salinity} PSU</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Fish className="w-5 h-5 text-teal-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-teal-900">pH Level</p>
                        <p className="text-lg font-semibold text-teal-700">{selectedBot.data.ph}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Wind className="w-5 h-5 text-gray-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Current Speed</p>
                        <p className="text-lg font-semibold text-gray-700">{selectedBot.data.currentSpeed} m/s</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Status</h4>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      selectedBot.status === 'active' ? 'bg-green-500' :
                      selectedBot.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm text-gray-600 capitalize">{selectedBot.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Last updated: {new Date(selectedBot.lastUpdate).toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Click on an Agro-Bot marker on the map to view its data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}