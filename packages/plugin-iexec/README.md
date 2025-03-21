# iExec Plugin for ElizaOS

A robust iExec Plugin for ElizaOS that provides some iExec functionality.

## Features

- create a protectedData thought the iExec Protocol

## Prerequisites

- NodeJS 18.0 or later
- ElizaOS installation

## Installation

```bash
npm install @elizaos-plugins/iexec
```

## Configuration

Add the adapter to your ElizaOS configuration:

```json
{
  "plugins": ["@elizaos-plugins/iexec"]
}
```

## Connection Options

The adapter is configured with optimal connection settings:

- Maximum pool size: 100 connections
- Minimum pool size: 5 connections
- Connection timeout: 10 seconds
- Socket timeout: 45 seconds
- Retry support for both reads and writes
- Compression enabled (zlib)

## Features in Detail

### Vector Search

The adapter automatically detects and enables vector search capabilities if your MongoDB instance supports it. This provides efficient similarity searches for:

- Memory retrieval
- Knowledge base searches
- Semantic similarity matching

If vector search is unavailable, the adapter automatically falls back to standard search methods.

### Caching

Built-in caching system with:

- 24-hour TTL by default
- Automatic cache invalidation
- Memory-efficient storage
- Cache hit/miss optimizations

### Memory Management

Comprehensive memory management features:

- CRUD operations for memories
- Vector-based similarity search
- Batch processing support
- Automatic uniqueness checking

### Knowledge Base

Robust knowledge base management:

- Support for shared and private knowledge
- Vector-based knowledge retrieval
- Metadata support
- Chunk management for large content

## Development

### Running Tests

The test suite uses Docker for running a test MongoDB instance:

```bash
cd src/__tests__
./run_tests.sh
```

This will:

1. Run the test suite
2. Clean up resources automatically

### Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request
