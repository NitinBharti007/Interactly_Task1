## Getting Started with Create React App
 
## Description:

This project is a simple interactive graph editor built using React. Users can create nodes, connect them, edit node titles, and delete nodes and connections.

## Installation:

Clone the repository: git clone <repository-url>
Navigate to the project directory: cd <project-directory>
Install dependencies: npm install or yarn install

## Usage:

Start the development server: npm start or yarn start
Open the application in your web browser at http://localhost:3000
Features:

Create Nodes: Click the "Create node" button to generate new nodes randomly positioned within the graph panel.
Edit Node Title: Double-click on a node to open a popup where you can enter a new title for the node. Click "Save" to apply the changes.
Connect Nodes: Select multiple nodes by clicking on them, then click the "Connect selected nodes" button to create connections between them.
Delete Nodes: Hover over a node and click the 'X' icon to delete it from the graph.
Delete Connections: Hover over a connection (branch) between nodes and click the 'X' icon to remove the connection.

## File Structure:

Home.css: Stylesheet for the Home component.
Home.js: React component containing the main functionality of the graph editor.

## Dependencies:

React
Babel (for JSX compilation)
@babel/preset-react (for React preset)
PropTypes (for prop validation)

## Contributing:
Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.

## License:
This project is licensed under the MIT License
