# API Documentation
# Martha - Sr Engineer Assistant System

## Overview

Martha's API design focuses on intelligent content processing and seamless integration with external systems. The core API centers around the Claude AI integration for advanced natural language processing.

## Claude AI Integration

### Core Processing Function

Martha leverages the `window.claude.complete` API for intelligent processing of field observations and task extraction.

#### Basic Usage

```javascript
const response = await window.claude.complete(prompt);
const processedData = JSON.parse(response);
```

#### Processing Workflow

1. **Content Analysis**: Analyze captured audio, video, or text
2. **Structure Extraction**: Extract title, priority, action items
3. **Context Enhancement**: Add metadata and relationships
4. **Validation**: Confidence scoring and fallback handling

### Prompt Engineering

#### Field Capture Processing

```javascript
const fieldCapturePrompt = `
I've captured a ${mediaType} for my field assistant system (Martha). 

This is a quick field capture where I'm describing work that needs to be done, 
an issue I've found, or an idea I want to remember.

Please analyze this content and create a structured entry:

1. Determine the TYPE of entry (sitevisit, inspection, incident, task, idea, etc.)
2. Extract a descriptive TITLE
3. Assess PRIORITY (P1=critical/safety, P2=high, P3=medium, P4=low, P5=idea)
4. Generate a SUMMARY (≤50 words)
5. Extract specific ACTION ITEMS mentioned
6. Identify any PEOPLE mentioned
7. Detect LOCATION references
8. Suggest DUE DATE if urgency is implied
9. Identify KEY TOPICS or equipment mentioned

Return JSON only:
{
  "title": "descriptive title based on content",
  "type": "sitevisit|meeting|audit|inspection|incident|task|idea|voice",
  "priority": "P1|P2|P3|P4|P5",
  "summary": "concise summary of what was captured",
  "actionables": ["specific action items mentioned"],
  "people": ["names mentioned"],
  "location": "location if mentioned",
  "topic": "main subject/equipment/area",
  "suggestedDueDate": "YYYY-MM-DD or null",
  "keyTopics": ["equipment", "safety", "maintenance", etc],
  "confidenceLevel": "high|medium|low"
}
`;
```

#### Entry Enhancement Processing

