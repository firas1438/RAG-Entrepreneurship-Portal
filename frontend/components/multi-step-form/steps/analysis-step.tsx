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

function Step1Idea({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel required>What product or service do you plan to offer?</FieldLabel>
        <Controller
          name="productDescription"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? ""}
              placeholder="e.g., On-demand delivery app, online language courses..."
              className="w-full rounded-xs border-zinc-300 bg-white"
            />
          )}
        />
        <FieldError>{errors.productDescription?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>Which industry sector does your business belong to?</FieldLabel>
        <Controller
          name="sector"
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
                { value: "technologie", label: "Technology" },
                { value: "restauration", label: "Food & Beverage / Catering" },
                { value: "sante", label: "Healthcare" },
                { value: "education", label: "Education" },
                { value: "tourisme", label: "Tourism & Hospitality" },
                { value: "agriculture", label: "Agriculture" },
                { value: "services", label: "Services" },
                { value: "autre", label: "Other" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.sector?.message as string}</FieldError>
      </Field>
    </>
  );
}

function Step2TargetMarket({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel required>Where do you plan to market your product or service?</FieldLabel>
        <Controller
          name="marketScope"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                { value: "local", label: "Locally (one city)" },
                { value: "regional", label: "Regionally" },
                { value: "national", label: "Across all of Tunisia" },
                { value: "international", label: "Internationally" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.marketScope?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>Who are your target customers?</FieldLabel>
        <Controller
          name="customerType"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { value: "particuliers", label: "Individuals / Consumers (B2C)" },
                { value: "entreprises", label: "Businesses (B2B)" },
                { value: "administrations", label: "Public Institutions / Gov (B2G)" },
                { value: "etudiants", label: "Students" },
                { value: "autre", label: "Other" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.customerType?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>What age group are you targeting?</FieldLabel>
        <Controller
          name="ageRange"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { value: "moins-18", label: "Under 18" },
                { value: "18-25", label: "18–25 years old" },
                { value: "26-40", label: "26–40 years old" },
                { value: "41-60", label: "41–60 years old" },
                { value: "plus-60", label: "Over 60" },
                { value: "toutes", label: "All age groups" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.ageRange?.message as string}</FieldError>
      </Field>
    </>
  );
}

function Step3Competition({ control, errors }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel required>Are you already aware of existing competitors?</FieldLabel>
        <Controller
          name="knownCompetitors"
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
                { value: "quelques-uns", label: "A few" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.knownCompetitors?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel>If yes, please list their names or websites.</FieldLabel>
        <Controller
          name="competitorNames"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value ?? ""}
              rows={3}
              placeholder="e.g., Jumia, Glovo, local competitors..."
              className="w-full rounded-xs border-zinc-300 bg-white"
            />
          )}
        />
      </Field>

      <Field>
        <FieldLabel required>How do you intend to stand out?</FieldLabel>
        <Controller
          name="differentiation"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { value: "prix", label: "Competitive pricing" },
                { value: "qualite", label: "Superior quality" },
                { value: "innovation", label: "Innovation" },
                { value: "service-client", label: "Customer service" },
                { value: "proximite", label: "Accessibility / Proximity" },
                { value: "nsp", label: "Not sure yet" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.differentiation?.message as string}</FieldError>
      </Field>
    </>
  );
}

function Step4CommercialModel({ control, errors }: StepProps) {
  const hasEstimate = useWatch({ control, name: "hasSalesEstimate" });

  return (
    <>
      <Field>
        <FieldLabel required>How do you plan to sell and distribute?</FieldLabel>
        <Controller
          name="salesChannel"
          control={control}
          rules={{ required: "This field is required to continue." }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { value: "site-web", label: "E-commerce / Online platform" },
                { value: "magasin", label: "Physical storefront / Commercial premises" },
                { value: "reseaux-sociaux", label: "Social media commerce" },
                { value: "vente-directe", label: "Direct B2B / Field sales" },
                { value: "distributeurs", label: "Distributor & partner network" },
                { value: "plusieurs", label: "Omnichannel (Online & Physical)" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.salesChannel?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel required>What is your estimated initial startup budget?</FieldLabel>
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
                  <span className="text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.initialBudget?.message as string}</FieldError>
      </Field>

      <Field>
        <FieldLabel>What resources will you need for initial launch?</FieldLabel>
        <FieldDescription>Select all resources relevant to your setup.</FieldDescription>
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
                  { value: "matieres-premieres", label: "Inventory / Raw materials" },
                  { value: "personnel", label: "Staff / Team members" },
                  { value: "site-web", label: "Digital platform / Website" },
                  { value: "vehicules", label: "Vehicles / Transport" },
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
                      <span className="text-zinc-950">{opt.label}</span>
                    </Label>
                  );
                })}
              </div>
            );
          }}
        />
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
                { value: "oui", label: "Yes, I have an estimate" },
                { value: "non", label: "No, calculate a projection" },
              ].map((opt) => (
                <Label key={opt.value} className={cardLabelClass}>
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <span className="text-zinc-950">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <FieldError>{errors.hasSalesEstimate?.message as string}</FieldError>
      </Field>

      {hasEstimate === "oui" && (
        <Field>
          <FieldLabel>What is your projected monthly sales (in TND)?</FieldLabel>
          <Controller
            name="monthlySalesEstimate"
            control={control}
            render={({ field }) => (
              <div className="relative max-w-xs">
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ""}
                  placeholder="e.g., 8000"
                  className="w-full rounded-xs border-zinc-300 bg-white pr-14"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-500">
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

function Step5Objectives({ control, errors }: StepProps) {
  return (
    <Field>
      <FieldLabel required>What is your primary objective?</FieldLabel>
      <Controller
        name="mainObjective"
        control={control}
        rules={{ required: "This field is required to continue." }}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {[
              { value: "comprendre-demande", label: "Validate market demand & customer base" },
              { value: "identifier-concurrents", label: "Identify competitors & pricing gaps" },
              { value: "evaluer-opportunites", label: "Assess commercial feasibility & margins" },
              { value: "tendances", label: "Understand industry trends in Tunisia" },
              { value: "potentiel-global", label: "Complete end-to-end market viability study" },
            ].map((opt) => (
              <Label key={opt.value} className={cardLabelClass}>
                <RadioGroupItem value={opt.value} className="mt-0.5" />
                <span className="text-zinc-950">{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
        )}
      />
      <FieldError>{errors.mainObjective?.message as string}</FieldError>
    </Field>
  );
}

export const analysisSteps: FormStep[] = [
  {
    id: "your-idea",
    title: "Your Idea",
    description: "Describe the product or service you plan to offer.",
    fields: ["productDescription", "sector"],
    component: Step1Idea,
  },
  {
    id: "target-market",
    title: "Target Market",
    description: "Define the geographical scope and the profile of your prospective customers.",
    fields: ["marketScope", "customerType", "ageRange"],
    component: Step2TargetMarket,
  },
  {
    id: "competition",
    title: "Competition",
    description: "Assess your positioning compared to existing competitors.",
    fields: ["knownCompetitors", "differentiation"],
    component: Step3Competition,
  },
  {
    id: "commercial-model",
    title: "Commercial & Financial Model",
    description: "Specify your planned distribution channel, budget, and revenue expectations.",
    fields: ["salesChannel", "initialBudget", "hasSalesEstimate"],
    component: Step4CommercialModel,
  },
  {
    id: "your-objectives",
    title: "Your Objectives",
    description: "Specify what you expect to achieve from this market analysis.",
    fields: ["mainObjective"],
    component: Step5Objectives,
  },
];
