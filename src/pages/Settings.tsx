import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { Type, Moon, Volume2, Eye, Smartphone, Bell } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    fontSize: 18,
    darkMode: false,
    audioOnRead: true,
    highContrast: true,
    notifications: true,
    slowAnimations: false,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Settings</h1>
            <p className="text-2xl text-white/80">Customize your learning experience</p>
          </div>

          <GlassCard className="p-12">
            <div className="space-y-12">
              {/* Font Size */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <Type className="text-black" size={32} />
                  <h2 className="text-2xl font-bold text-black">Text Size</h2>
                </div>
                <div className="bg-white/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg text-black">Font Size</span>
                    <span className="text-lg font-medium text-black">{settings.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="28"
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-black/60 mt-2">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                  <p className="mt-4 text-black" style={{ fontSize: `${settings.fontSize}px` }}>
                    This is how your text will look at this size.
                  </p>
                </div>
              </div>

              {/* Visual Settings */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <Eye className="text-black" size={32} />
                  <h2 className="text-2xl font-bold text-black">Visual Preferences</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-black">Dark Mode</h3>
                        <p className="text-black/60">Easier on the eyes in low light</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.darkMode}
                          onChange={(e) => updateSetting('darkMode', e.target.checked)}
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-black">High Contrast</h3>
                        <p className="text-black/60">Enhanced visibility</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.highContrast}
                          onChange={(e) => updateSetting('highContrast', e.target.checked)}
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Settings */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <Volume2 className="text-black" size={32} />
                  <h2 className="text-2xl font-bold text-black">Audio Preferences</h2>
                </div>
                <div className="bg-white/50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-black">Read Aloud</h3>
                      <p className="text-black/60">Automatically read lesson content</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.audioOnRead}
                        onChange={(e) => updateSetting('audioOnRead', e.target.checked)}
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Other Settings */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <Smartphone className="text-black" size={32} />
                  <h2 className="text-2xl font-bold text-black">Other Preferences</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-black">Notifications</h3>
                        <p className="text-black/60">Daily learning reminders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.notifications}
                          onChange={(e) => updateSetting('notifications', e.target.checked)}
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-black">Slow Animations</h3>
                        <p className="text-black/60">Reduce motion for comfort</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.slowAnimations}
                          onChange={(e) => updateSetting('slowAnimations', e.target.checked)}
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 pt-8 border-t border-black/20">
              <button className="bg-black text-white px-12 py-4 rounded-xl text-xl font-bold hover:bg-gray-800 transition-all duration-300">
                Save Settings
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
