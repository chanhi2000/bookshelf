---
lang: en-US
title: "How to Build the Front End"
description: "Article(s) > (5/6) How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit" 
category:
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (5/6) How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit"
    - property: og:description
      content: "How to Build the Front End"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit/how-to-build-the-front-end.html
date: 2025-02-21
isOriginal: false
author:
  - name: Prankur Pandey
    url : https://freecodecamp.org/news/author/prankurpandeyy/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740064335866/a058fbf3-2d89-4e95-9d3b-07224f3985be.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit",
  "desc": "I’ve been coding for about a decade now. And over the years, I’ve tried my fair share of development tools—especially IDEs like Sublime Text, Atom, and even NetBeans back in my college days. But when VS Code came along, it completely changed the game...",
  "link": "/freecodecamp.org/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit"
  desc="I’ve been coding for about a decade now. And over the years, I’ve tried my fair share of development tools—especially IDEs like Sublime Text, Atom, and even NetBeans back in my college days. But when VS Code came along, it completely changed the game..."
  url="https://freecodecamp.org/news/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit#heading-how-to-build-the-front-end"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/author/prankurpandeyy/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740064335866/a058fbf3-2d89-4e95-9d3b-07224f3985be.png"/>

For the front end, we’ll keep it simple, aiming for a UI that closely resembles Replit. The key components we need for this project are a File Explorer, Monaco Editor, and Sandbox component.

- **File Explorer**: This component will display and manage the code files, positioned on the left side of the screen.
- **Monaco Editor**: This component will allow users to view and edit the content of the code files.
- **Sandbox**: This component will render the live preview of the content inside the code files.

To build these components, we won’t use any third-party UI libraries; instead, we’ll rely solely on TailwindCSS, which is pre-configured with Next.js.

Now, let’s build the components:

1. Open your VS Code.
2. Open the Next.js folder where you created your project.<br/>Since I work without a <FontIcon icon="fas fa-folder-open"/>`src` folder, you’ll find only an <FontIcon icon="fas fa-folder-open"/>`app` folder. Inside the <FontIcon icon="fas fa-folder-open"/>`app` folder, create a new folder called components.

- After creating the folder, your project structure should look something like this:
  - <FontIcon icon="fa-brands fa-js"/>`FileExplorer.tsx`: This is our file explorer
  - <FontIcon icon="fa-brands fa-js"/>`ScreenOne.js`: This is our Monaco editor
  - <FontIcon icon="fa-brands fa-js"/>`LivePreview.js`: This is our sandbox component

Let’s see how I build these components and you can too,

---

## <FontIcon icon="fa-brands fa-react"/>`FileExploer.tsx`

The `FileExplorer` is a React component that displays a list of files fetched from a backend (MongoDB) and allows users to select, create, edit, and delete files. It uses React Hooks for state management and lifecycle effects, Tailwind CSS for styling, and `lucide-react` icons for UI actions.

