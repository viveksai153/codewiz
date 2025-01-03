import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import Alert from "../util/alerts";
import "./Editor.css";

const MonacoEditor = ({ snippet, onChange, onSave, fetchSnippets }) => {
  const [editorValue, setEditorValue] = useState(snippet.code || "");
  const [title, setTitle] = useState(snippet.title || "");
  const [language, setLanguage] = useState(snippet.language || "javascript");
  const [tags, setTags] = useState(snippet.tags.join(", ") || "");
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const editorRef = useRef(null);

  useEffect(() => {
    setEditorValue(snippet.code);
    setTitle(snippet.title);
    setLanguage(snippet.language);
    setTags(snippet.tags.join(", "));
  }, [snippet]);

  const languages = [
    "javascript",
    "python",
    "java",
    "csharp",
    "ruby",
    "php",
    "swift",
    "typescript",
    "go",
    "rust",
    "scala",
    "kotlin",
    "html",
    "css",
    "sass",
    "less",
    "c",
    "cplusplus",
    "sql",
    "objective-c",
    "dart",
    "lua",
    "r",
    "perl",
    "shell",
    "powershell",
  ];

  const handleEditorChange = (value) => {
    setEditorValue(value);
    onChange({ ...snippet, code: value });
  };

  const handleSave = async () => {
    const updatedSnippet = {
      title,
      language,
      tags: tags.split(",").map((tag) => tag.trim()),
      code: editorValue,
    };

    const authToken = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/snippets/update/${snippet._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            "auth-token": `${authToken}`,
          },
          body: JSON.stringify(updatedSnippet),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAlert({
          type: "success",
          message: "Snippet updated successfully!",
          visible: true,
        });
        fetchSnippets();
      } else {
        throw new Error(data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Failed to update snippet:", error);
      setAlert({
        type: "danger",
        message: `Failed to update snippet: ${error.message}`,
        visible: true,
      });
    }

    // Hide the alert after a delay to reset its visibility
    setTimeout(() => setAlert({ ...alert, visible: false }), 3000);
  };

  return (
    <div className="monaco-editor-container" ref={editorRef}>
      {alert.visible && <Alert type={alert.type} message={alert.message} />}
      <div className="editor-controls">
        <label htmlFor="snippet-title" style={{ display: 'block', margin: '8px', fontWeight: 'bold', color: '#333' }}>Title:</label>
        <input
          type="text"
          id="snippet-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter snippet title"
          className="snippet-title-input"
        />

        <label htmlFor="snippet-tags" style={{ display: 'block', margin: '8px', fontWeight: 'bold', color: '#333' }}>Tags:</label>
        <input
          type="text"
          id="snippet-tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags, separated by commas"
          className="snippet-tags-input"
        />

<label htmlFor="snippet-language"  style={{ display: 'block', margin: '8px', fontWeight: 'bold', color: '#333' }}>Language:</label>
        <select
        id="snippet-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="snippet-language-select"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>

        <button onClick={handleSave} className="snippet-save-button" style={{  margin:'10px 0px 0px 10px', fontWeight: 'bold' ,justifyItems:"end" }}>
          Save
        </button>
      </div>

      <Editor
        language={language}
        value={editorValue}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 2,
          minimap: { enabled: true },
        }}
      />
    </div>
  );
};

export default MonacoEditor;
