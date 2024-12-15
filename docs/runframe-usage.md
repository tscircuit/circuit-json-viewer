# Using CircuitJsonPreview Directly

If you already have circuit JSON and just want to display it:

```tsx
import { CircuitJsonPreview } from "@tscircuit/runframe/preview"

const App = () => (
  <CircuitJsonPreview
    circuitJson={myCircuitJson}
    // Optional props
    showCodeTab={false}      // Show/hide the code editor tab
    showJsonTab={true}       // Show/hide the raw JSON viewer tab
    className="h-screen"     // Container className
    headerClassName="px-4"   // Header className
    isFullScreen={false}     // Toggle fullscreen mode
    onToggleFullScreen={() => void}  // Fullscreen toggle callback
  />
)
```

The CircuitJsonPreview component provides:

- PCB view with interactive component placement
- Schematic view
- 3D view
- Bill of Materials (BOM) table
- Circuit JSON viewer
- Error display

> Note: You should have tailwind installed in the parent project, this library
> works without installing tailwind but without the "css reset" things will look
> a bit off (e.g. you might see serif fonts), create an issue if that's
> cumbersome because we removed it to save 5kb
