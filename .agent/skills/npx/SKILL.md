---
name: npx
description: Use this skill when you need to run npm packages via npx, scaffold projects, execute one-off CLI tools, or manage MCP servers using npx commands.
---

# npx Skill

## Overview
`npx` is a Node.js tool that lets you execute npm packages without globally installing them. Use it for scaffolding, running CLIs, and launching MCP servers.

## When to Use This Skill
- Scaffolding new projects (e.g., `create-next-app`, `create-vite`)
- Running one-off CLI tools (e.g., `prisma`, `supabase`)
- Launching MCP servers in `mcp_config.json`
- Installing and executing packages in a single command

## Key Rules

### Always Use `-y` Flag
Always pass `-y` to skip the "install this package?" prompt so commands run non-interactively:
```bash
npx -y <package-name>
```

### Pin or Use `@latest` for MCP Servers
For MCP server packages, use `@latest` to ensure the newest version:
```bash
npx -y @supabase/mcp-server-supabase@latest
npx -y @modelcontextprotocol/server-github@latest
```

### Check Options Before Running
For new CLI tools, always run `--help` first to understand available flags:
```bash
npx -y create-next-app@latest --help
```

### Run in Non-Interactive Mode
When scaffolding projects, pass all necessary flags to avoid user prompts:
```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --no-git --use-npm
```

### Initialize in Current Directory
Always scaffold into `./` (current directory) rather than creating a named subfolder, unless the user explicitly requests a subfolder:
```bash
npx -y create-vite@latest ./ --template react-ts
```

## Common Commands

### Next.js
```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --no-git
```

### Vite
```bash
npx -y create-vite@latest ./ --template react-ts
```

### Prisma MCP Server
```bash
npx -y prisma mcp
```

### Supabase MCP Server
```bash
npx -y @supabase/mcp-server-supabase@latest --supabase-url <URL> --supabase-key <KEY>
```

### GitHub MCP Server
```bash
npx -y @modelcontextprotocol/server-github
```

### Prisma CLI
```bash
npx prisma generate
npx prisma migrate dev --name <migration-name>
npx prisma db push
npx prisma studio
```

## MCP Server Configuration Pattern
When adding an npx-based MCP server to `mcp_config.json`:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "<package-name>@latest", "<additional-args>"],
      "env": {
        "ENV_VAR": "value"
      }
    }
  }
}
```

## Important Notes
- **Never** run `npx` without `-y` in automated/agentic contexts — it will hang waiting for user input.
- **Never** run destructive commands (e.g., `prisma migrate reset`) without explicit user confirmation.
- If a package requires environment variables (API keys, tokens), always pass them via the `env` block in `mcp_config.json` or via the shell environment — never hardcode secrets in command args if avoidable.
- On **Windows**, use `npx.cmd` if running from a shell script, but in `mcp_config.json` use `"npx"` (Antigravity handles path resolution).
