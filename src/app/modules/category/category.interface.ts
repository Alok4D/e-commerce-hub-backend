export type TSpecTemplate = {
  fieldName: string;
  inputType: 'text' | 'number' | 'select' | 'boolean';
  required: boolean;
  options?: string[];
};

export interface TCategory {
  name: string;
  slug: string;
  department: string;
  subCategories: string[];
  icon?: string;
  image?: string;
  marketingTags: string[];
  specTemplates: TSpecTemplate[];
  status: 'ACTIVE' | 'ARCHIVED';
  isDeleted: boolean;
}
