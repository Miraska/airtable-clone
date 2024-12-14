import React from "react";
import Select from "react-select";
import options from "../lib/options";
import { Controller, FormProvider } from "react-hook-form";
import { RelationshipSelect } from "./RelationshipSelect";
import PayersSelect from "./PayersSelect";
import ReviewOrdersSelect from "./ReviewOrdersSelect";
import ReviewManagersSelect from "./ReviewManagersSelect";

interface Props {
  column: { key: string; label: string; type: string; readonly?: boolean };
  value: any;
  setValue: (val: any) => void;
  setFormValue: (key: string, val: any) => void;
  register: any;
  methods: any;
  selectedPayersID: number[];
  selectedOrdersID: number[];
  selectedManagersID: number[];
}

export const CellModalInputRenderer: React.FC<Props> = ({
  column,
  value,
  setValue,
  setFormValue,
  register,
  methods,
  selectedPayersID,
  selectedOrdersID,
  selectedManagersID,
}) => {
  const renderInputByType = () => {
    switch (column.type) {
      case "text":
      case "number":
        return (
          <input
            {...register(column.key)}
            type={column.type}
            defaultValue={value || ""}
            onChange={(e) => setValue(e.target.value)}
            readOnly={column.readonly}
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 dark:border-transparent focus:ring-blue-500 focus:border-blue-500"
          />
        );
      case "date":
        return (
          <input
            {...register(column.key)}
            type="date"
            defaultValue={value || ""}
            onChange={(e) => setValue(e.target.value)}
            readOnly={column.readonly}
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 placeholder:text-gray-100 dark:border-transparent focus:ring-blue-500 focus:border-blue-500"
          />
        );
      case "option":
        return (
          <Select
            options={options.statusOptions}
            value={options.statusOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "boolean":
        return (
          <Select
            options={options.booleanStatus}
            value={options.booleanStatus.find(
              (opt) => opt.value === value?.toString()
            )}
            onChange={(selectedOption) => {
              const booleanValue = selectedOption?.value === "true";
              setValue(booleanValue);
              setFormValue(column.key, booleanValue);
            }}
          />
        );
      case "currency":
        return (
          <Select
            options={options.currencyOptions}
            value={options.currencyOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "swift":
        return (
          <Select
            options={options.swiftStatus}
            value={options.swiftStatus.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "problem-stage":
        return (
          <Select
            options={options.stageProblemOptions}
            value={options.stageProblemOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "condition":
        return (
          <Select
            options={options.conditionOptions}
            value={options.conditionOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "name-mistake":
        return (
          <Select
            options={options.nameMistakeOptions}
            value={options.nameMistakeOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "transaction":
        return (
          <Select
            options={options.transactionOptions}
            value={options.transactionOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "related":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <Controller
                name={column.key}
                control={methods.control}
                render={({ field }) => (
                  <RelationshipSelect
                    type={column.key}
                    value={field.value || []}
                    onChange={(newValue) => {
                      setValue(newValue);
                      setFormValue(column.key, newValue);
                    }}
                    placeholder="Выберите связь"
                  />
                )}
              />
            </FormProvider>
          </div>
        );
      case "review":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <ReviewOrdersSelect cantSelect={selectedOrdersID} />
            </FormProvider>
          </div>
        );
      case "payers":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <PayersSelect canSelect={selectedPayersID} />
            </FormProvider>
          </div>
        );
      case "reviewers":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <ReviewManagersSelect cantSelect={selectedManagersID} />
            </FormProvider>
          </div>
        );
      default:
        return (
          <input
            {...register(column.key)}
            type="text"
            defaultValue={value || ""}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 placeholder:text-gray-100 dark:border-transparent focus:ring-blue-500 focus:border-blue-500"
          />
        );
    }
  };

  return <>{renderInputByType()}</>;
};
