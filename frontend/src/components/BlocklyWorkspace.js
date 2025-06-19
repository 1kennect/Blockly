import React, { useRef, useEffect, useState } from 'react';
import * as Blockly from 'blockly';
import '../styles/BlocklyWorkspace.css';

const BlocklyWorkspace = () => {
  const blocklyDiv = useRef(null);
  const toolbox = useRef(null);
  const workspaceRef = useRef(null);

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');

  const languageRef = useRef(language);

  const languageNames = {
    python: 'Python',
    javascript: 'JavaScript',
    lua: 'Lua',
    php: 'PHP',
    dart: 'Dart',
  };

  const commentStyles = {
    python: '#',
    javascript: '//',
    lua: '--',
    php: '//',
    dart: '//',
  };

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    if (blocklyDiv.current && toolbox.current && !workspaceRef.current) {
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox.current,
        scrollbars: true,
        trashcan: true,
        move: {
          scrollbars: true,
          drag: true,
          wheel: true,
        },
      });

      workspaceRef.current.addChangeListener(() => generateCode(languageRef.current));
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, []);

  const generateCode = (lang) => {
    if (!workspaceRef.current) return;

    const generators = {
      python: window.Python || window.Blockly?.Python,
      javascript: window.JavaScript || window.Blockly?.JavaScript,
      lua: window.Lua || window.Blockly?.Lua,
      php: window.PHP || window.Blockly?.PHP,
      dart: window.Dart || window.Blockly?.Dart,
    };

    const generator = generators[lang];
    if (!generator) {
      setCode(`// Code generator for "${lang}" not loaded. Try refreshing or check index.html.`);
      return;
    }

    const blocks = workspaceRef.current.getAllBlocks(false);
    if (blocks.length === 0) {
      const commentChar = commentStyles[lang];
      setCode(`${commentChar} No blocks in workspace\n${commentChar} Drag blocks from the toolbox to get started`);
      return;
    }

    try {
      const generatedCode = generator.workspaceToCode(workspaceRef.current);
      if (lang === 'dart' && generatedCode.trim() === 'main() {\n}') {
        setCode('// No blocks in workspace\n// Drag blocks from the toolbox to get started');
      } else {
        setCode(generatedCode);
      }
    } catch (error) {
      const commentChar = commentStyles[lang];
      setCode(`${commentChar} Error generating code:\n${commentChar} ${error.message}`);
    }
  };

  const handleRun = () => {
    if (
        code.includes('No blocks in workspace') ||
        code.includes('Workspace cleared') ||
        code.trim() === ''
    ) {
      alert('Please create some blocks before running');
      return;
    }

    alert(`${languageNames[language]} code would execute here.\n\nThis is a placeholder for execution.`);
  };

  const handleClear = () => {
    if (window.confirm('Clear all blocks?')) {
      workspaceRef.current.clear();
      const commentChar = commentStyles[language];
      setCode(`${commentChar} Workspace cleared\n${commentChar} Drag blocks from the toolbox to get started`);
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    generateCode(newLang);
  };

  return (
      <div className="container">
        <div className="header">
          <h1>Blockly Accessibility Coding Platform</h1>
          <div className="header-controls">
            <select value={language} onChange={handleLanguageChange} className="language-select">
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="lua">Lua</option>
              <option value="php">PHP</option>
              <option value="dart">Dart</option>
            </select>
            <button onClick={handleRun} className="run-btn">Run</button>
            <button onClick={handleClear} className="clear-btn">Clear</button>
          </div>
        </div>

        <div className="content">
          <div className="workspace-panel">
            <div className="workspace-header">Blockly Workspace</div>
            <div className="blockly-container">
              <div ref={blocklyDiv} id="blocklyDiv"></div>
            </div>
          </div>

          <div className="output-panel">
            <div className="output-header">
              <span>Generated Code</span>
              <span className="status">{languageNames[language]}</span>
            </div>
            <textarea readOnly value={code} id="codeOutput"></textarea>
          </div>
        </div>

        <xml ref={toolbox} style={{ display: 'none' }}>
          <category name="Control" colour="#5C81A6">
            <block type="controls_repeat">
              <value name="TIMES">
                <shadow type="math_number">
                  <field name="NUM">5</field>
                </shadow>
              </value>
            </block>
            <block type="controls_whileUntil" />
            <block type="controls_for">
              <value name="FROM">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="TO">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
              <value name="BY">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="controls_if" />
            <block type="controls_ifelse" />
          </category>
          <category name="Text" colour="#5CA68D">
            <block type="text_print" />
            <block type="text" />
            <block type="text_join" />
            <block type="text_length" />
            <block type="text_prompt_ext" />
          </category>
          <category name="Math" colour="#8E5CA6">
            <block type="math_number" />
            <block type="math_arithmetic" />
            <block type="math_single" />
            <block type="math_random_int">
              <value name="FROM">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="TO">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
            </block>
            <block type="math_round" />
          </category>
          <category name="Logic" colour="#A65C81">
            <block type="logic_compare" />
            <block type="logic_operation" />
            <block type="logic_boolean" />
            <block type="logic_ternary" />
            <block type="logic_null" />
          </category>
          <category name="Variables" colour="#A68E5C" custom="VARIABLE" />
          <category name="Functions" colour="#9b59b6" custom="PROCEDURE" />
          <category name="Lists" colour="#e74c3c">
            <block type="lists_create_with" />
            <block type="lists_length" />
            <block type="lists_isEmpty" />
            <block type="lists_indexOf" />
          </category>
        </xml>
      </div>
  );
};

export default BlocklyWorkspace;
