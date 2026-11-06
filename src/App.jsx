import React, { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  ChartNoAxesCombined,
  Bot,
  Target,
  Settings,
  Bell,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Sparkles,
  CreditCard,
  ShoppingBag,
  Coffee,
  Menu,
  Send,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  DollarSign,
  PieChart as PieChartIcon,
  Shield,
  X,
  TrendingUp,
  PiggyBank,
  SlidersHorizontal,
  User
} from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import "./App.css";

const chartData = [
  { month: "Jan", income: 42000, expenses: 28000 },
  { month: "Feb", income: 51000, expenses: 32000 },
  { month: "Mar", income: 46000, expenses: 30000 },
  { month: "Apr", income: 62000, expenses: 39000 },
  { month: "May", income: 57000, expenses: 35000 },
  { month: "Jun", income: 74000, expenses: 42000 },
  { month: "Jul", income: 68000, expenses: 39000 }
];

const categorySpendData = [
  { category: "Housing", amount: 15000, budget: 18000 },
  { category: "Food & Drinks", amount: 8450, budget: 12000 },
  { category: "Shopping", amount: 6200, budget: 8000 },
  { category: "Utilities", amount: 3500, budget: 5000 },
  { category: "Entertainment", amount: 2400, budget: 4000 }
];

function App() {
  const [active, setActive] = useState("Dashboard");
  const [currency, setCurrency] = useState("₹");

  // Dynamic Transactions State
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Shopping Spree", category: "Shopping", date: "Today, 10:30 AM", amount: -2450, iconName: "ShoppingBag" },
    { id: 2, name: "Monthly Salary", category: "Income", date: "Today, 09:00 AM", amount: 65000, iconName: "Wallet" },
    { id: 3, name: "Artisan Coffee", category: "Food & Drinks", date: "Yesterday, 04:15 PM", amount: -350, iconName: "Coffee" },
    { id: 4, name: "Tech Gadget Purchase", category: "Shopping", date: "Yesterday, 11:20 AM", amount: -1200, iconName: "CreditCard" },
    { id: 5, name: "Freelance UI Project", category: "Income", date: "02 Nov, 03:00 PM", amount: 22000, iconName: "Wallet" },
    { id: 6, name: "Weekly Groceries", category: "Food & Drinks", date: "01 Nov, 05:45 PM", amount: -3200, iconName: "ShoppingBag" }
  ]);

  // Modal State for Add Transaction
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({
    name: "",
    category: "Food & Drinks",
    amount: "",
    type: "expense"
  });

  // Filter state for Transactions page
  const [txFilter, setTxFilter] = useState("All");
  const [txSearch, setTxSearch] = useState("");

  // Savings Goals State
  const [goals, setGoals] = useState([
    { id: 1, title: "Emergency Fund", target: 150000, current: 98000, deadline: "Dec 2026", color: "#38d9a9" },
    { id: 2, title: "New M3 MacBook", target: 80000, current: 54000, deadline: "Feb 2027", color: "#60a5fa" },
    { id: 3, title: "Bali Vacation", target: 50000, current: 31000, deadline: "Apr 2027", color: "#a78bfa" },
    { id: 4, title: "Index Fund Stash", target: 200000, current: 125000, deadline: "Aug 2027", color: "#f59e0b" }
  ]);

  // Budget Planner State
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Housing & Rent", limit: 18000, spent: 15000, color: "#60a5fa" },
    { id: 2, category: "Food & Dining", limit: 12000, spent: 8450, color: "#38d9a9" },
    { id: 3, category: "Shopping & Retail", limit: 8000, spent: 6200, color: "#a78bfa" },
    { id: 4, category: "Utilities & Bills", limit: 5000, spent: 3500, color: "#f59e0b" },
    { id: 5, category: "Entertainment", limit: 4000, spent: 2400, color: "#ec4899" }
  ]);

  // AI Assistant Chat State
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello Sayan! I'm FINORA AI, your autonomous financial advisor. I have analyzed your current cash flow, categories, and monthly limits. How can I assist your financial growth today?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Settings State
  const [userName, setUserName] = useState("Sayan Das");
  const [userEmail, setUserEmail] = useState("sayan@finora.ai");
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  // Calculation helpers
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0)
  );

  const baseSavings = 58000;
  const netSavings = totalIncome - totalExpenses;
  const totalBalance = baseSavings + netSavings;

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "ShoppingBag":
        return ShoppingBag;
      case "Wallet":
        return Wallet;
      case "Coffee":
        return Coffee;
      case "CreditCard":
      default:
        return CreditCard;
    }
  };

  // Handler to add a new transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTx.name || !newTx.amount) return;

    const val = parseFloat(newTx.amount);
    if (isNaN(val) || val <= 0) return;

    let icon = "CreditCard";
    if (newTx.category.includes("Food") || newTx.category.includes("Coffee")) icon = "Coffee";
    else if (newTx.category.includes("Shopping")) icon = "ShoppingBag";
    else if (newTx.type === "income") icon = "Wallet";

    const newItem = {
      id: Date.now(),
      name: newTx.name,
      category: newTx.category,
      date: "Just now",
      amount: newTx.type === "income" ? val : -val,
      iconName: icon
    };

    setTransactions([newItem, ...transactions]);
    setNewTx({ name: "", category: "Food & Drinks", amount: "", type: "expense" });
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleContributeGoal = (goalId) => {
    setGoals(
      goals.map((g) => {
        if (g.id === goalId && g.current < g.target) {
          return { ...g, current: Math.min(g.target, g.current + 2500) };
        }
        return g;
      })
    );
  };

  // AI Chat Handler
  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput("");
    setIsAiTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      const lower = query.toLowerCase();

      if (lower.includes("save") || lower.includes("saving") || lower.includes("10,000") || lower.includes("10000")) {
        aiResponse = `Based on your live records, you can comfortably save an extra ${currency}10,000 this month by trimming:
1. Food & Dining: Reduce discretionary cafe visits by ~20% (approx. ${currency}1,700 saved).
2. Shopping & Retail: Delay non-essential electronic purchases (approx. ${currency}3,500 saved).
3. Auto-allocate: Route 15% of your incoming freelance income (${currency}4,800) directly to your Emergency Fund on day 1.`;
      } else if (lower.includes("budget") || lower.includes("spend") || lower.includes("expense")) {
        aiResponse = `Your total expenses stand at ${currency}${totalExpenses.toLocaleString()}. Your highest outflow category is Housing (${currency}15,000), followed by Food & Dining (${currency}8,450). You are currently at 70% of your Food limit and 77% of your Shopping limit. You are in the safe zone!`;
      } else if (lower.includes("health") || lower.includes("score")) {
        aiResponse = `Your Financial Health Score is 82/100 (Strong). Strengths: Consistent monthly positive cash flow (+${currency}${netSavings.toLocaleString()}) and low debt liability. Recommendation: Accelerate your Emergency Fund goal to reach 6 full months of expenses.`;
      } else if (lower.includes("goal") || lower.includes("emergency") || lower.includes("vacation")) {
        aiResponse = `You currently have 4 active Savings Goals. Your Emergency Fund is at 65% (${currency}98,000 / ${currency}1,50,000). At your current saving velocity of ~${currency}18,000/month, you will hit 100% in under 3 months!`;
      } else {
        aiResponse = `I've analyzed your financial query against your current portfolio: Total Balance of ${currency}${totalBalance.toLocaleString()} and Net Monthly Savings of ${currency}${netSavings.toLocaleString()}. Maintaining your current expense-to-income ratio puts you in the top 15% of disciplined savers this quarter. How else can I assist?`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
      setIsAiTyping(false);
    }, 750);
  };

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Transactions", icon: ArrowLeftRight },
    { name: "Budget Planner", icon: Wallet },
    { name: "Analytics", icon: ChartNoAxesCombined },
    { name: "AI Assistant", icon: Bot },
    { name: "Savings Goals", icon: Target }
  ];

  // Filtered transactions for the Transactions tab
  const filteredTransactions = transactions.filter((t) => {
    const matchesFilter =
      txFilter === "All" ||
      (txFilter === "Income" && t.amount > 0) ||
      (txFilter === "Expense" && t.amount < 0);
    const matchesSearch =
      t.name.toLowerCase().includes(txSearch.toLowerCase()) ||
      t.category.toLowerCase().includes(txSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <ChartNoAxesCombined size={25} />
          </div>
          <div>
            <h2>
              FINORA<span> AI</span>
            </h2>
            <small>SMART FINANCE</small>
          </div>
        </div>

        <div className="workspace">
          <span className="workspace-dot"></span>
          Personal Workspace
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav>
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`nav-item ${active === item.name ? "active" : ""}`}
                onClick={() => setActive(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <Sparkles size={21} />
            <h4>Unlock smarter finance</h4>
            <p>Explore intelligent financial insights.</p>
            <button onClick={() => setActive("AI Assistant")}>Explore AI</button>
          </div>

          <button
            className={`nav-item ${active === "Settings" ? "active" : ""}`}
            onClick={() => setActive("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="profile">
            <div className="avatar">SD</div>
            <div>
              <strong>{userName}</strong>
              <small>Personal User</small>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        {/* TOPBAR */}
        <header className="topbar">
          <div>
            <div className="breadcrumb">Workspace / {active}</div>
            <h1>{active}</h1>
          </div>

          <div className="top-actions">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search metrics, transactions..."
                value={txSearch}
                onChange={(e) => setTxSearch(e.target.value)}
              />
            </div>

            <button
              className="icon-btn"
              title="Notifications"
              onClick={() => alert("All notifications up to date! Health score steady at 82/100.")}
            >
              <Bell size={19} />
              <span className="notification-dot"></span>
            </button>

            <div className="avatar" title={userName}>
              SD
            </div>
          </div>
        </header>

        {/* 1. DASHBOARD VIEW */}
        {active === "Dashboard" && (
          <section className="dashboard-page">
            <div className="welcome">
              <div>
                <h2>Good morning, {userName.split(" ")[0]} 👋</h2>
                <p>Here's what's happening with your finances today.</p>
              </div>

              <button className="add-btn" onClick={() => setIsModalOpen(true)}>
                <Plus size={18} />
                Add Transaction
              </button>
            </div>

            {/* STATISTICS */}
            <div className="stats-grid">
              <div className="stat-card balance-card">
                <div className="stat-heading">
                  <span>Total Balance</span>
                  <Wallet size={20} />
                </div>
                <h2>
                  {currency}
                  {totalBalance.toLocaleString("en-IN")}.00
                </h2>
                <div className="stat-footer">
                  <span className="positive">
                    <ArrowUpRight size={16} /> +14.2%
                  </span>
                  <span>vs last month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-heading">
                  <span>Total Income</span>
                  <div className="stat-icon green">
                    <ArrowDownRight size={19} />
                  </div>
                </div>
                <h2>
                  {currency}
                  {totalIncome.toLocaleString("en-IN")}.00
                </h2>
                <div className="stat-footer">
                  <span className="positive">+9.5%</span>
                  <span>vs last month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-heading">
                  <span>Total Expenses</span>
                  <div className="stat-icon red">
                    <ArrowUpRight size={19} />
                  </div>
                </div>
                <h2>
                  {currency}
                  {totalExpenses.toLocaleString("en-IN")}.00
                </h2>
                <div className="stat-footer">
                  <span className="negative">+2.8%</span>
                  <span>vs last month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-heading">
                  <span>Net Savings</span>
                  <div className="stat-icon purple">
                    <Target size={19} />
                  </div>
                </div>
                <h2>
                  {currency}
                  {netSavings.toLocaleString("en-IN")}.00
                </h2>
                <div className="stat-footer">
                  <span className="positive">+18.4%</span>
                  <span>vs last month</span>
                </div>
              </div>
            </div>

            {/* CHART AND AI INSIGHTS */}
            <div className="middle-grid">
              <div className="panel chart-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Financial Cash Flow</h3>
                    <p>Income and expenses trajectory</p>
                  </div>
                  <select>
                    <option>Last 7 months</option>
                    <option>This year</option>
                  </select>
                </div>

                <div className="chart-legend">
                  <span>
                    <i className="income-dot"></i> Income
                  </span>
                  <span>
                    <i className="expense-dot"></i> Expenses
                  </span>
                </div>

                <div className="chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38d9a9" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#38d9a9" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#252c37" strokeDasharray="4 4" />
                      <XAxis dataKey="month" stroke="#87909e" />
                      <YAxis stroke="#87909e" />
                      <Tooltip
                        contentStyle={{
                          background: "#171e29",
                          border: "1px solid #303a48",
                          borderRadius: "10px"
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#38d9a9"
                        fill="url(#incomeGradient)"
                        strokeWidth={3}
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#a78bfa"
                        fill="url(#expenseGradient)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI INSIGHTS */}
              <div className="panel ai-panel">
                <div className="ai-heading">
                  <div className="ai-icon">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <h3>AI Financial Insights</h3>
                    <span>INTELLIGENCE ENGINE</span>
                  </div>
                </div>

                <div className="health-score">
                  <div>
                    <span>Financial Health Score</span>
                    <h2>
                      82<span>/100</span>
                    </h2>
                  </div>
                  <div className="score-circle">
                    <span>82%</span>
                  </div>
                </div>

                <div className="ai-message">
                  <Sparkles size={17} />
                  <p>
                    Your financial health is strong! Savings rate increased by 18.4% with positive net cash flow.
                  </p>
                </div>

                <div className="insight-item">
                  <span className="insight-number">01</span>
                  <div>
                    <strong>Spending Trend</strong>
                    <p>Food & Dining is your largest variable outflow category.</p>
                  </div>
                </div>

                <div className="insight-item">
                  <span className="insight-number">02</span>
                  <div>
                    <strong>Optimization Tip</strong>
                    <p>Shift {currency}3,000 into high-yield savings to accelerate your Emergency Fund.</p>
                  </div>
                </div>

                <button className="ai-button" onClick={() => setActive("AI Assistant")}>
                  Open AI Assistant <ArrowUpRight size={17} />
                </button>
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="bottom-grid">
              <div className="panel transactions-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent Transactions</h3>
                    <p>Your latest financial movements</p>
                  </div>
                  <button className="text-btn" onClick={() => setActive("Transactions")}>
                    View All →
                  </button>
                </div>

                {transactions.slice(0, 4).map((transaction) => {
                  const Icon = getCategoryIcon(transaction.iconName);
                  const isPositive = transaction.amount > 0;
                  return (
                    <div className="transaction" key={transaction.id}>
                      <div className="transaction-icon">
                        <Icon size={19} />
                      </div>
                      <div className="transaction-info">
                        <strong>{transaction.name}</strong>
                        <span>
                          {transaction.category} · {transaction.date}
                        </span>
                      </div>
                      <strong className={isPositive ? "positive" : "negative"}>
                        {isPositive ? "+" : "-"}
                        {currency}
                        {Math.abs(transaction.amount).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  );
                })}
              </div>

              {/* BUDGET SUMMARY CARD */}
              <div className="panel budget-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Monthly Budget</h3>
                    <p>Overall monthly expenditure cap</p>
                  </div>
                  <Wallet size={20} />
                </div>

                <div className="budget-total">
                  <h2>
                    {currency}
                    {totalExpenses.toLocaleString("en-IN")}
                  </h2>
                  <span>of {currency}50,000</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(100, Math.round((totalExpenses / 50000) * 100))}%`
                    }}
                  ></div>
                </div>

                <div className="budget-footer">
                  <span>{Math.round((totalExpenses / 50000) * 100)}% utilized</span>
                  <span>
                    {currency}
                    {Math.max(0, 50000 - totalExpenses).toLocaleString("en-IN")} remaining
                  </span>
                </div>

                <div className="budget-tip">
                  <Sparkles size={18} />
                  <span>You are well within your monthly safety budget. Keep it up!</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. TRANSACTIONS VIEW */}
        {active === "Transactions" && (
          <section className="transactions-page">
            <div className="welcome">
              <div>
                <h2>Transaction Management</h2>
                <p>Track, filter, and analyze all cash flows.</p>
              </div>

              <button className="add-btn" onClick={() => setIsModalOpen(true)}>
                <Plus size={18} />
                Add Transaction
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-heading">Total Inflow</div>
                <h2 className="positive">
                  +{currency}
                  {totalIncome.toLocaleString("en-IN")}
                </h2>
              </div>
              <div className="stat-card">
                <div className="stat-heading">Total Outflow</div>
                <h2 className="negative">
                  -{currency}
                  {totalExpenses.toLocaleString("en-IN")}
                </h2>
              </div>
              <div className="stat-card">
                <div className="stat-heading">Net Savings</div>
                <h2>
                  {currency}
                  {netSavings.toLocaleString("en-IN")}
                </h2>
              </div>
              <div className="stat-card">
                <div className="stat-heading">Total Recorded</div>
                <h2>{transactions.length} records</h2>
              </div>
            </div>

            <div className="panel transaction-history">
              <div className="panel-heading" style={{ flexWrap: "wrap", gap: "14px" }}>
                <div>
                  <h3>All Transactions</h3>
                  <p>Real-time audit log of your income and expenses</p>
                </div>

                <div className="filter-group">
                  <button
                    className={`filter-btn ${txFilter === "All" ? "active" : ""}`}
                    onClick={() => setTxFilter("All")}
                  >
                    All
                  </button>
                  <button
                    className={`filter-btn ${txFilter === "Income" ? "active" : ""}`}
                    onClick={() => setTxFilter("Income")}
                  >
                    Income
                  </button>
                  <button
                    className={`filter-btn ${txFilter === "Expense" ? "active" : ""}`}
                    onClick={() => setTxFilter("Expense")}
                  >
                    Expenses
                  </button>
                </div>
              </div>

              <div className="transaction-table">
                <div className="transaction-row table-header">
                  <span>DESCRIPTION</span>
                  <span>CATEGORY</span>
                  <span>DATE</span>
                  <span>AMOUNT</span>
                  <span style={{ textAlign: "right" }}>ACTIONS</span>
                </div>

                {filteredTransactions.length === 0 ? (
                  <div className="empty-state">
                    <p>No transactions match your search or filter.</p>
                  </div>
                ) : (
                  filteredTransactions.map((item) => {
                    const Icon = getCategoryIcon(item.iconName);
                    const isPositive = item.amount > 0;
                    return (
                      <div className="transaction-row" key={item.id}>
                        <div className="table-name">
                          <div className="transaction-icon">
                            <Icon size={18} />
                          </div>
                          <strong>{item.name}</strong>
                        </div>

                        <span className="category-tag">{item.category}</span>
                        <span className="date-tag">{item.date}</span>

                        <strong className={isPositive ? "positive" : "negative"}>
                          {isPositive ? "+" : "-"}
                          {currency}
                          {Math.abs(item.amount).toLocaleString("en-IN")}
                        </strong>

                        <div style={{ textAlign: "right" }}>
                          <button
                            className="delete-btn"
                            title="Delete transaction"
                            onClick={() => handleDeleteTransaction(item.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        )}

        {/* 3. BUDGET PLANNER VIEW */}
        {active === "Budget Planner" && (
          <section className="budget-page">
            <div className="welcome">
              <div>
                <h2>Budget Planner & Allocations</h2>
                <p>Set spending ceilings by category and prevent overspending.</p>
              </div>

              <button className="add-btn" onClick={() => setIsModalOpen(true)}>
                <Plus size={18} />
                Add Expense
              </button>
            </div>

            <div className="budget-overview-grid">
              <div className="panel budget-summary-card">
                <div className="summary-info">
                  <span>Overall Monthly Budget</span>
                  <h2>
                    {currency}
                    {totalExpenses.toLocaleString("en-IN")}{" "}
                    <small>/ {currency}47,000</small>
                  </h2>
                  <p>
                    {Math.round((totalExpenses / 47000) * 100)}% of your planned monthly budget spent
                  </p>
                </div>

                <div className="progress-bar-lg">
                  <div
                    className="progress-fill-lg"
                    style={{
                      width: `${Math.min(100, Math.round((totalExpenses / 47000) * 100))}%`,
                      background: totalExpenses > 47000 ? "#ff8585" : "#38d9a9"
                    }}
                  ></div>
                </div>

                <div className="budget-metrics">
                  <div>
                    <span className="metric-label">Safe to Spend</span>
                    <strong className="positive">
                      {currency}
                      {Math.max(0, 47000 - totalExpenses).toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div>
                    <span className="metric-label">Days Left</span>
                    <strong>24 Days</strong>
                  </div>
                  <div>
                    <span className="metric-label">Daily Average</span>
                    <strong>{currency}1,180 / day</strong>
                  </div>
                </div>
              </div>

              <div className="panel ai-budget-alert">
                <div className="ai-heading">
                  <div className="ai-icon">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3>AI Budget Diagnostic</h3>
                    <span>SMART ALERT</span>
                  </div>
                </div>
                <p className="alert-text">
                  Food & Dining has reached 70% of its allocation in the first third of this cycle. We suggest setting a weekend dining limit of {currency}1,200 to prevent overshooting.
                </p>
                <div className="alert-stat">
                  <span>Predicted End-of-Month Status:</span>
                  <strong className="positive">Within Budget (+{currency}4,200 surplus)</strong>
                </div>
              </div>
            </div>

            <div className="panel category-budgets-panel">
              <div className="panel-heading">
                <div>
                  <h3>Category Spending Ceilings</h3>
                  <p>Monitor individual allocation vs actual spend</p>
                </div>
              </div>

              <div className="category-budget-list">
                {budgets.map((b) => {
                  const percent = Math.min(100, Math.round((b.spent / b.limit) * 100));
                  const isHigh = percent >= 85;
                  return (
                    <div className="budget-row" key={b.id}>
                      <div className="budget-row-header">
                        <div className="category-info">
                          <span
                            className="color-dot"
                            style={{ background: b.color }}
                          ></span>
                          <strong>{b.category}</strong>
                        </div>
                        <div className="budget-row-values">
                          <span className={isHigh ? "negative" : ""}>
                            {currency}
                            {b.spent.toLocaleString("en-IN")}
                          </span>
                          <span className="limit-text">
                            / {currency}
                            {b.limit.toLocaleString("en-IN")}
                          </span>
                          <span className={`percent-badge ${isHigh ? "badge-red" : "badge-green"}`}>
                            {percent}%
                          </span>
                        </div>
                      </div>

                      <div className="category-progress">
                        <div
                          className="category-progress-fill"
                          style={{
                            width: `${percent}%`,
                            background: isHigh ? "#ff8585" : b.color
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 4. ANALYTICS VIEW */}
        {active === "Analytics" && (
          <section className="analytics-page">
            <div className="welcome">
              <div>
                <h2>Financial Analytics & Deep Dive</h2>
                <p>Visualize cash flow distributions and categorical breakdowns.</p>
              </div>
            </div>

            <div className="analytics-grid">
              <div className="panel chart-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Monthly Cash Flow Comparison</h3>
                    <p>Inflow vs Outflow dynamics</p>
                  </div>
                </div>

                <div className="chart" style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid stroke="#252c37" strokeDasharray="4 4" />
                      <XAxis dataKey="month" stroke="#87909e" />
                      <YAxis stroke="#87909e" />
                      <Tooltip
                        contentStyle={{
                          background: "#171e29",
                          border: "1px solid #303a48",
                          borderRadius: "10px"
                        }}
                      />
                      <Bar dataKey="income" fill="#38d9a9" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="panel category-breakdown-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Category Breakdown</h3>
                    <p>Budget vs Actual Outflow</p>
                  </div>
                </div>

                <div className="breakdown-list">
                  {categorySpendData.map((item, idx) => (
                    <div className="breakdown-item" key={idx}>
                      <div className="breakdown-title">
                        <span>{item.category}</span>
                        <strong>
                          {currency}
                          {item.amount.toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.round((item.amount / item.budget) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="stats-grid" style={{ marginTop: "24px" }}>
              <div className="stat-card">
                <div className="stat-heading">Savings Ratio</div>
                <h2 className="positive">
                  {Math.round((netSavings / (totalIncome || 1)) * 100)}%
                </h2>
                <div className="stat-footer">Benchmark: Above 30% is great</div>
              </div>
              <div className="stat-card">
                <div className="stat-heading">Daily Burn Rate</div>
                <h2>{currency}948 / day</h2>
                <div className="stat-footer">Optimal range based on income</div>
              </div>
              <div className="stat-card">
                <div className="stat-heading">Highest Category</div>
                <h2>Housing (35%)</h2>
                <div className="stat-footer">Fixed monthly overhead</div>
              </div>
              <div className="stat-card">
                <div className="stat-heading">Discretionary Ratio</div>
                <h2 className="positive">22%</h2>
                <div className="stat-footer">Safe threshold: &lt; 30%</div>
              </div>
            </div>
          </section>
        )}

        {/* 5. AI ASSISTANT VIEW */}
        {active === "AI Assistant" && (
          <section className="ai-assistant-page">
            <div className="welcome">
              <div>
                <h2>Finora Intelligence Co-Pilot</h2>
                <p>Ask anything about your budget, savings targets, or financial strategy.</p>
              </div>

              <div className="ai-status-pill">
                <span className="live-dot"></span>
                AI Agent Active
              </div>
            </div>

            <div className="ai-assistant-layout">
              {/* Main Chat Panel */}
              <div className="panel chat-panel-container">
                <div className="chat-messages-container">
                  {messages.map((m, index) => (
                    <div
                      key={index}
                      className={`chat-bubble-row ${m.sender === "user" ? "user-row" : "ai-row"}`}
                    >
                      {m.sender === "ai" && (
                        <div className="ai-chat-avatar">
                          <Bot size={18} />
                        </div>
                      )}
                      <div className={`chat-bubble ${m.sender === "user" ? "user-bubble" : "ai-bubble"}`}>
                        <p style={{ whiteSpace: "pre-line" }}>{m.text}</p>
                      </div>
                    </div>
                  ))}

                  {isAiTyping && (
                    <div className="chat-bubble-row ai-row">
                      <div className="ai-chat-avatar">
                        <Bot size={18} />
                      </div>
                      <div className="chat-bubble ai-bubble typing-bubble">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Prompt Suggestions */}
                <div className="prompt-suggestions">
                  <button onClick={() => handleSendMessage("How can I save ₹10,000 more this month?")}>
                    💡 Save {currency}10,000 more
                  </button>
                  <button onClick={() => handleSendMessage("Analyze my spending pattern")}>
                    📊 Analyze my spending
                  </button>
                  <button onClick={() => handleSendMessage("What is my Financial Health Score breakdown?")}>
                    ❤️ Health Score details
                  </button>
                  <button onClick={() => handleSendMessage("How are my savings goals progressing?")}>
                    🎯 Savings goals check
                  </button>
                </div>

                {/* Chat Input */}
                <form
                  className="chat-input-bar"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Ask Finora AI about your money, budgets, or investments..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit" className="send-btn" disabled={isAiTyping}>
                    <Send size={18} />
                  </button>
                </form>
              </div>

              {/* Side AI Summary */}
              <div className="ai-side-summary">
                <div className="panel ai-panel">
                  <div className="ai-heading">
                    <div className="ai-icon">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <h3>Portfolio Analysis</h3>
                      <span>REAL-TIME AUDIT</span>
                    </div>
                  </div>

                  <div className="health-score">
                    <div>
                      <span>Financial Health</span>
                      <h2>
                        82<span>/100</span>
                      </h2>
                    </div>
                    <div className="score-circle">
                      <span>82%</span>
                    </div>
                  </div>

                  <div className="quick-stats-list">
                    <div className="quick-stat-item">
                      <span>Monthly Surplus</span>
                      <strong className="positive">
                        +{currency}
                        {netSavings.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div className="quick-stat-item">
                      <span>Daily Safe Spend</span>
                      <strong>{currency}718 / day</strong>
                    </div>
                    <div className="quick-stat-item">
                      <span>Debt-to-Income</span>
                      <strong className="positive">0% (Clean)</strong>
                    </div>
                  </div>

                  <div className="ai-tip-card">
                    <Sparkles size={16} />
                    <p>
                      Tip: You are accumulating positive surplus. Setting up an automated sweep to your Emergency Fund will save you 15% more annually.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. SAVINGS GOALS VIEW */}
        {active === "Savings Goals" && (
          <section className="goals-page">
            <div className="welcome">
              <div>
                <h2>Savings Goals & Milestones</h2>
                <p>Track progress towards your long-term wealth targets.</p>
              </div>

              <button
                className="add-btn"
                onClick={() => {
                  const title = prompt("Enter goal title (e.g., House Deposit, Car):");
                  const targetStr = prompt("Enter target amount:");
                  if (title && targetStr && !isNaN(parseFloat(targetStr))) {
                    setGoals([
                      ...goals,
                      {
                        id: Date.now(),
                        title,
                        target: parseFloat(targetStr),
                        current: 0,
                        deadline: "Late 2027",
                        color: "#38d9a9"
                      }
                    ]);
                  }
                }}
              >
                <Plus size={18} />
                New Goal
              </button>
            </div>

            <div className="goals-grid">
              {goals.map((g) => {
                const percent = Math.min(100, Math.round((g.current / g.target) * 100));
                return (
                  <div className="panel goal-card" key={g.id}>
                    <div className="goal-header">
                      <div className="goal-title-box">
                        <PiggyBank size={24} style={{ color: g.color }} />
                        <div>
                          <h3>{g.title}</h3>
                          <span>Target: {g.deadline}</span>
                        </div>
                      </div>
                      <span className="goal-percent">{percent}%</span>
                    </div>

                    <div className="goal-amounts">
                      <h2>
                        {currency}
                        {g.current.toLocaleString("en-IN")}
                      </h2>
                      <span>
                        target of {currency}
                        {g.target.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${percent}%`, background: g.color }}
                      ></div>
                    </div>

                    <div className="goal-footer">
                      <span>
                        {currency}
                        {Math.max(0, g.target - g.current).toLocaleString("en-IN")} remaining
                      </span>
                      <button
                        className="contribute-btn"
                        onClick={() => handleContributeGoal(g.id)}
                      >
                        + Add {currency}2,500
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 7. SETTINGS VIEW */}
        {active === "Settings" && (
          <section className="settings-page">
            <div className="welcome">
              <div>
                <h2>System Settings & Preferences</h2>
                <p>Customize your currency, security, and notification triggers.</p>
              </div>
            </div>

            <div className="settings-container">
              {/* Profile Card */}
              <div className="panel settings-card">
                <h3>User Profile</h3>
                <p>Manage your account identity</p>

                <div className="settings-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Currency & Financial Preferences */}
              <div className="panel settings-card">
                <h3>Currency & Formatting</h3>
                <p>Choose your default monetary unit</p>

                <div className="currency-selector">
                  {["₹", "$", "€", "£"].map((curr) => (
                    <button
                      key={curr}
                      className={`curr-btn ${currency === curr ? "active" : ""}`}
                      onClick={() => setCurrency(curr)}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notifications & AI Preferences */}
              <div className="panel settings-card">
                <h3>Automation & Alerts</h3>
                <p>Configure proactive alerts from FINORA AI</p>

                <div className="toggle-list">
                  <label className="toggle-item">
                    <div>
                      <strong>Budget Limit Warnings</strong>
                      <span>Alert when any category reaches 80% ceiling</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={budgetAlerts}
                      onChange={(e) => setBudgetAlerts(e.target.checked)}
                    />
                  </label>

                  <label className="toggle-item">
                    <div>
                      <strong>AI Smart Suggestions</strong>
                      <span>Receive weekly AI expense optimization tips</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={aiSuggestions}
                      onChange={(e) => setAiSuggestions(e.target.checked)}
                    />
                  </label>

                  <label className="toggle-item">
                    <div>
                      <strong>Weekly Digest Report</strong>
                      <span>Summary sent every Sunday evening</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={weeklyReports}
                      onChange={(e) => setWeeklyReports(e.target.checked)}
                    />
                  </label>
                </div>
              </div>

              {/* Data & Security */}
              <div className="panel settings-card">
                <h3>Data Export & Integrity</h3>
                <p>Backup or download your transaction history</p>

                <div className="action-buttons-row">
                  <button
                    className="export-btn"
                    onClick={() => {
                      const csvContent =
                        "data:text/csv;charset=utf-8,ID,Name,Category,Date,Amount\n" +
                        transactions
                          .map(
                            (t) =>
                              `${t.id},"${t.name}","${t.category}","${t.date}",${t.amount}`
                          )
                          .join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", "finora_transactions.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Export Records (CSV)
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* MODAL: ADD TRANSACTION */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add New Transaction</h3>
                <button
                  className="close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddTransaction} className="modal-form">
                <div className="form-group">
                  <label>Type</label>
                  <div className="type-toggle">
                    <button
                      type="button"
                      className={`type-btn ${newTx.type === "expense" ? "active-expense" : ""}`}
                      onClick={() => setNewTx({ ...newTx, type: "expense" })}
                    >
                      Expense
                    </button>
                    <button
                      type="button"
                      className={`type-btn ${newTx.type === "income" ? "active-income" : ""}`}
                      onClick={() => setNewTx({ ...newTx, type: "income" })}
                    >
                      Income
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grocery Store, Client Payment"
                    value={newTx.name}
                    onChange={(e) =>
                      setNewTx({ ...newTx, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Amount ({currency})</label>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="0.00"
                    value={newTx.amount}
                    onChange={(e) =>
                      setNewTx({ ...newTx, amount: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newTx.category}
                    onChange={(e) =>
                      setNewTx({ ...newTx, category: e.target.value })
                    }
                  >
                    <option value="Food & Drinks">Food & Drinks</option>
                    <option value="Shopping">Shopping & Retail</option>
                    <option value="Housing">Housing & Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Personal">Personal & Health</option>
                    <option value="Income">Salary / Income</option>
                  </select>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="footer">
          FINORA AI © 2026 · Autonomous Financial Management System
        </footer>
      </main>
    </div>
  );
}

export default App;
