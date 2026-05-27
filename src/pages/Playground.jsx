import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, BookOpen, Trash2 } from 'lucide-react';

const lessons = {
    javascript: {
        id: 'javascript',
        title: 'JS: Variables & Loops',
        description: 'JavaScript is the language of the web. Try creating a loop that prints numbers from 1 to 5.',
        defaultCode: 'for (let i = 1; i <= 5; i++) {\n  console.log("Number: " + i);\n}\n',
        language: 'javascript'
    },
    python: {
        id: 'python',
        title: 'Python: Print & Math',
        description: "Python is powerful and easy to read. Let's print a greeting and do some math.",
        defaultCode: 'def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("ROOT Academy")\nprint("2 + 2 =", 2+2)\n',
        language: 'python'
    },
    algebra: {
        id: 'algebra',
        title: 'Math: Algebra (Python)',
        description: 'Use Python to solve basic algebraic equations and evaluate expressions.',
        defaultCode: '# Evaluating an algebraic expression: y = 2x + 5\nx = 10\ny = 2*x + 5\n\nprint(f"If x = {x}, then y = {y}")\n',
        language: 'python'
    },
    vector: {
        id: 'vector',
        title: 'Math: Vectors (Python)',
        description: 'Learn how to represent and manipulate 2D vectors using Python lists.',
        defaultCode: '# Vector addition: v1 + v2\nv1 = [3, 4]\nv2 = [1, 2]\n\nresult = [v1[0] + v2[0], v1[1] + v2[1]]\nprint(f"Vector {v1} + {v2} = {result}")\n',
        language: 'python'
    }
};

const Playground = () => {
    const [lessonId, setLessonId] = useState('javascript');
    const lesson = lessons[lessonId];
    const [code, setCode] = useState(lesson.defaultCode);
    const [output, setOutput] = useState([]);
    const iframeRef = useRef(null);

    useEffect(() => {
        setCode(lessons[lessonId].defaultCode);
        setOutput([]);
    }, [lessonId]);

    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data?.type === 'log' || e.data?.type === 'error' || e.data?.type === 'status') {
                setOutput(prev => [...prev, e.data]);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const runCode = () => {
        setOutput([{ type: 'status', message: `Initializing ${lesson.language} environment...` }]);
        
        const escapedCode = code.replace(/`/g, '\\`').replace(/\$/g, '\\$');
        let srcDoc = '';

        if (lesson.language === 'javascript') {
            srcDoc = `
                <script>
                    console.log = function(...args) {
                        window.parent.postMessage({ type: 'log', message: args.join(' ') }, '*');
                    };
                    console.error = function(...args) {
                        window.parent.postMessage({ type: 'error', message: args.join(' ') }, '*');
                    };
                    try {
                        ${code}
                    } catch (e) {
                        console.error(e.toString());
                    }
                </script>
            `;
        } else if (lesson.language === 'python') {
            srcDoc = `
                <script>
                    window.parent.postMessage({ type: 'status', message: 'Loading Pyodide engine...' }, '*');
                    
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
                    script.onload = async () => {
                        try {
                            window.parent.postMessage({ type: 'status', message: 'Downloading Pyodide (WASM)...' }, '*');
                            let pyodide = await loadPyodide({
                                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
                                stdout: (text) => window.parent.postMessage({ type: 'log', message: text }, '*'),
                                stderr: (text) => window.parent.postMessage({ type: 'error', message: text }, '*')
                            });
                            window.parent.postMessage({ type: 'status', message: 'Executing Python code...' }, '*');
                            await pyodide.runPythonAsync(\`${escapedCode}\`);
                        } catch (e) {
                            window.parent.postMessage({ type: 'error', message: e.toString() }, '*');
                        }
                    };
                    script.onerror = () => {
                        window.parent.postMessage({ type: 'error', message: 'Failed to load Pyodide. Check your internet connection or CSP.' }, '*');
                    };
                    document.head.appendChild(script);
                </script>
            `;
        }

        if (iframeRef.current) {
            iframeRef.current.srcdoc = srcDoc;
        }
    };

    return (
        <div className="mx-auto flex h-[calc(100vh-64px)] max-w-7xl flex-col gap-4 p-4 lg:flex-row">
            {/* Instructions Section */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900 lg:w-1/3"
            >
                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3 dark:border-white/10 dark:bg-slate-800">
                    <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-serif text-sm font-bold tracking-widest text-slate-700 dark:text-slate-200 uppercase">Interactive Lesson</span>
                </div>
                <div className="flex-1 p-6">
                    <div className="mb-6 flex flex-wrap gap-2">
                        {Object.keys(lessons).map((key) => (
                            <button
                                key={key}
                                onClick={() => setLessonId(key)}
                                className={`rounded px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                                    lessonId === key 
                                    ? 'bg-emerald-500 text-white shadow-md' 
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10'
                                }`}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                    
                    <h2 className="mb-4 font-serif text-2xl font-bold text-slate-900 dark:text-white">
                        {lesson.title}
                    </h2>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                        {lesson.description}
                    </p>

                    <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                        <h3 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">Your Task</h3>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                            Read the code in the editor, make any changes you like, and press the <strong className="font-bold">RUN</strong> button to see the output in the console.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Editor & Console Section */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-4 lg:w-2/3"
            >
                {/* Editor */}
                <div className="flex h-[55%] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e] shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-slate-400">index.{lesson.language === 'python' ? 'py' : 'js'}</span>
                        <button
                            onClick={runCode}
                            className="flex items-center gap-2 rounded bg-emerald-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-500"
                        >
                            <Play className="h-3 w-3" /> Run
                        </button>
                    </div>
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            language={lesson.language}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 15,
                                fontFamily: 'JetBrains Mono, monospace',
                                wordWrap: 'on',
                                padding: { top: 16 }
                            }}
                        />
                    </div>
                </div>

                {/* Console */}
                <div className="flex h-[45%] flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-xl dark:border-white/10">
                    <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-2">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Output</span>
                        </div>
                        <button 
                            onClick={() => setOutput([])}
                            className="text-slate-400 hover:text-white transition-colors"
                            aria-label="Clear console"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                        {output.length === 0 ? (
                            <span className="text-slate-600">Waiting for execution...</span>
                        ) : (
                            output.map((out, idx) => (
                                <div 
                                    key={idx} 
                                    className={`mb-1 ${
                                        out.type === 'error' ? 'text-red-400' : 
                                        out.type === 'status' ? 'text-slate-500 text-xs italic' : 
                                        'text-emerald-300'
                                    }`}
                                >
                                    {out.type === 'status' ? `> ${out.message}` : out.message}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Hidden iframe for execution */}
            <iframe ref={iframeRef} title="runner" className="hidden" sandbox="allow-scripts allow-same-origin" />
        </div>
    );
};

export default Playground;
