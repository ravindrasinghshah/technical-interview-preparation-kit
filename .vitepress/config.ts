import fs from "node:fs";
import path from "node:path";
import { defineConfig, type DefaultTheme } from "vitepress";

const ROOT = process.cwd();
const EXCLUDED = new Set(["node_modules", ".git", ".vitepress", "_test_"]);

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
    sidebar: buildSidebar(ROOT),
  },
  ignoreDeadLinks: true,
});
