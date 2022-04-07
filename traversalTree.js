function TreeNode (val) {
  this.val = val;
  this.left = this.right = null;
}

// 递归
// 前序遍历
function preorderTraversal (root) {
  const reuslt = []
  if (!root) return result
  result.push(root.val)
  preorderTraversal(root.left)
  preorderTraversal(root.right)
}
// 中序遍历和后序遍历调整位置就行

// 迭代
function preorderTraversal1 (root) {
  if (!root) return []
  const result = []
  const stack = []
  stack.push(root)

  while (stack.length) {
    const node = stack.pop()
    result.push(node.val)
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
  return result
}

// 层次遍历
var levelOrder = function (root) {
  const result = []
  if (!root) return result

  const q = []
  q.push(root)
  while (q.length !== 0) {
    const currentLevelSize = q.length;
    result.push([]);
    for (let i = 1; i <= currentLevelSize; ++i) {
      const node = q.shift()
      result[result.length - 1].push(node.val)
      if (node.left) q.push(node.left)
      if (node.right) q.push(node.right)
    }
  }

  return result
};
