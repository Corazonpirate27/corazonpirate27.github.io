import React, { useEffect, useMemo, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { BookOpen, Boxes, Code2, Copy, FileCode2, Folder, Loader2, Play, RotateCcw, SplitSquareVertical, Terminal, Trash2 } from 'lucide-react';

const languageLabs = {
    javascript: {
        label: 'JavaScript',
        extension: 'js',
        monaco: 'javascript',
        runnable: true,
        runnerId: 102,
        piston: 'javascript',
        runnerName: 'Browser JS engine',
        libraries: ['DOM', 'Fetch', 'Math', 'Date', 'Array', 'JSON'],
        files: ['main.js', 'notes.md'],
        code: `const students = ['Asha', 'Milan', 'Nora'];

const scores = students.map((name, index) => ({
  name,
  score: 82 + index * 6
}));

for (const student of scores) {
  console.log(\`\${student.name}: \${student.score}%\`);
}

console.log('Average:', scores.reduce((sum, item) => sum + item.score, 0) / scores.length);
`
    },
    python: {
        label: 'Python',
        extension: 'py',
        monaco: 'python',
        runnable: true,
        runnerId: 109,
        piston: 'python',
        runnerName: 'Python 3',
        libraries: ['math', 'statistics', 'random', 'json', 'datetime', 'collections'],
        files: ['main.py', 'requirements.txt'],
        code: `from statistics import mean

scores = {
    "Asha": 88,
    "Milan": 94,
    "Nora": 91,
}

for name, score in scores.items():
    print(f"{name}: {score}%")

print("Average:", mean(scores.values()))
`
    },
    java: {
        label: 'Java',
        extension: 'java',
        monaco: 'java',
        runnable: true,
        runnerId: 91,
        piston: 'java',
        runnerName: 'Java (JDK 15)',
        libraries: ['java.util', 'java.io', 'java.time', 'java.math', 'Collections', 'Streams'],
        files: ['Main.java', 'README.md'],
        code: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> scores = List.of(88, 94, 91);
        double average = scores.stream()
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0);

        System.out.println("Scores: " + scores);
        System.out.println("Average: " + average);
    }
}
`
    },
    c: {
        label: 'C',
        extension: 'c',
        monaco: 'c',
        runnable: true,
        runnerId: 103,
        piston: 'c',
        runnerName: 'GCC',
        libraries: ['stdio.h', 'stdlib.h', 'string.h', 'math.h', 'ctype.h', 'time.h'],
        files: ['main.c', 'Makefile'],
        code: `#include <stdio.h>

int main(void) {
    int scores[] = {88, 94, 91};
    int total = 0;
    int count = sizeof(scores) / sizeof(scores[0]);

    for (int i = 0; i < count; i++) {
        total += scores[i];
        printf("Score %d: %d%%\\n", i + 1, scores[i]);
    }

    printf("Average: %.2f\\n", (double) total / count);
    return 0;
}
`
    },
    cpp: {
        label: 'C++',
        extension: 'cpp',
        monaco: 'cpp',
        runnable: true,
        runnerId: 105,
        piston: 'c++',
        runnerName: 'G++',
        libraries: ['iostream', 'vector', 'algorithm', 'string', 'map', 'numeric'],
        files: ['main.cpp', 'CMakeLists.txt'],
        code: `#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> scores {88, 94, 91};
    int total = std::accumulate(scores.begin(), scores.end(), 0);

    for (int score : scores) {
        std::cout << score << "%\\n";
    }

    std::cout << "Average: " << total / static_cast<double>(scores.size()) << "\\n";
    return 0;
}
`
    },
    html: {
        label: 'HTML/CSS',
        extension: 'html',
        monaco: 'html',
        runnable: true,
        runnerName: 'Browser preview',
        libraries: ['HTML', 'CSS', 'Forms', 'Grid', 'Flexbox', 'A11y'],
        files: ['index.html', 'style.css'],
        code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Student Card</title>
    <style>
      body { font-family: system-ui; margin: 0; min-height: 100vh; display: grid; place-items: center; background: #ecfeff; }
      article { width: min(420px, 90vw); border: 1px solid #99f6e4; border-radius: 12px; padding: 24px; background: white; }
      h1 { margin: 0 0 8px; color: #0f172a; }
      p { color: #475569; line-height: 1.6; }
      button { border: 0; border-radius: 8px; background: #10b981; color: white; padding: 12px 16px; font-weight: 700; }
    </style>
  </head>
  <body>
    <article>
      <h1>Build, test, learn.</h1>
      <p>Edit this page and run it to preview your work.</p>
      <button>Start lab</button>
    </article>
  </body>
</html>
`
    },
    sql: {
        label: 'SQL',
        extension: 'sql',
        monaco: 'sql',
        runnable: true,
        runnerId: 82,
        piston: 'sqlite3',
        runnerName: 'SQLite',
        libraries: ['SELECT', 'JOIN', 'GROUP BY', 'ORDER BY', 'COUNT', 'AVG'],
        files: ['queries.sql', 'schema.sql'],
        code: `CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT,
  score INTEGER
);

INSERT INTO students VALUES
  (1, 'Asha', 88),
  (2, 'Milan', 94),
  (3, 'Nora', 91);

SELECT name, score
FROM students
WHERE score >= 90
ORDER BY score DESC;
`
    }
};

