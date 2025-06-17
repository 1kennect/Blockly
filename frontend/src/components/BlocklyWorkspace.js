import React, { useRef, useEffect } from 'react';
import Blockly from 'blockly';

const BlocklyWorkspace = () => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (blocklyDiv.current && !workspaceRef.current) {
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: '<xml><block type="controls_if"></block><block type="logic_compare"></block></xml>',
        grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
        zoom: { controls: true, wheel: true },
      });
    }
    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={blocklyDiv}
      id="blocklyDiv"
      style={{ height: '480px', width: '100%', margin: 'auto', border: '2px solid #333', borderRadius: '8px' }}
      aria-label="Blockly Workspace"
      tabIndex={0}
    />
  );
};

export default BlocklyWorkspace; 