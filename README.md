# Technical Interview Study Repository

[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://github.com/ravindrasinghshah/technical-interview-preparation-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A comprehensive Data Structures and Algorithms study repository designed for technical interview preparation.

## 📚 Table of Contents

- [Quick Start](#-quick-start)
- [Study Plans](#-study-plans)
- [Repository Structure](#-repository-structure)
- [Learning Path](#-learning-path)
- [Interview Preparation](#-interview-preparation)
- [Practice Resources](#-practice-resources)
- [Coding Conventions](#-coding-conventions)
- [Contributing](#-contributing)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ravindrasinghshah/technical-interview-preparation-kit.git
cd technical-interview-preparation-kit

# Install dependencies
npm install

# Run tests
npm test
```

## 📅 Study Plans

### 🎯 30-Day Interview Prep

**Week 1: Foundations**

- Day 1-2: [Complexity Analysis](./1-Complexity/)
- Day 3-4: [Arrays & Strings](./2-DataStructures/Arrays/)
- Day 5-7: [Linked Lists](./2-DataStructures/LinkedLists/)

**Week 2: Core Data Structures**

- Day 8-10: [Stacks & Queues](./2-DataStructures/StacksQueues/)
- Day 11-12: [Trees & Binary Trees](./2-DataStructures/Trees/)
- Day 13-14: [Hash Tables](./2-DataStructures/HashTables/)

**Week 3: Advanced Concepts**

- Day 15-17: [Graphs](./2-DataStructures/Graphs/)
- Day 18-19: [Heaps](./2-DataStructures/Heaps/)
- Day 20-21: [Dynamic Programming](./3-Algorithms/DynamicProgramming/)

**Week 4: Problem Patterns & Mock Interviews**

- Day 22-24: [Common Patterns](./4-Patterns/)
- Day 25-27: [System Design Basics](./0-SystemDesign/)
- Day 28-30: Mock interviews and review

### 🔥 Intensive 2-Week Sprint

**Week 1: High-Frequency Problems**

- Focus on [Top 100 LeetCode Questions](./6-Exercises/Top100/)
- Practice [Common Patterns](./4-Patterns/) daily

**Week 2: Company-Specific Prep**

- [FAANG Questions](./6-Exercises/FAANG/)
- [System Design Interview](./0-SystemDesign/)
- Mock technical interviews

### 📚 Comprehensive 3-Month Program

**Month 1: Fundamentals**

- Complete all [Basics](./0-Basics/)
- Master [Core Data Structures](./2-DataStructures/)
- Practice [Fundamental Algorithms](./3-Algorithms/)

**Month 2: Advanced Topics**

- Advanced algorithms and optimization
- Complex problem-solving patterns
- System design fundamentals

**Month 3: Interview Mastery**

- Company-specific preparation
- Advanced system design
- Behavioral interview prep

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
│   ├── StacksQueues/         # Stack & queue implementations
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
├── 5-Strings/                # String algorithms
│   ├── Palindromes/          # String operations
│   ├── Matching/             # Pattern matching
│   └── Advanced/             # KMP, Rabin-Karp, etc.
└── 6-Exercises/              # Practice problems
```

## 🎯 Learning Path

### For Beginners

1. Start with [Basics](./0-Basics/) - programming fundamentals
2. Learn [Complexity Analysis](./1-Complexity/) - understand Big O
3. Master core [Data Structures](./2-DataStructures/) one by one
4. Practice [Easy Problems](./6-Exercises/Easy/) regularly

### For Intermediate

1. Review and strengthen data structure knowledge
2. Focus on [Algorithm Implementation](./3-Algorithms/)
3. Learn [Problem Patterns](./4-Patterns/)
4. Tackle [Medium Problems](./6-Exercises/Medium/)

### For Advanced

1. Master [Dynamic Programming](./3-Algorithms/DynamicProgramming/)
2. Study [System Design](./0-SystemDesign/)
3. Solve [Hard Problems](./6-Exercises/Hard/)
4. Practice [FAANG-level questions](./6-Exercises/FAANG/)

## 💼 Interview Preparation

### 📝 Coding Interview Checklist

**Before the Interview:**

- [ ] Review [Big O Complexity](./1-Complexity/)
- [ ] Practice [Common Patterns](./4-Patterns/)
- [ ] Solve recent problems from [Top 100](./6-Exercises/Top100/)
- [ ] Review [String Algorithms](./5-Strings/)

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

- **Google**: Focus on [Graph Algorithms](./3-Algorithms/GraphAlgorithms/) and [System Design](./0-SystemDesign/)
- **Amazon**: Emphasize [Trees](./2-DataStructures/Trees/) and [Dynamic Programming](./3-Algorithms/DynamicProgramming/)
- **Microsoft**: Practice [Arrays](./2-DataStructures/Arrays/) and [String Problems](./5-Strings/)
- **Facebook/Meta**: Master [Graph Problems](./2-DataStructures/Graphs/) and [DFS/BFS](./3-Algorithms/GraphAlgorithms/)

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

- Back To Back SWE
- Tech Dose
- Abdul Bari

## 📋 Coding Conventions

### File Structure

```
Topic/
├── README.md              # Topic overview and concepts
├── implementation.js      # Basic implementation
├── variations.js          # Different variations
├── examples.js           # Practical examples
├── exercises.js          # Practice problems
└── solutions.js          # Solutions with explanations
```

### Code Style

```javascript
/**
 * Problem: [Problem Title]
 * Difficulty: Easy/Medium/Hard
 * Pattern: [Algorithm Pattern if applicable]
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Approach:
 * 1. Step-by-step explanation
 * 2. Key insights
 * 3. Edge cases to consider
 */
function solutionName(input) {
  // Implementation with comments
  // explaining key steps
}

// Test cases
console.log(solutionName(test1)); // Expected output
console.log(solutionName(test2)); // Expected output
```

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