const JUDGE0_ENDPOINT = 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true';
const PISTON_ENDPOINT = 'https://emkc.org/api/v2/piston/execute';
const JS_TIMEOUT_MS = 5000;
const CODE_STORAGE_KEY = 'root_playground_code_v1';
const LANG_STORAGE_KEY = 'root_playground_lang_v1';

// Saved student code merged over the default starter snippets.
const loadInitialCode = () => {
    const defaults = Object.fromEntries(Object.entries(languageLabs).map(([id, lab]) => [id, lab.code]));
    try {
        const saved = JSON.parse(window.localStorage.getItem(CODE_STORAGE_KEY) || '{}');
        for (const id of Object.keys(defaults)) {
            if (typeof saved[id] === 'string') defaults[id] = saved[id];
        }
    } catch {
        /* ignore malformed storage */
    }
    return defaults;
};

const loadInitialLanguage = () => {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    return saved && languageLabs[saved] ? saved : 'javascript';
};

const splitOutput = (value, type = 'log') => {
    if (!value) return [];
    return String(value)
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter((line) => line.length > 0)
        .map((message) => ({ type, message }));
};

// Runs JavaScript locally in a sandboxed Web Worker, so the JS lab works
// instantly and offline. Console output is forwarded back via postMessage.
const runJavaScriptLocally = (source) => new Promise((resolve) => {
    const harness = `
        const __logs = [];
        const __push = (type) => (...args) => __logs.push({ type, parts: args.map((value) => {
            if (typeof value === 'string') return value;
            if (value instanceof Error) return value.name + ': ' + value.message;
            try { return JSON.stringify(value); } catch { return String(value); }
        }) });
        console.log = __push('log');
        console.info = __push('log');
        console.warn = __push('log');
        console.error = __push('error');
        try {
            const __result = eval(${JSON.stringify(source)});
            Promise.resolve(__result).finally(() => self.postMessage({ logs: __logs }));
        } catch (error) {
            __logs.push({ type: 'error', parts: [(error && error.name ? error.name + ': ' + error.message : String(error))] });
            self.postMessage({ logs: __logs });
        }
    `;
    const blobUrl = URL.createObjectURL(new Blob([harness], { type: 'text/javascript' }));
    const worker = new Worker(blobUrl);

    const finish = (lines) => {
        worker.terminate();
        URL.revokeObjectURL(blobUrl);
        resolve(lines);
    };

    const timeoutId = setTimeout(() => {
        finish([{ type: 'error', message: `Execution stopped after ${JS_TIMEOUT_MS / 1000}s (infinite loop?).` }]);
    }, JS_TIMEOUT_MS);

    worker.onmessage = (event) => {
        clearTimeout(timeoutId);
        const lines = (event.data.logs || []).map(({ type, parts }) => ({ type, message: parts.join(' ') }));
        finish(lines);
    };
    worker.onerror = (event) => {
        clearTimeout(timeoutId);
        finish([{ type: 'error', message: event.message || 'Script error.' }]);
    };
});

