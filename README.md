# Martha - Sr Engineer Assistant System

> **Version 0.1 – 16 Jul 2025**
>
> *An AI-powered field assistant for senior engineers, designed to capture, organize, and intelligently process field operations, inspections, and maintenance activities.*

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Overview

Martha is a comprehensive field assistant system designed specifically for senior engineers working in industrial environments. It provides a single interface for capturing, organizing, and recalling every artifact of an engineering workflow – from site inspections and safety audits to equipment maintenance and team meetings.

### Key Features

🎥 **Quick Field Capture**
- Record video descriptions, take photos, or capture audio notes
- AI-powered processing extracts action items and priorities automatically
- Perfect for documenting equipment issues, safety concerns, or maintenance needs

📋 **Intelligent Task Management**
- Structured data entry following engineering best practices
- Priority-based sorting (P1-P5) with automatic urgency detection
- Smart slug generation for consistent file organization

🤖 **AI Processing Integration**
- Claude API integration for intelligent content analysis
- Automatic extraction of action items from voice descriptions
- Smart categorization and priority assessment

📊 **Comprehensive Tracking**
- Complete manifest system for all entries and activities
- File attachment support (photos, videos, documents, PDFs)
- Status tracking and completion management

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- Modern browser with camera/microphone support

### Installation

```bash
# Clone the repository
git clone https://github.com/karstegg/martha-assistant-system.git
cd martha-assistant-system

# Install dependencies
npm install

# Start development server
npm start
```

### Basic Usage

1. **Activate Martha**: Click "Activate Field Assistant" or use voice triggers
2. **Quick Capture**: Use the red video button for instant field documentation
3. **Detailed Entry**: Use the Capture tab for structured data entry
4. **Review & Manage**: Dashboard shows prioritized open items

## 📖 Documentation

- [Product Requirements Document](./docs/PRD.md) - Complete feature specifications
- [Technical Specification](./docs/SPECIFICATION.md) - Original system design document
- [API Documentation](./docs/API.md) - Claude integration and processing details
- [Development Guide](./docs/DEVELOPMENT.md) - Setup and contribution guidelines

## 🏗️ Architecture

### Core Components

- **React Frontend**: Modern, responsive interface optimized for field use
- **Claude AI Integration**: Intelligent processing via `window.claude.complete`
- **Local State Management**: React hooks for real-time data handling
- **File Processing Pipeline**: Support for multimedia content analysis

### Data Flow

1. **Capture**: Field activities recorded via multiple input methods
2. **Process**: AI analysis extracts structured data and action items
3. **Store**: Organized in manifest with consistent slug-based naming
4. **Retrieve**: Smart search and priority-based presentation

## 🎯 Use Cases

### Field Engineering
- Document equipment inspections with photos and voice notes
- Record safety incidents with automatic priority assessment
- Capture maintenance observations during routine rounds

### Project Management
- Track action items from site meetings
- Monitor compliance audit findings
- Coordinate vendor interactions and follow-ups

### Knowledge Management
- Build searchable repository of field activities
- Maintain equipment history and maintenance schedules
- Document lessons learned and best practices

## 🔧 Configuration

### Environment Variables

```bash
# .env.local
REACT_APP_CLAUDE_API_ENABLED=true
REACT_APP_DRIVE_INTEGRATION=true
REACT_APP_MAX_FILE_SIZE=50MB
```

### Claude Integration

Martha integrates with Claude AI for intelligent processing. The system gracefully degrades when AI processing is unavailable, ensuring core functionality remains accessible.

## 📱 Mobile Support

Martha is designed as a Progressive Web App (PWA) optimized for field use:

- Responsive design works on tablets and smartphones
- Camera/microphone integration for field capture
- Offline capability for remote locations
- Touch-friendly interface works with work gloves

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs via [GitHub Issues](https://github.com/karstegg/martha-assistant-system/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/karstegg/martha-assistant-system/discussions)

## 🗺️ Roadmap

### Version 0.2 (Planned)
- [ ] Real Google Drive integration via MCP
- [ ] Advanced audio transcription
- [ ] OCR for equipment photos
- [ ] Team collaboration features

### Version 0.3 (Future)
- [ ] Workflow automation
- [ ] Analytics dashboard
- [ ] Equipment database integration
- [ ] Mobile app (native)

---

**Martha** - Making field engineering smarter, one capture at a time. 🏗️🤖