```javascript
const enhancementPrompt = `
Process this entry for Martha (Greg's field assistant system):

Type: ${entryData.type}
Title: ${entryData.title}
Summary: ${entryData.summary}
People: ${entryData.people}
Files: ${files.map(f => f.name).join(', ')}

Extract and enhance:
1. Concise summary (≤50 words)
2. Action items from the content
3. People mentioned
4. Key topics/themes
5. Suggested due date if urgent

Return JSON only:
{
  "summary": "enhanced summary",
  "actionables": ["action1", "action2"],
  "people": ["person1", "person2"],
  "keyTopics": ["topic1", "topic2"],
  "suggestedDueDate": "YYYY-MM-DD or null"
}
`;
```

### Error Handling

```javascript
try {
  if (window.claude && window.claude.complete) {
    const response = await window.claude.complete(prompt);
    const parsed = JSON.parse(response);
    return parsed;
  } else {
    console.log('Claude not available, using fallback processing');
    return fallbackProcessing(data);
  }
} catch (error) {
  console.error('Claude processing failed:', error);
  return fallbackProcessing(data);
}
```

## Data Schemas

### Entry Schema

```typescript
interface Entry {
  id: number;
  title: string;
  slug: string;
  type: 'sitevisit' | 'meeting' | 'audit' | 'inspection' | 'incident' | 'task' | 'idea' | 'voice' | 'report';
  status: 'open' | 'in-progress' | 'blocked' | 'closed' | 'recurring';
  priority: 'P1' | 'P2' | 'P3' | 'P4' | 'P5';
  date: string; // ISO-8601 format
  people: string[];
  summary: string; // ≤50 words
  actionables: string[];
  due?: string; // ISO-8601 format
  link: string;
  files?: string[];
  location?: string;
  keyTopics?: string[];
  quickCapture?: boolean;
  testMode?: boolean;
  created: string; // ISO-8601 format
}
```

### Slug Generation Schema

```typescript
interface SlugPattern {
  sitevisit: 'sitevisit_{location}_{yyyy_mm_dd}';
  meeting: 'meeting_{topic}_{yyyy_mm_dd_hhmm}';
  audit: 'audit_{location|topic}_{yyyy_mm_dd}';
  voice: 'voice_{topic}_{yyyy_mm_dd_hhmm}';
  incident: 'incident_{location}_{reference}';
  inspection: 'inspection_{topic}_{yyyy_mm_dd}';
  task: 'task_{topic}_{yyyy_mm_dd}';
  idea: 'idea_{topic}_{yyyy_mm_dd}';
  report: 'report_{topic}_{yyyy_mm_dd}';
}
```

## File Processing API

### Media Capture

```javascript
// Video Recording
const startVideoRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
    audio: true
  });
  
  const mediaRecorder = new MediaRecorder(stream);
  // ... recording logic
};

// Photo Capture
const capturePhoto = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  });
  
  // Canvas-based photo capture
  const canvas = document.createElement('canvas');
  // ... capture logic
};

// Audio Recording
const startAudioRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  // ... recording logic
};
```

### File Upload Processing

```javascript
const processUploadedFiles = (files) => {
  return files.map(file => ({
    name: file.name,
    type: file.type,
    size: file.size,
    icon: getFileIcon(file),
    processable: isProcessableType(file.type)
  }));
};

const getFileIcon = (file) => {
  const type = file.type;
  if (type.startsWith('image/')) return '🖼️';
  if (type.startsWith('audio/')) return '🎵';
  if (type.startsWith('video/')) return '🎥';
  if (type.includes('pdf')) return '📄';
  if (type.includes('document')) return '📝';
  if (type.includes('spreadsheet')) return '📊';
  return '📎';
};
```

## State Management API

### React Hooks Integration

```javascript
const useMartha = () => {
  const [entries, setEntries] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  
  const createEntry = async (entryData, files = []) => {
    setProcessing(true);
    try {
      const processedEntry = await orchestrateProcessing(entryData, files);
      setEntries(prev => [processedEntry, ...prev]);
      return processedEntry;
    } finally {
      setProcessing(false);
    }
  };
  
  const updateEntry = (id, updates) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  };
  
  return {
    entries,
    processing,
    activeView,
    setActiveView,
    createEntry,
    updateEntry
  };
};
```

### Priority Management

```javascript
const prioritySystem = {
  colors: {
    'P1': 'bg-red-500',    // Critical
    'P2': 'bg-orange-500', // High
    'P3': 'bg-yellow-500', // Medium
    'P4': 'bg-blue-500',   // Low
    'P5': 'bg-gray-500'    // Very Low
  },
  
  sort: (entries) => {
    const priorityOrder = ['P1', 'P2', 'P3', 'P4', 'P5'];
    return entries.sort((a, b) => {
      const aPriority = priorityOrder.indexOf(a.priority);
      const bPriority = priorityOrder.indexOf(b.priority);
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      // Secondary sort by due date
      if (a.due && b.due) {
        return new Date(a.due) - new Date(b.due);
      }
      
      return 0;
    });
  }
};
```

## External Integration APIs

### Google Drive Integration (Future)

```javascript
// Planned Google Drive MCP integration
const driveIntegration = {
  uploadFile: async (file, slug) => {
    // Upload to drive://{slug}/ folder
    return await window.mcp.googleDrive.upload(file, `Field-Ops/${slug}/`);
  },
  
  createManifest: async (entries) => {
    // Create/update manifest spreadsheet
    const manifestData = entries.map(entry => ([
      entry.slug,
      entry.date,
      entry.type,
      entry.summary,
      entry.link,
      entry.status,
      entry.people.join(', '),
      entry.due || ''
    ]));
    
    return await window.mcp.googleSheets.update('manifest', manifestData);
  }
};
```

### Webhook API Design (Future)

```javascript
// RESTful API endpoints for external integration
const apiEndpoints = {
  // Entry management
  'GET /api/entries': 'List all entries with filtering',
  'POST /api/entries': 'Create new entry',
  'GET /api/entries/{id}': 'Get specific entry',
  'PUT /api/entries/{id}': 'Update entry',
  'DELETE /api/entries/{id}': 'Delete entry',
  
  // Search and analytics
  'GET /api/search': 'Advanced search with filters',
  'GET /api/analytics/summary': 'Dashboard statistics',
  'GET /api/analytics/trends': 'Time-series analysis',
  
  // File management
  'POST /api/files/upload': 'Upload file with processing',
  'GET /api/files/{id}': 'Download file',
  
  // Webhook subscriptions
  'POST /api/webhooks': 'Register webhook endpoint',
  'GET /api/webhooks': 'List active webhooks',
  'DELETE /api/webhooks/{id}': 'Remove webhook'
};
```

## Performance Optimization

### Lazy Loading

```javascript
const useLazyEntries = (pageSize = 20) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newEntries = await fetchEntries(entries.length, pageSize);
      setEntries(prev => [...prev, ...newEntries]);
      setHasMore(newEntries.length === pageSize);
    } finally {
      setLoading(false);
    }
  }, [entries.length, pageSize, loading, hasMore]);
  
  return { entries, loading, hasMore, loadMore };
};
```

### Caching Strategy

```javascript
const cacheManager = {
  // In-memory cache for recent entries
  recentEntries: new Map(),
  
  // IndexedDB for offline storage
  persistentCache: {
    store: async (key, data) => {
      // Store in IndexedDB
    },
    retrieve: async (key) => {
      // Retrieve from IndexedDB
    }
  },
  
  // Cache invalidation
  invalidate: (pattern) => {
    // Clear matching cache entries
  }
};
```

## Security Considerations

### Data Sanitization

```javascript
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove scripts
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .trim();
};

const validateEntry = (entry) => {
  const required = ['title', 'type', 'priority'];
  const missing = required.filter(field => !entry[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  return {
    ...entry,
    title: sanitizeInput(entry.title),
    summary: sanitizeInput(entry.summary)
  };
};
```

### Access Control

```javascript
const permissions = {
  canRead: (user, entry) => {
    return user.role === 'admin' || 
           entry.people.includes(user.name) ||
           user.teams.some(team => entry.teams?.includes(team));
  },
  
  canEdit: (user, entry) => {
    return user.role === 'admin' || 
           entry.owner === user.id ||
           user.permissions.includes('edit_all_entries');
  },
  
  canDelete: (user, entry) => {
    return user.role === 'admin' || entry.owner === user.id;
  }
};
```

## Testing API

### Mock Data Generation

```javascript
const mockData = {
  generateEntry: (overrides = {}) => ({
    id: Date.now(),
    title: 'Test Entry',
    slug: 'test_entry_2025_07_16',
    type: 'task',
    status: 'open',
    priority: 'P3',
    date: new Date().toISOString().split('T')[0],
    people: ['Test User'],
    summary: 'Test summary for automated testing',
    actionables: ['Test action item'],
    link: 'drive://test_entry_2025_07_16/',
    created: new Date().toISOString(),
    ...overrides
  }),
  
  generateTestCapture: (mode) => ({
    video: {
      title: 'Equipment Issue',
      type: 'inspection',
      priority: 'P2',
      summary: 'Motor vibration detected during inspection'
    },
    photo: {
      title: 'Safety Concern',
      type: 'incident',
      priority: 'P1',
      summary: 'Potential hazard identified in work area'
    },
    audio: {
      title: 'Maintenance Notes',
      type: 'voice',
      priority: 'P3',
      summary: 'Routine maintenance observations'
    }
  })[mode]
};
```

---

## API Versioning

**Current Version**: v0.1  
**Breaking Changes**: None expected until v1.0  
**Deprecation Policy**: 6-month notice for breaking changes  

---

*This API documentation will evolve as Martha develops. Check the repository for the latest updates and examples.*