import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ArrowRight, Zap, BookOpen, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const courses = [
    {
        id: 'cyber', name: 'Cybersecurity Operations',
        icon: 'Shield',
        meta: { salary: '$95k - $160k', time: '8 - 12 Months', role: 'Security Engineer' },
        links: [
            // Open Source
            { level: 1, title: 'Intro to Cyber Security', url: 'https://www.open.edu/openlearn/science-maths-technology/introduction-cyber-security-stay-safe-online/content-section-0?active-tab=description-tab', tag: 'OpenLearn', type: 'Open Source' },
            { level: 2, title: 'Linux Journey', url: 'https://linuxjourney.com/', tag: 'Linux Journey', type: 'Open Source' },
            { level: 3, title: 'OverTheWire Wargames', url: 'https://overthewire.org/wargames/', tag: 'OverTheWire', type: 'Open Source' },
            { level: 4, title: 'PortSwigger Web Security', url: 'https://portswigger.net/web-security', tag: 'PortSwigger', type: 'Open Source' },
            { level: 5, title: 'Ethical Hacking', url: 'https://www.freecodecamp.org/learn/information-security/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 6, title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', tag: 'OWASP', type: 'Open Source' },
            { level: 7, title: 'Metasploit Unleashed', url: 'https://www.offsec.com/metasploit-unleashed/', tag: 'OffSec', type: 'Open Source' },
            { level: 8, title: 'Penetration Testing', url: 'https://ocw.mit.edu/search/?q=cybersecurity', tag: 'MIT OCW', type: 'Open Source' },
            { level: 9, title: 'Reverse Engineering', url: 'https://opensecuritytraining.info/IntroToReverseEngineering.html', tag: 'OpenSecurity', type: 'Open Source' },
            { level: 10, title: 'Advanced Cryptography', url: 'https://ocw.mit.edu/courses/6-875-cryptography-and-cryptanalysis-spring-2005/', tag: 'MIT PhD', type: 'Open Source' },
            // Premium
            { level: 1, title: 'Cybersecurity for Everyone', url: 'https://www.coursera.org/learn/cybersecurity-for-everyone', tag: 'UMaryland', type: 'Premium' },
            { level: 2, title: 'Google Cybersecurity Cert', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', tag: 'Coursera', type: 'Premium' },
            { level: 3, title: 'IBM Cybersecurity Analyst', url: 'https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst', tag: 'IBM', type: 'Premium' },
            { level: 4, title: 'Network Security', url: 'https://www.edx.org/learn/cybersecurity', tag: 'edX', type: 'Premium' },
            { level: 5, title: 'Practical Ethical Hacking', url: 'https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course', tag: 'TCM Sec', type: 'Premium' },
            { level: 6, title: 'Digital Forensics', url: 'https://www.edx.org/learn/computer-forensics', tag: 'edX', type: 'Premium' },
            { level: 8, title: 'ISC2 Systems Security', url: 'https://www.coursera.org/specializations/systems-security-isc2', tag: 'ISC2', type: 'Premium' }
        ]
    },
    {
        id: 'data', name: 'Data Science & Analytics',
        icon: 'Database',
        meta: { salary: '$85k - $145k', time: '6 - 12 Months', role: 'Data Scientist' },
        links: [
            // Open Source
            { level: 1, title: 'Stats & Probability', url: 'https://www.khanacademy.org/math/statistics-probability', tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', tag: 'Kaggle', type: 'Open Source' },
            { level: 3, title: 'Data Analysis with Python', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 4, title: 'Computational Thinking', url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 5, title: 'Fast.ai for Data', url: 'https://course.fast.ai/', tag: 'fast.ai', type: 'Open Source' },
            { level: 6, title: 'Papers with Code', url: 'https://paperswithcode.com/', tag: 'Community', type: 'Open Source' },
            { level: 7, title: 'Open Machine Learning', url: 'https://openlearninglibrary.mit.edu/courses/course-v1:MITx+6.036+1T2019/about', tag: 'MIT Open', type: 'Open Source' },
            { level: 10, title: 'Adv Stats & Inference', url: 'https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/', tag: 'MIT OCW', type: 'Open Source' },
            // Premium
            { level: 1, title: 'Google Data Analytics', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', tag: 'Google', type: 'Premium' },
            { level: 2, title: 'IBM Data Analyst', url: 'https://www.coursera.org/professional-certificates/ibm-data-analyst', tag: 'IBM', type: 'Premium' },
            { level: 3, title: 'SQL for Data Science', url: 'https://www.coursera.org/learn/sql-for-data-science', tag: 'UCDavis', type: 'Premium' },
            { level: 4, title: 'Python for Data Science', url: 'https://www.edx.org/learn/python/ibm-python-for-data-science', tag: 'IBM', type: 'Premium' },
            { level: 5, title: 'Machine Learning Spec', url: 'https://www.coursera.org/specializations/machine-learning-introduction', tag: 'DeepLearning.AI', type: 'Premium' },
            { level: 7, title: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', tag: 'Andrew Ng', type: 'Premium' },
            { level: 8, title: 'Big Data (Spark/Hadoop)', url: 'https://www.edx.org/learn/big-data', tag: 'edX', type: 'Premium' }
        ]
    },
    {
        id: 'ai', name: 'Artificial Intelligence',
        icon: 'Cpu',
        meta: { salary: '$120k - $200k', time: '12 - 18 Months', role: 'AI Engineer' },
        links: [
            // Open Source
            { level: 1, title: 'Elements of AI', url: 'https://www.elementsofai.com/', tag: 'U of Helsinki', type: 'Open Source' },
            { level: 2, title: 'Fast.ai (Practical DL)', url: 'https://course.fast.ai/', tag: 'Fast.ai', type: 'Open Source' },
            { level: 3, title: 'Machine Learning w/ Python', url: 'https://www.freecodecamp.org/learn/machine-learning-with-python/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 4, title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1', tag: 'Hugging Face', type: 'Open Source' },
            { level: 5, title: 'Neural Networks/Zero to Hero', url: 'https://karpathy.ai/zero-to-hero.html', tag: 'A. Karpathy', type: 'Open Source' },
            { level: 6, title: 'Deep RL Course', url: 'https://huggingface.co/learn/deep-rl-course/unit0/introduction', tag: 'Hugging Face', type: 'Open Source' },
            { level: 7, title: 'Spinning Up in Deep RL', url: 'https://spinningup.openai.com/en/latest/', tag: 'OpenAI', type: 'Open Source' },
            { level: 8, title: 'Transformer Models', url: 'https://github.com/huggingface/transformers', tag: 'GitHub', type: 'Open Source' },
            { level: 9, title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', tag: 'Community', type: 'Open Source' },
            { level: 10, title: 'PhD-level AI Research', url: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/', tag: 'MIT OCW', type: 'Open Source' },
            // Premium
            { level: 1, title: 'AI for Everyone', url: 'https://www.coursera.org/learn/ai-for-everyone', tag: 'Andrew Ng', type: 'Premium' },
            { level: 2, title: 'Machine Learning Intro', url: 'https://www.coursera.org/specializations/machine-learning-introduction', tag: 'Andrew Ng', type: 'Premium' },
            { level: 3, title: 'IBM AI Engineering', url: 'https://www.coursera.org/professional-certificates/ai-engineer', tag: 'IBM', type: 'Premium' },
            { level: 4, title: 'Natural Language Processing', url: 'https://www.coursera.org/specializations/natural-language-processing', tag: 'DeepLearning.AI', type: 'Premium' },
            { level: 5, title: 'GANs Specialization', url: 'https://www.coursera.org/specializations/generative-adversarial-networks-gans', tag: 'DeepLearning.AI', type: 'Premium' },
            { level: 6, title: 'Agentic AI Systems', url: 'https://www.deeplearning.ai/short-courses/ai-agentic-workflows/', tag: 'DeepLearning.AI', type: 'Premium' },
            { level: 7, title: 'Self-Driving Cars', url: 'https://www.coursera.org/specializations/self-driving-cars', tag: 'U of Toronto', type: 'Premium' }
        ]
    },
    {
        id: 'iot', name: 'Internet of Things',
        icon: 'Wifi',
        meta: { salary: '$90k - $150k', time: '8 - 12 Months', role: 'Embedded Engineer' },
        links: [
            // Open Source
            { level: 1, title: 'Arduino Guides', url: 'https://docs.arduino.cc/', tag: 'Arduino', type: 'Open Source' },
            { level: 2, title: 'Electrical Engineering', url: 'https://www.khanacademy.org/science/electrical-engineering', tag: 'Khan Academy', type: 'Open Source' },
            { level: 3, title: 'IoT Projects', url: 'https://www.freecodecamp.org/news/tag/iot/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 4, title: 'ESP32 Programming', url: 'https://randomnerdtutorials.com/projects-esp32/', tag: 'RNT', type: 'Open Source' },
            { level: 5, title: 'PlatformIO Docs', url: 'https://docs.platformio.org/en/latest/', tag: 'PlatformIO', type: 'Open Source' },
            { level: 6, title: 'MicroPython', url: 'https://docs.micropython.org/en/latest/', tag: 'MicroPython', type: 'Open Source' },
            { level: 8, title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', tag: 'GitHub', type: 'Open Source' },
            { level: 9, title: 'Digital Communications', url: 'https://ocw.mit.edu/courses/6-450-principles-of-digital-communications-i-fall-2006/', tag: 'MIT OCW', type: 'Open Source' },
            // Premium
            { level: 1, title: 'Intro to IoT', url: 'https://www.coursera.org/specializations/iot', tag: 'Coursera', type: 'Premium' },
            { level: 2, title: 'Embedded Systems', url: 'https://www.edx.org/learn/embedded-systems', tag: 'edX', type: 'Premium' },
            { level: 3, title: 'Raspberry Pi & Python', url: 'https://www.coursera.org/learn/raspberry-pi-interface', tag: 'Coursera', type: 'Premium' },
            { level: 4, title: 'IoT Architecture', url: 'https://www.coursera.org/learn/iot-architecture', tag: 'EIT Digital', type: 'Premium' },
            { level: 5, title: 'Industrial IoT', url: 'https://www.coursera.org/learn/industrial-iot', tag: 'Google Cloud', type: 'Premium' },
            { level: 6, title: 'Real-Time Embedded Sys', url: 'https://www.coursera.org/learn/real-time-embedded-systems', tag: 'UColorado', type: 'Premium' }
        ]
    },
    {
        id: 'fullstack', name: 'Full Stack Development',
        icon: 'Layers',
        meta: { salary: '$85k - $150k', time: '6 - 9 Months', role: 'Software Engineer' },
        links: [
            // Open Source
            { level: 1, title: 'The Odin Project', url: 'https://www.theodinproject.com/', tag: 'The Best', type: 'Open Source' },
            { level: 2, title: 'Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 3, title: 'Full Stack Open', url: 'https://fullstackopen.com/en/', tag: 'U of Helsinki', type: 'Open Source' },
            { level: 4, title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/', tag: 'Mozilla', type: 'Open Source' },
            { level: 5, title: 'JavaScript Algorithms', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 6, title: 'Next.js App Router', url: 'https://nextjs.org/learn', tag: 'Next.js', type: 'Open Source' },
            { level: 7, title: 'Next.js Docs', url: 'https://nextjs.org/docs', tag: 'Next.js', type: 'Open Source' },
            { level: 8, title: 'React Scrimba', url: 'https://scrimba.com/learn/learnreact', tag: 'Scrimba', type: 'Open Source' },
            { level: 9, title: 'Performance Optimization', url: 'https://web.dev/learn/performance', tag: 'Google', type: 'Open Source' },
            { level: 10, title: 'Patterns.dev', url: 'https://www.patterns.dev/', tag: 'Patterns', type: 'Open Source' },
            // Premium
            { level: 1, title: 'HTML/CSS/JS Basics', url: 'https://www.codecademy.com/catalog/subject/web-development', tag: 'Codecademy', type: 'Premium' },
            { level: 2, title: 'IBM Full Stack Dev', url: 'https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer', tag: 'IBM', type: 'Premium' },
            { level: 3, title: 'CS50\'s Web Programming', url: 'https://www.edx.org/learn/web-development/harvard-university-cs50-s-web-programming-with-python-and-javascript', tag: 'Harvard edX', type: 'Premium' },
            { level: 4, title: 'Meta Front-End Cert', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer', tag: 'Meta', type: 'Premium' },
            { level: 5, title: 'Django for Everybody', url: 'https://www.coursera.org/specializations/django', tag: 'UMich', type: 'Premium' },
            { level: 8, title: 'Software Engineering Master', url: 'https://www.edx.org/masters/computer-science', tag: 'edX Audit', type: 'Premium' }
        ]
    },
    {
        id: 'devops', name: 'DevOps Engineering',
        icon: 'Server',
        meta: { salary: '$110k - $170k', time: '9 - 14 Months', role: 'DevOps Engineer' },
        links: [
            // Open Source
            { level: 1, title: 'DevOps Roadmap', url: 'https://roadmap.sh/devops', tag: 'roadmap.sh', type: 'Open Source' },
            { level: 2, title: 'The Twelve-Factor App', url: 'https://12factor.net/', tag: 'Methodology', type: 'Open Source' },
            { level: 3, title: 'Linux Command Line', url: 'https://ubuntu.com/tutorials/command-line-for-beginners', tag: 'Ubuntu', type: 'Open Source' },
            { level: 4, title: 'Docker for Beginners', url: 'https://github.com/docker/labs/tree/master/beginner', tag: 'Docker', type: 'Open Source' },
            { level: 5, title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', tag: 'K8s Docs', type: 'Open Source' },
            { level: 6, title: 'Prometheus Monitoring', url: 'https://prometheus.io/docs/introduction/overview/', tag: 'Prometheus', type: 'Open Source' },
            { level: 7, title: 'Platform Engineering', url: 'https://platformengineering.org/', tag: 'Platform Eng', type: 'Open Source' },
            { level: 8, title: 'Terraform Tutorials', url: 'https://developer.hashicorp.com/terraform/tutorials', tag: 'HashiCorp', type: 'Open Source' },
            // Premium
            { level: 1, title: 'DevOps Fundamentals', url: 'https://www.coursera.org/learn/intro-to-devops', tag: 'IBM', type: 'Premium' },
            { level: 2, title: 'Bash Scripting', url: 'https://www.codecademy.com/learn/learn-bash-scripting', tag: 'Codecademy', type: 'Premium' },
            { level: 3, title: 'Introduction to DevOps', url: 'https://www.edx.org/learn/devops/ibm-introduction-to-devops', tag: 'IBM edX', type: 'Premium' },
            { level: 4, title: 'Docker & Kubernetes', url: 'https://www.coursera.org/learn/docker-container-kubernetes', tag: 'IBM', type: 'Premium' },
            { level: 5, title: 'IBM DevOps Cert', url: 'https://www.coursera.org/professional-certificates/devops-and-software-engineering', tag: 'IBM', type: 'Premium' },
            { level: 6, title: 'AWS DevOps Engineer', url: 'https://www.coursera.org/specializations/aws-devops-competency', tag: 'AWS', type: 'Premium' },
            { level: 7, title: 'Google DevOps SRE', url: 'https://www.coursera.org/professional-certificates/google-cloud-devops-engineer', tag: 'Google', type: 'Premium' }
        ]
    },
    {
        id: 'cloud', name: 'Cloud Computing',
        icon: 'Cloud',
        meta: { salary: '$115k - $180k', time: '8 - 12 Months', role: 'Cloud Architect' },
        links: [
            // Open Source
            { level: 1, title: 'Cloud Computing Concepts', url: 'https://www.khanacademy.org/computing/computer-science/internet-intro', tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'AWS Skill Builder (Free)', url: 'https://explore.skillbuilder.aws/learn', tag: 'AWS', type: 'Open Source' },
            { level: 3, title: 'Microsoft Learn (Azure)', url: 'https://learn.microsoft.com/en-us/training/azure/', tag: 'Microsoft', type: 'Open Source' },
            { level: 4, title: 'Google Cloud Training', url: 'https://cloud.google.com/learn/training', tag: 'Google', type: 'Open Source' },
            { level: 5, title: 'Cloud Resume Challenge', url: 'https://cloudresumechallenge.dev/', tag: 'Project', type: 'Open Source' },
            { level: 6, title: 'Well-Architected Framework', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html', tag: 'AWS Docs', type: 'Open Source' },
            { level: 7, title: 'Cloud Native Landscape', url: 'https://landscape.cncf.io/', tag: 'CNCF', type: 'Open Source' },
            // Premium
            { level: 1, title: 'Google Cloud Basics', url: 'https://www.coursera.org/learn/gcp-fundamentals', tag: 'Google', type: 'Premium' },
            { level: 2, title: 'AWS Fundamentals', url: 'https://www.coursera.org/specializations/aws-fundamentals', tag: 'AWS', type: 'Premium' },
            { level: 3, title: 'IBM Cloud Developer', url: 'https://www.coursera.org/professional-certificates/ibm-cloud-developer', tag: 'IBM', type: 'Premium' },
            { level: 4, title: 'Serverless Arch', url: 'https://www.codecademy.com/learn/learn-serverless', tag: 'Codecademy', type: 'Premium' },
            { level: 5, title: 'Advanced Cloud Sys', url: 'https://www.edx.org/learn/cloud-computing', tag: 'edX', type: 'Premium' },
            { level: 6, title: 'Architecting on AWS', url: 'https://www.coursera.org/learn/architecting-on-aws', tag: 'AWS', type: 'Premium' }
        ]
    },
    {
        id: 'opensource', name: 'Open Source Strategy',
        icon: 'GitBranch',
        meta: { salary: '$100k - $160k', time: '6 - 12 Months', role: 'OS Maintainer' },
        links: [
            // Open Source
            { level: 1, title: 'Open Source Guide', url: 'https://opensource.guide/', tag: 'GitHub', type: 'Open Source' },
            { level: 2, title: 'How to Contribute', url: 'https://www.freecodecamp.org/news/how-to-contribute-to-open-source-projects-beginners-guide/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 3, title: 'First Contributions', url: 'https://github.com/firstcontributions/first-contributions', tag: 'GitHub', type: 'Open Source' },
            { level: 4, title: 'Git Flight Rules', url: 'https://github.com/k88hudson/git-flight-rules', tag: 'GitHub', type: 'Open Source' },
            { level: 5, title: 'Software Projects', url: 'https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 6, title: 'Maintainer Best Practices', url: 'https://opensource.guide/best-practices/', tag: 'GitHub', type: 'Open Source' },
            // Premium
            { level: 1, title: 'Git & GitHub Basics', url: 'https://www.codecademy.com/learn/learn-git', tag: 'Codecademy', type: 'Premium' },
            { level: 2, title: 'Version Control (Git)', url: 'https://www.coursera.org/learn/version-control-with-git', tag: 'Atlassian', type: 'Premium' },
            { level: 3, title: 'Open Source Dev', url: 'https://training.linuxfoundation.org/training/open-source-software-development-beginners-guide-lfd102/', tag: 'Linux Fdn', type: 'Premium' },
            { level: 4, title: 'Software Construction', url: 'https://www.edx.org/learn/software-development', tag: 'edX', type: 'Premium' },
            { level: 5, title: 'Ecosystem Leadership', url: 'https://www.coursera.org/learn/open-source-software-development-methods', tag: 'Linux Fdn', type: 'Premium' }
        ]
    },
    {
        id: 'cs', name: 'Computer Science (Foundations)',
        icon: 'Binary',
        meta: { salary: '$90k - $150k', time: '12 - 24 Months', role: 'Software Engineer' },
        links: [
            // Open Source
            { level: 1, title: 'CS Algorithms & Data', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 2, title: 'Teach Yourself CS', url: 'https://teachyourselfcs.com/', tag: 'Guide', type: 'Open Source' },
            { level: 3, title: 'Scientific Computing', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 4, title: 'OSSU Computer Science', url: 'https://github.com/ossu/computer-science', tag: 'GitHub', type: 'Open Source' },
            { level: 5, title: 'Structure & Interpretation', url: 'https://mitpress.mit.edu/sites/default/files/sicp/index.html', tag: 'SICP', type: 'Open Source' },
            { level: 6, title: 'Advanced Algorithms', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 7, title: 'Distributed Systems', url: 'https://pdos.csail.mit.edu/6.824/', tag: 'MIT', type: 'Open Source' },
            // Premium
            { level: 1, title: 'CS50: Intro to CS', url: 'https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science', tag: 'Harvard', type: 'Premium' },
            { level: 2, title: 'Python for Everybody', url: 'https://www.coursera.org/specializations/python', tag: 'UMich', type: 'Premium' },
            { level: 3, title: 'Code Foundations', url: 'https://www.codecademy.com/learn/code-foundations', tag: 'Codecademy', type: 'Premium' },
            { level: 4, title: 'Java Programming', url: 'https://www.coursera.org/specializations/java-programming', tag: 'Duke', type: 'Premium' },
            { level: 5, title: 'Algorithms Specialization', url: 'https://www.coursera.org/specializations/algorithms', tag: 'Stanford', type: 'Premium' },
            { level: 6, title: 'Discrete Mathematics', url: 'https://www.coursera.org/specializations/discrete-mathematics', tag: 'UCSD', type: 'Premium' }
        ]
    },
    {
        id: 'mobile', name: 'Mobile Development',
        icon: 'Smartphone',
        meta: { salary: '$90k - $145k', time: '6 - 9 Months', role: 'iOS/Android Dev' },
        links: [
            // Open Source
            { level: 1, title: 'App Dev Training', url: 'https://developer.apple.com/tutorials/app-dev-training', tag: 'Apple', type: 'Open Source' },
            { level: 2, title: 'Android Basics Compose', url: 'https://developer.android.com/courses/android-basics-compose/course', tag: 'Google', type: 'Open Source' },
            { level: 3, title: 'Swift Language Guide', url: 'https://docs.swift.org/swift-book/', tag: 'Swift.org', type: 'Open Source' },
            { level: 4, title: 'Mobile App Projects', url: 'https://www.freecodecamp.org/news/tag/mobile-app-development/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 5, title: 'React Native Docs', url: 'https://reactnative.dev/docs/getting-started', tag: 'Meta', type: 'Open Source' },
            { level: 6, title: 'Flutter Build', url: 'https://docs.flutter.dev/get-started/codelab', tag: 'Google', type: 'Open Source' },
            { level: 7, title: 'Mobile Systems', url: 'https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/', tag: 'MIT OCW', type: 'Open Source' },
            // Premium
            { level: 1, title: 'Mobile Dev Basics', url: 'https://www.codecademy.com/catalog/subject/mobile-development', tag: 'Codecademy', type: 'Premium' },
            { level: 2, title: 'Meta iOS Developer', url: 'https://www.coursera.org/professional-certificates/meta-ios-developer', tag: 'Meta', type: 'Premium' },
            { level: 3, title: 'Meta Android Developer', url: 'https://www.coursera.org/professional-certificates/meta-android-developer', tag: 'Meta', type: 'Premium' },
            { level: 4, title: 'React Native Specialization', url: 'https://www.coursera.org/specializations/react-native', tag: 'Meta', type: 'Premium' },
            { level: 5, title: 'Multiplatform Mobile', url: 'https://www.coursera.org/specializations/full-stack-mobile-app-development', tag: 'HKUST', type: 'Premium' }
        ]
    },
    {
        id: 'web3', name: 'Blockchain & Web3',
        icon: 'Blocks',
        meta: { salary: '$100k - $180k', time: '6 - 12 Months', role: 'Smart Contract Dev' },
        links: [
            // Open Source
            { level: 1, title: 'Ethereum.org', url: 'https://ethereum.org/en/learn/', tag: 'Ethereum', type: 'Open Source' },
            { level: 2, title: 'Solidity by Example', url: 'https://solidity-by-example.org/', tag: 'Solidity', type: 'Open Source' },
            { level: 3, title: 'Web3 Projects', url: 'https://www.freecodecamp.org/news/tag/web3/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 4, title: 'Cyfrin Updraft', url: 'https://updraft.cyfrin.io/', tag: 'Cyfrin', type: 'Open Source' },
            { level: 5, title: 'Zero Knowledge Proofs', url: 'https://zk-learning.org/', tag: 'ZK-Learning', type: 'Open Source' },
            { level: 6, title: 'Alchemy University', url: 'https://www.alchemy.com/university', tag: 'Alchemy', type: 'Open Source' },
            { level: 7, title: 'Cryptography Systems', url: 'https://ocw.mit.edu/courses/6-875-cryptography-and-cryptanalysis-spring-2005/', tag: 'MIT OCW', type: 'Open Source' },
            // Premium
            { level: 1, title: 'Blockchain Basics', url: 'https://www.coursera.org/learn/blockchain-basics', tag: 'Buffalo', type: 'Premium' },
            { level: 2, title: 'Code Foundations', url: 'https://www.codecademy.com/learn/code-foundations', tag: 'Codecademy', type: 'Premium' },
            { level: 3, title: 'Crypto Economics', url: 'https://www.edx.org/learn/blockchain', tag: 'edX', type: 'Premium' },
            { level: 4, title: 'Blockchain Specialization', url: 'https://www.coursera.org/specializations/blockchain', tag: 'Buffalo', type: 'Premium' },
            { level: 5, title: 'Advanced Blockchain', url: 'https://www.codecademy.com/learn/introduction-to-blockchain', tag: 'Codecademy', type: 'Premium' },
            { level: 6, title: 'FinTech & Blockchain', url: 'https://www.coursera.org/specializations/fintech', tag: 'Wharton', type: 'Premium' }
        ]
    },
    {
        id: 'gamedev', name: 'Game Development',
        icon: 'Gamepad',
        meta: { salary: '$80k - $140k', time: '12 - 24 Months', role: 'Game Developer' },
        links: [
            // Open Source
            { level: 1, title: 'Godot Docs', url: 'https://docs.godotengine.org/en/stable/', tag: 'Godot Engine', type: 'Open Source' },
            { level: 2, title: 'Unity Learn', url: 'https://learn.unity.com/', tag: 'Unity', type: 'Open Source' },
            { level: 3, title: 'Unreal Engine Online', url: 'https://dev.epicgames.com/community/learning', tag: 'Unreal', type: 'Open Source' },
            { level: 4, title: 'Game Programming Patterns', url: 'https://gameprogrammingpatterns.com/', tag: 'Book', type: 'Open Source' },
            { level: 5, title: 'Brackeys (Archive)', url: 'https://www.youtube.com/c/Brackeys', tag: 'Unity C#', type: 'Open Source' },
            { level: 6, title: 'Sebastian Lague', url: 'https://www.youtube.com/c/SebastianLague', tag: 'Math/Coding', type: 'Open Source' },
            { level: 7, title: 'CS50 Games', url: 'https://cs50.harvard.edu/games/', tag: 'Harvard', type: 'Open Source' },
            // Premium
            { level: 1, title: 'C# for Unity', url: 'https://www.coursera.org/specializations/unity-game-development', tag: 'UColorado', type: 'Premium' },
            { level: 2, title: 'Unreal C++ Mastery', url: 'https://www.udemy.com/course/unrealcourse/', tag: 'Udemy', type: 'Premium' },
            { level: 3, title: 'C++ for Game Dev', url: 'https://www.coursera.org/specializations/c-plus-plus-modern', tag: 'ULondon', type: 'Premium' },
            { level: 4, title: 'Math for Video Games', url: 'https://www.coursera.org/learn/math-for-video-games', tag: 'ULondon', type: 'Premium' }
        ]
    },
    {
        id: 'sysadmin', name: 'System Administration',
        icon: 'ServerCrash',
        meta: { salary: '$75k - $120k', time: '6 - 12 Months', role: 'SysAdmin' },
        links: [
            // Open Source
            { level: 1, title: 'Linux Fundamentals', url: 'https://training.linuxfoundation.org/training/introduction-to-linux/', tag: 'Linux Fdn', type: 'Open Source' },
            { level: 2, title: 'PowerShell Docs', url: 'https://learn.microsoft.com/en-us/powershell/', tag: 'Microsoft', type: 'Open Source' },
            { level: 3, title: 'Windows Server Docs', url: 'https://learn.microsoft.com/en-us/windows-server/', tag: 'Microsoft', type: 'Open Source' },
            { level: 4, title: 'Networking Basis', url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/training/networking-basics.html', tag: 'Cisco', type: 'Open Source' },
            { level: 5, title: 'Vim Adventures', url: 'https://vim-adventures.com/', tag: 'Vim', type: 'Open Source' },
            // Premium
            { level: 1, title: 'Google IT Support', url: 'https://www.coursera.org/professional-certificates/google-it-support', tag: 'Google', type: 'Premium' },
            { level: 2, title: 'Red Hat SysAdmin', url: 'https://www.coursera.org/learn/red-hat-enterprise-linux-technical-overview', tag: 'Red Hat', type: 'Premium' },
            { level: 3, title: 'CompTIA A+', url: 'https://www.coursera.org/specializations/comptia-a-plus', tag: 'CompTIA', type: 'Premium' },
            { level: 4, title: 'Network+', url: 'https://www.coursera.org/learn/networking-basics', tag: 'Cisco', type: 'Premium' }
        ]
    },
    {
        id: 'qa', name: 'QA & Automation',
        icon: 'Bug',
        meta: { salary: '$70k - $115k', time: '4 - 8 Months', role: 'QA Engineer' },
        links: [
            // Open Source
            { level: 1, title: 'Selenium Docs', url: 'https://www.selenium.dev/documentation/', tag: 'Selenium', type: 'Open Source' },
            { level: 2, title: 'Playwright', url: 'https://playwright.dev/', tag: 'Microsoft', type: 'Open Source' },
            { level: 3, title: 'Cypress', url: 'https://docs.cypress.io/', tag: 'Cypress', type: 'Open Source' },
            { level: 4, title: 'Postman Learning', url: 'https://learning.postman.com/', tag: 'API Testing', type: 'Open Source' },
            { level: 5, title: 'Software Testing Help', url: 'https://www.softwaretestinghelp.com/', tag: 'Blog', type: 'Open Source' },
            // Premium
            { level: 1, title: 'Software Testing & Automation', url: 'https://www.coursera.org/specializations/software-testing-automation', tag: 'UMinnesota', type: 'Premium' },
            { level: 2, title: 'Automated Testing w/ Selenium', url: 'https://www.coursera.org/learn/automated-software-testing', tag: 'UAlberta', type: 'Premium' },
            { level: 3, title: 'Postman Complete Guide', url: 'https://www.udemy.com/course/postman-the-complete-guide-for-rest-api-testing/', tag: 'Udemy', type: 'Premium' }
        ]
    },
    {
        id: 'perks', name: 'Hidden Intel (Student Perks)',
        icon: 'Gift',
        meta: { salary: 'Save $5000+', time: 'Instant Access', role: 'Resource Hacker' },
        links: [
            { title: 'GitHub Student Pack', url: 'https://education.github.com/pack', tag: 'The Holy Grail', type: 'Open Source' },
            { title: 'UNiDAYS', url: 'https://www.myunidays.com/', tag: 'Global Discounts', type: 'Open Source' },
            { title: 'Student Beans', url: 'https://www.studentbeans.com/', tag: 'Tech & Fashion', type: 'Open Source' },
            { title: 'JetBrains License', url: 'https://www.jetbrains.com/community/education/#students', tag: 'Free Pro IDEs', type: 'Open Source' },
            { title: 'Azure for Students', url: 'https://azure.microsoft.com/en-us/free/students/', tag: '$100 Cloud Credit', type: 'Open Source' },
            { title: 'Amazon Prime Student', url: 'https://www.amazon.com/student', tag: '6 Months Free', type: 'Open Source' },
            { title: 'Notion for Education', url: 'https://www.notion.so/product/notion-for-education', tag: 'Second Brain', type: 'Open Source' },
            { title: 'Autodesk Education', url: 'https://www.autodesk.com/education/edu-software', tag: 'Free AutoCAD/Maya', type: 'Open Source' },
            { title: 'Figma Education', url: 'https://www.figma.com/education/', tag: 'Pro Design Tools', type: 'Open Source' },
            { title: 'Spotify Student', url: 'https://www.spotify.com/us/student/', tag: 'Music + Hulu', type: 'Open Source' },
            { title: 'Internet Archive', url: 'https://archive.org/', tag: 'Digital Library', type: 'Open Source' },
            { title: 'Canva for Students', url: 'https://www.canva.com/education/students/', tag: 'Design Suite', type: 'Open Source' },
            { title: 'Wolfram Alpha', url: 'https://www.wolframalpha.com/', tag: 'Computational Engine', type: 'Open Source' },
            { title: 'OpenStax Textbooks', url: 'https://openstax.org/', tag: 'Free Textbooks', type: 'Open Source' },
            { title: 'Project Gutenberg', url: 'https://www.gutenberg.org/', tag: 'Free eBooks', type: 'Open Source' }
        ]
    },
    {
        id: 'ai_augmented', name: 'AI-Augmented Learning',
        icon: 'Cpu',
        meta: { salary: '$100k - $160k', time: '4 - 8 Months', role: 'AI User' },
        links: [
            // Open Source
            { level: 1, title: 'Cursor Docs', url: 'https://docs.cursor.com/', tag: 'Cursor', type: 'Open Source' },
            { level: 2, title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', tag: 'Community', type: 'Open Source' },
            // Premium
            { level: 1, title: 'DeepLearning.AI AI for Everyone', url: 'https://www.coursera.org/learn/ai-for-everyone', tag: 'Andrew Ng', type: 'Premium' }
        ]
    }
];

// Reusable Course Card Component
const CourseCard = ({ course }) => {
    const [expanded, setExpanded] = useState(false);

    // Choose image based on course type
    const getImage = (id) => {
        switch (id) {
            case 'cyber': return '/matrix_pro_cyber.png'; // High-Fidelity
            case 'data': return '/matrix_pro_data.png';   // High-Fidelity
            case 'ai': return '/matrix_curr_ai.png';
            case 'iot': return '/matrix_curr_iot.png';
            case 'fullstack': return '/matrix_code_banner.png';
            case 'devops': return '/matrix_curr_cloud.png';
            case 'cloud': return '/matrix_curr_cloud.png';
            case 'opensource': return '/matrix_code_banner.png';
            case 'cs': return '/matrix_code_banner.png';
            case 'mobile': return '/matrix_curr_mobile.png';
            case 'web3': return '/matrix_security_banner.png';
            case 'gamedev': return '/matrix_curr_gamedev.png';
            case 'sysadmin': return '/matrix_security_banner.png';
            case 'qa': return '/matrix_security_banner.png';
            default: return '/matrix_code_banner.png';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative bg-[#050505] border border-white/10 rounded-xl overflow-hidden hover:border-root-green/50 transition-all duration-300 md:hover:-translate-y-1"
        >
            {/* Image Header */}
            <div className="relative h-40 w-full overflow-hidden border-b border-white/5">
                <img src={getImage(course.id)} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80"></div>


            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400">
                        {course.meta.role}
                    </span>
                    <span className="text-root-green">{course.icon}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-serif group-hover:text-root-green transition-colors">{course.name}</h3>

                <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-mono mb-6 pb-6 border-b border-white/5">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-root-green"></span>{course.meta.time}</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-root-green"></span>{course.meta.salary}</span>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full bg-[#00FF41] hover:bg-white text-black font-black uppercase tracking-widest py-3 rounded text-xs transition-colors shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2"
                    >
                        {expanded ? 'TERMINATE UPLINK' : 'BOOT SIMULATION'}
                        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 grid grid-cols-2 gap-4 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                    {course.links.filter(l => l.type === 'Open Source' || !l.type).length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold text-[#00ff41] uppercase tracking-widest border-b border-[#00ff41]/30 pb-1 mb-2">Open Source Path</h4>
                                            {course.links.filter(l => l.type === 'Open Source' || !l.type).map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="block p-3 rounded bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#00ff41]/50 transition-all group/link"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-[10px] font-bold text-gray-300 group-hover/link:text-white line-clamp-1">{link.title}</div>
                                                        <ExternalLink className="w-3 h-3 text-gray-600 shrink-0" />
                                                    </div>
                                                    <div className="text-[10px] text-gray-600 mt-1">{link.tag}</div>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                    {course.links.filter(l => l.type === 'Premium').length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest border-b border-purple-400/30 pb-1 mb-2">Premium / Audit Path</h4>
                                            {course.links.filter(l => l.type === 'Premium').map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="block p-3 rounded bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/50 transition-all group/link"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-[10px] font-bold text-gray-300 group-hover/link:text-white line-clamp-1">{link.title}</div>
                                                        <ExternalLink className="w-3 h-3 text-gray-600 shrink-0" />
                                                    </div>
                                                    <div className="text-[10px] text-gray-600 mt-1">{link.tag}</div>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const Curriculum = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <h2 className="text-4xl font-serif font-bold text-white mb-2">Curriculum Database</h2>
                <p className="text-gray-400">Access verified learning paths. Open source and premium intelligence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default Curriculum;
