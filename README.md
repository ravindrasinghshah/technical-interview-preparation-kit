# Technical Interview Study Repository

[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://github.com/ravindrasinghshah/technical-interview-preparation-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

> Your TypeScript-powered interview prep notebook — organized, concise and ready when you are.

## 📚 Table of Contents

- [Quick Start](#-quick-start)
- [How to use this repository?](#-how-to-use-this-repository)
- [Repository Structure](#-repository-structure)
- [Learning Path](#-learning-path)
- [Interview Preparation](#-interview-preparation)
- [Practice Resources](#-practice-resources)
- [Coding Conventions](#-coding-conventions)
- [Contributing](#-contributing)
- [Progress Tracking](#-progress-tracking)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/ravindrasinghshah/technical-interview-preparation-kit.git
cd technical-interview-preparation-kit

# 2. Install dependencies
npm install

# 3. Explore the Structure
 - Start with 0-Basics to warm up your fundamentals.
 - Browse 2-DataStructures and 4-Algorithms for topic-based learning.
 - Dive into 5-Exercises for hands-on problem solving.

# 4. Start Solving Problems
 - Pick a folder → read the notes → try the problems yourself.
 - Compare your solution with the provided one, noting time/space complexity.

# 5. Make It Yours
 - Fork the repo and add your own solutions, notes, or optimizations.
 - Keep it updated as your personal interview playbook.

```

## 📅 How to use this repository?

This is your **all-in-one interview preparation notebook** for **system design**, **data structures** and **algorithms** in TypeScript.  
Rather than just reading theory, you’ll **learn by solving real interview-style problems** — organized for maximum efficiency.

### How to Get Started

1. **Follow the Learning Path**

   - Start with **Basics** to build a solid foundation.
   - Move through **Complexity Analysis**, **Core Data Structures** and **Algorithms**.
   - Progress into **Problem Patterns** and **System Design** for advanced preparation.

2. **Practice with Purpose**

   - Use the **Exercises** folder to code hands-on solutions.
   - Review explanations, analyze time/space complexity and test with provided cases.

3. **Customize Your Notes**

   - Fork the repo and add your own solutions or optimizations.
   - Bookmark tricky problems for quick revision before interviews.

4. **Stay Interview-Ready**
   - Treat this like your **exam revision notes** — structured for quick refreshers when time is short.

### 🆚 How Is This Different from LeetCode or Other Platforms?

While platforms like LeetCode are great for volume practice, this repo is **centralized, curated and customizable**:

- **Time-Saving:** No endless searching — everything you need is here.
- **Easy to Navigate:** Organized by topic, difficulty and problem pattern.
- **Customizable:** Extend it with your own study notes and problem sets.

In short: **Think of it as your personal exam notes — organized, concise and perfect for revisiting right before you step into the interview room.**

## 🏗️ Repository Structure

```
technical-interview-preparation-kit/
├── 0-Basics/                 # Basics revisions
│   ├── maths.md              # Basic maths fundamental for algorithms
│   ├── revision-notes.md     # Revision notes before interview
│   └── revision-problems.md  # Problems to revise before interview
├── 0-SystemDesign/           # System design concepts
│   ├── cheet-sheet.md/       # Cheat Sheet
│   ├── databases.md/         # Databases
│   ├── how-to-do.md/         # How to deliver system design
│   └── key-technologies.md   # Key technologies
├── 1-Complexity/             # Time & space complexity
│   ├── complexity-chart.png  # Complexity chart
│   ├── space-complexity.md   # Space Complexity
│   └── time-complexity.md    # Time Complexity
├── 2-DataStructures/         # Core data structures
│   ├── Arrays/               # Array operations & algorithms
│   ├── BinarySearchTree/     # Binary Search Tree
│   ├── DoublyLinkedLists/    # Doubly linked lists
│   ├── LinkedLists/          # Singly, circular lists
│   ├── Queues/               # Queue implementations
│   ├── Stacks/               # Stack implementations
│   ├── Strings/              # Strings implementations
│   ├── Trees/                # Binary trees, BST, AVL, etc.
│   ├── Graphs/               # Graph representations & algorithms
│   ├── HashTables/           # Hash maps & collision handling
│   └── Heaps/                # Min/max heaps & priority queues
├── 3-Patterns/               # Common problem patterns
│   ├── TwoPointers/          # Two pointer technique
│   ├── SlidingWindow/        # Sliding window pattern
│   ├── FastSlow/             # Fast & slow pointers
│   ├── MergeIntervals/       # Interval problems
│   ├── CyclicSort/           # Cyclic sort pattern
│   └── TreeBFS_DFS/          # Tree traversal patterns
├── 4-Algorithms/             # Algorithm implementations
│   ├── Backtracking/         # Backtracking algorithms
│   ├── Bitwise/              # Bitwise algorithms
│   ├── Maths/                # Maths algorithms and common problems
│   ├── Recursion/            # Recursive solutions
│   ├── Searching/            # Search algorithms - Binary, Linear
│   ├── Sorting/              # Sorting algorithms - Bubble, Cyclic, Merge, Quick, Selection
│   ├── DynamicProgramming/   # DP patterns & solutions
│   ├── Greedy/               # Greedy algorithms
│   └── GraphAlgorithms/      # BFS, DFS, shortest path, etc.
└── 5-Exercises/              # Practice problems
```

## 🎯 Learning Path

### For Beginners

1. Start with [Basics](./0-Basics/) - programming fundamentals
2. Learn [Complexity Analysis](./1-Complexity/) - understand Big O
3. Master core [Data Structures](./2-DataStructures/) one by one
4. Practice [Easy Problems](./5-Exercises/) regularly

### For Intermediate

1. Review and strengthen data structure knowledge
2. Focus on [Algorithm Implementation](./4-Algorithms/)
3. Learn [Problem Patterns](./3-Patterns/)
4. Tackle [Medium Problems](./5-Exercises/)

### For Advanced

1. Master [Dynamic Programming](./4-Algorithms/DynamicProgramming/)
2. Study [System Design](./0-SystemDesign/)
3. Solve [Hard Problems](./5-Exercises/)

## 💼 Interview Preparation

### 📝 Coding Interview Checklist

**Before the Interview:**

- [ ] Review [Big O Complexity](./1-Complexity/)
- [ ] Practice [Common Patterns](./3-Patterns/)
- [ ] Review [Notes](./0-Basics/revision-notes.md)
- [ ] Review Common [Problems](./0-Basics/revision-problems.md)

**During the Interview:**

- [ ] Clarify requirements and constraints
- [ ] Discuss approach before coding
- [ ] Start with brute force, then optimize
- [ ] Test with examples
- [ ] Analyze time and space complexity

**Common Interview Topics:**

- Arrays and String manipulation
- Linked List operations
- Tree and Graph traversals
- Dynamic Programming
- Two Pointers and Sliding Window
- Binary Search variations

### 🏢 Company-Specific Preparation

- **Google**: Focus on [Graph Algorithms](./4-Algorithms/GraphAlgorithms/) and [System Design](./0-SystemDesign/)
- **Amazon**: Emphasize [Trees](./2-DataStructures/Trees/) and [Dynamic Programming](./4-Algorithms/DynamicProgramming/)
- **Microsoft**: Practice [Arrays](./2-DataStructures/Arrays/) and [String Problems](./2-DataStructures/Strings/)
- **Facebook/Meta**: Master [Graph Problems](./2-DataStructures/Graphs/) and [DFS/BFS](./4-Algorithms/GraphAlgorithms/)

## 🛠️ Practice Resources

### Online Platforms

- [LeetCode](https://leetcode.com/) - Primary practice platform
- [HackerRank](https://www.hackerrank.com/) - Additional practice
- [CodeSignal](https://codesignal.com/) - Interview simulation
- [Pramp](https://www.pramp.com/) - Mock interviews

### Books

- "Cracking the Coding Interview" by Gayle McDowell
- "Elements of Programming Interviews" by Aziz, Lee, and Prakash
- "Algorithm Design Manual" by Steven Skiena

### YouTube Channels

- [Complete Java DSA playlist - By Kunal Kushwaha](https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ)
- [System Design - By Hello Interview](https://www.youtube.com/@hello_interview)

## 📋 Coding Conventions

### Documentation Standards

- Each folder contains a comprehensive README
- Code includes time/space complexity analysis
- Examples include multiple test cases
- Solutions explain the thought process

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-algorithm`
3. Commit changes: `git commit -am 'Add new sorting algorithm'`
4. Push to branch: `git push origin feature/new-algorithm`
5. Submit a Pull Request

### Areas for Contribution

- New algorithm implementations
- Additional practice problems
- Improved explanations
- Test cases and examples
- Performance optimizations

## 📊 Progress Tracking

Use the following template to track your progress:

```markdown
## My Study Progress

### Data Structures

- [ ] String
- [ ] Arrays
- [ ] Linked Lists
- [ ] Stacks & Queues
- [ ] Trees
- [ ] Graphs
- [ ] Hash Tables
- [ ] Heaps

### Algorithms

- [ ] Sorting
- [ ] Searching
- [ ] Recursion
- [ ] Dynamic Programming
- [ ] Greedy
- [ ] Graph Algorithms

### Problem Patterns

- [ ] Two Pointers
- [ ] Sliding Window
- [ ] Fast & Slow Pointers
- [ ] Merge Intervals
- [ ] Cyclic Sort
- [ ] Tree BFS/DFS
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by various coding interview preparation resources
- Thanks to the open-source community for algorithm implementations
- Special thanks to all contributors

---

**Happy Coding! 🚀**

_Star ⭐ this repository if you find it helpful for your interview preparation!_
