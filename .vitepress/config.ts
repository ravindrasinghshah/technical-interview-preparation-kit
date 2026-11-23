import fs from "node:fs";
import path from "node:path";
import { defineConfig, type DefaultTheme } from "vitepress";

const ROOT = process.cwd();
const EXCLUDED = new Set(["node_modules", ".git", ".vitepress", "_test_"]);

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

function newSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Start Here",
      collapsed: false,
      items: [
        { text: "Home", link: "/" },
        { text: "Quick Revision Notes", link: "/0-Basics/revision-notes" },
        { text: "Revision Problems", link: "/0-Basics/revision-problems" },
      ],
    },
    {
      text: "Foundations",
      collapsed: false,
      items: [
        { text: "Basics Overview", link: "/0-Basics/" },
        { text: "Math Fundamentals", link: "/0-Basics/maths" },
        { text: "Time Complexity", link: "/1-Complexity/time-complexity" },
        { text: "Space Complexity", link: "/1-Complexity/space-complexity" },
      ],
    },
    {
      text: "Data Structures",
      collapsed: false,
      items: [
        { text: "Data Structures Overview", link: "/2-DataStructures/" },
        { text: "Strings", link: "/2-DataStructures/1-Strings/" },
        { text: "Arrays", link: "/2-DataStructures/2-Arrays/" },
        { text: "Hash Tables", link: "/2-DataStructures/3-HashTables/" },
        { text: "Linked Lists", link: "/2-DataStructures/5-LinkedList/" },
        {
          text: "Doubly Linked Lists",
          link: "/2-DataStructures/6-DoublyLinkedList/",
        },
        { text: "Stacks & Queues", link: "/2-DataStructures/4-Stacks-Queues/" },
        { text: "Trees", link: "/2-DataStructures/7-Tree/" },
        {
          text: "Binary Search Trees",
          link: "/2-DataStructures/8-BinarySearchTree/",
        },
        { text: "Heaps", link: "/2-DataStructures/9-Heaps/" },
        { text: "Graphs", link: "/2-DataStructures/10-Graphs/" },
      ],
    },
    {
      text: "Problem-Solving Patterns",
      collapsed: false,
      items: [
        { text: "Patterns Overview", link: "/3-Patterns/" },
        { text: "Recursion & Backtracking", link: "/3-Patterns/5-Recursion/" },
        { text: "BFS & DFS", link: "/3-Patterns/6-BFS_DFS/" },
      ],
    },
    {
      text: "Algorithms & Practice",
      collapsed: false,
      items: [
        { text: "Algorithms Overview", link: "/4-Algorithms/" },
        {
          text: "Dynamic Programming",
          link: "/4-Algorithms/DynamicProgramming/",
        },
        { text: "Coding Exercises", link: "/5-Exercises/" },
      ],
    },
    {
      text: "System Design",
      collapsed: false,
      items: [
        { text: "System Design Overview", link: "/0-SystemDesign/" },
        { text: "How to Approach", link: "/0-SystemDesign/how-to-do" },
        { text: "Cheat Sheet", link: "/0-SystemDesign/cheat-sheet" },
        {
          text: "Back-of-the-Envelope Estimations",
          link: "/0-SystemDesign/exercises/estimations",
        },
        { text: "Databases", link: "/0-SystemDesign/databases" },
        { text: "Key Technologies", link: "/0-SystemDesign/key-technologies" },
        { text: "Security", link: "/0-SystemDesign/security" },
      ],
    },
  ];
}

function buildSidebar(dir: string, baseRoute = ""): DefaultTheme.SidebarItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items: DefaultTheme.SidebarItem[] = [];

  for (const entry of entries) {
    if (EXCLUDED.has(entry.name) || entry.name.startsWith(".")) continue;

    const fullPath = path.join(dir, entry.name);
    const route = `${baseRoute}/${entry.name}`;

    if (entry.isDirectory()) {
      const children = buildSidebar(fullPath, route);
      if (children.length > 0) {
        items.push({
          text: entry.name,
          collapsed: false,
          items: children,
        });
      }
    } else if (entry.name.endsWith(".md") && entry.name !== "LICENSE.MD") {
      const isReadme = entry.name.toLowerCase() === "readme.md";
      items.push({
        text: isReadme ? "Overview" : entry.name.replace(/\.md$/i, ""),
        link: isReadme ? `${baseRoute}/` : route.replace(/\.md$/i, ""),
      });
    }
  }

  items.sort((a, b) => {
    // Optional: keep "Overview" (README.md) at the top of each section
    if (a.text === "Overview" && b.text !== "Overview") return -1;
    if (b.text === "Overview" && a.text !== "Overview") return 1;

    return collator.compare(a.text ?? "", b.text ?? "");
  });
  return items;
}

export default defineConfig({
  title: "Technical Interview Prep Kit",
  rewrites(id) {
    if (id === "README.md") return "index.md";
    if (id.endsWith("/README.md")) {
      return id.replace(/\/README\.md$/i, "/index.md");
    }
    return id;
  },
  themeConfig: {
    search: { provider: "local" },
    sidebar: newSidebar(), //buildSidebar(ROOT),
  },
  ignoreDeadLinks: true,
});
