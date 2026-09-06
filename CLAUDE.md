# My Own Portfolio

I'm rebuilding my portfolio to showcase my work, experience, and skills. This document outlines the structure, technologies, and guidelines for the project.

## Project Structure:

project structure goes here

## Commands:

| Command              | Usage                                        |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | dev server (**ask the developer to run it**) |
| `npm run lint`       | eslint                                       |
| `npm run format:fix` | prettier                                     |
| `npm run build`      | production build                             |

## Hard rules:

Write any new hard rule here when the developer ask.

- Never start, run, or restart a server or process — ask the developer.
- Never make an architectural decision alone. If it is not written down, stop and ask.
- Never hardcode what belongs in `constants.ts`, `styles.css`, and similar files.
- Never rewrite a whole file. Targeted edits only.
- Never duplicate logic — search first. Project may already carry components.
- Read the `tsconfig.json`, `eslint.config.js`, `.prettierrc`, `package.json` before writing in it.
- Run `npm run lint` at the end of changes you do, and fix everything before finishing.
- If this file disagrees with the code, the code is right — say so instead of following it.
- Use the tools already allowed in settings instead of asking permission for strange tools every minute.
- Always leave the shell back at the project root. Leaving it elsewhere breaks `@` file
  mentions — they then list that folder instead of the project, and I get forced to type `@../` or other relative paths.
- Follow the existing patterns, structure, and styles by default. Deviate only when directly asked.
