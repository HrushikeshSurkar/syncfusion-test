// tree-view.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface TreeNode {
  name: string;
  children?: TreeNode[];
  selected?: boolean; // Track the checkbox state
  isExpanded?: boolean; // Track the expand/collapse state
}

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent {
  @Input() nodes: TreeNode[] | undefined = [];

  // Toggle the expansion of a node (collapse/expand)
  toggleNode(node: TreeNode): void {
    node.isExpanded = !node.isExpanded;
  }

  // Toggle the selection of a node and update child nodes
  toggleSelection(node: TreeNode): void {
    node.selected = !node.selected;
    this.updateChildSelection(node);
    this.updateParentSelection(node);

    // Log selected nodes with their parents
    this.logSelectedNodesWithParents();
  }

  // Update child nodes' selection based on the current node's state
  private updateChildSelection(node: TreeNode): void {
    if (node.children) {
      node.children.forEach((child) => {
        child.selected = node.selected;
        this.updateChildSelection(child); // Recursively update children
      });
    }
  }

  // Update parent node's selection based on the state of child nodes
  private updateParentSelection(node: TreeNode): void {
    if (node.children) {
      const allSelected = node.children.every((child) => child.selected);
      const anySelected = node.children.some((child) => child.selected);

      // Set the parent as selected if all children are selected
      node.selected = allSelected;
    }
  }

  // Function to log selected nodes with their parent
  private logSelectedNodesWithParents(): void {
    const selectedNodes: { parent: string | undefined; node: string }[] = [];

    const traverse = (nodes: TreeNode[], parent: string | undefined): void => {
      nodes.forEach((node) => {
        if (node.selected) {
          selectedNodes.push({ parent, node: node.name });
        }
        if (node.children) {
          traverse(node.children, node.name); // Recursively traverse children
        }
      });
    };

    // Start traversal with no parent for the top-level nodes
    if (this.nodes) {
      traverse(this.nodes, undefined);
    }

    // Log the selected nodes along with their parents
    console.log(selectedNodes);
  }
}
