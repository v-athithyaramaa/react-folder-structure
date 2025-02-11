import { useState } from "react";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolder,
  VscFile,
  VscNewFolder,
  VscNewFile,
  VscEdit,
  VscTrash,
} from "react-icons/vsc";

const Folder = ({
  handleInsertNode,
  handleDeleteNode,
  handleUpdateFolder,
  explorerData,
  onFolderClick,
}) => {
  const [nodeName, setNodeName] = useState(
    explorerData?.name ? explorerData.name : ""
  );
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [updateInput, setUpdateInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolderButton = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleUpdateFolderButton = (e, isFolder, nodeValue) => {
    setNodeName(nodeValue);
    e.stopPropagation();
    setUpdateInput({
      visible: true,
      isFolder,
    });
  };

  const handleDeleteFolder = (e, isFolder) => {
    e.stopPropagation();
    handleDeleteNode(explorerData.id);
  };

  const onAdd = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onUpdate = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleUpdateFolder(explorerData.id, e.target.value, true);
      setUpdateInput({ ...updateInput, visible: false });
    }
  };

  const handleChange = (event) => {
    setNodeName(event.target.value);
  };

  const handleClick = () => {
    if (!explorerData.isFolder || explorerData.name === "TRAMIDTPYM-26862") {
      console.log("Clicked folder:", explorerData.name); // Debugging
      onFolderClick(explorerData.name);
    } else {
      setExpand(!expand);
    }
  };

  if (explorerData.isFolder) {
    return (
      <div>
        <div
          className="folder"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <span>
            {expand ? <VscChevronDown /> : <VscChevronRight />} <VscFolder />
            {updateInput.visible ? (
              <input
                type="text"
                value={nodeName}
                onChange={handleChange}
                autoFocus
                onBlur={() =>
                  setUpdateInput({ ...updateInput, visible: false })
                }
                onKeyDown={onUpdate}
              />
            ) : (
              <label>{explorerData.name}</label>
            )}
          </span>

          <div className="buttons-container">
            <button onClick={(e) => handleDeleteFolder(e, true)}>
              <VscTrash />
            </button>
            <button
              onClick={(e) =>
                handleUpdateFolderButton(e, true, explorerData.name)
              }
            >
              <VscEdit />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, true)}>
              <VscNewFolder />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, false)}>
              <VscNewFile />
            </button>
          </div>
        </div>
        <div
          id="folderContainer"
          style={{ display: expand ? "block" : "none", marginLeft: 20 }}
        >
          {showInput.visible && (
            <div className="addItem">
              <span>{showInput.isFolder ? <VscFolder /> : <VscFile />}</span>
              <input
                type="text"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAdd}
              />
            </div>
          )}
          {explorerData.items.map((item, index) => {
            return (
              <Folder
                handleDeleteNode={handleDeleteNode}
                handleInsertNode={handleInsertNode}
                handleUpdateFolder={handleUpdateFolder}
                explorerData={item}
                key={index}
                onFolderClick={onFolderClick}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="folder" onClick={handleClick}>
        <span>
          <VscFile />
          {updateInput.visible ? (
            <input
              type="text"
              value={nodeName}
              onChange={handleChange}
              autoFocus
              onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
              onKeyDown={onUpdate}
            />
          ) : (
            <label>{explorerData.name}</label>
          )}
        </span>
        <div className="buttons-container">
          <button onClick={(e) => handleDeleteFolder(e, false)}>
            <VscTrash />
          </button>
          <button
            onClick={(e) =>
              handleUpdateFolderButton(e, false, explorerData.name)
            }
          >
            <VscEdit />
          </button>
        </div>
      </div>
    );
  }
};

export default Folder;
