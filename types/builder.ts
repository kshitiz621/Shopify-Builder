export type SettingType = 'text' | 'textarea' | 'color' | 'number' | 'range' | 'image_picker' | 'checkbox' | 'select';

export interface SettingSchema {
  id: string;
  type: SettingType;
  label: string;
  default: any;
  options?: { label: string; value: string }[]; // For select
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface SectionDefinition {
  type: string;
  name: string;
  variants: { id: string; name: string }[];
  settings: SettingSchema[];
}

export interface SectionInstance {
  id: string;
  type: string;
  variant: string;
  settings: Record<string, any>;
}

export interface BuilderState {
  sections: SectionInstance[];
}
