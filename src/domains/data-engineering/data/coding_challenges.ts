import type { CodingChallenge } from '../../../core/types/types';

export const codingChallenges: CodingChallenge[] = [
  {
    "id": "py-c-1",
    "topicId": "python-topic-1",
    "category": "python",
    "title": "Data Engineering: Palindrome Check",
    "question": "Write a Python function `solve(data)` that takes a string `data` and returns True if it is a palindrome (reads the same forwards and backwards) and False otherwise. Ignore case and spaces.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Write Python solution\n    return False",
    "solutionCode": "def solve(data):\n    cleaned = ''.join(char.lower() for char in data if char.isalnum())\n    return cleaned == cleaned[::-1]",
    "testCases": [
      { "input": "'A man, a plan, a canal: Panama'", "expected": "True" },
      { "input": "'race a car'", "expected": "False" },
      { "input": "'Was it a car or a cat I saw?'", "expected": "True" }
    ],
    "hint": "1. Strip non-alphanumeric characters. \n2. Convert everything to lowercase.\n3. Compare the string to its reverse.",
    "difficulty": "easy",
    "exampleInput": "'A man, a plan, a canal: Panama'",
    "exampleOutput": "True",
    "constraints": "Data size up to 10^5 characters. Time complexity should be O(N).",
    "hints": [
      "Use python's built in string methods like .isalnum() to filter characters.",
      "String slicing like [::-1] makes reversing strings in python O(N) and very concise."
    ],
    "bruteForce": "Use two loops to check characters from start and end, skipping spaces manually. Time Complexity: O(N).",
    "optimized": "Clean the string using a generator expression, then compare it to its slice reverse. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(N) for the cleaned string"
    },
    "discussion": {
      "whyAsked": "Tests string manipulation, basic algorithms, and edge case handling (spaces, punctuation).",
      "mistakes": "Forgetting to handle case insensitivity or punctuation.",
      "followUps": [
        "How would you do this in O(1) space?",
        "Can you implement it using two pointers?"
      ]
    }
  },
  {
    "id": "py-c-2",
    "topicId": "python-topic-2",
    "category": "python",
    "title": "Two Sum (Data Analysis)",
    "question": "Given a list of transaction amounts and a target amount, write a function `solve(data)` where data is a list containing `[transactions, target]`. Return a list of the INDICES of the two numbers such that they add up to the target. Assume exactly one solution.",
    "type": "python",
    "initialCode": "def solve(data):\n    transactions, target = data[0], data[1]\n    # Return [index1, index2]\n    return []",
    "solutionCode": "def solve(data):\n    transactions, target = data[0], data[1]\n    seen = {}\n    for i, num in enumerate(transactions):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []",
    "testCases": [
      { "input": "[[2, 7, 11, 15], 9]", "expected": "[0, 1]" },
      { "input": "[[3, 2, 4], 6]", "expected": "[1, 2]" },
      { "input": "[[3, 3], 6]", "expected": "[0, 1]" }
    ],
    "hint": "1. Use a dictionary (Hash Map) to store numbers you've already seen.\n2. For each number, check if the difference (target - number) is in the dictionary.",
    "difficulty": "medium",
    "exampleInput": "[[2, 7, 11, 15], 9]",
    "exampleOutput": "[0, 1]",
    "constraints": "Array length up to 10^4. Elements up to 10^9.",
    "hints": [
      "A brute force approach uses nested loops, resulting in O(N^2) time.",
      "A hash map allows O(1) lookups, bringing the time down to O(N)."
    ],
    "bruteForce": "Iterate through every possible pair of numbers. Time Complexity: O(N^2).",
    "optimized": "Use a hash map to keep track of visited numbers and their indices. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "discussion": {
      "whyAsked": "A classic algorithm question that tests your ability to optimize from O(N^2) to O(N) using auxiliary space.",
      "mistakes": "Returning the numbers instead of their indices, or using the same element twice.",
      "followUps": [
        "What if the array is sorted? Can we do it in O(1) space?"
      ]
    }
  },
  {
    "id": "py-c-3",
    "topicId": "python-topic-3",
    "category": "python",
    "title": "Data Deduplication",
    "question": "Write a function `solve(data)` that takes a list of integers and returns the length of the list after removing all duplicates in-place. The list is NOT sorted. You must return a list containing `[new_length, sorted_unique_array]`.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Return [new_length, sorted_unique_array]\n    return [0, []]",
    "solutionCode": "def solve(data):\n    unique_data = sorted(list(set(data)))\n    return [len(unique_data), unique_data]",
    "testCases": [
      { "input": "[3, 1, 2, 3, 1, 4]", "expected": "[4, [1, 2, 3, 4]]" },
      { "input": "[1, 1, 1, 1]", "expected": "[1, [1]]" },
      { "input": "[9, 8, 7]", "expected": "[3, [7, 8, 9]]" }
    ],
    "hint": "1. Python's `set()` removes duplicates.\n2. You can then convert back to a list and sort it.",
    "difficulty": "easy",
    "exampleInput": "[3, 1, 2, 3, 1, 4]",
    "exampleOutput": "[4, [1, 2, 3, 4]]",
    "constraints": "Array length up to 10^5.",
    "hints": [
      "A set is an unordered collection with no duplicate elements."
    ],
    "bruteForce": "Iterate through the array and add elements to a new array if they don't exist. Time Complexity: O(N^2).",
    "optimized": "Convert to a set to remove duplicates, then sort. Time Complexity: O(N log N).",
    "complexity": {
      "time": "O(N log N)",
      "space": "O(N)"
    },
    "discussion": {
      "whyAsked": "Tests basic data structure usage and knowledge of built-in functions.",
      "mistakes": "Forgetting that sets are unordered and failing to sort the result.",
      "followUps": [
        "How would you do this if the input was already sorted?"
      ]
    }
  },
  {
    "id": "py-c-4",
    "topicId": "python-topic-4",
    "category": "python",
    "title": "Find the Missing Event ID",
    "question": "You are given a list containing `n` distinct event IDs taken from the range `0, 1, 2, ..., n`. However, one event ID is missing from the range. Write a function `solve(data)` to return the missing event ID.",
    "type": "python",
    "initialCode": "def solve(data):\n    # Return the missing integer\n    return -1",
    "solutionCode": "def solve(data):\n    n = len(data)\n    expected_sum = n * (n + 1) // 2\n    actual_sum = sum(data)\n    return expected_sum - actual_sum",
    "testCases": [
      { "input": "[3, 0, 1]", "expected": "2" },
      { "input": "[0, 1]", "expected": "2" },
      { "input": "[9, 6, 4, 2, 3, 5, 7, 0, 1]", "expected": "8" }
    ],
    "hint": "1. The sum of numbers from 0 to n is n*(n+1)/2.\n2. The difference between the expected sum and the actual sum is the missing number.",
    "difficulty": "medium",
    "exampleInput": "[3, 0, 1]",
    "exampleOutput": "2",
    "constraints": "n up to 10^4.",
    "hints": [
      "You can solve this without sorting the array.",
      "Math is your friend. Think about the formula for the sum of an arithmetic progression."
    ],
    "bruteForce": "Sort the array and check for the missing number. Time Complexity: O(N log N).",
    "optimized": "Calculate the expected sum and subtract the actual sum. Time Complexity: O(N).",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "Tests ability to recognize mathematical shortcuts to algorithmic problems.",
      "mistakes": "Sorting the array or using a hash set, both of which use extra time/space.",
      "followUps": [
        "Can you solve this using bitwise XOR?"
      ]
    }
  },
  {
    "id": "py-c-5",
    "topicId": "python-topic-5",
    "category": "python",
    "title": "ETL Window Aggregation",
    "question": "Given an array of integers representing stream data and a window size `k`, write a function `solve(data)` where data is `[stream, k]`. Return a list of the maximum values in each sliding window of size `k`.",
    "type": "python",
    "initialCode": "def solve(data):\n    stream, k = data[0], data[1]\n    # Return the list of maximums\n    return []",
    "solutionCode": "def solve(data):\n    stream, k = data[0], data[1]\n    if not stream: return []\n    return [max(stream[i:i+k]) for i in range(len(stream) - k + 1)]",
    "testCases": [
      { "input": "[[1, 3, -1, -3, 5, 3, 6, 7], 3]", "expected": "[3, 3, 5, 5, 6, 7]" },
      { "input": "[[1], 1]", "expected": "[1]" },
      { "input": "[[9, 11], 2]", "expected": "[11]" }
    ],
    "hint": "1. You can iterate through the array up to `len - k + 1`.\n2. In each iteration, take the slice of size `k` and find its maximum.",
    "difficulty": "hard",
    "exampleInput": "[[1, 3, -1, -3, 5, 3, 6, 7], 3]",
    "exampleOutput": "[3, 3, 5, 5, 6, 7]",
    "constraints": "Array length up to 10^3. k is positive.",
    "hints": [
      "The naive approach takes O(N * k) time.",
      "A more advanced solution uses a Deque to achieve O(N) time."
    ],
    "bruteForce": "For each window of size k, scan the elements to find the max. Time Complexity: O(N * k).",
    "optimized": "Use list comprehensions for a clean O(N*k) solution. (For O(N), use collections.deque).",
    "complexity": {
      "time": "O(N * k)",
      "space": "O(N - k + 1)"
    },
    "discussion": {
      "whyAsked": "A very common streaming data problem evaluating efficiency and data structure knowledge.",
      "mistakes": "Going out of bounds on the array slice.",
      "followUps": [
        "How do you implement this in O(N) time using a monotonically decreasing deque?"
      ]
    }
  },
  {
    "id": "sql-c-1",
    "topicId": "sql-topic-1",
    "category": "sql",
    "title": "Highest Earning Employee",
    "question": "Write a SQL query to find the employee with the highest salary in the `employees` table. Output the `name` and `salary`.",
    "type": "sql",
    "setupSql": "CREATE TABLE employees (id INT, name VARCHAR(255), salary INT);\nINSERT INTO employees VALUES (1, 'Alice', 50000), (2, 'Bob', 80000), (3, 'Charlie', 80000), (4, 'David', 60000);",
    "initialCode": "-- Write your SQL query here\nSELECT * FROM employees;",
    "solutionCode": "SELECT name, salary FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);",
    "hint": "1. Find the maximum salary using a subquery.\n2. Select employees whose salary equals that maximum.",
    "difficulty": "easy",
    "exampleInput": "Table: employees (id, name, salary)",
    "exampleOutput": "name | salary\nBob | 80000\nCharlie | 80000",
    "constraints": "Return all employees if there is a tie for the highest salary.",
    "hints": [
      "Do not use ORDER BY ... LIMIT 1 because there might be ties!"
    ],
    "bruteForce": "Order by salary descending and limit to 1 (Fails on ties).",
    "optimized": "Use a subquery to find the MAX(salary), or use dense_rank() window function.",
    "complexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "discussion": {
      "whyAsked": "Tests basic SQL subqueries and handling of ties (a very common real-world scenario).",
      "mistakes": "Using LIMIT 1 which arbitrarily drops tied records.",
      "followUps": [
        "How would you find the 2nd highest salary?"
      ]
    }
  },
  {
    "id": "sql-c-2",
    "topicId": "sql-topic-2",
    "category": "sql",
    "title": "Department Top Earners",
    "question": "Find the employees who earn the most in each department. Output `department_id`, `name`, and `salary`.",
    "type": "sql",
    "setupSql": "CREATE TABLE employees (id INT, name VARCHAR(255), salary INT, department_id INT);\nINSERT INTO employees VALUES (1, 'Alice', 70000, 1), (2, 'Bob', 80000, 1), (3, 'Charlie', 80000, 1), (4, 'David', 60000, 2), (5, 'Eve', 90000, 2);",
    "initialCode": "-- Write your SQL query here\nSELECT * FROM employees;",
    "solutionCode": "SELECT department_id, name, salary FROM employees e1 WHERE salary = (SELECT MAX(salary) FROM employees e2 WHERE e1.department_id = e2.department_id);",
    "hint": "1. You can use a correlated subquery.\n2. Or you can use a JOIN with a GROUP BY subquery.",
    "difficulty": "medium",
    "exampleInput": "Table: employees (id, name, salary, department_id)",
    "exampleOutput": "department_id | name | salary\n1 | Bob | 80000\n1 | Charlie | 80000\n2 | Eve | 90000",
    "constraints": "Include ties.",
    "hints": [
      "A window function like RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) is highly efficient here if supported."
    ],
    "bruteForce": "N/A",
    "optimized": "Use Correlated Subquery or Window Functions.",
    "complexity": {
      "time": "O(N log N) or O(N^2) depending on index and engine",
      "space": "O(N)"
    },
    "discussion": {
      "whyAsked": "Tests group-wise maximums, a staple pattern in reporting.",
      "mistakes": "Just grouping by department and taking max(salary) loses the employee name.",
      "followUps": [
        "Rewrite this using the DENSE_RANK() window function."
      ]
    }
  },
  {
    "id": "sql-c-3",
    "topicId": "sql-topic-3",
    "category": "sql",
    "title": "Daily Active Users",
    "question": "Write a SQL query to find the daily active users (DAU). Output the `login_date` and the count of distinct users as `active_users`.",
    "type": "sql",
    "setupSql": "CREATE TABLE logins (user_id INT, login_date DATE);\nINSERT INTO logins VALUES (1, '2026-06-01'), (2, '2026-06-01'), (1, '2026-06-01'), (3, '2026-06-02'), (1, '2026-06-02');",
    "initialCode": "-- Write your SQL query here\nSELECT * FROM logins;",
    "solutionCode": "SELECT login_date, COUNT(DISTINCT user_id) as active_users FROM logins GROUP BY login_date ORDER BY login_date;",
    "hint": "1. Group by the date.\n2. Use COUNT(DISTINCT ...) to ensure users who log in multiple times a day are only counted once.",
    "difficulty": "easy",
    "exampleInput": "Table: logins (user_id, login_date)",
    "exampleOutput": "login_date | active_users\n2026-06-01 | 2\n2026-06-02 | 2",
    "constraints": "Sort the result by login_date ascending.",
    "hints": [
      "Distinct is crucial here to deduplicate sessions."
    ],
    "bruteForce": "N/A",
    "optimized": "GROUP BY with COUNT DISTINCT.",
    "complexity": {
      "time": "O(N log N) for grouping/sorting",
      "space": "O(N)"
    },
    "discussion": {
      "whyAsked": "DAU is the most basic and common metric requested in data engineering and analytics.",
      "mistakes": "Forgetting DISTINCT and overcounting users.",
      "followUps": [
        "How would you calculate Monthly Active Users (MAU)?"
      ]
    }
  }
];