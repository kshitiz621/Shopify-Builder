import { create } from 'zustand';
import { SectionInstance, BuilderState } from '@/types/builder';
import { SECTION_REGISTRY } from '@/lib/sectionRegistry';

interface BuilderStore extends BuilderState {
  selectedSectionId: string | null;
  addSection: (type: string) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, updates: Partial<SectionInstance>) => void;
  reorderSections: (newSections: SectionInstance[]) => void;
  setSelectedSectionId: (id: string | null) => void;
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  sections: [],
  selectedSectionId: null,

  addSection: (type) => {
    const definition = SECTION_REGISTRY[type];
    if (!definition) return;

    const defaultSettings: Record<string, any> = {};
    definition.settings.forEach((s) => {
      defaultSettings[s.id] = s.default;
    });

    const newSection: SectionInstance = {
      id: `sec_${Math.random().toString(36).substr(2, 9)}`,
      type,
      variant: definition.variants[0].id,
      settings: defaultSettings,
    };

    set((state) => ({
      sections: [...state.sections, newSection],
      selectedSectionId: newSection.id,
    }));
  },

  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
      selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
    })),

  updateSection: (id, updates) =>
    set((state) => ({
      sections: state.sections.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),

  reorderSections: (newSections) => set({ sections: newSections }),

  setSelectedSectionId: (id) => set({ selectedSectionId: id }),
}));
