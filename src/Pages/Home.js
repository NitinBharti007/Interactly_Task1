import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [nodes, setNodes] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredBranch, setHoveredBranch] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupNodeId, setPopupNodeId] = useState(null);
  const [nodeTitle, setNodeTitle] = useState("");

  const createNode = () => {
    const newNode = {
      id: nodes.length + 1,
      x: Math.random() * 350,
      y: Math.random() * 350,
      title: "",
      connectedTo: [],
    };
    setNodes([...nodes, newNode]);
    setNodeTitle("");
  };

  const handleNodeClick = (nodeId) => {
    if (selectedNodes.includes(nodeId)) {
      setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
    } else {
      setSelectedNodes([...selectedNodes, nodeId]);
    }
  };

  const handleNodeDoubleClick = (nodeId) => {
    setPopupVisible(true);
    setPopupNodeId(nodeId);
  };

  const handleNodeDelete = (nodeId) => {
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    const nodesWithUpdatedConnections = updatedNodes.map((node) => ({
      ...node,
      connectedTo: node.connectedTo.filter(
        (connectedNodeId) => connectedNodeId !== nodeId
      ),
    }));
    setNodes(nodesWithUpdatedConnections);
    setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
  };

  const handleBranchDelete = (nodeId1, nodeId2) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === nodeId1) {
        return {
          ...node,
          connectedTo: node.connectedTo.filter((id) => id !== nodeId2),
        };
      } else if (node.id === nodeId2) {
        return {
          ...node,
          connectedTo: node.connectedTo.filter((id) => id !== nodeId1),
        };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const connectNodes = (nodeId1, nodeId2) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === nodeId1 && !node.connectedTo.includes(nodeId2)) {
        return { ...node, connectedTo: [...node.connectedTo, nodeId2] };
      } else if (node.id === nodeId2 && !node.connectedTo.includes(nodeId1)) {
        return { ...node, connectedTo: [...node.connectedTo, nodeId1] };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const connectSelectedNodes = () => {
    if (selectedNodes.length < 2) return;

    for (let i = 0; i < selectedNodes.length - 1; i++) {
      const nodeId1 = selectedNodes[i];
      const nodeId2 = selectedNodes[i + 1];
      connectNodes(nodeId1, nodeId2);
    }

    setSelectedNodes([]);
  };

  const handlePopupSave = () => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === popupNodeId) {
        return { ...node, title: nodeTitle };
      }
      return node;
    });
    setNodes(updatedNodes);
    setPopupVisible(false);
    setNodeTitle("");
  };

  return (
    <div className="home">
      <div id="graph-panel" className="graph-panel">
        {nodes.map((node) => (
          <div
            key={`node-${node.id}`}
            className={`node ${
              selectedNodes.includes(node.id) ? "selected" : ""
            }`}
            style={{ left: node.x, top: node.y }}
            onClick={() => handleNodeClick(node.id)}
            onDoubleClick={() => handleNodeDoubleClick(node.id)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {hoveredNode === node.id && (
              <span
                className="delete-icon"
                onClick={() => handleNodeDelete(node.id)}
              >
                X
              </span>
            )}
            <span className="node-title">{node.title}</span>
          </div>
        ))}
        {nodes.map((node) =>
          node.connectedTo.map((connectedNodeId) => {
            const connectedNode = nodes.find((n) => n.id === connectedNodeId);
            return (
              <div
                key={`branch-${node.id}-${connectedNodeId}`}
                className="branch"
                style={{
                  left: node.x + 25,
                  top: node.y + 25,
                  width: Math.sqrt(
                    (connectedNode.x - node.x) ** 2 +
                      (connectedNode.y - node.y) ** 2
                  ),
                  transformOrigin: "left center",
                  transform: `rotate(${Math.atan2(
                    connectedNode.y - node.y,
                    connectedNode.x - node.x
                  )}rad)`,
                }}
                onMouseEnter={() =>
                  setHoveredBranch({
                    nodeId1: node.id,
                    nodeId2: connectedNodeId,
                  })
                }
                onMouseLeave={() => setHoveredBranch(null)}
              >
                {hoveredBranch &&
                  hoveredBranch.nodeId1 === node.id &&
                  hoveredBranch.nodeId2 === connectedNodeId && (
                    <span
                      className="delete-branch-icon"
                      onClick={() =>
                        handleBranchDelete(node.id, connectedNodeId)
                      }
                    >
                      X
                    </span>
                  )}
              </div>
            );
          })
        )}
      </div>
      {popupVisible && (
        <div className="node-popup" style={{ left: "400px", top: "0" }}>
          <input
            type="text"
            placeholder="Enter title"
            value={nodeTitle}
            onChange={(e) => setNodeTitle(e.target.value)}
          />
          <button onClick={handlePopupSave}>Save</button>
        </div>
      )}
      <button className="create-node-button" onClick={createNode}>
        Create node
      </button>
      <button className="connect-nodes-button" onClick={connectSelectedNodes}>
        Connect selected nodes
      </button>
    </div>
  );
};

export default Home;