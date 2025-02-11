import { useState, useEffect } from "react";
import "./App.css";
import folderData from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import image from "./images/image.png";
import TestDetails from "./components/TestCaseDetails";
import {
  FaUserCircle,
  FaBars,
  FaHome,
  FaFolder,
  FaEnvelope,
  FaFileAlt,
  FaPlay,
  FaPause,
  FaStop,
  FaRedo,
  FaFilter,
} from "react-icons/fa";
function App() {
  const [explorerData, setExplorerData] = useState(folderData);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showFolderStructure, setShowFolderStructure] = useState(false);

  const {
    insertNode,
    deleteNode,
    updateNode,
    createFolderStructureFromTestCase,
  } = useTraverseTree();

  useEffect(() => {
    const mockResponse = {
      responseCode: "OK",
      extendedResponse: { code: "OK", message: "OK" },
      payload: {
        testCases: [
          {
            testCaseId: "3156834822173879",
            testCaseName:
              "Dynamic Test Scripts\\BalanceInquiry\\All ACCOUNT Balance Inquiry ONUS\\TRAMIDTPYM-26862",
          },
        ],
      },
    };

    const testCase = mockResponse.payload.testCases[0];
    const updatedTree = createFolderStructureFromTestCase(
      { ...explorerData },
      testCase.testCaseName,
      explorerData.id
    );

    setExplorerData(updatedTree);
  }, []);

  // Mock test case data
  const mockTestCaseData = {
    responseCode: "OK",
    extendedResponse: { code: "OK", message: "OK" },
    payload: {
      testCaseId: "3156834822173879",
      transactionType: "FastCash Transaction after pin retry",
      accountType: "SAVINGS",
      receipt: true,
      language: "EN-US",
      profile: "DEFAULT_PROFILE",
      cardName: "VisaOnUs1428",
      multiTransactionScenario: "Interactive",
      requestType: "string",
      ocmPreSetupTestCaseName: "string",
      ocmPostSetupTestCaseName: "string",
      transactionLogEntry: "SB Account Overview: Confirm",
      faultCode: "8[FS]E400000000[FS]20000[FS]1200000000000000000000",
      executeTest: true,
      request: [
        {
          legName: "Leg1",
          requestValue: [
            { fieldName: "B", fieldValue: "1" },
            { fieldName: "m1", fieldValue: "1" },
            { fieldName: "m2", fieldValue: "1" },
            { fieldName: "m7", fieldValue: "2" },
            { fieldName: "m10", fieldValue: "D AB AA" },
            { fieldName: "m11", fieldValue: "2222" },
          ],
        },
      ],
      response: [
        {
          legName: "Leg1",
          responseValue: [{ fieldName: "B", fieldValue: "1" }],
        },
      ],
      ocmAuthorizationRouter: [
        {
          legName: "Leg1",
          ocmAuthorizationValue: {
            businessFunctions: {
              additionalProp1: "string",
              additionalProp2: "string",
              additionalProp3: "string",
            },
            facets: {
              requestFacets: [{ fieldName: "B", fieldValue: "1" }],
              responseFacets: [{ fieldName: "B", fieldValue: "1" }],
            },
          },
        },
      ],
    },
  };

  const handleInsertNode = (folderId, itemName, isFolder) => {
    const finalItem = insertNode(explorerData, folderId, itemName, isFolder);
    setExplorerData({ ...finalItem });
  };

  const handleDeleteNode = (folderId) => {
    const finalItem = deleteNode(explorerData, folderId);
    setExplorerData(finalItem);
  };

  const handleUpdateFolder = (id, updatedValue, isFolder) => {
    const finalItem = updateNode(explorerData, id, updatedValue, isFolder);
    setExplorerData(finalItem);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleFolderClick = (folderName) => {
    setSelectedFolder(folderName);
  };

  const toggleFolderStructure = () => {
    setShowFolderStructure(!showFolderStructure);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img src={image} alt="Logo" />
        </div>
        <div className="profile">
          <FaUserCircle size={24} />
          <span>My Profile</span>
        </div>
      </header>
      <div className="controls">
        <button className="control-button">
          <FaPlay size={20} />
          <span>PLAY</span>
        </button>
        <button className="control-button">
          <FaPause size={20} />
          <span>PAUSE</span>
        </button>
        <button className="control-button">
          <FaStop size={20} />
          <span>STOP</span>
        </button>
        <button className="control-button">
          <FaRedo size={20} />
          <span>RESTART</span>
        </button>
        <button className="control-button">
          <FaFilter size={20} />
          <span>FILTER</span>
        </button>
      </div>
      <div className="main-content">
        <div className="vertical-panel">
          <div
            className="vertical-panel-item"
            onClick={() => setShowFolderStructure(false)}
          >
            <FaHome size={20} />
            <span>Home</span>
          </div>
          <div
            className="vertical-panel-item"
            onClick={() => setShowFolderStructure(false)}
          >
            <FaFileAlt size={20} />
            <span>Test Case</span>
          </div>
          <div className="vertical-panel-item" onClick={toggleFolderStructure}>
            <FaFolder size={20} />
            <span>Folders</span>
          </div>
          <div
            className="vertical-panel-item"
            onClick={() => setShowFolderStructure(false)}
          >
            <FaEnvelope size={20} />
            <span>Contact Us</span>
          </div>
        </div>
        <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars size={20} />
          </button>
          {showFolderStructure && (
            <div className="folder-container">
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleUpdateFolder={handleUpdateFolder}
                explorerData={explorerData}
                onFolderClick={handleFolderClick}
              />
            </div>
          )}
        </div>
        <div className="empty-state">
          {selectedFolder === "TRAMIDTPYM-26862" ? (
            <TestDetails testCase={mockTestCaseData.payload} />
          ) : (
            "Your content will be here"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