const Playground = () => {
    const [languageId, setLanguageId] = useState(loadInitialLanguage);
    const [codeByLanguage, setCodeByLanguage] = useState(loadInitialCode);
    const [output, setOutput] = useState([{ type: 'status', message: 'Ready.' }]);
    const [activePanel, setActivePanel] = useState('terminal');
    const [stdin, setStdin] = useState('');
    const [terminalCommand, setTerminalCommand] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const previewRef = useRef(null);

    // Persist student work so a refresh never loses it (debounced to avoid
    // writing on every keystroke).
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            try {
                window.localStorage.setItem(CODE_STORAGE_KEY, JSON.stringify(codeByLanguage));
            } catch {
                /* storage blocked — editing still works in-memory */
            }
        }, 400);
        return () => window.clearTimeout(timeoutId);
    }, [codeByLanguage]);

    useEffect(() => {
        try {
            window.localStorage.setItem(LANG_STORAGE_KEY, languageId);
        } catch {
            /* ignore */
        }
    }, [languageId]);

    const lab = languageLabs[languageId];
    const code = codeByLanguage[languageId];
    const fileName = `main.${lab.extension}`;

    const editorOptions = useMemo(() => ({
        minimap: { enabled: true, side: 'right', size: 'fit' },
        fontSize: 14,
        fontFamily: 'JetBrains Mono, Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        lineHeight: 22,
        tabSize: 4,
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        padding: { top: 14, bottom: 14 },
        bracketPairColorization: { enabled: true },
        formatOnPaste: true,
        formatOnType: true
    }), []);

    const updateCode = (value) => {
        setCodeByLanguage((current) => ({
            ...current,
            [languageId]: value || ''
        }));
    };

    const resetCode = () => {
        setCodeByLanguage((current) => ({
            ...current,
            [languageId]: lab.code
        }));
        setOutput([{ type: 'status', message: `${lab.label} reset.` }]);
    };

    const copyCode = async () => {
        await navigator.clipboard?.writeText(code);
        setOutput((current) => [...current, { type: 'status', message: `${fileName} copied.` }]);
    };

    const runCode = async () => {
        if (isRunning) return;

        setActivePanel(languageId === 'html' ? 'preview' : 'terminal');
        setOutput([{ type: 'status', message: `Running ${fileName}...` }]);

        if (languageId === 'html') {
            previewRef.current.srcdoc = code;
            setOutput([{ type: 'status', message: 'Preview updated.' }]);
            return;
        }

        setIsRunning(true);

        try {
            if (languageId === 'javascript') {
                const lines = await runJavaScriptLocally(code);
                setOutput([
                    { type: 'status', message: 'Browser JS engine finished.' },
                    ...(lines.length ? lines : [{ type: 'status', message: 'Finished with no output.' }])
                ]);
                return;
            }

            const nextOutput = await runRemoteCode();
            setOutput(nextOutput.length ? nextOutput : [{ type: 'status', message: 'Finished with no output.' }]);
        } catch (error) {
            setOutput([
                { type: 'error', message: error.message || 'Unable to run code.' },
                { type: 'status', message: 'Check your connection and try again.' }
            ]);
        } finally {
            setIsRunning(false);
        }
    };

    // Remote execution: Piston (free, no key) first, Judge0 CE as fallback.
    const runRemoteCode = async () => {
        try {
            const response = await fetch(PISTON_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: lab.piston,
                    version: '*',
                    files: [{ name: languageId === 'java' ? 'Main.java' : fileName, content: code }],
                    stdin
                })
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.message || 'Piston runner request failed.');
            }

            const failed = (result.compile?.code ?? 0) !== 0 || (result.run?.code ?? 0) !== 0;
            return [
                { type: 'status', message: `${lab.runnerName} finished: ${failed ? 'Error' : 'OK'}` },
                ...splitOutput(result.compile?.stderr, 'error'),
                ...splitOutput(result.run?.stderr, 'error'),
                ...splitOutput(result.run?.stdout, 'log')
            ];
        } catch {
            const response = await fetch(JUDGE0_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language_id: lab.runnerId,
                    source_code: code,
                    stdin,
                    cpu_time_limit: 5,
                    wall_time_limit: 10,
                    memory_limit: 128000
                })
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.message || 'Runner request failed.');
            }

            const nextOutput = [
                { type: 'status', message: `Judge0 finished: ${result.status?.description || 'Done'}` },
                ...splitOutput(result.compile_output, 'error'),
                ...splitOutput(result.stderr, 'error'),
                ...splitOutput(result.stdout, 'log'),
                ...splitOutput(result.message, 'error')
            ];

            if (result.time) {
                nextOutput.push({ type: 'status', message: `time ${result.time}s / memory ${result.memory || 0} KB` });
            }

            return nextOutput;
        }
    };

    const submitTerminalCommand = (event) => {
        event.preventDefault();
        const command = terminalCommand.trim().toLowerCase();
        setTerminalCommand('');

        if (!command) return;
        if (command === 'run' || command === `run ${fileName}`) {
            runCode();
            return;
        }
        if (command === 'clear') {
            setOutput([]);
            return;
        }
        if (command === 'reset') {
            resetCode();
            return;
        }
        if (command === 'help') {
            setOutput((current) => [
                ...current,
                { type: 'command', message: 'run' },
                { type: 'command', message: 'clear' },
                { type: 'command', message: 'reset' }
            ]);
            return;
        }

        setOutput((current) => [
            ...current,
            { type: 'command', message: command },
            { type: 'error', message: 'Command not available in this browser lab. Use run, clear, reset, or help.' }
        ]);
    };

    return (
        <div className="h-[calc(100vh-5rem)] overflow-hidden bg-[#0f172a] text-slate-100">
            <div className="flex h-full min-h-0">
                <aside className="hidden w-14 shrink-0 flex-col items-center border-r border-white/10 bg-[#0b1220] py-3 md:flex">
                    {[FileCode2, Folder, Boxes, Terminal, BookOpen].map((Icon, index) => (
                        <button key={index} type="button" className="mb-2 flex h-10 w-10 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
                            <Icon className="h-5 w-5" />
                        </button>
                    ))}
                </aside>

                <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#111827] lg:block">
                    <div className="border-b border-white/10 px-4 py-3">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Explorer</p>
                        <h2 className="mt-1 text-sm font-bold uppercase tracking-widest text-slate-200">Student Lab</h2>
                    </div>

                    <div className="border-b border-white/10 p-3">
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(languageLabs).map(([id, item]) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => {
                                        setLanguageId(id);
                                        setOutput([{ type: 'status', message: `${item.label} opened.` }]);
                                    }}
                                    className={`rounded-md border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                                        languageId === id
                                            ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                                            : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.07]'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-3">
                        <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Files</p>
                        <div className="space-y-1">
                            {lab.files.map((name) => (
                                <button key={name} type="button" className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-slate-300 hover:bg-white/[0.06]">
                                    <Code2 className="h-4 w-4 text-emerald-300" />
                                    {name}
                                </button>
                            ))}
                        </div>

                        <p className="mb-2 mt-5 px-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Libraries</p>
                        <div className="flex flex-wrap gap-2 px-2">
                            {lab.libraries.map((library) => (
                                <span key={library} className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-slate-300">
                                    {library}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className="flex min-w-0 flex-1 flex-col">
                    <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 bg-[#111827]">
                        <div className="flex min-w-0 items-center">
                            <div className="flex h-11 min-w-0 items-center gap-2 border-r border-white/10 bg-[#1e293b] px-4 text-sm text-white">
                                <FileCode2 className="h-4 w-4 text-emerald-300" />
                                <span className="truncate">{fileName}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 px-2">
                            <select
                                value={languageId}
                                onChange={(event) => {
                                    const nextLanguage = event.target.value;
                                    setLanguageId(nextLanguage);
                                    setOutput([{ type: 'status', message: `${languageLabs[nextLanguage].label} opened.` }]);
                                }}
                                className="mr-1 h-8 max-w-32 rounded-md border border-white/10 bg-[#020617] px-2 text-xs text-slate-200 outline-none focus:border-emerald-400 sm:max-w-none"
                                aria-label="Select language"
                            >
                                {Object.entries(languageLabs).map(([id, item]) => (
                                    <option key={id} value={id}>{item.label}</option>
                                ))}
                            </select>
                            <button type="button" onClick={copyCode} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Copy code">
                                <Copy className="h-4 w-4" />
                            </button>
                            <button type="button" onClick={resetCode} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Reset code">
                                <RotateCcw className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={runCode}
                                disabled={isRunning}
                                className="ml-1 flex h-8 items-center gap-2 rounded-md bg-emerald-500 px-3 text-xs font-bold uppercase tracking-widest text-slate-950 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                                {isRunning ? 'Running' : 'Run'}
                            </button>
                        </div>
                    </div>

                    <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_18rem]">
                        <section className="min-h-0">
                            <Editor
                                height="100%"
                                language={lab.monaco}
                                theme="vs-dark"
                                value={code}
                                onChange={updateCode}
                                options={editorOptions}
                            />
                        </section>

                        <section className="min-h-0 border-t border-white/10 bg-[#020617]">
                            <div className="flex h-10 items-center justify-between border-b border-white/10 bg-[#0b1220] px-3">
                                <div className="flex gap-1">
                                    {[
                                        ['terminal', Terminal, 'Terminal'],
                                        ['preview', SplitSquareVertical, 'Preview'],
                                        ['libraries', Boxes, 'Libraries']
                                    ].map(([id, Icon, label]) => (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => setActivePanel(id)}
                                            className={`flex h-8 items-center gap-2 rounded-md px-3 text-xs font-semibold uppercase tracking-widest ${
                                                activePanel === id ? 'bg-white/10 text-white' : 'text-slate-500 hover:bg-white/[0.06] hover:text-slate-200'
                                            }`}
                                        >
                                            <Icon className="h-3.5 w-3.5" />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <button type="button" onClick={() => setOutput([])} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-white/10 hover:text-white" aria-label="Clear output">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="h-[calc(100%-2.5rem)] overflow-auto p-4">
                                {activePanel === 'terminal' && (
                                    <div className="grid h-full min-h-0 gap-3 lg:grid-cols-[minmax(0,1fr)_18rem]">
                                        <div className="flex min-h-0 flex-col rounded-md border border-white/10 bg-black/20">
                                            <div className="border-b border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                                                {lab.runnerName || 'Browser'} / {fileName}
                                            </div>
                                            <div className="min-h-0 flex-1 overflow-auto p-3 font-mono text-sm">
                                                {isRunning && (
                                                    <div className="mb-2 flex items-center gap-2 text-amber-300">
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                        Executing {fileName} on {lab.runnerName}...
                                                    </div>
                                                )}
                                                {output.length === 0 ? (
                                                    <p className="text-slate-600">Ready.</p>
                                                ) : output.map((item, index) => (
                                                    <div
                                                        key={`${item.message}-${index}`}
                                                        className={`mb-1 whitespace-pre-wrap ${
                                                            item.type === 'error' ? 'text-red-300' :
                                                                item.type === 'command' ? 'text-sky-300' :
                                                                    item.type === 'status' ? 'text-slate-500' :
                                                                        'text-emerald-300'
                                                        }`}
                                                    >
                                                        {item.type === 'command' ? '$ ' : '> '}{item.message}
                                                    </div>
                                                ))}
                                            </div>
                                            <form onSubmit={submitTerminalCommand} className="flex border-t border-white/10">
                                                <span className="px-3 py-2 font-mono text-sm text-emerald-300">$</span>
                                                <input
                                                    value={terminalCommand}
                                                    onChange={(event) => setTerminalCommand(event.target.value)}
                                                    className="min-w-0 flex-1 bg-transparent px-1 py-2 font-mono text-sm text-slate-200 outline-none placeholder:text-slate-600"
                                                    placeholder="run, clear, reset, help"
                                                />
                                            </form>
                                        </div>

                                        <div className="flex min-h-0 flex-col rounded-md border border-white/10 bg-white/[0.03]">
                                            <div className="border-b border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">Input</div>
                                            <textarea
                                                value={stdin}
                                                onChange={(event) => setStdin(event.target.value)}
                                                className="min-h-0 flex-1 resize-none bg-transparent p-3 font-mono text-sm text-slate-200 outline-none placeholder:text-slate-600"
                                                placeholder="stdin for input(), Scanner, scanf, cin..."
                                            />
                                        </div>
                                    </div>
                                )}

                                {activePanel === 'preview' && (
                                    <div className="h-full overflow-hidden rounded-md border border-white/10 bg-white">
                                        <iframe ref={previewRef} title="Lab preview" className="h-full w-full" sandbox="allow-scripts" />
                                    </div>
                                )}

                                {activePanel === 'libraries' && (
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {lab.libraries.map((library) => (
                                            <div key={library} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                                                <p className="font-mono text-xs text-emerald-300">{library}</p>
                                                <p className="mt-2 text-sm leading-6 text-slate-400">{lab.label} lab module</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Playground;
