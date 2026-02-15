"use client";

import { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Shield, Users, Server, Cpu, Database, Globe } from 'lucide-react';

interface SystemMetric {
  name: string;
  value: string | number;
  status: 'safe' | 'warning' | 'critical';
  icon: React.ReactNode;
}

interface SecurityEvent {
  id: number;
  timestamp: string;
  event: string;
  severity: 'low' | 'medium' | 'high';
  user?: string;
}

export default function CTODashboard() {
  const [metrics] = useState<SystemMetric[]>([
    { name: 'SSH Connections', value: '3 Active', status: 'safe', icon: <Users className="w-5 h-5" /> },
    { name: 'CPU Usage', value: '32%', status: 'safe', icon: <Cpu className="w-5 h-5" /> },
    { name: 'Memory Usage', value: '4.2/8GB', status: 'warning', icon: <Server className="w-5 h-5" /> },
    { name: 'PostgreSQL 18', value: 'Running', status: 'safe', icon: <Database className="w-5 h-5" /> },
    { name: 'Git Server', value: 'Port 3000', status: 'safe', icon: <Globe className="w-5 h-5" /> },
    { name: 'Tailscale VPN', value: 'Active', status: 'safe', icon: <Shield className="w-5 h-5" /> },
  ]);

  const [recentEvents] = useState<SecurityEvent[]>([
    { id: 1, timestamp: '15:14 UTC', event: 'SSH connection established (publickey)', severity: 'low' },
    { id: 2, timestamp: '13:09 UTC', event: 'Security lockdown initiated', severity: 'high' },
    { id: 3, timestamp: '12:45 UTC', event: 'PostgreSQL deployment completed', severity: 'low' },
    { id: 4, timestamp: '11:30 UTC', event: 'Backdoor removal completed', severity: 'high' },
    { id: 5, timestamp: '10:15 UTC', event: 'Team SSH keys configured', severity: 'medium' },
  ]);

  const [activeConnections, setActiveConnections] = useState<number>(3);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CTO Security Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real-time monitoring and security metrics for global operations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Updated: {lastUpdated}
          </div>
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Privacy Mode Active</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
              IP addresses and personally identifiable information are masked in all logs and alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  metric.status === 'safe' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  metric.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                  'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  {metric.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{metric.name}</h3>
                  <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{metric.value}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                metric.status === 'safe' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                metric.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}>
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Security Events */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Security Events</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">Last 24 hours</div>
          </div>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    event.severity === 'high' ? 'bg-red-500' :
                    event.severity === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{event.event}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.timestamp}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                  event.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                  'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                }`}>
                  {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">System Overview</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Active Connections</h3>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{activeConnections}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">SSH sessions</div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Masked for privacy protection
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Team Access</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">CTO (Veld)</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">Full Access</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Developer (Yukine)</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">Dev Access</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">DBA (Xetera)</span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">DB Access</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Privacy Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">IP Masking</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Log Retention</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">30 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">CTO Only</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p>Dashboard designed for CTO security oversight. Data refreshes every 30 seconds.</p>
        <p className="mt-1">All sensitive information is masked to protect team privacy.</p>
      </div>
    </div>
  );
}