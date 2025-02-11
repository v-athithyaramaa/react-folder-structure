const useTraverseTree = () => {
  function insertNode(tree, folderId, itemName, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: itemName,
        isFolder,
        items: [],
      });
      return tree;
    }

    tree.items.map((obj) => {
      let res = insertNode(obj, folderId, itemName, isFolder);
      if (res) {
        return res;
      }
    });
  }

  function deleteNode(tree, folderId) {
    if (tree.id === folderId) {
      return null;
    }

    if (tree.items && tree.items.length > 0) {
      tree.items = tree.items.map((child) => deleteNode(child, folderId));
      tree.items = tree.items.filter(Boolean);
    }

    return { ...tree };
  }

  function updateNode(tree, folderId, itemName) {
    if (tree.id === folderId) {
      return {
        ...tree,
        name: itemName,
      };
    }

    if (tree.items && tree.items.length > 0) {
      tree.items = tree.items.map((child) =>
        updateNode(child, folderId, itemName)
      );
    }

    return { ...tree };
  }

  function createFolderStructureFromTestCase(tree, folderPath, parentId) {
    const parts = folderPath.split("\\");
    let currentNode = tree;

    parts.forEach((part, index) => {
      // Check if the current part already exists as a folder
      let existingNode = currentNode.items.find(
        (item) => item.name === part && item.isFolder
      );

      if (!existingNode) {
        // If it doesn't exist, create a new folder node
        const newNode = {
          id: `${parentId}-${index}-${Date.now()}`,
          name: part,
          isFolder: true,
          items: [],
        };
        currentNode.items.push(newNode);
        existingNode = newNode; // Set the new folder as the current node
      }

      // Move to the next folder level
      currentNode = existingNode;
    });

    return tree;
  }

  return {
    insertNode,
    deleteNode,
    updateNode,
    createFolderStructureFromTestCase,
  };
};

export default useTraverseTree;
