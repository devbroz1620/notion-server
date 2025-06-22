import React from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { components } from "@/components/markdown-components";


const sampleContent = `
## **Introduction: Why Budgeting Matters**

Budgeting is the foundation of financial stability and a critical first step for anyone aiming to achieve their financial goals. A well-structured budget helps you understand where your money comes from, where it goes, and how you can make it work better for you. It's not just about restricting spending—it's about making smarter choices for a secure and prosperous future.

---

## **1. What Is a Budget?**

A budget is a structured plan that outlines your income and expenses over a specific period, usually a month. It provides a clear overview of how much you earn, spend, save, and invest. By following a budget, you can:

- Avoid overspending
- Prepare for unexpected expenses
- Meet your savings and investment goals
- Reduce debt and improve credit scores.

---

## **2. Steps to Create a Practical Budget**

**Step 1: Calculate Your Income**

- List all sources: salary, business income, freelance work, investments, etc.
- Separate active income (from work) and passive income (from investments).

**Step 2: List and Categorize Your Expenses**

- Essentials: rent, groceries, utilities, EMIs, insurance premiums
- Discretionary: dining out, entertainment, shopping
- Track your expenses for 2-3 months to identify spending patterns.

**Step 3: Set Financial Goals**

- Allocate funds for savings, investments, and debt repayment
- Set short-term (e.g., emergency fund) and long-term (e.g., retirement) goals.

**Step 4: Track and Adjust Spending**

- Monitor your expenses monthly and compare them with your budget
- Cut unnecessary discretionary expenses if you exceed your limits.

**Step 5: Review Regularly**

- Update your budget as your income or expenses change
- Make adjustments to stay aligned with your financial priorities.

---

## **3. Popular Budgeting Methods**

| **Method**               | **Description**                                             |
| ------------------------ | ----------------------------------------------------------- |
| **50/30/20 Rule**        | **50% needs, 30% wants, 20% savings/investments**           |
| **Zero-Based Budgeting** | **Every rupee is assigned a job, leaving zero unallocated** |
| **Envelope System**      | **Allocate cash into envelopes for each spending category** |

**Choose a method that matches your lifestyle and financial goals.**

---

## **4. Tips for Effective Money Management**

- Prioritize Needs Over Wants: Cover essentials first, then discretionary expenses.
- Build an Emergency Fund: Aim for 3-6 months' expenses to handle unforeseen events.
- Automate Savings: Set up automatic transfers to savings or investment accounts.
- Use Tools: Maintain a diary, Excel sheet, or use a budgeting app for tracking.
- Regular Check-ins: Review your budget periodically and make necessary adjustments.

---

## **5. The Benefits of Budgeting**

- Achieve financial discipline and independence
- Reduce debt and interest burden
- Improve credit health
- Make informed investment decisions
- Prepare for emergencies and future needs.

---

## **Conclusion**

Budgeting and money management are lifelong skills that empower you to take control of your finances. Start with a simple budget, stick to it, and adjust as your life evolves. Remember, the goal is not to restrict yourself, but to make your money work for you and build a secure financial future.
`;

export default function MoneyBasicsPostPage() {
  // In real use, fetch your markdown string here
  const content = sampleContent;
  if (!content) return notFound();

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-8">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}