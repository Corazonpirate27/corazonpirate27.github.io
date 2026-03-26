import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('Curriculum.jsx structure test', () => {
    const filePath = path.join(process.cwd(), 'src', 'pages', 'Curriculum.jsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // 1. Check for AI-Augmented Learning module
    assert.ok(content.includes("id: 'ai_augmented'"), "Missing ai_augmented course object.");
    assert.ok(content.includes("name: 'AI-Augmented Learning'"), "Missing AI-Augmented Learning course name.");

    // 2. Check for newly added items
    assert.ok(content.includes("https://docs.cursor.com/"), "Missing Cursor Docs link.");

    // 3. Check for UI/UX split layout rendering logic
    assert.ok(content.includes("Open Source Path"), "Missing Open Source Path rendering text.");
    assert.ok(content.includes("Premium / Audit Path"), "Missing Premium / Audit Path rendering text.");
    assert.ok(content.includes("grid grid-cols-2 gap-4"), "Missing grid layout.");
});