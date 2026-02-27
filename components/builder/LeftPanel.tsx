'use client';

import React from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { SECTION_REGISTRY } from '@/lib/sectionRegistry';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableSectionItem = ({ section, onRemove, onSelect, isSelected }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const definition = SECTION_REGISTRY[section.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer mb-2 ${
        isSelected ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-100 hover:border-gray-300'
      }`}
      onClick={() => onSelect(section.id)}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
        <GripVertical size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{definition?.name || section.type}</p>
        <p className="text-xs text-gray-500 truncate">{section.variant}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(section.id);
        }}
        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export const LeftPanel = () => {
  const { sections, addSection, removeSection, reorderSections, selectedSectionId, setSelectedSectionId } = useBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Sections</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(SECTION_REGISTRY).map((def) => (
            <button
              key={def.type}
              onClick={() => addSection(def.type)}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <Plus size={16} className="text-gray-500 group-hover:text-indigo-600" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 group-hover:text-indigo-700">
                {def.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/30">
        {sections.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No sections added yet. Click above to start building.</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              {sections.map((section) => (
                <SortableSectionItem
                  key={section.id}
                  section={section}
                  onRemove={removeSection}
                  onSelect={setSelectedSectionId}
                  isSelected={selectedSectionId === section.id}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};
