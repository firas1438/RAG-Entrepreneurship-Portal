"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import type { FormStep, StepProps } from "../types";

const cardLabelClass =
  "flex cursor-pointer items-start gap-3 rounded-xs border border-zinc-300 bg-white p-4 transition-all hover:border-zinc-400 hover:bg-zinc-50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 [&:has([data-state=checked])]:ring-1 [&:has([data-state=checked])]:ring-primary";


function Step1Project({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel required>What type of activity do you wish to pursue?</FieldLabel>
        <Controller
          name="activityType"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { value: "commerce", label: "Commerce / Retail" },
                { value: "services", label: "Services" },
                { value: "industrie", label: "Industry" },
                { value: "artisanat", label: "Craft / Artisan" },
                { value: "agriculture", label: "Agriculture" },
                { value: "numerique", label: "Digital / Tech" },
                { value: "autre", label: "Other" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.activityType?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>Briefly describe your business activity.</FieldLabel>
        <Controller
          name="activityDescription"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? ""}
              placeholder="e.g., Online clothing store, software development..."
              className="w-full rounded-xs border-zinc-300 bg-white"
            />
          )}
        />
        <FieldError>{errors.activityDescription?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>Where do you plan to establish your business?</FieldLabel>
        <Controller
          name="location"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { value: "tunis", label: "Tunis / Greater Tunis" },
                { value: "sousse", label: "Sousse" },
                { value: "monastir", label: "Monastir" },
                { value: "sfax", label: "Sfax" },
                { value: "autre", label: "Other governorate" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.location?.message as string}</FieldError>
      </Field>
    </>
  );
}


function Step2Situation({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel required>How many people will participate in founding the business?</FieldLabel>
        <Controller
          name="founderCount"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                { value: "seul", label: "Just myself" },
                { value: "deux", label: "2 partners" },
                { value: "trois-cinq", label: "3 to 5 partners" },
                { value: "plus-cinq", label: "More than 5 partners" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.founderCount?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>What is your role in the project?</FieldLabel>
        <Controller
          name="role"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                { value: "gerant", label: "Founder and future manager" },
                { value: "associe", label: "Partner / Shareholder" },
                { value: "investisseur", label: "Investor" },
                { value: "nsp", label: "Not decided yet" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.role?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>Do you already own a business?</FieldLabel>
        <Controller
          name="existingBusiness"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                { value: "non", label: "No, this is a new venture" },
                { value: "oui-autre", label: "Yes, I want to create another business" },
                { value: "formaliser", label: "I want to formalize an existing activity" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.existingBusiness?.message as string}</FieldError>
      </Field>
    </>
  );
}


function Step3Preferences({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel required>What starting budget do you anticipate?</FieldLabel>
        <Controller
          name="budget"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { value: "moins-5k", label: "Less than 5,000 TND" },
                { value: "5k-20k", label: "5,000 to 20,000 TND" },
                { value: "20k-50k", label: "20,000 to 50,000 TND" },
                { value: "50k-100k", label: "50,000 to 100,000 TND" },
                { value: "plus-100k", label: "More than 100,000 TND" },
                { value: "nsp", label: "Not sure yet" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.budget?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>How important is personal asset protection to you?</FieldLabel>
        <Controller
          name="patrimonialProtection"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                { value: "tres-importante", label: "Very important" },
                { value: "importante", label: "Important" },
                { value: "peu-importante", label: "Low importance" },
                { value: "nsp", label: "Not sure" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.patrimonialProtection?.message as string}</FieldError>
      </Field>
    </>
  );
}


function Step4Additional({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel required>Does your activity require a special license or permit?</FieldLabel>
        <Controller
          name="requiresAuthorization"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {[
                { value: "oui", label: "Yes" },
                { value: "non", label: "No" },
                { value: "nsp", label: "Not sure" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.requiresAuthorization?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel>Do you have any other details regarding your project?</FieldLabel>
        <Controller
          name="additionalInfo"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value ?? ""}
              rows={4}
              placeholder="Describe any additional details that might be helpful..."
              className="w-full rounded-xs border-zinc-300 bg-white"
            />
          )}
        />
      </Field>
    </>
  );
}


export const creationSteps: FormStep[] = [
  {
    id: "your-project",
    title: "Your Project",
    description: "Tell us about your activity and desired location.",
    fields: ["activityType", "activityDescription", "location"],
    component: Step1Project,
  },
  {
    id: "your-situation",
    title: "Your Situation",
    description: "Tell us about your role and partners in this project.",
    fields: ["founderCount", "role", "existingBusiness"],
    component: Step2Situation,
  },
  {
    id: "your-preferences",
    title: "Your Preferences",
    description: "A few questions regarding your budget and personal asset priorities.",
    fields: ["budget", "patrimonialProtection"],
    component: Step3Preferences,
  },
  {
    id: "additional-information",
    title: "Additional Information",
    description: "Final details before submitting your application.",
    fields: ["requiresAuthorization"],
    component: Step4Additional,
  },
];
