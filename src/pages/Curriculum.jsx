import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

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
            { level: 7, title: 'React Scrimba', url: 'https://scrimba.com/learn/learnreact', tag: 'Scrimba', type: 'Open Source' },
            { level: 8, title: 'Performance Optimization', url: 'https://web.dev/learn/performance', tag: 'Google', type: 'Open Source' },
            { level: 9, title: 'Patterns.dev', url: 'https://www.patterns.dev/', tag: 'Patterns', type: 'Open Source' },
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
        id: 'agents', name: 'AI Agents & Automation',
        icon: 'Bot',
        meta: { salary: '$120k - $210k', time: '6 - 12 Months', role: 'AI Agent Engineer' },
        links: [
            { level: 1, title: 'Python for Everybody', url: 'https://www.py4e.com/', tag: 'Python', type: 'Open Source' },
            { level: 2, title: 'OpenAI Agents SDK', url: 'https://platform.openai.com/docs/guides/agents-sdk/', tag: 'OpenAI', type: 'Open Source' },
            { level: 3, title: 'LangChain Agents', url: 'https://docs.langchain.com/oss/python/langchain/agents', tag: 'LangChain', type: 'Open Source' },
            { level: 4, title: 'LangGraph Academy', url: 'https://academy.langchain.com/', tag: 'LangGraph', type: 'Open Source' },
            { level: 5, title: 'Hugging Face Agents Course', url: 'https://huggingface.co/learn/agents-course/unit0/introduction', tag: 'Hugging Face', type: 'Open Source' },
            { level: 6, title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/docs/getting-started/intro', tag: 'MCP', type: 'Open Source' },
            { level: 7, title: 'LlamaIndex Workflows', url: 'https://docs.llamaindex.ai/en/stable/module_guides/workflow/', tag: 'LlamaIndex', type: 'Open Source' },
            { level: 8, title: 'OpenAI Evals', url: 'https://github.com/openai/evals', tag: 'Evaluation', type: 'Open Source' },
            { level: 9, title: 'HumanLayer Agents', url: 'https://docs.humanlayer.dev/', tag: 'Human Approval', type: 'Open Source' },
            { level: 10, title: 'Agent Protocol', url: 'https://agentprotocol.ai/', tag: 'Interoperability', type: 'Open Source' }
        ]
    },
    {
        id: 'mlops', name: 'MLOps & LLMOps',
        icon: 'Workflow',
        meta: { salary: '$115k - $190k', time: '8 - 14 Months', role: 'MLOps Engineer' },
        links: [
            { level: 1, title: 'Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course', tag: 'Google', type: 'Open Source' },
            { level: 2, title: 'Made With ML', url: 'https://madewithml.com/', tag: 'MLOps Guide', type: 'Open Source' },
            { level: 3, title: 'MLflow Docs', url: 'https://mlflow.org/docs/latest/index.html', tag: 'MLflow', type: 'Open Source' },
            { level: 4, title: 'DVC Docs', url: 'https://dvc.org/doc', tag: 'Data Versioning', type: 'Open Source' },
            { level: 5, title: 'Hugging Face Evaluate', url: 'https://huggingface.co/docs/evaluate/index', tag: 'Evaluation', type: 'Open Source' },
            { level: 6, title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', tag: 'Kubernetes', type: 'Open Source' },
            { level: 7, title: 'Kubeflow Docs', url: 'https://www.kubeflow.org/docs/', tag: 'Kubeflow', type: 'Open Source' },
            { level: 8, title: 'Evidently AI Docs', url: 'https://docs.evidentlyai.com/', tag: 'Monitoring', type: 'Open Source' },
            { level: 9, title: 'LangSmith Evaluation', url: 'https://docs.smith.langchain.com/evaluation', tag: 'LLMOps', type: 'Open Source' },
            { level: 10, title: 'OpenTelemetry Docs', url: 'https://opentelemetry.io/docs/', tag: 'Observability', type: 'Open Source' }
        ]
    },
    {
        id: 'robotics', name: 'Robotics & Edge AI',
        icon: 'CircuitBoard',
        meta: { salary: '$100k - $175k', time: '12 - 24 Months', role: 'Robotics Engineer' },
        links: [
            { level: 1, title: 'Python Basics', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 2, title: 'ROS Developer Docs', url: 'https://docs.ros.org/', tag: 'ROS', type: 'Open Source' },
            { level: 3, title: 'ROS 2 Jazzy Tutorials', url: 'https://docs.ros.org/en/jazzy/Tutorials.html', tag: 'ROS 2', type: 'Open Source' },
            { level: 4, title: 'Gazebo Docs', url: 'https://gazebosim.org/docs/latest/getstarted/', tag: 'Simulation', type: 'Open Source' },
            { level: 5, title: 'MoveIt 2 Tutorials', url: 'https://moveit.picknik.ai/main/doc/tutorials/tutorials.html', tag: 'Manipulation', type: 'Open Source' },
            { level: 6, title: 'OpenCV University', url: 'https://opencv.org/university/', tag: 'Computer Vision', type: 'Open Source' },
            { level: 7, title: 'NVIDIA Jetson AI Lab', url: 'https://www.jetson-ai-lab.com/', tag: 'Edge AI', type: 'Open Source' },
            { level: 8, title: 'Edge Impulse Docs', url: 'https://docs.edgeimpulse.com/', tag: 'TinyML', type: 'Open Source' },
            { level: 9, title: 'Isaac ROS Docs', url: 'https://nvidia-isaac-ros.github.io/', tag: 'NVIDIA', type: 'Open Source' },
            { level: 10, title: 'Robotics: Aerial Robotics', url: 'https://www.coursera.org/learn/robotics-flight', tag: 'Penn', type: 'Premium' }
        ]
    },
    {
        id: 'xr', name: 'Spatial Computing & XR',
        icon: 'Glasses',
        meta: { salary: '$95k - $170k', time: '8 - 16 Months', role: 'XR Developer' },
        links: [
            { level: 1, title: '3D Web Basics', url: 'https://threejs.org/manual/', tag: 'Three.js', type: 'Open Source' },
            { level: 2, title: 'WebXR Fundamentals', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Fundamentals', tag: 'MDN', type: 'Open Source' },
            { level: 3, title: 'Unity XR Solutions', url: 'https://unity.com/solutions/xr', tag: 'Unity', type: 'Open Source' },
            { level: 4, title: 'XR Interaction Toolkit', url: 'https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@latest', tag: 'Unity Docs', type: 'Open Source' },
            { level: 5, title: 'Apple visionOS', url: 'https://developer.apple.com/visionos/', tag: 'Apple', type: 'Open Source' },
            { level: 6, title: 'RealityKit Docs', url: 'https://developer.apple.com/documentation/realitykit', tag: 'Apple', type: 'Open Source' },
            { level: 7, title: 'Meta Quest Docs', url: 'https://developers.meta.com/horizon/documentation/', tag: 'Meta', type: 'Open Source' },
            { level: 8, title: 'OpenXR Specification', url: 'https://www.khronos.org/openxr/', tag: 'Khronos', type: 'Open Source' },
            { level: 9, title: 'Babylon.js WebXR', url: 'https://doc.babylonjs.com/features/featuresDeepDive/webXR/introToWebXR/', tag: 'Babylon.js', type: 'Open Source' },
            { level: 10, title: 'XR Design Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/immersive-experiences', tag: 'Design', type: 'Open Source' }
        ]
    },
    {
        id: 'quantum', name: 'Quantum Computing',
        icon: 'Atom',
        meta: { salary: '$110k - $190k', time: '12 - 24 Months', role: 'Quantum Developer' },
        links: [
            { level: 1, title: 'Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra', tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'IBM Quantum Learning', url: 'https://learning.quantum.ibm.com/', tag: 'IBM Quantum', type: 'Open Source' },
            { level: 3, title: 'Getting Started with Qiskit', url: 'https://learning.quantum.ibm.com/learning-path/getting-started-with-qiskit', tag: 'Qiskit', type: 'Open Source' },
            { level: 4, title: 'Qiskit Documentation', url: 'https://docs.quantum.ibm.com/guides', tag: 'IBM Docs', type: 'Open Source' },
            { level: 5, title: 'Quantum Katas', url: 'https://github.com/microsoft/QuantumKatas', tag: 'Microsoft', type: 'Open Source' },
            { level: 6, title: 'PennyLane Tutorials', url: 'https://pennylane.ai/qml/', tag: 'Xanadu', type: 'Open Source' },
            { level: 7, title: 'Quantum Algorithms', url: 'https://learn.qiskit.org/course/algorithm-design', tag: 'Qiskit', type: 'Open Source' },
            { level: 8, title: 'Qiskit Machine Learning', url: 'https://qiskit-community.github.io/qiskit-machine-learning/', tag: 'Quantum ML', type: 'Open Source' },
            { level: 9, title: 'MIT Quantum Computation', url: 'https://ocw.mit.edu/courses/8-370-quantum-computation-fall-2022/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 10, title: 'Azure Quantum Docs', url: 'https://learn.microsoft.com/en-us/azure/quantum/', tag: 'Microsoft', type: 'Open Source' }
        ]
    },
    {
        id: 'privacy', name: 'Privacy Engineering & AI Governance',
        icon: 'Fingerprint',
        meta: { salary: '$105k - $180k', time: '6 - 12 Months', role: 'Privacy Engineer' },
        links: [
            { level: 1, title: 'Privacy Engineering', url: 'https://www.nist.gov/privacy-engineering', tag: 'NIST', type: 'Open Source' },
            { level: 2, title: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework', tag: 'NIST', type: 'Open Source' },
            { level: 3, title: 'OWASP Privacy Risks', url: 'https://owasp.org/www-project-top-10-privacy-risks/', tag: 'OWASP', type: 'Open Source' },
            { level: 4, title: 'NIST AI Risk Management', url: 'https://www.nist.gov/itl/ai-risk-management-framework', tag: 'AI RMF', type: 'Open Source' },
            { level: 5, title: 'Google Secure AI Framework', url: 'https://saif.google/', tag: 'Google', type: 'Open Source' },
            { level: 6, title: 'Microsoft Responsible AI', url: 'https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/', tag: 'Microsoft', type: 'Open Source' },
            { level: 7, title: 'OpenSSF Secure AI', url: 'https://openssf.org/blog/2024/07/23/openssf-launches-secure-ai-framework/', tag: 'OpenSSF', type: 'Open Source' },
            { level: 8, title: 'EU AI Act Explainer', url: 'https://artificialintelligenceact.eu/', tag: 'EU AI Act', type: 'Open Source' },
            { level: 9, title: 'AI Incident Database', url: 'https://incidentdatabase.ai/', tag: 'AI Safety', type: 'Open Source' },
            { level: 10, title: 'IAPP AI Governance', url: 'https://iapp.org/resources/topics/ai-governance/', tag: 'IAPP', type: 'Premium' }
        ]
    },
    {
        id: 'perks', name: 'Hidden Intel (Student Perks)',
        icon: 'Gift',
        meta: { salary: 'Save $5000+', time: 'Instant Access', role: 'Resource Hacker' },
        links: [
            { title: 'GitHub Student Pack', url: 'https://education.github.com/pack', tag: 'The Holy Grail' },
            { title: 'UNiDAYS', url: 'https://www.myunidays.com/', tag: 'Global Discounts' },
            { title: 'Student Beans', url: 'https://www.studentbeans.com/', tag: 'Tech & Fashion' },
            { title: 'JetBrains License', url: 'https://www.jetbrains.com/community/education/#students', tag: 'Free Pro IDEs' },
            { title: 'Azure for Students', url: 'https://azure.microsoft.com/en-us/free/students/', tag: '$100 Cloud Credit' },
            { title: 'Amazon Prime Student', url: 'https://www.amazon.com/student', tag: '6 Months Free' },
            { title: 'Notion for Education', url: 'https://www.notion.so/product/notion-for-education', tag: 'Second Brain' },
            { title: 'Autodesk Education', url: 'https://www.autodesk.com/education/edu-software', tag: 'Free AutoCAD/Maya' },
            { title: 'Figma Education', url: 'https://www.figma.com/education/', tag: 'Pro Design Tools' },
            { title: 'Spotify Student', url: 'https://www.spotify.com/us/student/', tag: 'Music + Hulu' },
            { title: 'Internet Archive', url: 'https://archive.org/', tag: 'Digital Library' },
            { title: 'Canva for Students', url: 'https://www.canva.com/education/students/', tag: 'Design Suite' },
            { title: 'Wolfram Alpha', url: 'https://www.wolframalpha.com/', tag: 'Computational Engine' },
            { title: 'OpenStax Textbooks', url: 'https://openstax.org/', tag: 'Free Textbooks' },
            { title: 'Project Gutenberg', url: 'https://www.gutenberg.org/', tag: 'Free eBooks' }
        ]
    }
];

const COURSE_TRACKS = {
    cyber: 'Cybersecurity',
    data: 'Data',
    ai: 'AI',
    iot: 'IoT',
    fullstack: 'Full Stack',
    devops: 'DevOps',
    cloud: 'Cloud Computing',
    opensource: 'Open Source',
    cs: 'Foundations',
    mobile: 'Mobile',
    web3: 'Web3',
    agents: 'AI Agents',
    mlops: 'MLOps',
    robotics: 'Robotics',
    xr: 'Spatial Computing',
    quantum: 'Quantum',
    privacy: 'Privacy'
};

const FEATURED_COURSES = new Set(['ai', 'agents', 'mlops', 'robotics', 'privacy', 'cloud', 'cyber']);

// Reusable Course Card Component
const CourseCard = ({ course }) => {
    const [expanded, setExpanded] = useState(false);
    const track = COURSE_TRACKS[course.id] || 'Core';
    const isFeatured = FEATURED_COURSES.has(course.id);

    // Choose image based on course type
    const getImage = (id) => {
        switch (id) {
            case 'cyber': return '/course-tech/security.webp';
            case 'data': return '/course-tech/ai-data.webp';
            case 'ai': return '/course-tech/ai-data.webp';
            case 'iot': return '/course-tech/maker-lab.webp';
            case 'fullstack': return '/course-tech/software.webp';
            case 'devops': return '/course-tech/cloud-devops.webp';
            case 'cloud': return '/course-tech/cloud-devops.webp';
            case 'opensource': return '/course-tech/software-lab.webp';
            case 'cs': return '/course-tech/software-lab.webp';
            case 'mobile': return '/course-tech/product-mobile.webp';
            case 'web3': return '/course-tech/security.webp';
            case 'gamedev': return '/arcade/concept-builder.webp';
            case 'sysadmin': return '/course-tech/cloud-devops.webp';
            case 'qa': return '/course-tech/software-lab.webp';
            case 'agents': return '/course-tech/ai-data.webp';
            case 'mlops': return '/course-tech/ai-data.webp';
            case 'robotics': return '/course-tech/maker-lab.webp';
            case 'xr': return '/arcade/pattern-echo.webp';
            case 'quantum': return '/course-tech/software-lab.webp';
            case 'privacy': return '/course-tech/security.webp';
            default: return '/course-tech/software.webp';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-emerald-300 hover:bg-white md:hover:-translate-y-1 dark:border-white/10 dark:bg-slate-950/90 dark:hover:border-emerald-300/50"
        >
            {/* Image Header */}
            <div className="relative h-40 w-full overflow-hidden border-b border-slate-200 dark:border-white/10">
                <img src={getImage(course.id)} alt={course.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-950"></div>


            </div>

            <div className="p-6">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        {course.meta.role}
                    </span>
                    <span className="text-root-green">{course.icon}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-widest text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        {track}
                    </span>
                    {isFeatured && (
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                            2026 Recommended
                        </span>
                    )}
                </div>

                <h3 className="mb-2 font-serif text-xl font-bold text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">{course.name}</h3>

                <div className="mb-6 flex flex-wrap gap-4 border-b border-slate-200 pb-6 font-mono text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-root-green"></span>{course.meta.time}</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-root-green"></span>{course.meta.salary}</span>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 py-3 text-xs font-black uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950"
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
                                <div className="pt-4 space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                    {course.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group/link block rounded-md border border-slate-200 bg-slate-50 p-3 transition-all hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-300/40 dark:hover:bg-emerald-400/10"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="text-xs font-bold text-slate-700 group-hover/link:text-emerald-700 dark:text-slate-300 dark:group-hover/link:text-white">{link.title}</div>
                                                <ExternalLink className="w-3 h-3 text-slate-400" />
                                            </div>
                                            <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-500">{link.tag}</div>
                                        </a>
                                    ))}
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
    const [activeTrack, setActiveTrack] = useState('All');
    const [search, setSearch] = useState('');

    const tracks = ['All', 'AI', 'AI Agents', 'MLOps', 'Robotics', 'Spatial Computing', 'Quantum', 'Privacy', 'Cybersecurity', 'Cloud Computing', 'Full Stack', 'DevOps', 'Data', 'Web3', 'Mobile', 'Open Source', 'Foundations'];
    const filteredCourses = courses.filter((course) => {
        const track = COURSE_TRACKS[course.id] || 'Core';
        const query = search.trim().toLowerCase();
        const matchesTrack = activeTrack === 'All' || track === activeTrack;
        const matchesSearch = !query || course.name.toLowerCase().includes(query) || track.toLowerCase().includes(query) || course.meta.role.toLowerCase().includes(query);
        return matchesTrack && matchesSearch;
    });

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <div className="mb-10 space-y-6">
                <div className="max-w-3xl">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">Course Roadmaps</p>
                    <h2 className="mb-4 font-serif text-3xl font-bold text-slate-950 dark:text-white md:text-5xl">Course Module 2026</h2>
                    <p className="text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
                        Explore the redesigned flagship track for modern tech careers. Filter by learning path, search for the next mission, and launch the 2026-certified course roadmap.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 items-center">
                    <div className="relative rounded-lg border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search courses, tracks, roles..."
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-300 dark:focus:ring-emerald-400/10"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tracks.map((track) => (
                            <button
                                key={track}
                                onClick={() => setActiveTrack(track)}
                                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-all ${activeTrack === track ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'}`}
                            >
                                {track}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="mt-12 rounded-lg border border-slate-200 bg-white/90 p-12 text-center text-slate-500 dark:border-white/10 dark:bg-slate-950/90 dark:text-slate-400">
                    No matching tracks found. Try broadening your search or selecting a different learning path.
                </div>
            )}
        </div>
    );
};

export default Curriculum;
