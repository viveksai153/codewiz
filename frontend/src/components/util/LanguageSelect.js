// LanguageSelect.js
import React from 'react';

const LanguageSelect = ({ value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="snippet-language-select">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="csharp">C#</option>
      <option value="ruby">Ruby</option>
      <option value="php">PHP</option>
      <option value="swift">Swift</option>
      <option value="typescript">TypeScript</option>
      <option value="go">Go</option>
      <option value="rust">Rust</option>
      <option value="scala">Scala</option>
      <option value="kotlin">Kotlin</option>
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="sass">Sass</option>
      <option value="less">Less</option>
      <option value="c">C</option>
      <option value="cplusplus">C++</option>
      <option value="sql">SQL</option>
      <option value="dart">Dart</option>
      <option value="lua">Lua</option>
      <option value="r">R</option>
      <option value="perl">Perl</option>
      <option value="shell">Shell</option>
      <option value="powershell">PowerShell</option>
      <option value="yaml">YAML</option>
      <option value="json">JSON</option>
      <option value="xml">XML</option>
      <option value="markdown">Markdown</option>
       
    </select>
  );
};

export default LanguageSelect;
