# Development Guide
# Martha - Sr Engineer Assistant System

## Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Version 8 or higher (comes with Node.js)
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge
- **Code Editor**: VS Code recommended with suggested extensions

### VS Code Extensions (Recommended)

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/karstegg/martha-assistant-system.git
cd martha-assistant-system

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

### Environment Configuration

Create a `.env.local` file in the project root:

```bash
# Development environment variables
REACT_APP_ENVIRONMENT=development
REACT_APP_CLAUDE_API_ENABLED=true
REACT_APP_DEBUG_MODE=true
REACT_APP_MAX_FILE_SIZE=50000000
REACT_APP_SUPPORTED_FORMATS=image/*,audio/*,video/*,.pdf,.doc,.docx,.txt,.xlsx,.xls

# Feature flags
REACT_APP_QUICK_CAPTURE_ENABLED=true
REACT_APP_OFFLINE_MODE_ENABLED=true
REACT_APP_ANALYTICS_ENABLED=false
```

## Project Structure

```
martha-assistant-system/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── index.html            # Entry point
│   └── icons/                # App icons
├── src/
│   ├── components/           # Reusable components
│   │   ├── QuickCapture/     # Quick capture modal
│   │   ├── Dashboard/        # Dashboard views
│   │   └── TaskManagement/   # Task-related components
│   ├── hooks/                # Custom React hooks
│   │   ├── useMartha.js      # Main Martha hook
│   │   ├── useQuickCapture.js # Quick capture logic
│   │   └── useFileUpload.js  # File handling
│   ├── services/             # External services
│   │   ├── claudeService.js  # Claude AI integration
│   │   ├── fileService.js    # File processing
│   │   └── storageService.js # Local storage
│   ├── utils/                # Utility functions
│   │   ├── slugGenerator.js  # Slug generation
│   │   ├── dateUtils.js      # Date formatting
│   │   └── validators.js     # Input validation
│   ├── types/                # TypeScript definitions
│   ├── Martha.jsx            # Main component
│   ├── index.js              # App entry point
│   └── index.css             # Global styles
├── docs/                     # Documentation
├── tests/                    # Test files
└── package.json              # Project configuration
```

## Development Workflow

### Code Style and Formatting

The project uses Prettier and ESLint for consistent code formatting:

```bash
# Check code style
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format
```

### Git Workflow

1. **Feature Development**:
   ```bash
   git checkout -b feature/your-feature-name
   # Make changes
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

2. **Commit Message Convention**:
   ```
   type(scope): description
   
   Types:
   - feat: New feature
   - fix: Bug fix
   - docs: Documentation changes
   - style: Code style changes
   - refactor: Code refactoring
   - test: Test additions/changes
   - chore: Maintenance tasks
   ```

3. **Pull Request Process**:
   - Create descriptive PR title and description
   - Ensure all tests pass
   - Request review from team members
   - Address feedback
   - Merge after approval

### Testing Strategy

#### Unit Tests

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

#### Test Structure

```javascript
// src/components/__tests__/Martha.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Martha from '../Martha';

describe('Martha Component', () => {
  test('renders activation screen initially', () => {
    render(<Martha />);
    expect(screen.getByText('Martha')).toBeInTheDocument();
    expect(screen.getByText('Activate Field Assistant')).toBeInTheDocument();
  });

  test('activates successfully', () => {
    render(<Martha />);
    fireEvent.click(screen.getByText('Activate Field Assistant'));
    expect(screen.getByText('Field Assistant Active')).toBeInTheDocument();
  });
});
```

#### Integration Tests

```javascript
// src/services/__tests__/claudeService.test.js
import { processFieldCapture } from '../claudeService';

describe('Claude Service', () => {
  test('processes field capture successfully', async () => {
    const mockCapture = {
      type: 'video',
      content: 'Test equipment issue description'
    };

    const result = await processFieldCapture(mockCapture);
    
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('priority');
    expect(result).toHaveProperty('actionables');
  });
});
```

### Component Development

#### Component Guidelines

1. **Use Functional Components** with hooks
2. **PropTypes or TypeScript** for type checking
3. **Responsive Design** with Tailwind CSS
4. **Accessibility** with proper ARIA labels
5. **Performance** with React.memo when appropriate

#### Example Component

```jsx
// src/components/TaskCard/TaskCard.jsx
import React, { memo } from 'react';
import { Clock, Users, AlertTriangle } from 'lucide-react';

