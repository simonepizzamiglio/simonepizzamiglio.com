---
title: Takeaways from AI Developer Setup Workshop
description: Key insights and practical notes from Steve Kinney's AI Developer Setup workshop
date: 2025-07-31
---

Over the past few weeks, I've been experimenting with AI development tools like Cursor, Claude Code, Roo Code, opencode and others. While online tutorials and documentation are abundant in the rapidly evolving AI space, they often lack practical insights into real-world usage patterns, developer experiences, and common pain points.

In contrast, I think workshops provide valuable hands-on experience and direct insights from practitioners who share their actual workflows, preferences, and challenges with these tools.

That's why I attended [Steve Kinney's AI Developer Setup](https://frontendmasters.com/workshops/ai-dev-setup/) workshop remotely last week.

In this article, I want to share my takeaways from that workshop.

## Key Terminology

The following definitions provide context for understanding AI development tools.

### Large Language Model (LLM)

An LLM, or Large Language Model, is a type of artificial intelligence designed to understand, process, and generate human-like text by learning from vast amounts of data. It uses deep learning, particularly transformer neural networks, to analyze patterns in language and produce contextually relevant responses, translations, summaries, or creative writing.

### Tokens

A token is the smallest unit of text (or data) that an AI model processes. Tokens can represent individual characters, words, subwords, punctuation marks, or even entire phrases depending on the model’s configuration and tokenization method. The process of breaking down text into tokens is called tokenization, which converts human language into units that AI can numerically represent and analyze.

### Context Window

A context window refers to the maximum amount of text, measured in tokens, that a large language model (LLM) can process at one time. It acts like the model's short-term memory, determining how much information it can consider when generating responses. Larger context windows enable more comprehensive understanding but increase computational costs.

### Model Context Protocol (MCP)

The Model Context Protocol (MCP) is an open protocol that provides a standardized way for LLMs to connect and integrate with external data sources, tools, and services. Think of it like APIs for LLMs.
MCP allows AI models to pull information, update records, send messages, run commands, and carry out complex actions dynamically with a standardized, secure, and scalable method that does not depend on custom integration per service.

### Agents and Subagents

**Agents** are autonomous software systems that perceive their environment, make decisions, and take actions to achieve specific objectives. In AI development contexts, agents can range from simple rule-based systems to complex AI-powered assistants capable of multi-step reasoning and task execution.

**Subagents** operate within hierarchical agent systems, where a primary agent delegates specialized tasks to subordinate agents. This architecture enables:

- **Specialization**: Each subagent focuses on specific domains or functions
- **Scalability**: Complex workflows can be distributed across multiple specialized components  
- **Modularity**: Individual subagents can be updated or replaced without affecting the entire system

Example subagent roles in development workflows:

- Code review and quality assurance
- Testing strategy and test case generation
- Documentation and API specification
- Performance optimization and monitoring

## Key Takeaways

### Current State of AI Development

- AI-assisted development is still maturing, with best practices continuing to evolve
- Lots of AI tools and hype exist, but there's a lack of best practices to get the most out of them
- Writing software has always been and remains about using human language to get a computer to do what you want
- Strategic thinking and system design remain the most challenging aspects of development

### LLM Strengths and Limitations

**LLMs excel at:**

- Quick code generation
- Following explicit, well-defined instructions
- Pattern recognition and syntax adherence

**LLMs struggle with:**

- Complex contextual understanding
- High-level architectural decisions
- Long-term project vision and trade-offs

### Optimization Strategies

- **Planning over power**: A clear implementation plan outweighs using the most advanced model - the less the model has to guess, the more accurate it tends to be
- **Task-specific model selection**: For example, use Sonnet for code generation, Opus/Gemini for planning to optimize token usage
- **Context management**: Understand and optimize context window usage to improve accuracy and reduce tokens usage

### Development Best Practices

- **Code hygiene**: Keep your codebase tidy and documentation up-to-date, remove dead code and outdated examples that can confuse models
- **Documentation**: Maintain clear project documentation (CLAUDE.md, .cursorrules, ESLint configurations)
- **Ask AI questions**: LLMs are often better at explaining code than writing it

### Agent Architecture

Subagents provide specialized capabilities in development workflows, here are a few examples of agents:

- **Junior engineer**: Asks questions to clarify details
- **Architect**: Reviews implementation plans and provides feedback
- **Product manager**: Defines a set of requirements
- **Testing strategist**: Analyzes the implementation plan and suggests test cases

### Evolving Engineering Role

The engineering role is shifting toward:

- Problem definition and requirements analysis
- Solution validation and architecture guidance  
- Tool orchestration and system integration
- Quality assurance and performance optimization

## Resources

### Tools and Platforms

- [Cursor directory](https://cursor.directory/) - Community examples for Cursor rules
- [Repomix](https://repomix.com/) - Tool for preparing repository content for AI analysis
- [Crystal](https://github.com/stravu/crystal) - Git worktree management for Claude Code
- [Context7](https://context7.com/) - Library documentation for LLMs and AI code editors
- [Firecrawl](https://www.firecrawl.dev/) - Web scraping for AI applications
- [NotebookLM](https://notebooklm.google.com/) - AI-powered research and note-taking

### Documentation and Learning

- [Extended Thinking Mode (Anthropic)](https://www.anthropic.com/news/visible-extended-thinking) - Claude's thinking capabilities
- [Model Context Protocol Overview](https://modelcontextprotocol.io/overview) - MCP specification and implementation
- [Claude Code Best Practices](https://youtu.be/gv0WHhKelSE?si=eliQaxnhuQdBOY-Q) - Anthropic engineer's talk sharing Claude Code best practices

### Community Resources

- [Awesome Claude Prompts](https://github.com/langgptai/awesome-claude-prompts) - Curated prompt collection
- [Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code) - Claude Code resources and examples
- [Awesome Cursor Rules](https://github.com/PatrickJS/awesome-cursorrules) - Cursor configuration examples
- [Claude Code Subagents](https://github.com/augmnt/agents) - Specialized agent collection
