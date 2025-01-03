import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const MyMonacoEditor = ({
  value = '',
  language = 'javascript',
  options = {},
  onChange = () => {},
  editorDidMount = () => {},
}) => {
  const languages = [
    "javascript", "python", "java", "csharp", "ruby", "php", "swift", "typescript",
    "go", "rust", "scala", "kotlin", "html", "css", "sass", "less", "c", "cpp",
    "sql", "objective-c", "dart", "lua", "r", "perl", "shell", "powershell"
  ];

  const monacoLanguage = languages.includes(language.toLowerCase()) ? language.toLowerCase() : 'javascript';

  return (
    <MonacoEditor
      width="900"
      height="350"
      language={monacoLanguage}
      theme="vs-dark"
      value={value}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default MyMonacoEditor;
