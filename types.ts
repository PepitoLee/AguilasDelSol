import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface DocItem {
  id: string;
  title: string;
  type: 'PDF' | 'DOC' | 'SECURE';
  size: string;
}