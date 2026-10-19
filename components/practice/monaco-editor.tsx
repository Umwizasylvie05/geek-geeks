"use client";

import Editor from "@monaco-editor/react";

export default function MonacoEditor({
  language,
  value,
  onChange,
}: {
  language: string;
  value: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="h-full w-full bg-code">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(v) => onChange?.(v ?? "")}
        loading="Loading editor…"
        theme="gfg"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontFamily: '"JetBrains Mono", monospace',
          padding: { top: 12, bottom: 12 },
          tabSize: 4,
          automaticLayout: true,
        }}
        beforeMount={(monaco) => {
          monaco.editor.defineTheme("gfg", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: { "editor.background": "#0d1117" },
          });
        }}
      />
    </div>
  );
}