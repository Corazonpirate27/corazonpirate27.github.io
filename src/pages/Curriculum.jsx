import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const coreCourses = [
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

const globalFieldCourses = [
    {
        id: 'agriculture-food', name: 'Agriculture & Food Systems',
        icon: 'Sprout',
        track: 'Agriculture',
        section: 'World Fields',
        meta: { salary: '$55k - $130k', time: '8 - 18 Months', role: 'Food Systems Specialist' },
        links: [
            { level: 1, title: 'Sustainable Food Systems', url: 'https://www.edx.org/learn/food-systems', tag: 'edX', type: 'Premium' },
            { level: 2, title: 'Sustainable Agriculture', url: 'https://www.coursera.org/learn/sustainable-agriculture', tag: 'Coursera', type: 'Premium' },
            { level: 3, title: 'Food and Agriculture', url: 'https://www.fao.org/e-learning/en/', tag: 'FAO eLearning', type: 'Open Source' },
            { level: 4, title: 'Food Security', url: 'https://www.coursera.org/learn/food-security', tag: 'Coursera', type: 'Premium' },
            { level: 5, title: 'Land, Water, Food, and Climate', url: 'https://ocw.mit.edu/collections/environment/', tag: 'MIT OCW', type: 'Open Source' }
        ]
    },
    {
        id: 'medicine-healthcare', name: 'Medicine & Healthcare',
        icon: 'HeartPulse',
        track: 'Healthcare',
        section: 'World Fields',
        meta: { salary: '$65k - $220k', time: '12 - 36 Months', role: 'Health Systems Professional' },
        links: [
            { level: 1, title: 'Anatomy & Physiology', url: 'https://openstax.org/details/books/anatomy-and-physiology-2e', tag: 'OpenStax', type: 'Open Source' },
            { level: 2, title: 'Intro to Public Health', url: 'https://www.coursera.org/learn/epidemiology', tag: 'Coursera', type: 'Premium' },
            { level: 3, title: 'Healthcare Marketplace', url: 'https://www.coursera.org/specializations/healthcare-marketplace', tag: 'Penn', type: 'Premium' },
            { level: 4, title: 'Global Health', url: 'https://www.edx.org/learn/global-health', tag: 'edX', type: 'Premium' },
            { level: 5, title: 'Medical Neuroscience', url: 'https://www.coursera.org/learn/medical-neuroscience', tag: 'Duke', type: 'Premium' }
        ]
    },
    {
        id: 'energy-electrical', name: 'Energy & Electrical Systems',
        icon: 'Zap',
        track: 'Energy',
        section: 'World Fields',
        meta: { salary: '$75k - $160k', time: '10 - 24 Months', role: 'Energy Systems Engineer' },
        links: [
            { level: 1, title: 'Electrical Engineering', url: 'https://www.khanacademy.org/science/electrical-engineering', tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'Circuits and Electronics', url: 'https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 3, title: 'Energy Principles', url: 'https://ocw.mit.edu/courses/10-213-chemical-and-biological-engineering-thermodynamics-spring-2002/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 4, title: 'Solar Energy Basics', url: 'https://www.coursera.org/learn/solar-energy-basics', tag: 'Coursera', type: 'Premium' },
            { level: 5, title: 'Power Electronics', url: 'https://www.coursera.org/specializations/power-electronics', tag: 'CU Boulder', type: 'Premium' }
        ]
    },
    {
        id: 'civil-engineering', name: 'Civil Engineering',
        icon: 'Building2',
        track: 'Civil Engineering',
        section: 'World Fields',
        meta: { salary: '$70k - $145k', time: '12 - 30 Months', role: 'Civil Engineer' },
        links: [
            { level: 1, title: 'Civil Engineering Materials', url: 'https://ocw.mit.edu/courses/1-050-engineering-mechanics-i-fall-2007/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 2, title: 'Engineering Mechanics', url: 'https://www.coursera.org/specializations/engineering-mechanics', tag: 'Georgia Tech', type: 'Premium' },
            { level: 3, title: 'Structural Engineering', url: 'https://www.edx.org/learn/structural-engineering', tag: 'edX', type: 'Premium' },
            { level: 4, title: 'Transportation Systems', url: 'https://ocw.mit.edu/search/?d=Civil%20and%20Environmental%20Engineering&q=transportation', tag: 'MIT OCW', type: 'Open Source' },
            { level: 5, title: 'Construction Management', url: 'https://www.coursera.org/specializations/construction-management', tag: 'Columbia', type: 'Premium' }
        ]
    },
    {
        id: 'education-teaching', name: 'Education',
        icon: 'School',
        track: 'Education',
        section: 'World Fields',
        meta: { salary: '$45k - $115k', time: '6 - 18 Months', role: 'Learning Designer' },
        links: [
            { level: 1, title: 'Learning How to Learn', url: 'https://www.coursera.org/learn/learning-how-to-learn', tag: 'Coursera', type: 'Premium' },
            { level: 2, title: 'Foundations of Teaching', url: 'https://www.edx.org/learn/teaching', tag: 'edX', type: 'Premium' },
            { level: 3, title: 'Instructional Design', url: 'https://www.coursera.org/specializations/instructional-design', tag: 'UIllinois', type: 'Premium' },
            { level: 4, title: 'Open Education Resources', url: 'https://www.oercommons.org/', tag: 'OER Commons', type: 'Open Source' },
            { level: 5, title: 'Teach with Khan Academy', url: 'https://www.khanacademy.org/khan-for-educators', tag: 'Khan Academy', type: 'Open Source' }
        ]
    },
    {
        id: 'environmental-science', name: 'Environmental Science',
        icon: 'Leaf',
        track: 'Environment',
        section: 'World Fields',
        meta: { salary: '$55k - $125k', time: '8 - 20 Months', role: 'Environmental Analyst' },
        links: [
            { level: 1, title: 'AP/College Environmental Science', url: 'https://www.khanacademy.org/science/ap-college-environmental-science', tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'Environment & Sustainability', url: 'https://ocw.mit.edu/collections/environment/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 3, title: 'Ecology II: Sustainability', url: 'https://ocw.mit.edu/courses/1-020-ecology-ii-engineering-for-sustainability-spring-2008/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 4, title: 'Climate Change Courses', url: 'https://www.edx.org/learn/climate-change', tag: 'edX', type: 'Premium' },
            { level: 5, title: 'Global Environmental Management', url: 'https://www.coursera.org/learn/global-environmental-management', tag: 'DTU', type: 'Premium' }
        ]
    },
    {
        id: 'logistics-transportation', name: 'Logistics & Transportation',
        icon: 'Truck',
        track: 'Logistics',
        section: 'World Fields',
        meta: { salary: '$60k - $140k', time: '6 - 18 Months', role: 'Supply Chain Analyst' },
        links: [
            { level: 1, title: 'Supply Chain Logistics', url: 'https://www.coursera.org/learn/supply-chain-logistics', tag: 'Rutgers', type: 'Premium' },
            { level: 2, title: 'Supply Chain Management', url: 'https://www.coursera.org/specializations/supply-chain-management', tag: 'Rutgers', type: 'Premium' },
            { level: 3, title: 'Transportation Systems', url: 'https://ocw.mit.edu/search/?q=transportation%20systems', tag: 'MIT OCW', type: 'Open Source' },
            { level: 4, title: 'Urban Transportation Planning', url: 'https://ocw.mit.edu/search/?q=urban%20transportation', tag: 'MIT OCW', type: 'Open Source' },
            { level: 5, title: 'Operations Management', url: 'https://www.edx.org/learn/operations-management', tag: 'edX', type: 'Premium' }
        ]
    },
    {
        id: 'scientific-research', name: 'Scientific Research',
        icon: 'Microscope',
        track: 'Research',
        section: 'World Fields',
        meta: { salary: '$60k - $150k', time: '12 - 36 Months', role: 'Research Scientist' },
        links: [
            { level: 1, title: 'Research Methods', url: 'https://www.coursera.org/learn/research-methods', tag: 'Coursera', type: 'Premium' },
            { level: 2, title: 'Statistics & Probability', url: 'https://www.khanacademy.org/math/statistics-probability', tag: 'Khan Academy', type: 'Open Source' },
            { level: 3, title: 'Scientific Computing', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', tag: 'freeCodeCamp', type: 'Open Source' },
            { level: 4, title: 'Data Analysis for Research', url: 'https://www.coursera.org/learn/data-analysis-with-python', tag: 'Coursera', type: 'Premium' },
            { level: 5, title: 'MIT Science Courses', url: 'https://ocw.mit.edu/search/?t=Science', tag: 'MIT OCW', type: 'Open Source' }
        ]
    },
    {
        id: 'governance-economics', name: 'Governance & Economics',
        icon: 'Landmark',
        track: 'Governance',
        section: 'World Fields',
        meta: { salary: '$55k - $160k', time: '8 - 24 Months', role: 'Policy Analyst' },
        links: [
            { level: 1, title: 'Economics', url: 'https://www.khanacademy.org/economics-finance-domain', tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'Principles of Economics', url: 'https://openstax.org/details/books/principles-economics-3e', tag: 'OpenStax', type: 'Open Source' },
            { level: 3, title: 'Microeconomics', url: 'https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/', tag: 'MIT OCW', type: 'Open Source' },
            { level: 4, title: 'Public Policy', url: 'https://www.edx.org/learn/public-policy', tag: 'edX', type: 'Premium' },
            { level: 5, title: 'Global Governance', url: 'https://www.coursera.org/learn/global-governance', tag: 'Coursera', type: 'Premium' }
        ]
    },
    {
        id: 'business-finance', name: 'Business, Finance & Management',
        icon: 'BriefcaseBusiness',
        track: 'Business',
        section: 'World Fields',
        meta: { salary: '$60k - $180k', time: '6 - 18 Months', role: 'Business Analyst' },
        links: [
            { level: 1, title: 'Finance and Capital Markets', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance', tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'Principles of Management', url: 'https://openstax.org/details/books/principles-management', tag: 'OpenStax', type: 'Open Source' },
            { level: 3, title: 'Financial Markets', url: 'https://www.coursera.org/learn/financial-markets-global', tag: 'Yale', type: 'Premium' },
            { level: 4, title: 'Business Foundations', url: 'https://www.coursera.org/specializations/wharton-business-foundations', tag: 'Wharton', type: 'Premium' },
            { level: 5, title: 'MBA Core Courses', url: 'https://ocw.mit.edu/search/?d=Sloan%20School%20of%20Management', tag: 'MIT OCW', type: 'Open Source' }
        ]
    }
];

const gradeMathUrl = (grade) => {
    if (grade === 1) return 'https://www.khanacademy.org/math/cc-1st-grade-math';
    if (grade === 2) return 'https://www.khanacademy.org/math/cc-2nd-grade-math';
    if (grade === 3) return 'https://www.khanacademy.org/math/cc-third-grade-math';
    if (grade === 4) return 'https://www.khanacademy.org/math/cc-fourth-grade-math';
    if (grade === 5) return 'https://www.khanacademy.org/math/cc-fifth-grade-math';
    if (grade === 6) return 'https://www.khanacademy.org/math/cc-sixth-grade-math';
    if (grade === 7) return 'https://www.khanacademy.org/math/cc-seventh-grade-math';
    if (grade === 8) return 'https://www.khanacademy.org/math/cc-eighth-grade-math';
    if (grade === 9) return 'https://www.khanacademy.org/math/algebra';
    if (grade === 10) return 'https://www.khanacademy.org/math/geometry';
    if (grade === 11) return 'https://www.khanacademy.org/math/algebra2';
    return 'https://www.khanacademy.org/math/precalculus';
};

const schoolSubjectLinks = (grade) => {
    if (grade === 0) {
        return [
            { level: 1, title: 'Early Math', url: 'https://www.khanacademy.org/math/early-math', tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'Reading Readiness', url: 'https://www.khanacademy.org/ela', tag: 'Khan Academy', type: 'Open Source' },
            { level: 3, title: 'Science Discovery', url: 'https://www.khanacademy.org/science', tag: 'Khan Academy', type: 'Open Source' },
            { level: 4, title: 'Arts & Music', url: 'https://www.khanacademy.org/humanities', tag: 'Khan Academy', type: 'Open Source' },
            { level: 5, title: 'Life Skills', url: 'https://www.khanacademy.org/college-careers-more', tag: 'Khan Academy', type: 'Open Source' }
        ];
    }

    if (grade <= 5) {
        return [
            { level: 1, title: 'Mathematics', url: gradeMathUrl(grade), tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'English Language Arts', url: 'https://www.khanacademy.org/ela', tag: 'Khan Academy', type: 'Open Source' },
            { level: 3, title: 'Science', url: 'https://www.khanacademy.org/science', tag: 'Khan Academy', type: 'Open Source' },
            { level: 4, title: 'Social Studies', url: 'https://www.khanacademy.org/humanities/us-history', tag: 'Khan Academy', type: 'Open Source' },
            { level: 5, title: 'Computer Basics', url: 'https://www.khanacademy.org/computing', tag: 'Khan Academy', type: 'Open Source' },
            { level: 6, title: 'Arts & Humanities', url: 'https://www.khanacademy.org/humanities', tag: 'Khan Academy', type: 'Open Source' }
        ];
    }

    if (grade <= 8) {
        return [
            { level: 1, title: 'Mathematics', url: gradeMathUrl(grade), tag: 'Khan Academy', type: 'Open Source' },
            { level: 2, title: 'English Language Arts', url: 'https://www.khanacademy.org/ela', tag: 'Khan Academy', type: 'Open Source' },
            { level: 3, title: 'Middle School Science', url: 'https://www.khanacademy.org/science/ms-science', tag: 'Khan Academy', type: 'Open Source' },
            { level: 4, title: 'World History', url: 'https://www.khanacademy.org/humanities/world-history', tag: 'Khan Academy', type: 'Open Source' },
            { level: 5, title: 'Computer Programming', url: 'https://www.khanacademy.org/computing/computer-programming', tag: 'Khan Academy', type: 'Open Source' },
            { level: 6, title: 'Life Skills', url: 'https://www.khanacademy.org/college-careers-more', tag: 'Khan Academy', type: 'Open Source' }
        ];
    }

    return [
        { level: 1, title: 'Mathematics', url: gradeMathUrl(grade), tag: 'Khan Academy', type: 'Open Source' },
        { level: 2, title: 'English & Literature', url: 'https://www.khanacademy.org/ela', tag: 'Khan Academy', type: 'Open Source' },
        { level: 3, title: 'Biology', url: 'https://www.khanacademy.org/science/biology', tag: 'Khan Academy', type: 'Open Source' },
        { level: 4, title: 'Chemistry', url: 'https://www.khanacademy.org/science/chemistry', tag: 'Khan Academy', type: 'Open Source' },
        { level: 5, title: 'Physics', url: 'https://www.khanacademy.org/science/physics', tag: 'Khan Academy', type: 'Open Source' },
        { level: 6, title: 'World & US History', url: 'https://www.khanacademy.org/humanities', tag: 'Khan Academy', type: 'Open Source' },
        { level: 7, title: 'Economics', url: 'https://www.khanacademy.org/economics-finance-domain', tag: 'Khan Academy', type: 'Open Source' },
        { level: 8, title: 'Computer Science', url: 'https://www.khanacademy.org/computing/computer-science', tag: 'Khan Academy', type: 'Open Source' },
        { level: 9, title: 'High School Textbooks', url: 'https://openstax.org/subjects/high-school', tag: 'OpenStax', type: 'Open Source' }
    ];
};

const schoolCourses = [
    {
        id: 'school-nursery', name: 'Nursery Courses',
        icon: 'Baby',
        track: 'Nursery',
        section: 'School Courses',
        meta: { salary: 'Foundation', time: 'Full Year', role: 'Nursery' },
        links: schoolSubjectLinks(0)
    },
    ...Array.from({ length: 12 }, (_, index) => {
        const grade = index + 1;
        return {
            id: `school-grade-${grade}`,
            name: `Grade ${grade} Courses`,
            icon: 'BookOpen',
            track: `Grade ${grade}`,
            section: 'School Courses',
            meta: { salary: 'All Subjects', time: 'Full Year', role: `Grade ${grade}` },
            links: schoolSubjectLinks(grade)
        };
    })
];

const courses = [...coreCourses, ...globalFieldCourses, ...schoolCourses];

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

const FIELD_IMAGE_MAP = {
    'agriculture-food': '/course-fields/agriculture-food.png',
    'medicine-healthcare': '/course-fields/medicine-healthcare.png',
    'energy-electrical': '/course-fields/energy-electrical.png',
    'civil-engineering': '/course-fields/civil-engineering.png',
    'education-teaching': '/course-fields/education-teaching.png',
    'environmental-science': '/course-fields/environmental-science.png',
    'logistics-transportation': '/course-fields/logistics-transportation.png',
    'scientific-research': '/course-fields/scientific-research.png',
    'governance-economics': '/course-fields/governance-economics.png',
    'business-finance': '/course-fields/business-finance.png'
};

const TECH_IMAGE_MAP = {
    cyber: '/course-tech/security.png',
    privacy: '/course-tech/security.png',
    data: '/course-tech/ai-data.png',
    ai: '/course-tech/ai-data.png',
    agents: '/course-tech/ai-data.png',
    mlops: '/course-tech/ai-data.png',
    fullstack: '/course-tech/software-lab.png',
    opensource: '/course-tech/software.png',
    cs: '/course-tech/software.png',
    qa: '/course-tech/software-lab.png',
    sysadmin: '/course-tech/software.png',
    cloud: '/course-tech/cloud-devops.png',
    devops: '/course-tech/cloud-devops.png',
    mobile: '/course-tech/product-mobile.png',
    web3: '/course-tech/product-mobile.png',
    iot: '/course-tech/maker-lab.png',
    robotics: '/course-tech/maker-lab.png',
    xr: '/course-tech/maker-lab.png',
    quantum: '/course-tech/maker-lab.png',
    gamedev: '/course-tech/maker-lab.png'
};

const getCourseTrack = (course) => course.track || COURSE_TRACKS[course.id] || 'Core';
const getCourseSection = (course) => course.section || (course.id === 'perks' ? 'Student Resources' : 'Tech Careers');

const getSchoolImage = (id) => {
    if (id === 'school-nursery') return '/course-school/nursery.png';
    const grade = Number(id.replace('school-grade-', ''));
    if (grade <= 5) return '/course-school/elementary.png';
    if (grade <= 8) return '/course-school/middle.png';
    return '/course-school/high.png';
};

// Reusable Course Card Component
const CourseCard = ({ course }) => {
    const [expanded, setExpanded] = useState(false);
    const track = getCourseTrack(course);
    const section = getCourseSection(course);
    const isFeatured = FEATURED_COURSES.has(course.id);

    // Choose image based on course type
    const getImage = (id) => {
        if (FIELD_IMAGE_MAP[id]) return FIELD_IMAGE_MAP[id];
        if (TECH_IMAGE_MAP[id]) return TECH_IMAGE_MAP[id];
        if (id.startsWith('school-')) return getSchoolImage(id);

        switch (id) {
            default: return '/course-tech/software.png';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-lg border border-black/5 bg-white text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,0.12)] transition-all duration-300 dark:border-white/10 dark:bg-slate-900 dark:text-white md:hover:-translate-y-1 md:hover:shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
        >
            {/* Image Header */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img src={getImage(course.id)} alt={course.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-white/10"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/35 bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm backdrop-blur-xl">
                        {section}
                    </span>
                    <span className="rounded-full border border-white/35 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-xl">
                        {course.icon}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        {course.meta.role}
                    </span>
                    {isFeatured && (
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300">
                            2026 Pick
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] uppercase tracking-widest text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        {track}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] uppercase tracking-widest text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        {course.links.length} Courses
                    </span>
                </div>

                <h3 className="mb-2 font-serif text-2xl font-bold leading-tight text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">{course.name}</h3>

                <div className="mb-6 flex flex-wrap gap-4 border-b border-slate-100 pb-6 font-mono text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                    <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{course.meta.time}</span>
                    <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>{course.meta.salary}</span>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 py-3 text-xs font-black uppercase tracking-widest text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition-colors hover:bg-emerald-600 dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-300"
                    >
                        {expanded ? 'Close Courses' : 'View Courses'}
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
                                <div className="custom-scrollbar max-h-60 space-y-2 overflow-y-auto pt-4 pr-2">
                                    {course.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group/link block rounded-lg border border-slate-100 bg-slate-50 p-3 transition-all hover:border-emerald-200 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="text-xs font-bold text-slate-700 group-hover/link:text-slate-950 dark:text-slate-200 dark:group-hover/link:text-white">{link.title}</div>
                                                <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                                            </div>
                                            <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">{link.tag}</div>
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
    const [activeSection, setActiveSection] = useState('All Sections');
    const [activeTrack, setActiveTrack] = useState('All');
    const [search, setSearch] = useState('');

    const stats = [
        { label: 'Sections', value: 4 },
        { label: 'Tracks', value: new Set(courses.map(getCourseTrack)).size },
        { label: 'Courses', value: courses.length }
    ];
    const sections = ['All Sections', ...Array.from(new Set(courses.map(getCourseSection)))];
    const sectionCourses = courses.filter((course) => activeSection === 'All Sections' || getCourseSection(course) === activeSection);
    const tracks = ['All', ...Array.from(new Set(sectionCourses.map(getCourseTrack)))];
    const filteredCourses = courses.filter((course) => {
        const track = getCourseTrack(course);
        const section = getCourseSection(course);
        const query = search.trim().toLowerCase();
        const matchesSection = activeSection === 'All Sections' || section === activeSection;
        const matchesTrack = activeTrack === 'All' || track === activeTrack;
        const searchableLinks = course.links.map((link) => `${link.title} ${link.tag}`).join(' ').toLowerCase();
        const matchesSearch = !query || course.name.toLowerCase().includes(query) || section.toLowerCase().includes(query) || track.toLowerCase().includes(query) || course.meta.role.toLowerCase().includes(query) || searchableLinks.includes(query);
        return matchesSection && matchesTrack && matchesSearch;
    });

    return (
        <div className="relative isolate overflow-hidden bg-white/35 text-slate-950 dark:bg-slate-950/40 dark:text-white">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(245,247,250,0.56)_52%,rgba(238,242,247,0.72)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.65)_0%,rgba(15,23,42,0.72)_100%)]"></div>

            <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl"
                >
                    <span className="mb-5 inline-flex rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                        ROOT Academy 2026
                    </span>
                    <h2 className="font-serif text-5xl font-bold leading-[0.95] tracking-normal text-slate-950 dark:text-white sm:text-7xl lg:text-8xl">
                        Courses for every serious path.
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
                        Tech careers, world fields, school subjects from Nursery to Grade 12, and student resources in one clean learning catalog.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="grid grid-cols-3 overflow-hidden rounded-lg border border-white/70 bg-white/65 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="border-r border-slate-200/80 p-5 last:border-r-0 dark:border-white/10">
                            <div className="font-serif text-3xl font-bold text-slate-950 dark:text-white">{stat.value}</div>
                            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </section>

            <div className="sticky top-16 z-30 border-y border-white/60 bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75">
                <div className="mx-auto max-w-7xl space-y-4 px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                        {sections.map((section) => (
                            <button
                                key={section}
                                onClick={() => {
                                    setActiveSection(section);
                                    setActiveTrack('All');
                                }}
                                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeSection === section ? 'border-slate-950 bg-slate-950 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] dark:border-white dark:bg-white dark:text-slate-950' : 'border-slate-200 bg-white/80 text-slate-600 hover:border-slate-400 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white'}`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-4 md:grid-cols-[minmax(260px,0.78fr)_1.22fr] md:items-start">
                        <div className="relative rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses, subjects, tracks, roles..."
                                className="w-full rounded-lg bg-transparent px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:text-white dark:placeholder:text-slate-500"
                            />
                        </div>
                        <div className="flex max-h-28 flex-wrap gap-2 overflow-y-auto pr-1">
                            {tracks.map((track) => (
                                <button
                                    key={track}
                                    onClick={() => setActiveTrack(track)}
                                    className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTrack === track ? 'border-emerald-500 bg-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.24)] dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950' : 'border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-300 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-emerald-300/50 dark:hover:text-white'}`}
                                >
                                    {track}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="mb-6 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <span>{filteredCourses.length} visible</span>
                    <span>{activeSection}</span>
                </div>

                <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </motion.div>

                {filteredCourses.length === 0 && (
                    <div className="mt-12 rounded-lg border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
                        No matching courses found. Try broadening your search or selecting a different section.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Curriculum;
