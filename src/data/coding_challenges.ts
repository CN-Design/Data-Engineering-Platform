import type { CodingChallenge } from './types';

export const codingChallenges: CodingChallenge[] = [
  {
    "id": "py-c-1",
    "topicId": "python-topic-1",
    "category": "python",
    "title": "Palindrome Check (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Palindrome Check (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-2",
    "topicId": "python-topic-2",
    "category": "python",
    "title": "Factorial (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Factorial (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-3",
    "topicId": "python-topic-3",
    "category": "python",
    "title": "Fibonacci Series (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Fibonacci Series (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-4",
    "topicId": "python-topic-4",
    "category": "python",
    "title": "Count Vowels (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Count Vowels (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-5",
    "topicId": "python-topic-5",
    "category": "python",
    "title": "Find Largest Number (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Find Largest Number (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-6",
    "topicId": "python-topic-6",
    "category": "python",
    "title": "Remove Duplicates (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Remove Duplicates (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-7",
    "topicId": "python-topic-7",
    "category": "python",
    "title": "Frequency Counter (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Frequency Counter (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-8",
    "topicId": "python-topic-8",
    "category": "python",
    "title": "Sum of Digits (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sum of Digits (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-9",
    "topicId": "python-topic-9",
    "category": "python",
    "title": "Prime Number (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Prime Number (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-10",
    "topicId": "python-topic-10",
    "category": "python",
    "title": "Two Sum (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Two Sum (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-11",
    "topicId": "python-topic-11",
    "category": "python",
    "title": "Merge Intervals (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Merge Intervals (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-12",
    "topicId": "python-topic-12",
    "category": "python",
    "title": "Group Anagrams (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group Anagrams (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-13",
    "topicId": "python-topic-13",
    "category": "python",
    "title": "Sliding Window (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sliding Window (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-14",
    "topicId": "python-topic-14",
    "category": "python",
    "title": "Dictionary Transformations (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Dictionary Transformations (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-15",
    "topicId": "python-topic-15",
    "category": "python",
    "title": "JSON Parsing (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: JSON Parsing (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-16",
    "topicId": "python-topic-16",
    "category": "python",
    "title": "CSV Processing (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CSV Processing (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-17",
    "topicId": "python-topic-17",
    "category": "python",
    "title": "File Processing (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: File Processing (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-18",
    "topicId": "python-topic-18",
    "category": "python",
    "title": "Log Analysis (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Log Analysis (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-19",
    "topicId": "python-topic-19",
    "category": "python",
    "title": "Data Cleaning (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Cleaning (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-20",
    "topicId": "python-topic-20",
    "category": "python",
    "title": "ETL Pipeline Simulation (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Pipeline Simulation (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-21",
    "topicId": "python-topic-21",
    "category": "python",
    "title": "Stream Processing (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Stream Processing (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-22",
    "topicId": "python-topic-22",
    "category": "python",
    "title": "Large File Processing (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Large File Processing (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-23",
    "topicId": "python-topic-23",
    "category": "python",
    "title": "Concurrent Processing (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Concurrent Processing (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-24",
    "topicId": "python-topic-24",
    "category": "python",
    "title": "LRU Cache (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: LRU Cache (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-25",
    "topicId": "python-topic-25",
    "category": "python",
    "title": "Data Aggregation Engine (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Aggregation Engine (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-26",
    "topicId": "python-topic-26",
    "category": "python",
    "title": "Custom Data Validator (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Custom Data Validator (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-27",
    "topicId": "python-topic-27",
    "category": "python",
    "title": "Memory Optimization Problems (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Memory Optimization Problems (Vol 1). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-28",
    "topicId": "python-topic-28",
    "category": "python",
    "title": "Reverse String (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Reverse String (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-29",
    "topicId": "python-topic-29",
    "category": "python",
    "title": "Palindrome Check (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Palindrome Check (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-30",
    "topicId": "python-topic-30",
    "category": "python",
    "title": "Factorial (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Factorial (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-31",
    "topicId": "python-topic-31",
    "category": "python",
    "title": "Fibonacci Series (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Fibonacci Series (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-32",
    "topicId": "python-topic-32",
    "category": "python",
    "title": "Count Vowels (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Count Vowels (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-33",
    "topicId": "python-topic-33",
    "category": "python",
    "title": "Find Largest Number (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Find Largest Number (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-34",
    "topicId": "python-topic-34",
    "category": "python",
    "title": "Remove Duplicates (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Remove Duplicates (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-35",
    "topicId": "python-topic-35",
    "category": "python",
    "title": "Frequency Counter (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Frequency Counter (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-36",
    "topicId": "python-topic-36",
    "category": "python",
    "title": "Sum of Digits (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sum of Digits (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-37",
    "topicId": "python-topic-37",
    "category": "python",
    "title": "Prime Number (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Prime Number (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-38",
    "topicId": "python-topic-38",
    "category": "python",
    "title": "Two Sum (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Two Sum (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-39",
    "topicId": "python-topic-39",
    "category": "python",
    "title": "Merge Intervals (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Merge Intervals (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-40",
    "topicId": "python-topic-40",
    "category": "python",
    "title": "Group Anagrams (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group Anagrams (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-41",
    "topicId": "python-topic-41",
    "category": "python",
    "title": "Sliding Window (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sliding Window (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-42",
    "topicId": "python-topic-42",
    "category": "python",
    "title": "Dictionary Transformations (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Dictionary Transformations (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-43",
    "topicId": "python-topic-43",
    "category": "python",
    "title": "JSON Parsing (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: JSON Parsing (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-44",
    "topicId": "python-topic-44",
    "category": "python",
    "title": "CSV Processing (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CSV Processing (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-45",
    "topicId": "python-topic-45",
    "category": "python",
    "title": "File Processing (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: File Processing (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-46",
    "topicId": "python-topic-46",
    "category": "python",
    "title": "Log Analysis (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Log Analysis (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-47",
    "topicId": "python-topic-47",
    "category": "python",
    "title": "Data Cleaning (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Cleaning (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-48",
    "topicId": "python-topic-48",
    "category": "python",
    "title": "ETL Pipeline Simulation (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Pipeline Simulation (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-49",
    "topicId": "python-topic-49",
    "category": "python",
    "title": "Stream Processing (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Stream Processing (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-50",
    "topicId": "python-topic-50",
    "category": "python",
    "title": "Large File Processing (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Large File Processing (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-51",
    "topicId": "python-topic-51",
    "category": "python",
    "title": "Concurrent Processing (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Concurrent Processing (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-52",
    "topicId": "python-topic-52",
    "category": "python",
    "title": "LRU Cache (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: LRU Cache (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-53",
    "topicId": "python-topic-53",
    "category": "python",
    "title": "Data Aggregation Engine (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Aggregation Engine (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-54",
    "topicId": "python-topic-54",
    "category": "python",
    "title": "Custom Data Validator (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Custom Data Validator (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-55",
    "topicId": "python-topic-55",
    "category": "python",
    "title": "Memory Optimization Problems (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Memory Optimization Problems (Vol 2). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-56",
    "topicId": "python-topic-56",
    "category": "python",
    "title": "Reverse String (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Reverse String (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-57",
    "topicId": "python-topic-57",
    "category": "python",
    "title": "Palindrome Check (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Palindrome Check (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-58",
    "topicId": "python-topic-58",
    "category": "python",
    "title": "Factorial (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Factorial (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-59",
    "topicId": "python-topic-59",
    "category": "python",
    "title": "Fibonacci Series (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Fibonacci Series (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-60",
    "topicId": "python-topic-60",
    "category": "python",
    "title": "Count Vowels (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Count Vowels (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-61",
    "topicId": "python-topic-61",
    "category": "python",
    "title": "Find Largest Number (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Find Largest Number (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-62",
    "topicId": "python-topic-62",
    "category": "python",
    "title": "Remove Duplicates (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Remove Duplicates (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-63",
    "topicId": "python-topic-63",
    "category": "python",
    "title": "Frequency Counter (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Frequency Counter (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-64",
    "topicId": "python-topic-64",
    "category": "python",
    "title": "Sum of Digits (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sum of Digits (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-65",
    "topicId": "python-topic-65",
    "category": "python",
    "title": "Prime Number (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Prime Number (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-66",
    "topicId": "python-topic-66",
    "category": "python",
    "title": "Two Sum (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Two Sum (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-67",
    "topicId": "python-topic-67",
    "category": "python",
    "title": "Merge Intervals (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Merge Intervals (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-68",
    "topicId": "python-topic-68",
    "category": "python",
    "title": "Group Anagrams (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group Anagrams (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-69",
    "topicId": "python-topic-69",
    "category": "python",
    "title": "Sliding Window (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sliding Window (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-70",
    "topicId": "python-topic-70",
    "category": "python",
    "title": "Dictionary Transformations (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Dictionary Transformations (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-71",
    "topicId": "python-topic-71",
    "category": "python",
    "title": "JSON Parsing (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: JSON Parsing (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-72",
    "topicId": "python-topic-72",
    "category": "python",
    "title": "CSV Processing (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CSV Processing (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-73",
    "topicId": "python-topic-73",
    "category": "python",
    "title": "File Processing (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: File Processing (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-74",
    "topicId": "python-topic-74",
    "category": "python",
    "title": "Log Analysis (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Log Analysis (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-75",
    "topicId": "python-topic-75",
    "category": "python",
    "title": "Data Cleaning (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Cleaning (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-76",
    "topicId": "python-topic-76",
    "category": "python",
    "title": "ETL Pipeline Simulation (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Pipeline Simulation (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-77",
    "topicId": "python-topic-77",
    "category": "python",
    "title": "Stream Processing (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Stream Processing (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-78",
    "topicId": "python-topic-78",
    "category": "python",
    "title": "Large File Processing (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Large File Processing (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-79",
    "topicId": "python-topic-79",
    "category": "python",
    "title": "Concurrent Processing (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Concurrent Processing (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-80",
    "topicId": "python-topic-80",
    "category": "python",
    "title": "LRU Cache (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: LRU Cache (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-81",
    "topicId": "python-topic-81",
    "category": "python",
    "title": "Data Aggregation Engine (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Aggregation Engine (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-82",
    "topicId": "python-topic-82",
    "category": "python",
    "title": "Custom Data Validator (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Custom Data Validator (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-83",
    "topicId": "python-topic-83",
    "category": "python",
    "title": "Memory Optimization Problems (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Memory Optimization Problems (Vol 3). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-84",
    "topicId": "python-topic-84",
    "category": "python",
    "title": "Reverse String (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Reverse String (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-85",
    "topicId": "python-topic-85",
    "category": "python",
    "title": "Palindrome Check (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Palindrome Check (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-86",
    "topicId": "python-topic-86",
    "category": "python",
    "title": "Factorial (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Factorial (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-87",
    "topicId": "python-topic-87",
    "category": "python",
    "title": "Fibonacci Series (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Fibonacci Series (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-88",
    "topicId": "python-topic-88",
    "category": "python",
    "title": "Count Vowels (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Count Vowels (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-89",
    "topicId": "python-topic-89",
    "category": "python",
    "title": "Find Largest Number (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Find Largest Number (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-90",
    "topicId": "python-topic-90",
    "category": "python",
    "title": "Remove Duplicates (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Remove Duplicates (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-91",
    "topicId": "python-topic-91",
    "category": "python",
    "title": "Frequency Counter (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Frequency Counter (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-92",
    "topicId": "python-topic-92",
    "category": "python",
    "title": "Sum of Digits (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sum of Digits (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-93",
    "topicId": "python-topic-93",
    "category": "python",
    "title": "Prime Number (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Prime Number (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-94",
    "topicId": "python-topic-94",
    "category": "python",
    "title": "Two Sum (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Two Sum (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-95",
    "topicId": "python-topic-95",
    "category": "python",
    "title": "Merge Intervals (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Merge Intervals (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-96",
    "topicId": "python-topic-96",
    "category": "python",
    "title": "Group Anagrams (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group Anagrams (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-97",
    "topicId": "python-topic-97",
    "category": "python",
    "title": "Sliding Window (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sliding Window (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-98",
    "topicId": "python-topic-98",
    "category": "python",
    "title": "Dictionary Transformations (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Dictionary Transformations (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-99",
    "topicId": "python-topic-99",
    "category": "python",
    "title": "JSON Parsing (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: JSON Parsing (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "py-c-100",
    "topicId": "python-topic-100",
    "category": "python",
    "title": "CSV Processing (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CSV Processing (Vol 4). Handle edge cases and null checks.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-1",
    "topicId": "sql-topic-1",
    "category": "sql",
    "title": "Filtering Data (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-2",
    "topicId": "sql-topic-2",
    "category": "sql",
    "title": "Sorting Data (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sorting Data (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-3",
    "topicId": "sql-topic-3",
    "category": "sql",
    "title": "Aggregations (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-4",
    "topicId": "sql-topic-4",
    "category": "sql",
    "title": "Group By (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group By (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-5",
    "topicId": "sql-topic-5",
    "category": "sql",
    "title": "Having (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Having (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-6",
    "topicId": "sql-topic-6",
    "category": "sql",
    "title": "Joins (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-7",
    "topicId": "sql-topic-7",
    "category": "sql",
    "title": "Subqueries (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Subqueries (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-8",
    "topicId": "sql-topic-8",
    "category": "sql",
    "title": "CTEs (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CTEs (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-9",
    "topicId": "sql-topic-9",
    "category": "sql",
    "title": "Window Functions (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-10",
    "topicId": "sql-topic-10",
    "category": "sql",
    "title": "Ranking Problems (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Ranking Problems (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-11",
    "topicId": "sql-topic-11",
    "category": "sql",
    "title": "Running Totals (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Running Totals (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-12",
    "topicId": "sql-topic-12",
    "category": "sql",
    "title": "Query Optimization (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Query Optimization (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-13",
    "topicId": "sql-topic-13",
    "category": "sql",
    "title": "Sessionization (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sessionization (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-14",
    "topicId": "sql-topic-14",
    "category": "sql",
    "title": "Cohort Analysis (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Cohort Analysis (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-15",
    "topicId": "sql-topic-15",
    "category": "sql",
    "title": "Funnel Analysis (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Funnel Analysis (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-16",
    "topicId": "sql-topic-16",
    "category": "sql",
    "title": "Retention Analysis (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Retention Analysis (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-17",
    "topicId": "sql-topic-17",
    "category": "sql",
    "title": "Complex Window Functions (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Complex Window Functions (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-18",
    "topicId": "sql-topic-18",
    "category": "sql",
    "title": "Recursive Queries (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Recursive Queries (Vol 1). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-19",
    "topicId": "sql-topic-19",
    "category": "sql",
    "title": "Basic SELECT (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic SELECT (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-20",
    "topicId": "sql-topic-20",
    "category": "sql",
    "title": "Filtering Data (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-21",
    "topicId": "sql-topic-21",
    "category": "sql",
    "title": "Sorting Data (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sorting Data (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-22",
    "topicId": "sql-topic-22",
    "category": "sql",
    "title": "Aggregations (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-23",
    "topicId": "sql-topic-23",
    "category": "sql",
    "title": "Group By (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group By (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-24",
    "topicId": "sql-topic-24",
    "category": "sql",
    "title": "Having (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Having (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-25",
    "topicId": "sql-topic-25",
    "category": "sql",
    "title": "Joins (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-26",
    "topicId": "sql-topic-26",
    "category": "sql",
    "title": "Subqueries (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Subqueries (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-27",
    "topicId": "sql-topic-27",
    "category": "sql",
    "title": "CTEs (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CTEs (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-28",
    "topicId": "sql-topic-28",
    "category": "sql",
    "title": "Window Functions (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-29",
    "topicId": "sql-topic-29",
    "category": "sql",
    "title": "Ranking Problems (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Ranking Problems (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-30",
    "topicId": "sql-topic-30",
    "category": "sql",
    "title": "Running Totals (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Running Totals (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-31",
    "topicId": "sql-topic-31",
    "category": "sql",
    "title": "Query Optimization (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Query Optimization (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-32",
    "topicId": "sql-topic-32",
    "category": "sql",
    "title": "Sessionization (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sessionization (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-33",
    "topicId": "sql-topic-33",
    "category": "sql",
    "title": "Cohort Analysis (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Cohort Analysis (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-34",
    "topicId": "sql-topic-34",
    "category": "sql",
    "title": "Funnel Analysis (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Funnel Analysis (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-35",
    "topicId": "sql-topic-35",
    "category": "sql",
    "title": "Retention Analysis (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Retention Analysis (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-36",
    "topicId": "sql-topic-36",
    "category": "sql",
    "title": "Complex Window Functions (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Complex Window Functions (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-37",
    "topicId": "sql-topic-37",
    "category": "sql",
    "title": "Recursive Queries (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Recursive Queries (Vol 2). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-38",
    "topicId": "sql-topic-38",
    "category": "sql",
    "title": "Basic SELECT (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic SELECT (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-39",
    "topicId": "sql-topic-39",
    "category": "sql",
    "title": "Filtering Data (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-40",
    "topicId": "sql-topic-40",
    "category": "sql",
    "title": "Sorting Data (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sorting Data (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-41",
    "topicId": "sql-topic-41",
    "category": "sql",
    "title": "Aggregations (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-42",
    "topicId": "sql-topic-42",
    "category": "sql",
    "title": "Group By (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group By (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-43",
    "topicId": "sql-topic-43",
    "category": "sql",
    "title": "Having (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Having (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-44",
    "topicId": "sql-topic-44",
    "category": "sql",
    "title": "Joins (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-45",
    "topicId": "sql-topic-45",
    "category": "sql",
    "title": "Subqueries (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Subqueries (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-46",
    "topicId": "sql-topic-46",
    "category": "sql",
    "title": "CTEs (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CTEs (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-47",
    "topicId": "sql-topic-47",
    "category": "sql",
    "title": "Window Functions (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-48",
    "topicId": "sql-topic-48",
    "category": "sql",
    "title": "Ranking Problems (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Ranking Problems (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-49",
    "topicId": "sql-topic-49",
    "category": "sql",
    "title": "Running Totals (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Running Totals (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-50",
    "topicId": "sql-topic-50",
    "category": "sql",
    "title": "Query Optimization (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Query Optimization (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-51",
    "topicId": "sql-topic-51",
    "category": "sql",
    "title": "Sessionization (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sessionization (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-52",
    "topicId": "sql-topic-52",
    "category": "sql",
    "title": "Cohort Analysis (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Cohort Analysis (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-53",
    "topicId": "sql-topic-53",
    "category": "sql",
    "title": "Funnel Analysis (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Funnel Analysis (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-54",
    "topicId": "sql-topic-54",
    "category": "sql",
    "title": "Retention Analysis (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Retention Analysis (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-55",
    "topicId": "sql-topic-55",
    "category": "sql",
    "title": "Complex Window Functions (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Complex Window Functions (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-56",
    "topicId": "sql-topic-56",
    "category": "sql",
    "title": "Recursive Queries (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Recursive Queries (Vol 3). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-57",
    "topicId": "sql-topic-57",
    "category": "sql",
    "title": "Basic SELECT (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic SELECT (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-58",
    "topicId": "sql-topic-58",
    "category": "sql",
    "title": "Filtering Data (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-59",
    "topicId": "sql-topic-59",
    "category": "sql",
    "title": "Sorting Data (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sorting Data (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-60",
    "topicId": "sql-topic-60",
    "category": "sql",
    "title": "Aggregations (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-61",
    "topicId": "sql-topic-61",
    "category": "sql",
    "title": "Group By (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group By (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-62",
    "topicId": "sql-topic-62",
    "category": "sql",
    "title": "Having (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Having (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-63",
    "topicId": "sql-topic-63",
    "category": "sql",
    "title": "Joins (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-64",
    "topicId": "sql-topic-64",
    "category": "sql",
    "title": "Subqueries (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Subqueries (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-65",
    "topicId": "sql-topic-65",
    "category": "sql",
    "title": "CTEs (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CTEs (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-66",
    "topicId": "sql-topic-66",
    "category": "sql",
    "title": "Window Functions (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-67",
    "topicId": "sql-topic-67",
    "category": "sql",
    "title": "Ranking Problems (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Ranking Problems (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-68",
    "topicId": "sql-topic-68",
    "category": "sql",
    "title": "Running Totals (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Running Totals (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-69",
    "topicId": "sql-topic-69",
    "category": "sql",
    "title": "Query Optimization (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Query Optimization (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-70",
    "topicId": "sql-topic-70",
    "category": "sql",
    "title": "Sessionization (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sessionization (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-71",
    "topicId": "sql-topic-71",
    "category": "sql",
    "title": "Cohort Analysis (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Cohort Analysis (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-72",
    "topicId": "sql-topic-72",
    "category": "sql",
    "title": "Funnel Analysis (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Funnel Analysis (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-73",
    "topicId": "sql-topic-73",
    "category": "sql",
    "title": "Retention Analysis (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Retention Analysis (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-74",
    "topicId": "sql-topic-74",
    "category": "sql",
    "title": "Complex Window Functions (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Complex Window Functions (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-75",
    "topicId": "sql-topic-75",
    "category": "sql",
    "title": "Recursive Queries (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Recursive Queries (Vol 4). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-76",
    "topicId": "sql-topic-76",
    "category": "sql",
    "title": "Basic SELECT (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic SELECT (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-77",
    "topicId": "sql-topic-77",
    "category": "sql",
    "title": "Filtering Data (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-78",
    "topicId": "sql-topic-78",
    "category": "sql",
    "title": "Sorting Data (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sorting Data (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-79",
    "topicId": "sql-topic-79",
    "category": "sql",
    "title": "Aggregations (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-80",
    "topicId": "sql-topic-80",
    "category": "sql",
    "title": "Group By (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group By (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-81",
    "topicId": "sql-topic-81",
    "category": "sql",
    "title": "Having (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Having (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-82",
    "topicId": "sql-topic-82",
    "category": "sql",
    "title": "Joins (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-83",
    "topicId": "sql-topic-83",
    "category": "sql",
    "title": "Subqueries (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Subqueries (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-84",
    "topicId": "sql-topic-84",
    "category": "sql",
    "title": "CTEs (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CTEs (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-85",
    "topicId": "sql-topic-85",
    "category": "sql",
    "title": "Window Functions (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-86",
    "topicId": "sql-topic-86",
    "category": "sql",
    "title": "Ranking Problems (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Ranking Problems (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-87",
    "topicId": "sql-topic-87",
    "category": "sql",
    "title": "Running Totals (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Running Totals (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-88",
    "topicId": "sql-topic-88",
    "category": "sql",
    "title": "Query Optimization (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Query Optimization (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-89",
    "topicId": "sql-topic-89",
    "category": "sql",
    "title": "Sessionization (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sessionization (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-90",
    "topicId": "sql-topic-90",
    "category": "sql",
    "title": "Cohort Analysis (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Cohort Analysis (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-91",
    "topicId": "sql-topic-91",
    "category": "sql",
    "title": "Funnel Analysis (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Funnel Analysis (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-92",
    "topicId": "sql-topic-92",
    "category": "sql",
    "title": "Retention Analysis (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Retention Analysis (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-93",
    "topicId": "sql-topic-93",
    "category": "sql",
    "title": "Complex Window Functions (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Complex Window Functions (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-94",
    "topicId": "sql-topic-94",
    "category": "sql",
    "title": "Recursive Queries (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Recursive Queries (Vol 5). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-95",
    "topicId": "sql-topic-95",
    "category": "sql",
    "title": "Basic SELECT (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic SELECT (Vol 6). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-96",
    "topicId": "sql-topic-96",
    "category": "sql",
    "title": "Filtering Data (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 6). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-97",
    "topicId": "sql-topic-97",
    "category": "sql",
    "title": "Sorting Data (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Sorting Data (Vol 6). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-98",
    "topicId": "sql-topic-98",
    "category": "sql",
    "title": "Aggregations (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 6). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-99",
    "topicId": "sql-topic-99",
    "category": "sql",
    "title": "Group By (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Group By (Vol 6). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "sql-c-100",
    "topicId": "sql-topic-100",
    "category": "sql",
    "title": "Having (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Having (Vol 6). Handle edge cases and null checks.",
    "type": "sql",
    "initialCode": "SELECT * FROM Orders;",
    "solutionCode": "SELECT customer_id, SUM(amount) FROM Orders GROUP BY customer_id;",
    "schema": "Orders:\n| order_id | customer_id | amount |\n| 1 | 101 | 150 |",
    "setupSql": "CREATE TABLE Orders (order_id INT, customer_id INT, amount INT); INSERT INTO Orders VALUES (1, 101, 150);",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-1",
    "topicId": "pyspark-topic-1",
    "category": "pyspark",
    "title": "Reading Data (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Reading Data (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-2",
    "topicId": "pyspark-topic-2",
    "category": "pyspark",
    "title": "Filtering Data (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-3",
    "topicId": "pyspark-topic-3",
    "category": "pyspark",
    "title": "Selecting Columns (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Selecting Columns (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-4",
    "topicId": "pyspark-topic-4",
    "category": "pyspark",
    "title": "Basic Transformations (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic Transformations (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-5",
    "topicId": "pyspark-topic-5",
    "category": "pyspark",
    "title": "Joins (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-6",
    "topicId": "pyspark-topic-6",
    "category": "pyspark",
    "title": "Aggregations (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-7",
    "topicId": "pyspark-topic-7",
    "category": "pyspark",
    "title": "Window Functions (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-8",
    "topicId": "pyspark-topic-8",
    "category": "pyspark",
    "title": "UDFs (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: UDFs (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-9",
    "topicId": "pyspark-topic-9",
    "category": "pyspark",
    "title": "Spark SQL (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Spark SQL (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-10",
    "topicId": "pyspark-topic-10",
    "category": "pyspark",
    "title": "Partition Optimization (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Partition Optimization (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-11",
    "topicId": "pyspark-topic-11",
    "category": "pyspark",
    "title": "Broadcast Joins (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Broadcast Joins (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-12",
    "topicId": "pyspark-topic-12",
    "category": "pyspark",
    "title": "AQE (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: AQE (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-13",
    "topicId": "pyspark-topic-13",
    "category": "pyspark",
    "title": "Shuffle Optimization (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Shuffle Optimization (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-14",
    "topicId": "pyspark-topic-14",
    "category": "pyspark",
    "title": "Structured Streaming (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Structured Streaming (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-15",
    "topicId": "pyspark-topic-15",
    "category": "pyspark",
    "title": "Delta Processing (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Delta Processing (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-16",
    "topicId": "pyspark-topic-16",
    "category": "pyspark",
    "title": "Large Scale Transformations (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Large Scale Transformations (Vol 1). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-17",
    "topicId": "pyspark-topic-17",
    "category": "pyspark",
    "title": "DataFrame Creation (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: DataFrame Creation (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-18",
    "topicId": "pyspark-topic-18",
    "category": "pyspark",
    "title": "Reading Data (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Reading Data (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-19",
    "topicId": "pyspark-topic-19",
    "category": "pyspark",
    "title": "Filtering Data (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-20",
    "topicId": "pyspark-topic-20",
    "category": "pyspark",
    "title": "Selecting Columns (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Selecting Columns (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-21",
    "topicId": "pyspark-topic-21",
    "category": "pyspark",
    "title": "Basic Transformations (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic Transformations (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-22",
    "topicId": "pyspark-topic-22",
    "category": "pyspark",
    "title": "Joins (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-23",
    "topicId": "pyspark-topic-23",
    "category": "pyspark",
    "title": "Aggregations (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-24",
    "topicId": "pyspark-topic-24",
    "category": "pyspark",
    "title": "Window Functions (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-25",
    "topicId": "pyspark-topic-25",
    "category": "pyspark",
    "title": "UDFs (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: UDFs (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-26",
    "topicId": "pyspark-topic-26",
    "category": "pyspark",
    "title": "Spark SQL (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Spark SQL (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-27",
    "topicId": "pyspark-topic-27",
    "category": "pyspark",
    "title": "Partition Optimization (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Partition Optimization (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-28",
    "topicId": "pyspark-topic-28",
    "category": "pyspark",
    "title": "Broadcast Joins (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Broadcast Joins (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-29",
    "topicId": "pyspark-topic-29",
    "category": "pyspark",
    "title": "AQE (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: AQE (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-30",
    "topicId": "pyspark-topic-30",
    "category": "pyspark",
    "title": "Shuffle Optimization (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Shuffle Optimization (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-31",
    "topicId": "pyspark-topic-31",
    "category": "pyspark",
    "title": "Structured Streaming (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Structured Streaming (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-32",
    "topicId": "pyspark-topic-32",
    "category": "pyspark",
    "title": "Delta Processing (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Delta Processing (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-33",
    "topicId": "pyspark-topic-33",
    "category": "pyspark",
    "title": "Large Scale Transformations (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Large Scale Transformations (Vol 2). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-34",
    "topicId": "pyspark-topic-34",
    "category": "pyspark",
    "title": "DataFrame Creation (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: DataFrame Creation (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-35",
    "topicId": "pyspark-topic-35",
    "category": "pyspark",
    "title": "Reading Data (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Reading Data (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-36",
    "topicId": "pyspark-topic-36",
    "category": "pyspark",
    "title": "Filtering Data (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-37",
    "topicId": "pyspark-topic-37",
    "category": "pyspark",
    "title": "Selecting Columns (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Selecting Columns (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-38",
    "topicId": "pyspark-topic-38",
    "category": "pyspark",
    "title": "Basic Transformations (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic Transformations (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-39",
    "topicId": "pyspark-topic-39",
    "category": "pyspark",
    "title": "Joins (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-40",
    "topicId": "pyspark-topic-40",
    "category": "pyspark",
    "title": "Aggregations (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-41",
    "topicId": "pyspark-topic-41",
    "category": "pyspark",
    "title": "Window Functions (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-42",
    "topicId": "pyspark-topic-42",
    "category": "pyspark",
    "title": "UDFs (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: UDFs (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-43",
    "topicId": "pyspark-topic-43",
    "category": "pyspark",
    "title": "Spark SQL (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Spark SQL (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-44",
    "topicId": "pyspark-topic-44",
    "category": "pyspark",
    "title": "Partition Optimization (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Partition Optimization (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-45",
    "topicId": "pyspark-topic-45",
    "category": "pyspark",
    "title": "Broadcast Joins (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Broadcast Joins (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-46",
    "topicId": "pyspark-topic-46",
    "category": "pyspark",
    "title": "AQE (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: AQE (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-47",
    "topicId": "pyspark-topic-47",
    "category": "pyspark",
    "title": "Shuffle Optimization (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Shuffle Optimization (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-48",
    "topicId": "pyspark-topic-48",
    "category": "pyspark",
    "title": "Structured Streaming (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Structured Streaming (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-49",
    "topicId": "pyspark-topic-49",
    "category": "pyspark",
    "title": "Delta Processing (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Delta Processing (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-50",
    "topicId": "pyspark-topic-50",
    "category": "pyspark",
    "title": "Large Scale Transformations (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Large Scale Transformations (Vol 3). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-51",
    "topicId": "pyspark-topic-51",
    "category": "pyspark",
    "title": "DataFrame Creation (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: DataFrame Creation (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-52",
    "topicId": "pyspark-topic-52",
    "category": "pyspark",
    "title": "Reading Data (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Reading Data (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-53",
    "topicId": "pyspark-topic-53",
    "category": "pyspark",
    "title": "Filtering Data (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-54",
    "topicId": "pyspark-topic-54",
    "category": "pyspark",
    "title": "Selecting Columns (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Selecting Columns (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-55",
    "topicId": "pyspark-topic-55",
    "category": "pyspark",
    "title": "Basic Transformations (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic Transformations (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-56",
    "topicId": "pyspark-topic-56",
    "category": "pyspark",
    "title": "Joins (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-57",
    "topicId": "pyspark-topic-57",
    "category": "pyspark",
    "title": "Aggregations (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-58",
    "topicId": "pyspark-topic-58",
    "category": "pyspark",
    "title": "Window Functions (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-59",
    "topicId": "pyspark-topic-59",
    "category": "pyspark",
    "title": "UDFs (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: UDFs (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-60",
    "topicId": "pyspark-topic-60",
    "category": "pyspark",
    "title": "Spark SQL (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Spark SQL (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-61",
    "topicId": "pyspark-topic-61",
    "category": "pyspark",
    "title": "Partition Optimization (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Partition Optimization (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-62",
    "topicId": "pyspark-topic-62",
    "category": "pyspark",
    "title": "Broadcast Joins (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Broadcast Joins (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-63",
    "topicId": "pyspark-topic-63",
    "category": "pyspark",
    "title": "AQE (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: AQE (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-64",
    "topicId": "pyspark-topic-64",
    "category": "pyspark",
    "title": "Shuffle Optimization (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Shuffle Optimization (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-65",
    "topicId": "pyspark-topic-65",
    "category": "pyspark",
    "title": "Structured Streaming (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Structured Streaming (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-66",
    "topicId": "pyspark-topic-66",
    "category": "pyspark",
    "title": "Delta Processing (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Delta Processing (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-67",
    "topicId": "pyspark-topic-67",
    "category": "pyspark",
    "title": "Large Scale Transformations (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Large Scale Transformations (Vol 4). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-68",
    "topicId": "pyspark-topic-68",
    "category": "pyspark",
    "title": "DataFrame Creation (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: DataFrame Creation (Vol 5). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-69",
    "topicId": "pyspark-topic-69",
    "category": "pyspark",
    "title": "Reading Data (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Reading Data (Vol 5). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-70",
    "topicId": "pyspark-topic-70",
    "category": "pyspark",
    "title": "Filtering Data (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Filtering Data (Vol 5). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-71",
    "topicId": "pyspark-topic-71",
    "category": "pyspark",
    "title": "Selecting Columns (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Selecting Columns (Vol 5). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-72",
    "topicId": "pyspark-topic-72",
    "category": "pyspark",
    "title": "Basic Transformations (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Basic Transformations (Vol 5). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-73",
    "topicId": "pyspark-topic-73",
    "category": "pyspark",
    "title": "Joins (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Joins (Vol 5). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-74",
    "topicId": "pyspark-topic-74",
    "category": "pyspark",
    "title": "Aggregations (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Aggregations (Vol 5). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "pyspark-c-75",
    "topicId": "pyspark-topic-75",
    "category": "pyspark",
    "title": "Window Functions (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Window Functions (Vol 5). Handle edge cases and null checks.",
    "type": "pyspark",
    "initialCode": "def process(df):\n    # Write PySpark transformation\n    return df",
    "solutionCode": "def process(df):\n    return df.groupBy(\"customer_id\").sum(\"amount\")",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-1",
    "topicId": "data-engineering-topic-1",
    "category": "data-engineering",
    "title": "Data Modeling (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Modeling (Vol 1). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-2",
    "topicId": "data-engineering-topic-2",
    "category": "data-engineering",
    "title": "CDC Ingestion (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CDC Ingestion (Vol 1). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-3",
    "topicId": "data-engineering-topic-3",
    "category": "data-engineering",
    "title": "Streaming Pipelines (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Streaming Pipelines (Vol 1). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-4",
    "topicId": "data-engineering-topic-4",
    "category": "data-engineering",
    "title": "System Design (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: System Design (Vol 1). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-5",
    "topicId": "data-engineering-topic-5",
    "category": "data-engineering",
    "title": "Architecture Design (Vol 1)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Architecture Design (Vol 1). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-6",
    "topicId": "data-engineering-topic-6",
    "category": "data-engineering",
    "title": "ETL Design (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Design (Vol 2). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-7",
    "topicId": "data-engineering-topic-7",
    "category": "data-engineering",
    "title": "Data Modeling (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Modeling (Vol 2). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-8",
    "topicId": "data-engineering-topic-8",
    "category": "data-engineering",
    "title": "CDC Ingestion (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CDC Ingestion (Vol 2). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-9",
    "topicId": "data-engineering-topic-9",
    "category": "data-engineering",
    "title": "Streaming Pipelines (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Streaming Pipelines (Vol 2). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-10",
    "topicId": "data-engineering-topic-10",
    "category": "data-engineering",
    "title": "System Design (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: System Design (Vol 2). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-11",
    "topicId": "data-engineering-topic-11",
    "category": "data-engineering",
    "title": "Architecture Design (Vol 2)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Architecture Design (Vol 2). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-12",
    "topicId": "data-engineering-topic-12",
    "category": "data-engineering",
    "title": "ETL Design (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Design (Vol 3). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-13",
    "topicId": "data-engineering-topic-13",
    "category": "data-engineering",
    "title": "Data Modeling (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Modeling (Vol 3). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-14",
    "topicId": "data-engineering-topic-14",
    "category": "data-engineering",
    "title": "CDC Ingestion (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CDC Ingestion (Vol 3). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-15",
    "topicId": "data-engineering-topic-15",
    "category": "data-engineering",
    "title": "Streaming Pipelines (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Streaming Pipelines (Vol 3). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-16",
    "topicId": "data-engineering-topic-16",
    "category": "data-engineering",
    "title": "System Design (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: System Design (Vol 3). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-17",
    "topicId": "data-engineering-topic-17",
    "category": "data-engineering",
    "title": "Architecture Design (Vol 3)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Architecture Design (Vol 3). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-18",
    "topicId": "data-engineering-topic-18",
    "category": "data-engineering",
    "title": "ETL Design (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Design (Vol 4). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-19",
    "topicId": "data-engineering-topic-19",
    "category": "data-engineering",
    "title": "Data Modeling (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Modeling (Vol 4). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-20",
    "topicId": "data-engineering-topic-20",
    "category": "data-engineering",
    "title": "CDC Ingestion (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CDC Ingestion (Vol 4). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-21",
    "topicId": "data-engineering-topic-21",
    "category": "data-engineering",
    "title": "Streaming Pipelines (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Streaming Pipelines (Vol 4). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-22",
    "topicId": "data-engineering-topic-22",
    "category": "data-engineering",
    "title": "System Design (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: System Design (Vol 4). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-23",
    "topicId": "data-engineering-topic-23",
    "category": "data-engineering",
    "title": "Architecture Design (Vol 4)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Architecture Design (Vol 4). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-24",
    "topicId": "data-engineering-topic-24",
    "category": "data-engineering",
    "title": "ETL Design (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Design (Vol 5). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-25",
    "topicId": "data-engineering-topic-25",
    "category": "data-engineering",
    "title": "Data Modeling (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Modeling (Vol 5). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-26",
    "topicId": "data-engineering-topic-26",
    "category": "data-engineering",
    "title": "CDC Ingestion (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CDC Ingestion (Vol 5). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-27",
    "topicId": "data-engineering-topic-27",
    "category": "data-engineering",
    "title": "Streaming Pipelines (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Streaming Pipelines (Vol 5). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-28",
    "topicId": "data-engineering-topic-28",
    "category": "data-engineering",
    "title": "System Design (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: System Design (Vol 5). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-29",
    "topicId": "data-engineering-topic-29",
    "category": "data-engineering",
    "title": "Architecture Design (Vol 5)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Architecture Design (Vol 5). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-30",
    "topicId": "data-engineering-topic-30",
    "category": "data-engineering",
    "title": "ETL Design (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Design (Vol 6). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-31",
    "topicId": "data-engineering-topic-31",
    "category": "data-engineering",
    "title": "Data Modeling (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Modeling (Vol 6). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-32",
    "topicId": "data-engineering-topic-32",
    "category": "data-engineering",
    "title": "CDC Ingestion (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CDC Ingestion (Vol 6). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-33",
    "topicId": "data-engineering-topic-33",
    "category": "data-engineering",
    "title": "Streaming Pipelines (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Streaming Pipelines (Vol 6). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-34",
    "topicId": "data-engineering-topic-34",
    "category": "data-engineering",
    "title": "System Design (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: System Design (Vol 6). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-35",
    "topicId": "data-engineering-topic-35",
    "category": "data-engineering",
    "title": "Architecture Design (Vol 6)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Architecture Design (Vol 6). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-36",
    "topicId": "data-engineering-topic-36",
    "category": "data-engineering",
    "title": "ETL Design (Vol 7)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Design (Vol 7). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-37",
    "topicId": "data-engineering-topic-37",
    "category": "data-engineering",
    "title": "Data Modeling (Vol 7)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Modeling (Vol 7). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-38",
    "topicId": "data-engineering-topic-38",
    "category": "data-engineering",
    "title": "CDC Ingestion (Vol 7)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CDC Ingestion (Vol 7). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-39",
    "topicId": "data-engineering-topic-39",
    "category": "data-engineering",
    "title": "Streaming Pipelines (Vol 7)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Streaming Pipelines (Vol 7). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-40",
    "topicId": "data-engineering-topic-40",
    "category": "data-engineering",
    "title": "System Design (Vol 7)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: System Design (Vol 7). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-41",
    "topicId": "data-engineering-topic-41",
    "category": "data-engineering",
    "title": "Architecture Design (Vol 7)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Architecture Design (Vol 7). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-42",
    "topicId": "data-engineering-topic-42",
    "category": "data-engineering",
    "title": "ETL Design (Vol 8)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Design (Vol 8). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-43",
    "topicId": "data-engineering-topic-43",
    "category": "data-engineering",
    "title": "Data Modeling (Vol 8)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Modeling (Vol 8). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-44",
    "topicId": "data-engineering-topic-44",
    "category": "data-engineering",
    "title": "CDC Ingestion (Vol 8)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CDC Ingestion (Vol 8). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-45",
    "topicId": "data-engineering-topic-45",
    "category": "data-engineering",
    "title": "Streaming Pipelines (Vol 8)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Streaming Pipelines (Vol 8). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-46",
    "topicId": "data-engineering-topic-46",
    "category": "data-engineering",
    "title": "System Design (Vol 8)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: System Design (Vol 8). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-47",
    "topicId": "data-engineering-topic-47",
    "category": "data-engineering",
    "title": "Architecture Design (Vol 8)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Architecture Design (Vol 8). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-48",
    "topicId": "data-engineering-topic-48",
    "category": "data-engineering",
    "title": "ETL Design (Vol 9)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: ETL Design (Vol 9). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "hard",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-49",
    "topicId": "data-engineering-topic-49",
    "category": "data-engineering",
    "title": "Data Modeling (Vol 9)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: Data Modeling (Vol 9). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "easy",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  },
  {
    "id": "de-c-50",
    "topicId": "data-engineering-topic-50",
    "category": "data-engineering",
    "title": "CDC Ingestion (Vol 9)",
    "question": "Problem Statement:\nWrite a program/query to solve the challenge: CDC Ingestion (Vol 9). Handle edge cases and null checks.",
    "type": "scenario",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return data",
    "solutionCode": "def solve(data):\n    return data[::-1]",
    "hint": "1. Check input bounds.\n2. Consider memory layout.\n3. Think about partitioning keys.",
    "difficulty": "medium",
    "exampleInput": "Input: [Sample records / array]",
    "exampleOutput": "Output: [Result values]",
    "constraints": "Constraints: Data size up to 10M rows. Memory threshold 2GB.",
    "hints": [
      "Small clue: Filter records before performing joins.",
      "Medium clue: Leverage in-memory structures or indexing.",
      "Strong clue: Use analytical window functions to partition rows."
    ],
    "bruteForce": "Check every row using nested iterations. Time Complexity: O(N^2).",
    "optimized": "Use hash maps or partition skipping indexes. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "To test execution planning and scaling concepts in distributed jobs.",
      "mistakes": "Forgetting memory eviction bounds and GC pause issues.",
      "followUps": [
        "How does this scale to 100TB?",
        "Can we execute this as a streaming ingestion pipeline?"
      ]
    }
  }
];