```tsx :collapsed-lines title="FileExploer.tsx"
import React, { useEffect, useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import io, { Socket } from "socket.io-client";
import { FileData } from "../types/file";

interface FileExplorerProps {
  files: FileData[];
  onFileSelect: (file: FileData) => void;
  currentFile: FileData | null;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  files: initialFiles,
  onFileSelect,
  currentFile,
}) => {
  const [files, setFiles] = useState<FileData[]>(initialFiles);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState<string>("");
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editedFileName, setEditedFileName] = useState<string>("");

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for real-time updates
    socket.on("new-file", (newFile: FileData) => {
      setFiles((prevFiles) => {
        if (!prevFiles.some((file) => file._id === newFile._id)) {
          return [...prevFiles, newFile];
        }
        return prevFiles;
      });
    });

    socket.on("delete-file", (fileId: string) => {
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    });

    socket.on("update-file", (updatedFile: FileData) => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file._id === updatedFile._id
            ? { ...file, name: updatedFile.name }
            : file
        )
      );
    });

    return () => {
      socket.off("new-file");
      socket.off("delete-file");
      socket.off("update-file");
    };
  }, [socket]);

  // Fetch initial files
  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files");
      if (!response.ok) throw new Error("Failed to fetch files");
      const data: FileData[] = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Create new file
  const createNewFile = async () => {
    if (!newFileName.trim()) return;
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newFileName }),
      });

      if (!response.ok) throw new Error("Failed to create file");

      const newFile: FileData = await response.json();
      socket?.emit("new-file", newFile);
      setNewFileName("");
    } catch (error) {
      console.error("Error creating file:", error);
    }
  };

  const handleDeleteFile = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id)); // Optimistic update

    try {
      const response = await fetch("/api/files", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete file");

      socket?.emit("delete-file", id);
    } catch (error) {
      console.error("Error deleting file:", error);
      await fetchFiles(); // Revert state if API call fails
    }
  };

  const handleEditStart = (e: React.MouseEvent, file: FileData) => {
    e.stopPropagation();
    setEditingFile(file._id);
    setEditedFileName(file.name);
  };

  const handleEditSave = async (
    e: React.FocusEvent | React.KeyboardEvent,
    id: string
  ) => {
    e.preventDefault();
    if (!editedFileName.trim()) return;

    const previousFiles = [...files];
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file._id === id ? { ...file, name: editedFileName } : file
      )
    ); // Optimistic update

    try {
      const response = await fetch("/api/files", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: editedFileName }),
      });

      if (!response.ok) throw new Error("Failed to update file");

      const updatedFile: FileData = await response.json();
      socket?.emit("update-file", updatedFile);
      setEditingFile(null);
    } catch (error) {
      console.error("Error updating file:", error);
      setFiles(previousFiles); // Revert state if API call fails
    }
  };

  return (
    <div className="w-64 bg-gray-900 p-4 h-full text-white rounded-lg shadow-lg flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Files</h2>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading files...</div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : files.length === 0 ? (
        <div className="text-gray-400 text-sm">No files yet</div>
      ) : (
        <div className="space-y-2 overflow-y-auto flex-grow">
          {files.map((file) => (
            <div
              key={file._id}
              className={`cursor-pointer flex justify-between items-center p-2 rounded text-white transition-all duration-200 ${
                currentFile?._id === file._id
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => onFileSelect(file)}
            >
              {editingFile === file._id ? (
                <input
                  type="text"
                  value={editedFileName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedFileName(e.target.value)
                  }
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    handleEditSave(e, file._id)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    e.key === "Enter" ? handleEditSave(e, file._id) : null
                  }
                  autoFocus
                  className="bg-gray-800 text-white p-1 rounded outline-none w-32"
                />
              ) : (
                <span className="truncate flex-grow">📄 {file.name}</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={(e: React.MouseEvent) => handleEditStart(e, file)}
                  className="text-yellow-400 hover:text-yellow-600 p-1 rounded"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={(e: React.MouseEvent) =>
                    handleDeleteFile(e, file._id)
                  }
                  className="text-red-400 hover:text-red-600 p-1 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
```

::: info Code Explanation

The `FileExplorer` component is a React component designed to manage and display a list of files in real time. It uses **Socket.IO** for real-time updates, allowing users to add, delete, and edit files dynamically.

:::

::: important Key Features

**1. State Management**

The component uses React's `useState` Hook to manage the following states:

- `files`: List of files displayed in the File Explorer.
- `socket`: The active Socket.IO connection.
- `loading` & `error`: Manage the state of file loading.
- `newFileName`, `editingFile`, and `editedFileName`: Manage file creation and editing processes.

```tsx
const [files, setFiles] = useState([]);
const [socket, setSocket] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [newFileName, setNewFileName] = useState("");
const [editingFile, setEditingFile] = useState(null);
const [editedFileName, setEditedFileName] = useState("");
```

**2. Socket.IO Integration**

- Establishes a real-time connection to a Socket.IO server.
- Listens for events like `new-file`, `delete-file`, and `update-file` to update the file list dynamically.
- Cleans up the socket connection when the component unmounts.

```tsx
useEffect(() => {
  const socketInstance = io("http://localhost:3000", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socketInstance.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  setSocket(socketInstance);

  return () => {
    if (socketInstance) socketInstance.disconnect();
  };
}, []);
```

**3. Real-Time File Updates**

Handles real-time events for creating, deleting, and updating files.

```tsx :collapsed-lines
useEffect(() => {
  if (!socket) return;

  socket.on("new-file", (newFile) => {
    setFiles((prevFiles) =>
      prevFiles.some((file) => file._id === newFile._id)
        ? prevFiles
        : [...prevFiles, newFile]
    );
  });

  socket.on("delete-file", (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
  });

  socket.on("update-file", (updatedFile) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file._id === updatedFile._id
          ? { ...file, name: updatedFile.name }
          : file
      )
    );
  });

  return () => {
    socket.off("new-file");
    socket.off("delete-file");
    socket.off("update-file");
  };
}, [socket]);
```

**4. CRUD Operations**

- **Fetch Files**: Retrieves the initial list of files from the server.
- **Create File**: Sends a POST request to add a new file.
- **Delete File**: Sends a DELETE request to remove a file and updates the UI optimistically.
- **Edit File**: Sends a PUT request to update a file's name and performs optimistic updates.<br/>This code defines a FileExplorer React component that allows users to manage and interact with files in a file system.

:::

::: note

All the operations on the application get saved in real-time for the demo you can refresh the page to see the changes don’t get removed.

:::

---

## <FontIcon icon="fa-brands fa-react"/>`ScreenOne.tsx`

The `ScreenOne` component is a code editor panel that dynamically displays and updates code for a selected file. It integrates the Monaco Editor to highlight syntax based on the file type (for example, JavaScript, HTML, CSS).

The component shows the selected file's name, allows users to edit its content, and sends updates back to the database in real time. It also offers a clean, user-friendly interface with a dark theme and configurable editor options. This is ideal for coding environments like IDEs or code playgrounds.

```tsx :collapsed-lines title="ScreenOne.tsx"
import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";

