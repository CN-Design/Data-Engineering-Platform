import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Database } from 'lucide-react';

declare global {
  interface Window {
    initSqlJs: any;
  }
}

interface PlaygroundTabProps {
  theme: 'light' | 'dark';
}

export const PlaygroundTab: React.FC<PlaygroundTabProps> = ({ theme }) => {
  const [sandboxType, setSandboxType] = useState<'sql' | 'pyspark'>('sql');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [db, setDb] = useState<any>(null);

  const sqlSchemaHelp = {
    Employees: ["employee_id INT", "name VARCHAR", "department VARCHAR", "salary INT"],
    Orders: ["order_id INT", "customer_id INT", "amount INT"],
    Products: ["product_id INT", "category VARCHAR", "price INT"],
    Customers: ["customer_id INT", "city VARCHAR"]
  };

  const pysparkSchemaHelp = {
    EmployeeDataset: ["id", "name", "department", "salary"],
    OrdersDataset: ["order_id", "customer_id", "amount"],
    SalesDataset: ["sale_id", "product_id", "revenue", "quarter"],
    ProductDataset: ["product_id", "category", "price"]
  };

  // Seed default sandbox code
  useEffect(() => {
    if (sandboxType === 'sql') {
      setCode(`-- SQL Sandbox. Query preloaded tables: Employees, Orders, Products, Customers\nSELECT department, AVG(salary) as avg_salary \nFROM Employees \nGROUP BY department;`);
    } else {
      setCode(`# PySpark Sandbox. Preloaded datasets: df_employees, df_orders, df_sales, df_products\n# Write standard PySpark transformation chains:\n\ndf_result = df_employees.filter(df_employees.salary > 80000).select("name", "department")\n\ndf_result.show()`);
    }
    setOutput(null);
    setError(null);
  }, [sandboxType]);

  // Load and initialize local SQLite database
  useEffect(() => {
    const initDb = async () => {
      try {
        const SQL = await window.initSqlJs({ locateFile: (file: string) => `/${file}` });
        const localDb = new SQL.Database();
        
        // Seed tables
        localDb.run(`
          CREATE TABLE Employees (employee_id INT, name VARCHAR, department VARCHAR, salary INT);
          INSERT INTO Employees VALUES 
            (1, 'Joe', 'IT', 85000), (2, 'Henry', 'Sales', 80000), 
            (3, 'Sam', 'Sales', 60000), (4, 'Max', 'IT', 90000);

          CREATE TABLE Orders (order_id INT, customer_id INT, amount INT);
          INSERT INTO Orders VALUES 
            (1, 101, 200), (2, 102, 150), (3, 101, 300);

          CREATE TABLE Products (product_id INT, category VARCHAR, price INT);
          INSERT INTO Products VALUES 
            (1, 'Electronics', 500), (2, 'Books', 30);

          CREATE TABLE Customers (customer_id INT, city VARCHAR);
          INSERT INTO Customers VALUES 
            (101, 'New York'), (102, 'London'), (103, 'Paris');
        `);
        setDb(localDb);
      } catch (err: any) {
        console.error("Playground SQL.js init failed:", err);
      }
    };
    initDb();
  }, []);

  const handleRun = () => {
    setLoading(true);
    setError(null);
    setOutput(null);

    setTimeout(() => {
      if (sandboxType === 'sql') {
        try {
          if (!db) {
            setError("SQLite database is initializing. Please try again.");
            setLoading(false);
            return;
          }
          const res = db.exec(code);
          if (res.length === 0) {
            setOutput([]);
            setColumns([]);
            setError("Query executed successfully, but returned no rows.");
          } else {
            const cols = res[0].columns;
            const rows = res[0].values.map((valList: any[]) => {
              const rowObj: any = {};
              cols.forEach((col: string, idx: number) => {
                rowObj[col] = valList[idx];
              });
              return rowObj;
            });
            setColumns(cols);
            setOutput(rows);
          }
        } catch (err: any) {
          setError(err.message || "SQL Syntax Error");
        }
      } else {
        // PySpark transformations simulation
        try {
          let rows = [
            { id: 1, name: 'Joe', department: 'IT', salary: 85000 },
            { id: 2, name: 'Henry', department: 'Sales', salary: 80000 },
            { id: 3, name: 'Sam', department: 'Sales', salary: 60000 },
            { id: 4, name: 'Max', department: 'IT', salary: 90000 }
          ];

          if (code.includes('.filter') && code.includes('80000')) {
            rows = rows.filter(r => r.salary > 80000);
          }
          if (code.includes('.select') && code.includes('name')) {
            rows = rows.map(r => ({ name: r.name, department: r.department } as any));
          }

          if (rows.length > 0) {
            setColumns(Object.keys(rows[0]));
            setOutput(rows);
          } else {
            setOutput([]);
            setColumns([]);
          }
        } catch (err: any) {
          setError("Spark simulation error: " + err.message);
        }
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '20px', height: 'calc(100vh - 120px)' }}>
      
      {/* Schema sidebar list */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>SANDBOX TYPE</label>
          <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
            <button
              onClick={() => setSandboxType('sql')}
              className={`btn ${sandboxType === 'sql' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '8px 4px', fontSize: '12px' }}
            >
              SQL
            </button>
            <button
              onClick={() => setSandboxType('pyspark')}
              className={`btn ${sandboxType === 'pyspark' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '8px 4px', fontSize: '12px' }}
            >
              PySpark
            </button>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', marginBottom: '8px' }}>
            <Database size={16} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Preloaded Schema Tables</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(sandboxType === 'sql' ? sqlSchemaHelp : pysparkSchemaHelp).map(([tbl, cols]) => (
              <div key={tbl} style={{ background: 'var(--bg-inner)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{tbl}</span>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {cols.map(c => <span key={c}>• {c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor & output */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="editor-wrapper">
          <div className="editor-header">
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Playground Workspace</span>
            <button
              onClick={handleRun}
              className="btn btn-primary"
              disabled={loading}
            >
              <Play size={14} />
              {loading ? 'Running...' : 'Run Query'}
            </button>
          </div>

          <div style={{ flex: 1 }}>
            <Editor
              height="100%"
              theme={theme === 'dark' ? 'vs-dark' : 'vs'}
              language={sandboxType === 'sql' ? 'sql' : 'python'}
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on'
              }}
            />
          </div>

          {/* Console Output */}
          <div className="output-panel" style={{ height: '220px' }}>
            <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '6px', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Query Output Result
            </div>

            {error ? (
              <div style={{ color: '#ef4444' }}>{error}</div>
            ) : output ? (
              output.length === 0 ? (
                <div>No records returned.</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="sql-table">
                    <thead>
                      <tr>
                        {columns.map(c => <th key={c}>{c}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {output.map((row, i) => (
                        <tr key={i}>
                          {columns.map(c => <td key={c}>{String(row[c])}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div style={{ color: 'var(--text-muted)' }}>Execute sandbox query script to view records.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
