import { useState, useEffect } from 'react';
import { Terminal, Database, Code2, Play, Check, Copy, ArrowRight, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import './McpPage.css';

export default function McpPage() {
  const [copied, setCopied] = useState(false);
  const [selectedTool, setSelectedTool] = useState('list_products');
  const [toolParam, setToolParam] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    runSimulatedTool('list_products');
  }, []);

  const mcpServerCode = `// Ganga Makhana Custom MCP Server (Node.js)
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListResourcesRequestSchema, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({
  name: "ganga-makhana-catalog",
  version: "1.0.0",
}, {
  capabilities: {
    resources: {},
  },
});

const CATALOG_URL = "https://ganga-makhana.vercel.app/api/products.json";

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [{
      uri: "gangamakhana://catalog",
      name: "Ganga Makhana Product Catalog",
      mimeType: "application/json",
      description: "Complete list of Ganga Makhana roasted fox nut flavors and prices"
    }]
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "gangamakhana://catalog") {
    const response = await fetch(CATALOG_URL);
    const data = await response.text();
    return {
      contents: [{
        uri: request.params.uri,
        mimeType: "application/json",
        text: data
      }]
    };
  }
  throw new Error("Resource not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Ganga Makhana Catalog MCP Server running on Stdio!");`;

  const copyCode = () => {
    navigator.clipboard.writeText(mcpServerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tools = {
    list_products: {
      description: 'Lists all available roasted makhana products, flavors, and pricing.',
      params: null,
      execute: async () => {
        const response = await fetch('/api/products.json');
        const data = await response.json();
        return JSON.stringify({
          status: 200,
          resources: [
            {
              uri: 'gangamakhana://catalog',
              mimeType: 'application/json',
              products: data.map(p => ({
                id: p.id,
                name: p.name,
                price: `INR ${p.price}`,
                weight: p.weight,
                badges: p.badges
              }))
            }
          ]
        }, null, 2);
      }
    },
    get_product_details: {
      description: 'Retrieves full details of a specific flavor by ID (e.g. pudina-makhana).',
      params: 'id',
      defaultValue: 'pudina-makhana',
      execute: async (param) => {
        const id = param.trim() || 'pudina-makhana';
        const response = await fetch('/api/products.json');
        const data = await response.json();
        const product = data.find(p => p.id === id);
        
        if (!product) {
          return JSON.stringify({
            status: 404,
            error: `Product with ID '${id}' not found.`
          }, null, 2);
        }
        
        return JSON.stringify({
          status: 200,
          product
        }, null, 2);
      }
    },
    calculate_shipping: {
      description: 'Calculates shipping fees based on order cart subtotal.',
      params: 'subtotal',
      defaultValue: '1200',
      execute: async (param) => {
        const amt = parseFloat(param) || 1200;
        const shippingFee = amt > 999 ? 0 : 50;
        return JSON.stringify({
          status: 200,
          input: { subtotal: amt },
          shipping: shippingFee === 0 ? 'FREE' : `INR ${shippingFee}`,
          freeShippingThreshold: 'INR 999',
          total: amt + shippingFee
        }, null, 2);
      }
    }
  };

  const runSimulatedTool = (toolKey) => {
    setRunning(true);
    const tool = tools[toolKey];
    const paramVal = toolParam || tool.defaultValue || '';
    
    setTimeout(async () => {
      try {
        const res = await tool.execute(paramVal);
        setOutput(res);
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      }
      setRunning(false);
    }, 600);
  };

  const handleToolSelect = (key) => {
    setSelectedTool(key);
    setToolParam(tools[key].defaultValue || '');
    // Auto-run on select
    setRunning(true);
    setTimeout(async () => {
      try {
        const res = await tools[key].execute(tools[key].defaultValue || '');
        setOutput(res);
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      }
      setRunning(false);
    }, 400);
  };

  return (
    <div className="mcp-page">
      <SEO 
        title="Model Context Protocol (MCP) Portal" 
        description="Integrate Ganga Makhana product inventory directly with your local LLMs and AI coding assistants."
      />
      
      <div className="mcp-hero">
        <div className="container">
          <div className="mcp-hero-badge">
            <ShieldCheck size={16} />
            <span>Developer Center</span>
          </div>
          <h1 className="text-display">Model Context Protocol Integration</h1>
          <p className="mcp-subtitle text-body">
            Expose Ganga Makhana's catalog, metadata, and business operations to AI agents like Claude Desktop, Windsurf, or Cursor.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="mcp-grid">
          
          <div className="mcp-info-panel">
            <h2>Connect Ganga Makhana to Your AI</h2>
            <p>
              The Model Context Protocol (MCP) is an open standard that allows LLM applications to securely query and read context directly from external web resources.
            </p>
            
            <div className="mcp-resource-box card">
              <h3><Database size={20} /> Exposed Resources</h3>
              <p>You can call the static catalog endpoint directly in any client browser or AI tool integration:</p>
              <div className="api-link-chip">
                <span>GET</span>
                <code>/api/products.json</code>
                <a href="/api/products.json" target="_blank" rel="noreferrer" className="link-arrow">
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="mcp-setup-card card">
              <div className="card-header">
                <h3><Code2 size={20} /> Local Server Code</h3>
                <button className="copy-btn" onClick={copyCode}>
                  {copied ? <Check size={16} color="var(--color-primary)" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <p className="card-desc">Save this file as <code>server.js</code>, run <code>npm install @modelcontextprotocol/sdk</code>, and run with Node.</p>
              <pre className="code-block">
                <code>{mcpServerCode}</code>
              </pre>
            </div>
          </div>

          <div className="mcp-playground-panel">
            <div className="playground-card card">
              <div className="playground-header">
                <Terminal size={22} />
                <h3>MCP Tool Simulator</h3>
              </div>
              <p className="playground-desc">
                Simulate how an LLM agent executes catalog queries on our API endpoints through the MCP client:
              </p>
              
              <div className="tool-selector">
                {Object.keys(tools).map((key) => (
                  <button 
                    key={key} 
                    className={`tool-selector-btn ${selectedTool === key ? 'active' : ''}`}
                    onClick={() => handleToolSelect(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <div className="tool-info-box">
                <p className="tool-desc">
                  <strong>Description:</strong> {tools[selectedTool].description}
                </p>
                {tools[selectedTool].params && (
                  <div className="param-input-box">
                    <label>
                      <span>Argument ({tools[selectedTool].params}):</span>
                      <input 
                        type="text" 
                        value={toolParam} 
                        onChange={(e) => setToolParam(e.target.value)} 
                        placeholder={tools[selectedTool].defaultValue}
                      />
                    </label>
                  </div>
                )}
              </div>

              <button 
                className="btn-primary run-tool-btn" 
                onClick={() => runSimulatedTool(selectedTool)}
                disabled={running}
              >
                {running ? (
                  <span>Executing...</span>
                ) : (
                  <>
                    Run Tool <Play size={16} />
                  </>
                )}
              </button>

              <div className="output-box">
                <div className="output-header">
                  <span>RESPONSE OUTPUT (JSON)</span>
                  <span className={`status-dot ${running ? 'pulse' : 'ready'}`}></span>
                </div>
                <pre className="output-block">
                  <code>{output}</code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