interface File {
  name: string;
}

interface ScreenOneProps {
  selectedFile: File | null;
  code: string;
  onChange: (newCode: string | undefined) => void;
}

const ScreenOne: React.FC<ScreenOneProps> = ({ selectedFile, code, onChange }) => {
  const [language, setLanguage] = useState<string>("javascript");

  useEffect(() => {
    if (!selectedFile) return;
    setLanguage(getLanguageForFile(selectedFile.name));
  }, [selectedFile]);

  const getLanguageForFile = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "js":
      case "jsx":
        return "javascript";
      case "html":
        return "html";
      case "css":
        return "css";
      case "json":
        return "json";
      default:
        return "plaintext";
    }
  };

  const handleCodeChange = (newCode: string | undefined): void => {
    onChange(newCode); // Call the onChange prop to update the code in LivePreview
  };

  return (
    <div className="flex-1 flex flex-col bg-[#2d2d2d] text-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Code Editor</h2>
        <div className="text-sm text-gray-400">
          {selectedFile ? selectedFile.name : "No file selected"}
        </div>
      </div>
      <div className="flex-grow bg-gray-800 rounded-lg shadow-inner">
        <Editor
          height="calc(100vh - 160px)"
          language={language}
          value={code}
          onChange={handleCodeChange} // Update the code on change
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            lineNumbers: "on",
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
};

