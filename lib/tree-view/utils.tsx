const getLastLeafId = (node, getId) => {
  if (node.isExpanded && node.children && node.children.length > 0) {
    return getLastLeafId(node.children[node.children.length - 1], getId);
  }
  return getId(node);
};
export const getParentId = (nodes, nodeId, parentId, getId) => {
  for (const node of nodes) {
    if (getId(node) === nodeId) {
      return parentId;
    }
    if (node.isExpanded && node.children && node.children.length > 0) {
      const foundId = getParentId(node.children, nodeId, getId(node), getId);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};
export const getPrevId = (nodes, nodeId, parentId, getId) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      return i === 0 ? parentId : getLastLeafId(nodes[i - 1], getId);
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length > 0) {
      const foundId = getPrevId(nodes[i].children, nodeId, getId(nodes[i]), getId);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};
export const getFirstChildId = (nodes, nodeId, getId) => {
  for (const node of nodes) {
    if (
      getId(node) === nodeId &&
      node.isExpanded &&
      node.children &&
      node.children.length > 0
    ) {
      return getId(node.children[0]);
    }
    if (node.isExpanded && node.children && node.children.length > 0) {
      const foundId = getFirstChildId(node.children, nodeId, getId);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};
export const getNextId = (nodes, nodeId, closestOmmer, getId) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length > 0) {
        return getId(nodes[i].children[0]);
      } else if (nodes[i + 1]) {
        return getId(nodes[i + 1]);
      } else {
        return closestOmmer;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length > 0) {
      const foundId = getNextId(
        nodes[i].children,
        nodeId,
        nodes[i + 1] ? getId(nodes[i + 1]) : closestOmmer,
        getId
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};
export const getEndId = (nodes, getId) => {
  const endNode = nodes[nodes.length - 1];
  if (endNode.isExpanded && endNode.children && endNode.children.length > 0) {
    return getEndId(endNode.children, getId);
  }
  return getId(endNode);
};
export const getExpandableSiblings = (nodes, nodeId, getId) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      const expandableSiblings = [];
      for (const node of nodes) {
        if (!node.isExpanded && node.children && node.children.length > 0) {
          expandableSiblings.push(node);
        }
      }
      return expandableSiblings;
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length > 0) {
      const result = getExpandableSiblings(nodes[i].children, nodeId, getId);
      if (result.length > 0) {
        return result;
      }
    }
  }
  return [];
};
export const toggleIsExpanded = (
  arr,
  toggledNode,
  getId = (node) => {
    return node.id ? node.id : "";
  }
) => {
  return arr.map((node) => {
    const newNode = { ...node };
    if (getId(newNode) === getId(toggledNode)) {
      newNode.isExpanded = !newNode.isExpanded;
    }
    if (newNode.children && newNode.children.length > 0) {
      newNode.children = toggleIsExpanded(newNode.children, toggledNode);
    }
    return newNode;
  });
};
export const getCharMatchId = (nodes, nodeId, chars, closestOmmer, getId) => {
  let foundid = matchString(nodes, nodeId, chars, closestOmmer, getId, true);
  if (foundid) return foundid;
  foundid = matchString(nodes, nodeId, chars, closestOmmer, getId, false);
  return foundid;
};
export const matchString = (nodes, nodeId, chars, closestOmmer, getId, matchPrefix) => {
  for (let i = 0; i < nodes.length; i++) {
    if (
      nodes[i].label &&
      typeof nodes[i].label === "string" &&
      ((matchPrefix && nodes[i].label.toUpperCase().indexOf(chars.toUpperCase()) === 0) ||
        (!matchPrefix && nodes[i].label.toUpperCase().indexOf(chars.toUpperCase()) > 0))
    ) {
      return getId(nodes[i]);
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length > 0) {
      const foundId = matchString(
        nodes[i].children,
        nodeId,
        chars,
        nodes[i + 1] ? getId(nodes[i + 1]) : closestOmmer,
        getId,
        matchPrefix
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};
export const defaultGetId = (node) => {
  if (!node.id) {
    throw new Error(
      "There needs to be an unique node.id. You can implement a custom mapping with getId."
    );
  }
  return node.id;
};
