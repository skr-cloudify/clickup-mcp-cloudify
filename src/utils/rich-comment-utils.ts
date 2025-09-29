/**
 * SPDX-FileCopyrightText: © 2025 Shiva Kumar <shivakumar@domain.com>
 * SPDX-License-Identifier: MIT
 *
 * Rich Comment Utilities
 *
 * Helper functions and examples for creating rich text comments in ClickUp
 * with support for formatting, emoji, links, lists, and @mentions.
 */

/**
 * Rich Comment Building Types
 */
export interface RichTextSegment {
  text: string;
  type?: "text" | "tag" | "emoticon";
  attributes?: {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    link?: string;
    "code-block"?: {
      "code-block": string;
    };
    list?: {
      list: "bullet" | "ordered" | "checked" | "unchecked";
    };
  };
  user?: {
    id: number;
  };
  emoticon?: {
    code: string;
  };
}

/**
 * Rich Comment Builder Class
 *
 * Provides a fluent API for building rich text comments
 */
export class RichCommentBuilder {
  private segments: RichTextSegment[] = [];

  /**
   * Add plain text
   */
  text(content: string): RichCommentBuilder {
    this.segments.push({ text: content });
    return this;
  }

  /**
   * Add bold text
   */
  bold(content: string): RichCommentBuilder {
    this.segments.push({
      text: content,
      attributes: { bold: true },
    });
    return this;
  }

  /**
   * Add italic text
   */
  italic(content: string): RichCommentBuilder {
    this.segments.push({
      text: content,
      attributes: { italic: true },
    });
    return this;
  }

  /**
   * Add inline code
   */
  code(content: string): RichCommentBuilder {
    this.segments.push({
      text: content,
      attributes: { code: true },
    });
    return this;
  }

  /**
   * Add a hyperlink
   */
  link(content: string, url: string): RichCommentBuilder {
    this.segments.push({
      text: content,
      attributes: { link: url },
    });
    return this;
  }

  /**
   * Add a line break
   */
  lineBreak(): RichCommentBuilder {
    this.segments.push({ text: "\n" });
    return this;
  }

  /**
   * Start a code block
   */
  codeBlock(content: string, language: string = "plain"): RichCommentBuilder {
    this.segments.push({ text: content });
    this.segments.push({
      text: "\n",
      attributes: {
        "code-block": {
          "code-block": language,
        },
      },
    });
    return this;
  }

  /**
   * Add a bulleted list item
   */
  bulletItem(content: string): RichCommentBuilder {
    this.segments.push({ text: content });
    this.segments.push({
      text: "\n",
      attributes: {
        list: { list: "bullet" },
      },
    });
    return this;
  }

  /**
   * Add a numbered list item
   */
  numberedItem(content: string): RichCommentBuilder {
    this.segments.push({ text: content });
    this.segments.push({
      text: "\n",
      attributes: {
        list: { list: "ordered" },
      },
    });
    return this;
  }

  /**
   * Add a checklist item (unchecked)
   */
  checklistItem(content: string, checked: boolean = false): RichCommentBuilder {
    this.segments.push({ text: content });
    this.segments.push({
      text: "\n",
      attributes: {
        list: { list: checked ? "checked" : "unchecked" },
      },
    });
    return this;
  }

  /**
   * Add an emoji
   */
  emoji(unicodeCode: string): RichCommentBuilder {
    this.segments.push({
      text: `U${unicodeCode.toUpperCase()}`,
      type: "emoticon",
      emoticon: { code: unicodeCode.toLowerCase() },
    });
    return this;
  }

  /**
   * Add a user mention (@mention)
   */
  mention(userId: number, displayText?: string): RichCommentBuilder {
    this.segments.push({
      text: displayText || `@user${userId}`,
      type: "tag",
      user: { id: userId },
    });
    return this;
  }

  /**
   * Build the rich comment array
   */
  build(): RichTextSegment[] {
    return [...this.segments];
  }

  /**
   * Clear all segments and start fresh
   */
  clear(): RichCommentBuilder {
    this.segments = [];
    return this;
  }
}

/**
 * Quick helper functions for common comment patterns
 */
export class RichCommentHelpers {
  /**
   * Create a simple formatted comment with bold title and description
   */
  static titleAndDescription(
    title: string,
    description: string
  ): RichTextSegment[] {
    return new RichCommentBuilder()
      .bold(title)
      .lineBreak()
      .text(description)
      .build();
  }

  /**
   * Create a code block comment
   */
  static codeBlock(
    code: string,
    language: string = "javascript"
  ): RichTextSegment[] {
    return new RichCommentBuilder().codeBlock(code, language).build();
  }

  /**
   * Create a task list comment
   */
  static taskList(
    tasks: Array<{ text: string; completed?: boolean }>
  ): RichTextSegment[] {
    const builder = new RichCommentBuilder();

    tasks.forEach((task) => {
      builder.checklistItem(task.text, task.completed || false);
    });

    return builder.build();
  }

  /**
   * Create a comment with @mentions
   */
  static withMentions(
    text: string,
    mentions: Array<{ userId: number; displayName?: string }>
  ): RichTextSegment[] {
    const builder = new RichCommentBuilder().text(text);

    mentions.forEach((mention) => {
      builder.text(" ").mention(mention.userId, mention.displayName);
    });

    return builder.build();
  }

  /**
   * Create a status update comment
   */
  static statusUpdate(
    status: string,
    details?: string,
    emoji?: string
  ): RichTextSegment[] {
    const builder = new RichCommentBuilder();

    if (emoji) {
      builder.emoji(emoji).text(" ");
    }

    builder.bold(`Status: ${status}`);

    if (details) {
      builder.lineBreak().text(details);
    }

    return builder.build();
  }
}

/**
 * Example rich comments for reference
 */
export const RICH_COMMENT_EXAMPLES = {
  // Simple formatted text
  basicFormatting: [
    { text: "This is " },
    { text: "bold text", attributes: { bold: true } },
    { text: " and this is " },
    { text: "italic text", attributes: { italic: true } },
    { text: " and " },
    { text: "inline code", attributes: { code: true } },
  ],

  // Code block
  codeBlock: [
    { text: "Here's a JavaScript function:" },
    { text: "\n" },
    { text: "function hello() {\n  console.log('Hello, World!');\n}" },
    {
      text: "\n",
      attributes: {
        "code-block": { "code-block": "javascript" },
      },
    },
  ],

  // Lists
  bulletList: [
    { text: "Todo items:" },
    { text: "\n" },
    { text: "First item" },
    { text: "\n", attributes: { list: { list: "bullet" } } },
    { text: "Second item" },
    { text: "\n", attributes: { list: { list: "bullet" } } },
    { text: "Third item" },
    { text: "\n", attributes: { list: { list: "bullet" } } },
  ],

  // Checklist
  checklist: [
    { text: "Task progress:" },
    { text: "\n" },
    { text: "Completed task" },
    { text: "\n", attributes: { list: { list: "checked" } } },
    { text: "Pending task" },
    { text: "\n", attributes: { list: { list: "unchecked" } } },
  ],

  // With emoji and mentions
  withEmojiAndMentions: [
    { text: "Great progress today! " },
    {
      text: "U0001F389",
      type: "emoticon",
      emoticon: { code: "1f389" },
    },
    { text: " Thanks to " },
    {
      text: "@john",
      type: "tag",
      user: { id: 12345 },
    },
    { text: " for the help!" },
  ],

  // Link
  withLink: [
    { text: "Check out the " },
    {
      text: "ClickUp API documentation",
      attributes: { link: "https://clickup.com/api" },
    },
    { text: " for more details." },
  ],
};