export default ScreenOne;
```

::: info Code Explanation

This React component, `ScreenOne`, represents a code editor screen where users can edit files in a specified programming language. The editor dynamically adjusts its syntax highlighting based on the selected file's type. It uses the `@monaco-editor/react` library for the editor interface.

This code defines a ScreenOne React component, which is a code editor using the Monaco Editor (used in VS Code). Here's a brief explanation:

:::

::: important Key Features

**1. Code Editor**:

- Uses the `@monaco-editor/react` library to render a code editor.
- Supports syntax highlighting for various languages (for example, JavaScript, HTML, CSS, JSON).

**2. Dynamic Language Detection**:

- Detects the programming language based on the selected file's extension (for example, `.js` → JavaScript).
- Defaults to `plaintext` for unsupported file types.

**3. Props**:

- `selectedFile`: The currently selected file (contains the file name).
- `code`: The current code content to display in the editor.
- `onChange`: A callback function to handle code changes.

**4. UI**:

- Displays the file name and a title ("Code Editor").
- Styled with Tailwind CSS for a dark theme and rounded corners.

**5. Editor Configuration**:

- Uses the `vs-dark` theme.
- Disables the mini-map and enables line numbers and word wrap.

:::

---

## <FontIcon icon="fa-brands fa-react"/>`LivePreview.tsx`

The `LivePreview` component dynamically generates a live code preview for either static projects (HTML, CSS, JS) or React-based projects. It detects the type of project, and sets up the required files (for example, <FontIcon icon="fa-brands fa-html5"/>`index.html`, <FontIcon icon="fa-brands fa-react"/>`App.js`), and renders a real-time preview using CodeSandbox's Sandpack. The preview adapts to the selected file and updates as the code changes, providing a seamless coding experience.

```tsx :collapsed-lines title="LivePreview.tsx"
import React, { useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackThemeProvider,
} from "@codesandbox/sandpack-react";

interface FileAccumulator {
[key: string]: { code: string };
}

interface File {
  name: string;
  content: string;
}

interface LivePreviewProps {
files: File[];
currentFile: File | null;
code: string;
onCodeChange?: (value: string | undefined) => void;
}
interface SandpackFile {
  code: string;
}

interface SandpackFiles {
  [key: string]: SandpackFile;
}

