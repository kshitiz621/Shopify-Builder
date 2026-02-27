'use client';

import React from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { SectionPreview } from '@/components/sections/SectionPreviews';
import { Download, Monitor, Smartphone, Tablet } from 'lucide-react';

export const Canvas = () => {
  const { sections, selectedSectionId, setSelectedSectionId } = useBuilderStore();
  const [viewMode, setViewMode] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'shopify-theme.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert('Failed to generate theme');
      }
    } catch (error) {
      console.error(error);
      alert('Error generating theme');
    } finally {
      setIsGenerating(false);
    }
  };

  const containerWidth = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  }[viewMode];

  return (
    <div className="flex-1 h-full bg-gray-100 flex flex-col overflow-hidden">
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-gray-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Monitor size={18} />
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'tablet' ? 'bg-gray-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Tablet size={18} />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-gray-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Smartphone size={18} />
          </button>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || sections.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download size={16} />
          )}
          Export Theme ZIP
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-gray-100">
        <div
          className={`${containerWidth} bg-white shadow-2xl min-h-full transition-all duration-300 overflow-hidden relative`}
          onClick={() => setSelectedSectionId(null)}
        >
          {sections.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-4">
              <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
                <Plus size={24} />
              </div>
              <p className="font-medium">Your store is empty</p>
            </div>
          ) : (
            sections.map((section) => (
              <div
                key={section.id}
                className={`relative group cursor-pointer border-2 border-transparent hover:border-indigo-400 transition-colors ${
                  selectedSectionId === section.id ? 'border-indigo-500 ring-4 ring-indigo-500/10' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSectionId(section.id);
                }}
              >
                <SectionPreview section={section} />
                {selectedSectionId === section.id && (
                  <div className="absolute top-0 left-0 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-md uppercase tracking-wider z-10">
                    {section.type}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
