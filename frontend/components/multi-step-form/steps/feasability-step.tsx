"use client";

import { Controller, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import type { FormStep, StepProps } from "../types";

const cardLabelClass =
  "flex cursor-pointer items-start gap-3 rounded-xs border border-zinc-300 bg-white p-4 transition-all hover:border-zinc-400 hover:bg-zinc-50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 [&:has([data-state=checked])]:ring-1 [&:has([data-state=checked])]:ring-primary";


function Step1Overview({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel required>Describe your business idea.</FieldLabel>
        <Controller
          name="businessIdea"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? ""}
              placeholder="e.g., A platform connecting local artisans with customers..."
              className="w-full rounded-xs border-zinc-300 bg-white"
            />
          )}
        />
        <FieldError>{errors.businessIdea?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>What products or services will you offer?</FieldLabel>
        <Controller
          name="productsServices"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? ""}
              placeholder="e.g., Monthly subscriptions, direct sales, custom quotation services..."
              className="w-full rounded-xs border-zinc-300 bg-white"
            />
          )}
        />
        <FieldError>{errors.productsServices?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>Where do you plan to operate your business?</FieldLabel>
        <Controller
          name="activityLocation"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { value: "en-ligne", label: "Online only" },
                { value: "local-commercial", label: "In commercial premises" },
                { value: "domicile", label: "From home" },
                { value: "plusieurs", label: "In multiple locations" },
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
        <FieldError>{errors.activityLocation?.message as string}</FieldError>
      </Field>
    </>
  );
}


function Step2Resources({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel>What will you need to get started?</FieldLabel>
        <FieldDescription>Select all the resources required for your launch.</FieldDescription>
        <Controller
          name="startupNeeds"
          control={control}
          render={({ field }) => {
            const current: string[] = Array.isArray(field.value) ? field.value : [];
            return (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { value: "local", label: "Commercial premises / Office" },
                  { value: "equipements", label: "Equipment / Machinery" },
                  { value: "matieres-premieres", label: "Raw materials / Inventory" },
                  { value: "personnel", label: "Staff / Personnel" },
                  { value: "site-web", label: "Website / Digital platform" },
                  { value: "vehicules", label: "Vehicles" },
                  { value: "autre", label: "Other" },
                ].map((opt) => {
                  const isChecked = current.includes(opt.value);
                  return (
                    <Label key={opt.value} className={cardLabelClass}>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const next = checked
                            ? [...current, opt.value]
                            : current.filter((v: string) => v !== opt.value);
                          field.onChange(next);
                        }}
                        className="mt-0.5"
                      />
                      <span className="font-semibold text-zinc-950">{opt.label}</span>
                    </Label>
                  );
                })}
              </div>
            );
          }}
        />
        <FieldError>{errors.startupNeeds?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>How many people will work in your business?</FieldLabel>
        <Controller
          name="teamSize"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { value: "seul", label: "Just myself" },
                { value: "2-5", label: "2 to 5 people" },
                { value: "6-10", label: "6 to 10 people" },
                { value: "plus-10", label: "More than 10 people" },
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
        <FieldError>{errors.teamSize?.message as string}</FieldError>
      </Field>
    </>
  );
}


function Step3Budget({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel required>What is your estimated initial budget?</FieldLabel>
        <Controller
          name="initialBudget"
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
        <FieldError>{errors.initialBudget?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>How do you plan to finance your project?</FieldLabel>
        <Controller
          name="fundingSource"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                { value: "fonds-personnels", label: "Personal funds / Savings" },
                { value: "credit-bancaire", label: "Bank loan" },
                { value: "investisseurs", label: "Investors / Equity" },
                { value: "aides", label: "Government grants / Support programs" },
                { value: "plusieurs", label: "Multiple sources" },
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
        <FieldError>{errors.fundingSource?.message as string}</FieldError>
      </Field>
    </>
  );
}


function Step4Forecasts({ control, errors }: StepProps) {
  const hasEstimate = useWatch({ control, name: "hasSalesEstimate" });

  return (
    <>
      <Field>
        <FieldLabel required>How do you plan to sell your products or services?</FieldLabel>
        <Controller
          name="salesChannel"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                { value: "magasin", label: "Physical storefront / Shop" },
                { value: "site-web", label: "E-commerce website" },
                { value: "reseaux-sociaux", label: "Social media" },
                { value: "vente-directe", label: "Direct sales" },
                { value: "distributeurs", label: "Distributors / Partners" },
                { value: "plusieurs", label: "Multi-channel / Omnichannel" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.salesChannel?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>Do you have an estimate of your monthly sales?</FieldLabel>
        <Controller
          name="hasSalesEstimate"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                { value: "oui", label: "Yes" },
                { value: "non", label: "No, I need an estimate" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="font-semibold text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.hasSalesEstimate?.message as string}</FieldError>
      </Field>

      {hasEstimate === "oui" && (
        <Field>
          <FieldLabel>What is your monthly sales estimate (in TND)?</FieldLabel>
          <Controller
            name="monthlySalesEstimate"
            control={control}
            render={({ field }) => (
              <div className="relative max-w-xs">
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ""}
                  placeholder="e.g., 5000"
                  className="w-full rounded-xs border-zinc-300 bg-white pr-14"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-zinc-500">
                  TND
                </span>
              </div>
            )}
          />
        </Field>
      )}
    </>
  );
}


function Step5Additional({ control }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel>What are the main challenges you foresee?</FieldLabel>
        <Controller
          name="anticipatedChallenges"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value ?? ""}
              rows={3}
              placeholder="e.g., High competition, regulatory hurdles, supply chain..."
              className="w-full rounded-xs border-zinc-300 bg-white"
            />
          )}
        />
      </Field>

      <Field>
        <FieldLabel>Do you have any other information to add?</FieldLabel>
        <Controller
          name="additionalInfo"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value ?? ""}
              rows={3}
              placeholder="Any additional details helpful for your feasibility study..."
              className="w-full rounded-xs border-zinc-300 bg-white"
            />
          )}
        />
      </Field>
    </>
  );
}


export const feasabilitySteps: FormStep[] = [
  {
    id: "project-overview",
    title: "Project Overview",
    description: "Give us an overall summary of your business idea.",
    fields: ["businessIdea", "productsServices", "activityLocation"],
    component: Step1Overview,
  },
  {
    id: "required-resources",
    title: "Required Resources",
    description: "Identify the resources and personnel you need to get started.",
    fields: ["teamSize"],
    component: Step2Resources,
  },
  {
    id: "budget-financing",
    title: "Budget & Financing",
    description: "Estimate your startup capital and intended funding sources.",
    fields: ["initialBudget", "fundingSource"],
    component: Step3Budget,
  },
  {
    id: "commercial-forecasts",
    title: "Commercial Forecasts",
    description: "Specify your sales channels and initial sales expectations.",
    fields: ["salesChannel", "hasSalesEstimate"],
    component: Step4Forecasts,
  },
  {
    id: "additional-information",
    title: "Additional Information",
    description: "Any further details helpful for your feasibility study.",
    component: Step5Additional,
  },
];