const LivePreview: React.FC<LivePreviewProps> = ({ files, currentFile, code }) => {
  const [sandboxFiles, setSandboxFiles] = useState<Record<string, { code: string }>>({});
  const [template, setTemplate] = useState<"vanilla" | "react">("vanilla"); // Default to static
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!currentFile || !files) return;

    const newFiles: SandpackFiles = files.reduce((acc: FileAccumulator, file) => {
    acc[`/${file.name}`] = { code: file.content };
    return acc;
    }, {});

    // Check if the project is React-based
    const isReactProject = files.some(
      (file) =>
        file.name.endsWith(".jsx") ||
        (file.name.endsWith(".js") && file.content.includes("React"))
    );

    if (isReactProject) {
      setTemplate("react");

      // Ensure App.js exists
      if (!newFiles["/App.js"]) {
        newFiles["/App.js"] = {
          code: `
            import React from "react";
            function App() { return <h1>Hello, React!</h1>; }
            export default App;
          `,
        };
      }

      // Ensure index.js exists
      newFiles["/index.js"] = {
        code: `
          import React from "react";
          import ReactDOM from "react-dom/client";
          import App from "./App";

          const root = document.getElementById("root");
          if (root) {
            ReactDOM.createRoot(root).render(<App />);
          } else {
            console.error("Root element not found!");
          }
        `,
      };

      // Ensure index.html exists
      newFiles["/index.html"] = {
        code: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React App</title>
          </head>
          <body>
            <div id="root"></div>
          </body>
          </html>
        `,
      };

      // Ensure package.json exists
      newFiles["/package.json"] = {
        code: JSON.stringify(
          {
            main: "/index.js",
            dependencies: {
              react: "18.2.0",
              "react-dom": "18.2.0",
            },
          },
          null,
          2
        ),
      };
    } else {
      setTemplate("vanilla");

      const htmlFile = files.find((f) => f.name.endsWith(".html"));
      if (htmlFile) {
        let htmlContent = htmlFile.content;

        // Inject CSS files
        files
          .filter((f) => f.name.endsWith(".css"))
          .forEach((cssFile) => {
            htmlContent = htmlContent.replace(
              "</head>",
              `<link rel="stylesheet" href="${cssFile.name}"></head>`
            );
          });

        // Inject JS files
        files
          .filter((f) => f.name.endsWith(".js"))
          .forEach((jsFile) => {
            htmlContent = htmlContent.replace(
              "</body>",
              `<script src="${jsFile.name}"></script></body>`
            );
          });

        newFiles["/index.html"] = { code: htmlContent };
      }
    }

    // Ensure the current file is included
    newFiles[`/${currentFile.name}`] = { code };
    setSandboxFiles(newFiles);
    setLoading(false);
  }, [files, currentFile, code]);

  return (
    <div className="flex-1 bg-white border-l border-gray-300">
      {loading ? (
        <div className="h-full flex items-center justify-center text-gray-500">
          Loading...
        </div>
      ) : currentFile ? (
        <SandpackProvider
        template={template}
        files={sandboxFiles}
        options={{ activeFile: `/${currentFile.name}` }}
        >
        <SandpackThemeProvider>
            <SandpackLayout>
            <SandpackCodeEditor showTabs={false}  />
            <SandpackPreview style={{ height: "600px", border: "none" }} />
            </SandpackLayout>
        </SandpackThemeProvider>
        </SandpackProvider>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          Select a file to preview
        </div>
      )}
    </div>
  );
};

export default LivePreview;
```

::: info Code Explanation

The `LivePreview` component provides a real-time live preview environment for static HTML/CSS/JS files or React-based projects. It uses the CodeSandbox Sandpack library to dynamically render code files in a browser-like preview window. The component automatically adjusts its behavior based on the file types and content to determine if the project is static or React-based.

:::

This code defines a LivePreview React component that uses Sandpack (from CodeSandbox) to provide a live code editor and preview environment. Here's a brief explanation:

::: important Key Features

**1. Sandpack Integration**:

- Uses `@codesandbox/sandpack-react` to render a code editor and live preview.
- Supports both React and vanilla JavaScript/HTML/CSS projects.

**2. Dynamic File Handling**:

- Converts a list of files (`files` prop) into a format compatible with Sandpack.
- Automatically detects if the project is React-based (e.g., contains `.jsx` or React imports).
- Ensures necessary files (for example, <FontIcon icon="fa-brands fa-react"/>`App.js`, <FontIcon icon="fa-brands fa-react"/>`index.js`, <FontIcon icon="fa-brands fa-html5"/>`index.html`, <FontIcon icon="iconfont icon-json"/>`package.json`) exist for React projects.

**3. Template Switching**:

- Sets the Sandpack template to `"react"` for React projects or `"vanilla"` for static HTML/CSS/JS projects.

**4. Code Injection**:

- For vanilla projects, injects linked CSS and JS files into the HTML file.

**5. Loading State**:

- Displays a loading message while processing files.

**6. UI**:

- Shows a code editor and live preview side by side.
- Displays a message if no file is selected.

:::

---

## Running sockets in the app

Now it is time to eat that big frog. As you know we are using sockets for real-time data communication so we need a `server.tsx` file in the root directory of the app (outside of the `src` folder) and paste this code:

```tsx :collapsed-lines title="server.tsx"
import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse, UrlWithParsedQuery } from "url";
import next from "next";
import { Server, Socket } from "socket.io";

const dev: boolean = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl: UrlWithParsedQuery = parse(req.url || "", true);
    handle(req, res, parsedUrl);
  });

  // Determine the CORS origin dynamically
  const allowedOrigin: string = dev
    ? "http://localhost:3000" // Local development
    : "*"; // Vercel deployment

  // Initialize Socket.IO with dynamic CORS configuration
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Socket.IO event handlers
  io.on("connection", (socket: Socket) => {
    console.log("Client connected");

    // Handle new file creation
    socket.on("new-file", (newFile: { id: string; name: string; content: string }) => {
      console.log("New file created:", newFile);
      // Broadcast to all clients except sender
      socket.broadcast.emit("new-file", newFile);
    });

    // Handle file deletion
    socket.on("delete-file", (fileId: string) => {
      console.log("File deleted:", fileId);
      socket.broadcast.emit("delete-file", fileId);
    });

    // Handle file update
    socket.on("update-file", (updatedFile: { id: string; name: string; content: string }) => {
      console.log("File updated:", updatedFile);
      socket.broadcast.emit("update-file", updatedFile);
    });

    // Handle client disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  // Start the server on the specified port
  const PORT: number | string = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`> Ready on ${dev ? "http://localhost:3000" : allowedOrigin}`);
  });
});
```

---

## Code Explanation

This code sets up a **Next.js server** with **Socket.IO** for real-time communication. It:

1. Initializes a Next.js app and prepares it to handle HTTP requests.
2. Configures CORS dynamically for Socket.IO, allowing connections from `localhost:3000` in development or all origins in production.
3. **Sets up Socket.IO** to handle real-time events like:
    - New file creation
    - File deletion
    - File updates
    - Client disconnection
4. Broadcasts events to all connected clients except the sender.
5. Starts the server on a specified port (default: 3000).

It’s a basic real-time server for file management with Next.js and Socket.IO.

---

## Clubbing all components together

To do this we will have to tweak the <FontIcon icon="fa-brands fa-react"/>`page.tsx`. Just copy the given code and paste it into the `page.js`

```tsx :collapsed-lines title="page.tsx"
"use client";
import React, { useState, useEffect } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import ScreenOne from "./components/ScreenOne";
import FileExplorer from "./components/FileExplorer";
import LivePreview from "./components/LivePreview";
import io, { Socket } from "socket.io-client";

interface File {
  _id: string;
  name: string;
  content: string;
}

function Page() {
  const [files, setFiles] = useState<File[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [code, setCode] = useState<string>("// Select or create a file");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // Handle real-time file updates
    socketInstance.on(
      "file-update",
      ({ fileId, content }: { fileId: string; content: string }) => {
        setFileContents((prev) => ({
          ...prev,
          [fileId]: content,
        }));

        if (currentFile && currentFile._id === fileId) {
          setCode(content);
        }
      }
    );

    socketInstance.on("new-file", (newFile: File) => {
      setFiles((prev) => [...prev, newFile]);
      setFileContents((prev) => ({
        ...prev,
        [newFile._id]: newFile.content,
      }));
    });

    socketInstance.on("delete-file", (fileId: string) => {
      setFiles((prev) => prev.filter((file) => file._id !== fileId));
      setFileContents((prev) => {
        const updated = { ...prev };
        delete updated[fileId];
        return updated;
      });
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [currentFile]);

useCopilotReadable({
description: "Current state of the workspace",
value: {
    files: files.map((f) => f.name),
    currentFile: currentFile?.name,
    currentCode: code,
},
});

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files");
      if (!response.ok) throw new Error("Failed to fetch files");
      const data: File[] = await response.json();

      // Store all file contents in state
      const contents: Record<string, string> = {};
      data.forEach((file) => {
        contents[file._id] = file.content;
      });

      setFiles(data);
      setFileContents(contents);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileSelect = async (file: File) => {
    setCurrentFile(file);

    // Use cached content if available
    if (fileContents[file._id]) {
      setCode(fileContents[file._id]);
    } else {
      try {
        const response = await fetch(`/api/files/${file._id}`);
        if (!response.ok) throw new Error("Failed to fetch file content");
        const data = await response.json();

        setFileContents((prev) => ({
          ...prev,
          [file._id]: data.content,
        }));
        setCode(data.content);
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    }
  };

  const handleCodeChange = async (value: string | undefined) => {
    if (!currentFile || !value) return;

    // Update local state immediately
    setCode(value);
    setFileContents((prev) => ({
      ...prev,
      [currentFile._id]: value,
    }));

    try {
      // Emit the change to other clients
      if (socket) {
        socket.emit("file-update", {
          fileId: currentFile._id,
          content: value,
        });
      }

      // Save to backend
      await fetch("/api/files", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentFile._id, content: value }),
      });
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };

  const processFiles = async ({ response }: { response: string }) => {
    try {
      const filePattern =
        /FILE:\s*([\w.-\/]+)\s*\nCODE:\s*([\s\S]*?)(?=\nFILE:|$)/g;
      let match;
      const newFiles: File[] = [];

      while ((match = filePattern.exec(response)) !== null) {
        const fileName = match[1].trim();
        const fileContent = match[2].trim();

        if (fileName && fileContent) {
          const res = await fetch("/api/files", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: fileName, content: fileContent }),
          });

          if (res.ok) {
            const savedFile: File = await res.json();
            newFiles.push(savedFile);

            // Update local state
            setFileContents((prev) => ({
              ...prev,
              [savedFile._id]: savedFile.content,
            }));

            // Emit new file to other clients
            if (socket) {
              socket.emit("new-file", savedFile);
            }
          }
        }
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      return `Files saved successfully: ${newFiles
        .map((f) => f.name)
        .join(", ")}`;
    } catch (error) {
      console.error("Error processing files:", error);
      return "Failed to save files.";
    }
  };

  useCopilotAction({
    name: "processFiles",
    description: "Processes AI-generated files and saves them to MongoDB",
    parameters: [{ name: "response", type: "string", required: true }],
    handler: processFiles,
  });

  return (
    <div className="h-screen flex bg-gray-100">
      <FileExplorer
        files={files}
        onFileSelect={handleFileSelect}
        currentFile={currentFile}
      />
      <div className="flex-1 flex flex-col p-4">
        <ScreenOne
          selectedFile={currentFile}
          code={code}
          onChange={handleCodeChange}
        />
      </div>
      <LivePreview
        files={files}
        currentFile={currentFile}
        code={code}
        onCodeChange={handleCodeChange}
      />
      <CopilotPopup
        instructions={`
    You are an AI-powered code generator. Use the following actions:

    1. @processFiles - To create new files, use this format:
    @processFiles(response: `
    FILE: filename.ext
    CODE:
    [file content]
    `)

    - Store new files in MongoDB using /api/files.
    - Then immediately fetch the files from database and show the files to FileExplorer
    - Correctly classify and separate different file types:
      - Static: HTML, CSS, JS
      - React: JSX, JS (React components)
    - For React projects:
      - Ensure the presence of index.js as the entry point.
      - Ensure there is a App.css file for styling
      - Ensure index.html contains a root <div id="root"></div>.
      - Separate components correctly (e.g., App.js, Header.jsx).
      - Include a package.json file with necessary React dependencies.
      - Ensure all React files follow ES6+ syntax and React best practices.

    2. @updateFile - To update existing files:
    @updateFile(filename: "file.ext", content: "new content")

    - Maintain compatibility with React environment.
    - Ensure any updated files do not break existing imports.
  `}
        labels={{
          title: "Project Assistant",
          initial: "What would you like to create?",
        }}
      />
    </div>
  );
}

export default Page;
```

::: info Code explanation

**1. State Management**:

- Tracks files (`files`), the currently selected file (`currentFile`), code in the selected file (`code`), real-time file contents (`fileContents`), and a socket connection (`socket`).

**2. Socket.IO**:

- Establishes a connection to a server using `Socket.IO`, and handling real-time file updates like file creation, updates, and deletions.
- Listens for events such as `file-update`, `new-file`, and `delete-file` to update the UI and propagate changes across users.

**3. Fetching Files**:

- On component mount, it fetches all files from an API and populates the state with the files and their contents.
- Upon selecting a file, the content is either retrieved from the cached state or fetched from the server.

**4. Code Changes**:

- When code in the Monaco Editor is updated, the new content is saved locally and sent to the server and other connected clients via the socket.
**5. File Processing by AI**:

- When AI generates code, the `processFiles` function parses the generated content, creates files on the backend, and updates the frontend. These files are stored in MongoDB and synchronized with the client via Socket.IO.
**6. CopilotKit Integration**:

- Uses the `useCopilotAction` hook to integrate AI-driven file generation and updating functionality.
- Provides instructions for creating and updating files via the `CopilotPopup`.
- Always give detailed instructions to the `CopilotPopup` .

**7. UI Components**:

- The UI includes components like `FileExplorer`, `ScreenOne`, and `LivePreview`, which displays files, allows editing, and provides a live preview of the code.
- The `CopilotPopup` acts as an assistant to guide the AI in generating or updating files.

:::

This setup creates a collaborative, real-time code editing environment with support for both static and React-based projects.

---

## Configuring CopilotKit for the Whole App

This is going to be the last step of building the application. Navigate to the <FontIcon icon="fa-brands fa-react"/>`layout.tsx` file and add this code:

```tsx :collapsed-lines title="layout.tsx"
import { CopilotKit } from "@copilotkit/react-core";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Replit Clone",
  description: "Copilotkit Replit Clone",
};

// Define props type for RootLayout
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CopilotKit runtimeUrl="/api/copilotkit">{children}</CopilotKit>
      </body>
    </html>
  );
}
```

Here’s what’s going on in this code:

This code defines a `RootLayout` component, which serves as the root layout for a Next.js application. Here's a brief explanation:

::: important Key Features

**1. CopilotKit Integration**:

- Wraps the entire application with the `CopilotKit` component from `@copilotkit/react-core`.
- Configures the `runtimeUrl` to `/api/copilotkit`, which is the endpoint for handling Copilot-related functionality.

**2. Global Styles**:

- Imports global CSS styles (<FontIcon icon="fa-brands fa-css3-alt"/>`globals.css`) and CopilotKit UI styles (`@copilotkit/react-ui/styles.css`).

**3. Metadata**:

- Sets metadata for the application (title: `"Replit Clone"`, description: `"Copilotkit Replit Clone"`).

**4. Layout Structure**:

- Uses the `html` and `body` tags to structure the document.
- Renders `children` (the rest of the application) inside the `CopilotKit` wrapper.

:::

::: note Some Important Notes

Designing and deploying a database can vary depending on the tools and requirements. For this project, I’ve chosen the simplest and most accessible approach.

:::

---

## Why CopilotKit?

CopilotKit is a powerful tool that converts natural language processing (NLP) queries into actionable backend code that runs on meta LLM. If you have an alternative that serves a similar purpose, feel free to use it. It effectively bridges the gap between natural language input and technical execution, making it an ideal choice for projects like this.

---

## Why GroqCloud?

I selected GroqCloud because it’s free and offers access to multiple large language models (LLMs) with a single API key. While alternatives like ChatGPT are available, they may require paid plans. GroqCloud’s versatility and affordability make it the perfect fit for this tutorial.

---

## Security Best Practices

Never expose your credentials publicly. Always store sensitive information like API keys in an <FontIcon icon="fas fa-file-lines"/>`.env` file to keep your project secure.

---

## Future Enhancements

While this tutorial focuses on setting up and working with React files, CopilotKit has a much broader range of capabilities that I will explain in the upcoming blog posts.

I aim to build at least 15 AI products in 2025. Support for static files is coming soon.

As promised in the previous tutorial, I’ve implemented the CopilotKit CRUD feature in this tutorial as well.

In my next tutorial, I will demonstrate how to build something more cool with CopilotKit to create a more dynamic and functional application.
