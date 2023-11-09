import { Allotment } from "allotment";
import PropTypes from "prop-types";
import React from "react";
import "allotment/dist/style.css";

// DraggablePaneContainer: A component that uses Allotment to create a resizable pane container.
// Fixed height is set on the container wrapping the Allotment component.
const DraggablePaneContainer = ({ children, height = '500px' }) => {
  // Ensure children is an array with two elements for two panes.
  if (children.length !== 2) {
    throw new Error("DraggablePaneContainer requires exactly two children.");
  }

  const containerStyle = { height };
  const innerPaneStyle = { overflowY: "auto", height: "100%" };

  return (
    <div style={containerStyle}>
      <Allotment>
        <Allotment.Pane>
          <div style={innerPaneStyle}>{children[0]}</div>
         </Allotment.Pane>
        <Allotment.Pane>
          <div style={innerPaneStyle}>{children[1]}</div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

DraggablePaneContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  height: PropTypes.string,
};

export default DraggablePaneContainer;
