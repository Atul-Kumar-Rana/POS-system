import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Bell, 
  BarChart3, 
  Navigation, 
  MessageCircle, 
  Settings,
  LogOut,
  ChevronRight,
  Thermometer,
  Droplets,
  Wind,
  Fish
} from 'lucide-react';
import { AgroBot } from '../types';

interface SidebarProps {
  selectedBot: AgroBot | null;
  onSectionChange: (section: string) => void;
  activeSection: string;
}

export function Sidebar({ selectedBot, onSectionChange, activeSection }: SidebarProps) {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview', roles: ['researcher', 'weather_analyst', 'marine_authority', 'fleet_manager'] },
    { id: 'map', icon: MapPin, label: 'Live Map', roles: ['researcher', 'weather_analyst', 'marine_authority', 'fleet_manager'] },
    { id: 'alerts', icon: Bell, label: 'Alerts', roles: ['weather_analyst', 'marine_authority'] },
    { id: 'routes', icon: Navigation, label: 'Route Optimization', roles: ['marine_authority', 'fleet_manager'] },
    { id: 'chat', icon: MessageCircle, label: 'AI Assistant', roles: ['researcher', 'weather_analyst', 'marine_authority', 'fleet_manager'] },
    { id: 'settings', icon: Settings, label: 'Settings', roles: ['researcher', 'weather_analyst', 'marine_authority', 'fleet_manager'] }
  ];

  const visibleMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'researcher')
  );

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Agro-Ocean</h2>
              <p className="text-sm text-gray-600 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {visibleMenuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Selected Bot Info */}
      {selectedBot && !isCollapsed && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Selected Agro-Bot</h3>
          <div className="text-sm text-gray-600 mb-3">
            <div className="font-medium">{selectedBot.name}</div>
            <div className="text-xs text-gray-500">
              {selectedBot.latitude.toFixed(3)}, {selectedBot.longitude.toFixed(3)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center">
              <Thermometer className="w-3 h-3 mr-1 text-red-500" />
              <span>{selectedBot.data.temperature}°C</span>
            </div>
            <div className="flex items-center">
              <Droplets className="w-3 h-3 mr-1 text-blue-500" />
              <span>{selectedBot.data.salinity} PSU</span>
            </div>
            <div className="flex items-center">
              <Wind className="w-3 h-3 mr-1 text-gray-500" />
              <span>{selectedBot.data.currentSpeed} m/s</span>
            </div>
            <div className="flex items-center">
              <Fish className="w-3 h-3 mr-1 text-teal-500" />
              <span>pH {selectedBot.data.ph}</span>
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
        {isCollapsed && (
          <button
            onClick={logout}
            className="w-full p-2 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700"
            title="Logout"
          >
            <LogOut className="w-4 h-4 mx-auto" />
          </button>
        )}
      </div>
    </div>
  );
}