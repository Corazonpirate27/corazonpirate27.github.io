import { test, describe } from 'node:test';
import assert from 'node:assert';
import { sanitizeInput } from './sanitize.js';

describe('sanitizeInput', () => {
    test('should return plain text as is', () => {
        const input = 'Hello World';
        assert.strictEqual(sanitizeInput(input), 'Hello World');
    });

    test('should remove simple HTML tags', () => {
        const input = '<b>Hello</b> <i>World</i>';
        assert.strictEqual(sanitizeInput(input), 'Hello World');
    });

    test('should remove nested HTML tags', () => {
        const input = '<div><p>Nested <span>content</span></p></div>';
        assert.strictEqual(sanitizeInput(input), 'Nested content');
    });

    test('should remove tags with attributes', () => {
        const input = '<div class="test" id="main">Content</div>';
        assert.strictEqual(sanitizeInput(input), 'Content');
    });

    test('should handle script tags by removing tags but keeping content', () => {
        const input = '<script>alert("xss")</script>';
        assert.strictEqual(sanitizeInput(input), 'alert("xss")');
    });

    test('should handle empty string', () => {
        assert.strictEqual(sanitizeInput(''), '');
    });

    test('should return empty string for non-string input', () => {
        assert.strictEqual(sanitizeInput(null), '');
        assert.strictEqual(sanitizeInput(undefined), '');
        assert.strictEqual(sanitizeInput(123), '');
    });

    test('should handle edge case: mathematical symbols', () => {
        // NOTE: Current implementation might fail this if it thinks < 5 is a tag
        const input = 'if (x < 5 && y > 10)';
        const result = sanitizeInput(input);
        assert.strictEqual(result, 'if (x < 5 && y > 10)', 'Should not strip mathematical "less than" symbol');
    });

    test('should handle multiline input', () => {
        const input = '<div>\nLine 1\n</div>\nLine 2';
        assert.strictEqual(sanitizeInput(input), '\nLine 1\n\nLine 2');
    });
});
