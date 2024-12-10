import React, { useRef, useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import { create, all } from "mathjs";

// Типы данных
interface FormulaEditorProps {
  data: Record<string, any>[];
  variables: string[];
}

// Создаем кастомный mathjs с поддержкой функции IF
const math = create(all, {});

math.import({
  IF: (condition: boolean, trueValue: any, falseValue: any) =>
    condition ? trueValue : falseValue,
});

const FormulaEditor: React.FC<FormulaEditorProps> = ({ data, variables }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [result, setResult] = useState<string | number | null>(null);

  useEffect(() => {
    // Инициализация Monaco Editor
    if (editorRef.current) {
      const monacoEditor = monaco.editor.create(editorRef.current, {
        value: "",
        language: "javascript",
        theme: "vs-dark",
      });

      // Добавление автодополнения переменных
      monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems: () => {
          const suggestions = variables.map((variable) => ({
            label: variable,
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: `{${variable}}`,
          }));
          return { suggestions };
        },
      });

      setEditor(monacoEditor);

      return () => monacoEditor.dispose();
    }
  }, [variables]);

  const calculateFormula = () => {
    if (!editor) return;

    try {
      // Получаем формулу из редактора
      const formula = editor.getValue();

      // Подготавливаем переменные из данных
      const variablesMap = data.reduce((acc, row) => {
        Object.keys(row).forEach((key) => {
          acc[key] = row[key];
        });
        return acc;
      }, {} as Record<string, any>);

      // Вычисляем формулу
      const evaluatedResult = math.evaluate(formula, variablesMap);
      setResult(evaluatedResult);
    } catch (error) {
      setResult("Ошибка в формуле");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={editorRef}
        className="h-56 border border-gray-300 rounded-md"
      ></div>
      <button
        onClick={calculateFormula}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Вычислить
      </button>
      <div className="bg-gray-100 p-4 rounded border border-gray-300">
        <h3 className="text-lg font-semibold">Результат:</h3>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">
          {result !== null ? JSON.stringify(result, null, 2) : "Введите формулу"}
        </pre>
      </div>
    </div>
  );
};

export default FormulaEditor;
