import { useState, useCallback } from "react"
import { CircuitJsonPreview } from "@tscircuit/runframe/preview"

function App() {
  const [circuitJson, setCircuitJson] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const processFile = useCallback(
    async (content: string | object) => {
      setError(null)
      try {
        const jsonContent =
          typeof content === "string" ? JSON.parse(content) : content
        setCircuitJson(jsonContent)
      } catch (err) {
        console.error("Processing error:", err)
        setError("Failed to parse Circuit JSON file. Please check the format.")
      }
    },
    [setCircuitJson, setError],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      Array.from(e.dataTransfer.files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => processFile(e.target?.result as string)
        reader.readAsText(file)
      })
    },
    [processFile],
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const content = e.clipboardData.getData("text")
      if (content) processFile(content)
    },
    [processFile],
  )

  return (
    <div
      className="min-h-screen bg-gray-900 text-white p-4"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={handlePaste}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: we need this for drag and drop
      tabIndex={0}
    >
      {circuitJson ? (
        <div>
          <button
            onClick={() => {
              setCircuitJson(null)
              setError(null)
            }}
            className="mb-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
          >
            Upload Different File
          </button>
          <CircuitJsonPreview
            circuitJson={circuitJson}
            showCodeTab={false}
            showJsonTab={true}
            className="h-screen"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center max-w-2xl w-full">
            <h1 className="text-3xl font-bold mb-4">Circuit JSON Viewer</h1>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-300">
                {error}
              </div>
            )}

            <p className="text-gray-400 mb-2">
              Drag and drop a Circuit JSON file here
            </p>
            <p className="text-gray-400">
              or paste Circuit JSON content with Ctrl/CMD+V
            </p>
          </div>

          <button
            onClick={async () => {
              try {
                const response = await fetch("/example.json")
                const exampleJson = await response.json()
                processFile(exampleJson)
              } catch (err) {
                setError("Failed to load example file")
              }
            }}
            className="mt-2 text-blue-400 hover:text-blue-300 underline"
          >
            or open an example
          </button>

          <div className="text-gray-400 text-sm mt-8">
            Circuit JSON Viewer created by{" "}
            <a
              className="underline hover:text-blue-400"
              href="https://github.com/tscircuit/tscircuit"
            >
              tscircuit
            </a>
            .
          </div>
          <a className="mt-4" href="https://github.com/tscircuit/tscircuit">
            <img
              src="https://img.shields.io/github/stars/tscircuit/tscircuit?style=social"
              alt="GitHub stars"
            />
          </a>
        </div>
      )}
    </div>
  )
}

export default App
