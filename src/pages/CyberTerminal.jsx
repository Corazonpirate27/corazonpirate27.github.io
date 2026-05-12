import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const asciiArt = `
  _____   ____   ____ _______   _______ ______ _____  __  __ 
 |  __ \\ / __ \\ / __ \\__   __| |__   __|  ____|  __ \\|  \\/  |
 | |__) | |  | | |  | | | |       | |  | |__  | |__) | \\  / |
 |  _  /| |  | | |  | | | |       | |  |  __| |  _  /| |\\/| |
 | | \\ \\| |__| | |__| | | |       | |  | |____| | \\ \\| |  | |
 |_|  \\_\\____/ \\____/  |_|       |_|  |______|_|  \\_\\_|  |_|
                                                             
 ROOT Security System v4.0.0
 Type 'help' to see available commands.
`;

const CyberTerminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', content: asciiArt, isAscii: true },
        { type: 'output', content: 'Establishing secure connection...' },
        { type: 'output', content: 'Connection established. Welcome, analyst.' }
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const endOfTerminalRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Keep focus on input when clicking anywhere on terminal
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const processCommand = async (cmd) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        const args = trimmedCmd.split(' ');
        const command = args[0].toLowerCase();

        setIsProcessing(true);

        // Add user input to history
        setHistory(prev => [...prev, { type: 'input', content: `root@academy:~$ ${trimmedCmd}` }]);

        let outputContent = '';
        let type = 'output';

        try {
            switch (command) {
                case 'help':
                    outputContent = `
Available commands:
  help      - Show this help message
  clear     - Clear the terminal screen
  echo      - Print arguments to the standard output
  whois     - [REAL] Perform a DNS/WHOIS lookup on a domain (e.g., whois google.com)
  scan      - [SIM] Run a simulated Nmap port scan on an IP address
  date      - Print the current system date and time
`;
                    break;
                case 'clear':
                    setHistory([]);
                    setIsProcessing(false);
                    setInput('');
                    return;
                case 'echo':
                    outputContent = args.slice(1).join(' ');
                    break;
                case 'date':
                    outputContent = new Date().toString();
                    break;
                case 'whois':
                    if (!args[1]) {
                        outputContent = 'Usage: whois <domain>';
                        type = 'error';
                    } else {
                        outputContent = 'Querying WHOIS records...';
                        setHistory(prev => [...prev, { type: 'output', content: outputContent }]);
                        
                        try {
                            const res = await fetch(`https://networkcalc.com/api/dns/whois/${args[1]}`);
                            const data = await res.json();
                            if (data.status === 'OK' && data.whois && data.whois.registrar) {
                                outputContent = `
Registrar: ${data.whois.registrar}
Creation Date: ${data.whois.creation_date || 'Unknown'}
Expiration Date: ${data.whois.expiration_date || 'Unknown'}
Status: ${data.whois.status ? data.whois.status.join(', ') : 'Active'}
`;
                            } else {
                                outputContent = 'No WHOIS data found for this domain.';
                                type = 'error';
                            }
                        } catch (err) {
                            outputContent = 'Error fetching WHOIS data. Please check domain or network.';
                            type = 'error';
                        }
                    }
                    break;
                case 'scan':
                    if (!args[1]) {
                        outputContent = 'Usage: scan <target_ip>';
                        type = 'error';
                    } else {
                        outputContent = `Starting Nmap 7.93 ( https://nmap.org ) at ${new Date().toISOString()}\n`;
                        setHistory(prev => [...prev, { type: 'output', content: outputContent }]);
                        
                        // Simulate scan delay
                        await new Promise(r => setTimeout(r, 1500));
                        
                        outputContent = `
Nmap scan report for ${args[1]}
Host is up (0.042s latency).
Not shown: 996 closed tcp ports (reset)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 1.62 seconds`;
                    }
                    break;
                default:
                    outputContent = `bash: ${command}: command not found`;
                    type = 'error';
            }
        } catch (e) {
            outputContent = `System error: ${e.message}`;
            type = 'error';
        }

        if (outputContent) {
            setHistory(prev => [...prev, { type, content: outputContent }]);
        }
        
        setIsProcessing(false);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            processCommand(input);
        } else if (e.key === 'c' && e.ctrlKey) {
            // Simulate Ctrl+C
            setHistory(prev => [...prev, { type: 'input', content: `root@academy:~$ ${input}^C` }]);
            setInput('');
        }
    };

    return (
        <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-1 flex-col overflow-hidden rounded-xl border border-emerald-500/30 bg-[#0c0c0c] shadow-2xl"
                onClick={handleTerminalClick}
            >
                {/* Terminal Header */}
                <div className="flex items-center gap-3 border-b border-white/10 bg-[#1a1a1a] px-4 py-2">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex flex-1 items-center justify-center gap-2 text-xs text-slate-400">
                        <Terminal className="h-3.5 w-3.5" />
                        <span className="font-mono tracking-widest">root@cyber-ops:~</span>
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="flex-1 overflow-y-auto p-4 font-mono text-sm sm:text-base">
                    {history.map((entry, idx) => (
                        <div 
                            key={idx} 
                            className={`mb-2 whitespace-pre-wrap leading-relaxed ${
                                entry.type === 'error' ? 'text-red-400' : 
                                entry.type === 'input' ? 'text-white' : 
                                'text-emerald-400'
                            }`}
                        >
                            {entry.content}
                        </div>
                    ))}
                    
                    {/* Active Input Line */}
                    {!isProcessing && (
                        <div className="flex items-center">
                            <span className="mr-2 text-emerald-500">root@academy:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent text-white outline-none"
                                spellCheck="false"
                                autoComplete="off"
                                autoFocus
                            />
                        </div>
                    )}
                    {isProcessing && (
                        <div className="text-emerald-500">Processing...</div>
                    )}
                    <div ref={endOfTerminalRef} />
                </div>
            </motion.div>
        </div>
    );
};

export default CyberTerminal;
