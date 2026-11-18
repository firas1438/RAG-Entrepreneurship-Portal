"use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { MultiStepFormProps } from "./types";

export function MultiStepForm({ steps, serviceTitle, serviceCategory, defaultValues = {}, onSubmit, onCancel, submitButtonText = "Submit", }: MultiStepFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const form = useForm<Record<string, any>>({ defaultValues, mode: "onTouched", });
  const { control, handleSubmit, trigger, formState: { errors, isSubmitting }, } = form;

  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === totalSteps - 1;

  const validateCurrentStep = async (): Promise<boolean> => {
    if (currentStep.fields && currentStep.fields.length > 0) {
      return await trigger(currentStep.fields);
    }
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (isLastStep) {
      await handleSubmit(handleFinalSubmit)();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (onCancel) {
      onCancel();
    }
  };

  const handleFinalSubmit = async (values: Record<string, any>) => {
    try {
      await onSubmit(values);
      toast.success("Form submitted successfully");
    } catch (error) {
      toast.error("An error occurred during submission");
      console.error(error);
    }
  };

  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);
  const StepComponent = currentStep.component;

  return (
    <div className="w-full">
      <div className="mb-6 border border-zinc-300 bg-white p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">

            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {serviceTitle || "Assessment Questionnaire"}
            </h1>
          </div>

          <span className="w-fit rounded-xs border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Progress</span>
            <span className="font-semibold text-zinc-800">{progressPercent}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-6 hidden grid-cols-1 gap-2 pt-2 sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <Button
                key={step.id}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (idx <= currentStepIndex) {
                    setCurrentStepIndex(idx);
                  }
                }}
                disabled={idx > currentStepIndex}
                className={`h-auto justify-start p-1.5 text-left text-xs rounded-xs font-normal ${isCurrent
                  ? "font-semibold text-primary hover:text-primary"
                  : isDone
                    ? "text-zinc-800 hover:text-primary hover:bg-zinc-100"
                    : "text-zinc-400 opacity-60"
                  }`}
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${isCurrent
                    ? "bg-primary text-white"
                    : isDone
                      ? "bg-zinc-950 text-white"
                      : "border border-zinc-300 bg-white text-zinc-400"
                    }`}
                >
                  {isDone ? <Check className="size-3" /> : idx + 1}
                </span>
                <span className="truncate">{step.title}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <Card className="gap-0 rounded-xs border border-zinc-300 bg-white shadow-xs">
        <CardHeader className="px-6 sm:px-8 py-6 space-y-1.5">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            Step {currentStepIndex + 1}
          </span>
          <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            {currentStep.title}
          </CardTitle>
          {currentStep.description && (
            <CardDescription className="text-sm text-zinc-600">
              {currentStep.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="px-6 py-0 sm:px-8 sm:py-0">
          <form
            id="multi-step-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <FieldGroup className="gap-6 sm:gap-7">
              <StepComponent control={control} errors={errors} />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-between px-6 pt-6 pb-6 sm:px-8 sm:pt-7 sm:pb-8">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={isSubmitting}
            className="rounded-xs border-zinc-300 px-6 py-5 text-sm font-medium hover:bg-zinc-100"
          >
            <ArrowLeft className="mr-2 size-4" />
            {currentStepIndex === 0 && onCancel ? "Cancel" : "Previous"}
          </Button>

          <Button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="rounded-xs bg-primary px-7 py-5 text-sm font-semibold text-white hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Spinner className="mr-2" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>{isLastStep ? submitButtonText : "Continue"}</span>
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
