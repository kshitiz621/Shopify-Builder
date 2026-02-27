'use client';

import React from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { SECTION_REGISTRY } from '@/lib/sectionRegistry';
import { Settings2, Layers } from 'lucide-react';

export const RightPanel = () => {
  const { sections, selectedSectionId, updateSection } = useBuilderStore();

  const selectedSection = sections.find((s) => s.id === selectedSectionId);
  const definition = selectedSection ? SECTION_REGISTRY[selectedSection.type] : null;

  if (!selectedSection || !definition) {
    return (
      <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Settings2 size={20} className="text-gray-300" />
        </div>
        <p className="text-sm text-gray-500 font-medium">Select a section on the canvas to edit its settings.</p>
      </div>
    );
  }

  const handleSettingChange = (settingId: string, value: any) => {
    updateSection(selectedSection.id, {
      settings: { ...selectedSection.settings, [settingId]: value },
    });
  };

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{definition.name}</h2>
        <div className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-500 uppercase">
          {selectedSection.id}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Variant Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Layers size={12} />
            Variant
          </label>
          <div className="grid grid-cols-2 gap-2">
            {definition.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => updateSection(selectedSection.id, { variant: v.id })}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  selectedSection.variant === v.id
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Settings */}
        <div className="space-y-5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Settings2 size={12} />
            Settings
          </label>
          {definition.settings.map((setting) => (
            <div key={setting.id} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{setting.label}</label>

              {setting.type === 'text' && (
                <input
                  type="text"
                  value={selectedSection.settings[setting.id]}
                  onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              )}

              {setting.type === 'textarea' && (
                <textarea
                  value={selectedSection.settings[setting.id]}
                  onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                />
              )}

              {setting.type === 'color' && (
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={selectedSection.settings[setting.id]}
                    onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                    className="w-10 h-10 rounded-lg border-0 p-0 overflow-hidden cursor-pointer"
                  />
                  <span className="text-xs font-mono text-gray-500 uppercase">
                    {selectedSection.settings[setting.id]}
                  </span>
                </div>
              )}

              {setting.type === 'checkbox' && (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSection.settings[setting.id]}
                    onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              )}

              {setting.type === 'range' && (
                <div className="space-y-2">
                  <input
                    type="range"
                    min={setting.min}
                    max={setting.max}
                    step={setting.step}
                    value={selectedSection.settings[setting.id]}
                    onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-gray-400">
                    <span>{setting.min}{setting.unit}</span>
                    <span className="text-indigo-600">{selectedSection.settings[setting.id]}{setting.unit}</span>
                    <span>{setting.max}{setting.unit}</span>
                  </div>
                </div>
              )}

              {setting.type === 'select' && (
                <select
                  value={selectedSection.settings[setting.id]}
                  onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                >
                  {setting.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {setting.type === 'image_picker' && (
                <div className="space-y-3">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group">
                    <img
                      src={selectedSection.settings[setting.id]}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <p className="text-white text-xs font-bold">Change Image</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={selectedSection.settings[setting.id]}
                    onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