const TaskCard = memo(({ task, onStatusChange, onEdit }) => {
  const priorityColors = {
    'P1': 'bg-red-500',
    'P2': 'bg-orange-500',
    'P3': 'bg-yellow-500',
    'P4': 'bg-blue-500',
    'P5': 'bg-gray-500'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className={`w-6 h-4 ${priorityColors[task.priority]} rounded text-white text-xs flex items-center justify-center font-bold`}>
            {task.priority}
          </span>
          <h3 className="font-medium text-gray-800">{task.title}</h3>
        </div>
        
        <button
          onClick={() => onEdit(task.id)}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Edit task"
        >
          ✏️
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{task.summary}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          {task.due && (
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Due: {task.due}</span>
            </span>
          )}
          
          {task.people.length > 0 && (
            <span className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{task.people.length} people</span>
            </span>
          )}
        </div>
        
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="text-xs border rounded px-2 py-1"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;
```

### Service Development

#### Claude Service

```javascript
// src/services/claudeService.js
class ClaudeService {
  constructor() {
    this.isAvailable = typeof window !== 'undefined' && window.claude;
  }

  async processFieldCapture(captureData) {
    if (!this.isAvailable) {
      return this.fallbackProcessing(captureData);
    }

    try {
      const prompt = this.buildFieldCapturePrompt(captureData);
      const response = await window.claude.complete(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Claude processing failed:', error);
      return this.fallbackProcessing(captureData);
    }
  }

  buildFieldCapturePrompt(data) {
    return `
      Analyze this field capture and extract structured information:
      
      Type: ${data.type}
      Content: ${data.content}
      Context: ${data.context || 'Field engineering work'}
      
      Return JSON with title, priority, summary, actionables, etc.
    `;
  }

  fallbackProcessing(data) {
    return {
      title: `${data.type} capture - ${new Date().toLocaleTimeString()}`,
      type: data.type,
      priority: 'P3',
      summary: 'Manual review required',
      actionables: ['Review captured content'],
      confidenceLevel: 'low'
    };
  }
}

export default new ClaudeService();
```

#### File Service

```javascript
// src/services/fileService.js
class FileService {
  constructor() {
    this.maxFileSize = parseInt(process.env.REACT_APP_MAX_FILE_SIZE) || 50000000;
    this.supportedFormats = process.env.REACT_APP_SUPPORTED_FORMATS?.split(',') || [];
  }

  validateFile(file) {
    const errors = [];

    if (file.size > this.maxFileSize) {
      errors.push(`File size exceeds ${this.maxFileSize / 1000000}MB limit`);
    }

    if (!this.isFormatSupported(file.type)) {
      errors.push(`File format ${file.type} not supported`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  isFormatSupported(mimeType) {
    return this.supportedFormats.some(format => {
      if (format.includes('*')) {
        const baseType = format.split('/')[0];
        return mimeType.startsWith(baseType);
      }
      return mimeType === format;
    });
  }

  async processFile(file) {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    return {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      icon: this.getFileIcon(file.type),
      processable: this.isProcessable(file.type)
    };
  }

  getFileIcon(mimeType) {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.startsWith('audio/')) return '🎵';
    if (mimeType.startsWith('video/')) return '🎥';
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('document')) return '📝';
    if (mimeType.includes('spreadsheet')) return '📊';
    return '📎';
  }

  isProcessable(mimeType) {
    const processableTypes = [
      'audio/',
      'video/',
      'application/pdf',
      'text/'
    ];
    
    return processableTypes.some(type => mimeType.startsWith(type));
  }
}

export default new FileService();
```

### Custom Hooks

#### useMartha Hook

```javascript
// src/hooks/useMartha.js
import { useState, useCallback, useRef } from 'react';
import claudeService from '../services/claudeService';
import fileService from '../services/fileService';
import { generateSlug } from '../utils/slugGenerator';

export const useMartha = () => {
  const [entries, setEntries] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const processingRef = useRef(false);

  const createEntry = useCallback(async (entryData, files = []) => {
    if (processingRef.current) return;
    
    processingRef.current = true;
    setProcessing(true);
    setError(null);

    try {
      // Validate files
      const processedFiles = await Promise.all(
        files.map(file => fileService.processFile(file))
      );

      // Process with Claude
      const enhancedData = await claudeService.processFieldCapture({
        ...entryData,
        files: processedFiles
      });

      // Generate entry
      const slug = generateSlug(
        enhancedData.type,
        enhancedData.location,
        enhancedData.topic,
        new Date()
      );

      const entry = {
        id: Date.now(),
        ...entryData,
        ...enhancedData,
        slug,
        date: new Date().toISOString().split('T')[0],
        link: `drive://${slug}/`,
        files: processedFiles.map(f => f.name),
        created: new Date().toISOString()
      };

      setEntries(prev => [entry, ...prev]);
      return entry;

    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setProcessing(false);
      processingRef.current = false;
    }
  }, []);

  const updateEntry = useCallback((id, updates) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  }, []);

  const deleteEntry = useCallback((id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  }, []);

  const getOpenItems = useCallback(() => {
    const priorityOrder = ['P1', 'P2', 'P3', 'P4', 'P5'];
    return entries
      .filter(item => ['open', 'in-progress'].includes(item.status))
      .sort((a, b) => {
        const aPriority = priorityOrder.indexOf(a.priority);
        const bPriority = priorityOrder.indexOf(b.priority);
        
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        
        if (a.due && b.due) {
          return new Date(a.due) - new Date(b.due);
        }
        
        return 0;
      });
  }, [entries]);

  return {
    entries,
    processing,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
    getOpenItems
  };
};
```

## Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Code Splitting

```javascript
// Lazy load heavy components
const QuickCaptureModal = React.lazy(() => import('./components/QuickCaptureModal'));
const AnalyticsDashboard = React.lazy(() => import('./components/AnalyticsDashboard'));

// Usage with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <QuickCaptureModal />
</Suspense>
```

### Memory Management

```javascript
// Cleanup effects
useEffect(() => {
  const cleanup = setupEventListeners();
  return cleanup;
}, []);

// Debounced search
const debouncedSearch = useMemo(
  () => debounce(performSearch, 300),
  []
);

// Memoized calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(props.data);
}, [props.data]);
```

## Debugging

### Debug Configuration

```javascript
// src/utils/debug.js
const DEBUG = process.env.REACT_APP_DEBUG_MODE === 'true';

export const debugLog = (category, message, data) => {
  if (!DEBUG) return;
  
  console.group(`🔍 [${category}] ${message}`);
  if (data) console.log(data);
  console.trace();
  console.groupEnd();
};

export const debugError = (category, error, context) => {
  console.group(`🚨 [${category}] Error`);
  console.error(error);
  if (context) console.log('Context:', context);
  console.groupEnd();
};
```

### Performance Monitoring

```javascript
// src/utils/performance.js
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    try {
      const result = await fn(...args);
      const end = performance.now();
      console.log(`⏱️ ${name} took ${end - start}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.log(`❌ ${name} failed after ${end - start}ms`);
      throw error;
    }
  };
};
```

## Deployment

### Build Process

```bash
# Production build
npm run build

# Test production build locally
npm install -g serve
serve -s build -p 3000
```

### Environment Variables

```bash
# .env.production
REACT_APP_ENVIRONMENT=production
REACT_APP_CLAUDE_API_ENABLED=true
REACT_APP_DEBUG_MODE=false
REACT_APP_ANALYTICS_ENABLED=true
REACT_APP_SENTRY_DSN=your_sentry_dsn
```

### PWA Configuration

```javascript
// public/manifest.json
{
  "short_name": "Martha",
  "name": "Martha Field Assistant",
  "icons": [
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#2563eb",
  "background_color": "#ffffff",
  "orientation": "portrait-primary"
}
```

## Troubleshooting

### Common Issues

1. **Camera/Microphone Access Denied**
   - Check browser permissions
   - Use HTTPS in production
   - Test on different browsers

2. **Claude API Not Available**
   - Check `window.claude` availability
   - Verify artifact environment
   - Test fallback processing

3. **File Upload Issues**
   - Verify file size limits
   - Check supported formats
   - Test with different file types

4. **Performance Issues**
   - Use React DevTools Profiler
   - Check for memory leaks
   - Optimize re-renders

### Debug Commands

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Reset local storage
# In browser console:
localStorage.clear();
sessionStorage.clear();

# Check bundle size
npm run build
ls -la build/static/js/
```

---

## Contributing Guidelines

1. **Fork and Clone**: Fork the repository and clone your fork
2. **Create Branch**: Create a feature branch for your changes
3. **Follow Standards**: Use established coding standards and conventions
4. **Write Tests**: Include tests for new functionality
5. **Update Docs**: Update documentation for API changes
6. **Submit PR**: Create a pull request with detailed description

## Resources

- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Claude AI Documentation](https://docs.anthropic.com/)
- [Testing Library](https://testing-library.com/docs/)
- [PWA Guide](https://web.dev/progressive-web-apps/)

---

*Happy coding! 🚀*