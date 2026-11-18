import type { Control, FieldErrors } from "react-hook-form";

export interface StepProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields?: string[]; // Field names validated when pressing "Continue"
  component: React.ComponentType<StepProps>;
}

export interface MultiStepFormProps {
  steps: FormStep[];
  serviceTitle?: string;
  serviceCategory?: string;
  defaultValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  onCancel?: () => void;
  submitButtonText?: string;
}
