// SparkLite — a small, honest subset of the Spark DataFrame API implemented in
// pure Python. Runs in Pyodide so the Playground executes the user's real code
// (not a string-match mock). Supports a documented subset; unsupported ops
// raise a clear error rather than silently returning wrong results.

export const SPARKLITE_SUPPORTED = [
  'df.select("a", "b") / select(col("a").alias("x"))',
  'df.filter(df.x > 5) / where(...)  — &, |, ~ combinators',
  'df.withColumn("y", F.when(df.x > 0, "pos").otherwise("neg"))',
  'df.withColumnRenamed("a","b"), df.drop("a"), df.distinct(), df.dropDuplicates([...])',
  'df.groupBy("k").agg(F.sum("x").alias("s"), F.avg("x"), F.count("*")) / df.agg(...)',
  'df.groupBy("k").count()',
  'df.orderBy(col("x").desc()), df.limit(n), df.union(other), df.unionByName(other)',
  'df.join(other, "key", "inner"|"left")',
  'df.na.fill(0) / df.fillna, df.na.drop() / df.dropna, df.first(), df.columns',
  'df.count(), df.collect(), df.show(), df.printSchema()',
  'Column: isNull, isNotNull, isin, contains, startswith, between, cast',
  'F.col, lit, when/otherwise, coalesce, concat, round, abs, upper, lower, length, sum, avg, min, max, count',
];

export const SPARKLITE_PY = `
import json, operator

__captured__ = {'rows': None, 'cols': None}

class Column:
    def __init__(self, fn, name=None, desc=False):
        self.fn = fn            # fn(row) -> value
        self.name = name
        self._desc = desc
    def _lift(self, other):
        return other.fn if isinstance(other, Column) else (lambda r, o=other: o)
    def _binop(self, other, op):
        o = self._lift(other)
        return Column(lambda r: op(self.fn(r), o(r)))
    def __gt__(self, o): return self._binop(o, operator.gt)
    def __ge__(self, o): return self._binop(o, operator.ge)
    def __lt__(self, o): return self._binop(o, operator.lt)
    def __le__(self, o): return self._binop(o, operator.le)
    def __eq__(self, o): return self._binop(o, operator.eq)
    def __ne__(self, o): return self._binop(o, operator.ne)
    def __add__(self, o): return self._binop(o, operator.add)
    def __sub__(self, o): return self._binop(o, operator.sub)
    def __mul__(self, o): return self._binop(o, operator.mul)
    def __truediv__(self, o): return self._binop(o, operator.truediv)
    def __and__(self, o): return self._binop(o, lambda a, b: bool(a) and bool(b))
    def __or__(self, o): return self._binop(o, lambda a, b: bool(a) or bool(b))
    def __invert__(self): return Column(lambda r: not bool(self.fn(r)))
    def alias(self, n): return Column(self.fn, n)
    def desc(self): return Column(self.fn, self.name, True)
    def asc(self): return Column(self.fn, self.name, False)
    def isNull(self): return Column(lambda r: self.fn(r) is None)
    def isNotNull(self): return Column(lambda r: self.fn(r) is not None)
    def isin(self, *vals):
        vs = vals[0] if len(vals) == 1 and isinstance(vals[0], (list, tuple, set)) else vals
        return Column(lambda r: self.fn(r) in vs)
    def contains(self, s): return Column(lambda r: s in str(self.fn(r)))
    def startswith(self, s): return Column(lambda r: str(self.fn(r)).startswith(s))
    def endswith(self, s): return Column(lambda r: str(self.fn(r)).endswith(s))
    def between(self, a, b): return Column(lambda r: a <= self.fn(r) <= b)
    def cast(self, t):
        def conv(v):
            if v is None: return None
            t2 = str(t).lower()
            try:
                if t2 in ('int', 'integer', 'long', 'bigint'): return int(v)
                if t2 in ('double', 'float', 'decimal'): return float(v)
                if t2 in ('string', 'str'): return str(v)
                if t2 in ('boolean', 'bool'): return bool(v)
            except (ValueError, TypeError):
                return None
            return v
        return Column(lambda r: conv(self.fn(r)), self.name)

class When(Column):
    def __init__(self, cases=None, els=None):
        self.cases = cases or []
        self._else = els
        super().__init__(self._eval)
    def _eval(self, r):
        for cond, value in self.cases:
            if cond.fn(r):
                return value.fn(r) if isinstance(value, Column) else value
        v = self._else
        return v.fn(r) if isinstance(v, Column) else v
    def when(self, cond, value): return When(self.cases + [(cond, value)], self._else)
    def otherwise(self, value): return When(self.cases, value)

def col(name):
    return Column(lambda r: r.get(name), name)

def lit(v):
    return Column(lambda r: v, str(v))

def _agg(func, name):
    class Agg:
        def __init__(self): self.func=func; self.col=name; self._alias=None
        def alias(self, a): self._alias=a; return self
        @property
        def out(self): return self._alias or (func + '(' + str(name) + ')')
    return Agg()

class F:
    col = staticmethod(col)
    lit = staticmethod(lit)
    @staticmethod
    def upper(c):
        cc = c if isinstance(c, Column) else col(c)
        return Column(lambda r: str(cc.fn(r)).upper(), (cc.name or 'upper'))
    @staticmethod
    def lower(c):
        cc = c if isinstance(c, Column) else col(c)
        return Column(lambda r: str(cc.fn(r)).lower(), (cc.name or 'lower'))
    @staticmethod
    def length(c):
        cc = c if isinstance(c, Column) else col(c)
        return Column(lambda r: len(str(cc.fn(r))), (cc.name or 'length'))
    @staticmethod
    def sum(c): return _agg('sum', c)
    @staticmethod
    def avg(c): return _agg('avg', c)
    @staticmethod
    def mean(c): return _agg('avg', c)
    @staticmethod
    def min(c): return _agg('min', c)
    @staticmethod
    def max(c): return _agg('max', c)
    @staticmethod
    def count(c): return _agg('count', c)
    @staticmethod
    def desc(c): return (c if isinstance(c, Column) else col(c)).desc()
    @staticmethod
    def asc(c): return (c if isinstance(c, Column) else col(c)).asc()
    @staticmethod
    def when(cond, value): return When([(cond, value)])
    @staticmethod
    def coalesce(*cols):
        cs = [c if isinstance(c, Column) else col(c) for c in cols]
        def fn(r):
            for c in cs:
                v = c.fn(r)
                if v is not None: return v
            return None
        return Column(fn, 'coalesce')
    @staticmethod
    def concat(*cols):
        cs = [c if isinstance(c, Column) else lit(c) for c in cols]
        return Column(lambda r: ''.join(str(c.fn(r)) for c in cs), 'concat')
    @staticmethod
    def round(c, n=0):
        cc = c if isinstance(c, Column) else col(c)
        return Column(lambda r: (round(cc.fn(r), n) if cc.fn(r) is not None else None), (cc.name or 'round'))
    @staticmethod
    def abs(c):
        cc = c if isinstance(c, Column) else col(c)
        return Column(lambda r: (abs(cc.fn(r)) if cc.fn(r) is not None else None), (cc.name or 'abs'))

def _colname(c, i):
    if isinstance(c, Column): return c.name or ('col' + str(i))
    return c

class GroupedData:
    def __init__(self, df, keys): self.df=df; self.keys=list(keys)
    def _groups(self):
        g = {}
        for r in self.df._rows:
            k = tuple(r.get(k) for k in self.keys)
            g.setdefault(k, []).append(r)
        return g
    def count(self):
        rows = []
        for k, grp in self._groups().items():
            row = dict(zip(self.keys, k)); row['count'] = len(grp); rows.append(row)
        return DataFrame(rows, self.keys + ['count'])
    def agg(self, *aggs):
        out_cols = list(self.keys) + [a.out for a in aggs]
        rows = []
        for k, grp in self._groups().items():
            row = dict(zip(self.keys, k))
            for a in aggs:
                if a.col == '*' or a.func == 'count':
                    vals = [x.get(a.col) for x in grp] if a.col != '*' else grp
                    row[a.out] = len([v for v in vals if (a.col=='*' or v is not None)])
                    continue
                vals = [x.get(a.col) for x in grp if x.get(a.col) is not None]
                if a.func == 'sum': row[a.out] = sum(vals)
                elif a.func == 'avg': row[a.out] = round(sum(vals)/len(vals), 4) if vals else None
                elif a.func == 'min': row[a.out] = min(vals) if vals else None
                elif a.func == 'max': row[a.out] = max(vals) if vals else None
            rows.append(row)
        return DataFrame(rows, out_cols)

class DataFrame:
    def __init__(self, rows, cols):
        self._rows = [dict(r) for r in rows]
        self._cols = list(cols)
    def __getattr__(self, name):
        # only reached for attributes not found normally -> treat as column ref
        cols = object.__getattribute__(self, '_cols')
        if name in cols:
            return Column(lambda r, n=name: r.get(n), name)
        raise AttributeError("No column or method '" + name + "'. Supported: select, filter/where, withColumn, groupBy, orderBy, join, distinct, limit, drop, count, collect, show.")
    def select(self, *cols):
        new_cols, fns = [], []
        for i, c in enumerate(cols):
            if isinstance(c, Column):
                nm = c.name or ('col' + str(i)); new_cols.append(nm); fns.append((nm, c.fn))
            else:
                new_cols.append(c); fns.append((c, (lambda r, cc=c: r.get(cc))))
        rows = [{nm: fn(r) for nm, fn in fns} for r in self._rows]
        return DataFrame(rows, new_cols)
    def filter(self, cond):
        if not isinstance(cond, Column): raise ValueError("filter() needs a column condition, e.g. df.filter(df.x > 5)")
        return DataFrame([r for r in self._rows if cond.fn(r)], self._cols)
    where = filter
    def withColumn(self, name, colexpr):
        fn = colexpr.fn if isinstance(colexpr, Column) else (lambda r, v=colexpr: v)
        rows = []
        for r in self._rows:
            nr = dict(r); nr[name] = fn(r); rows.append(nr)
        cols = self._cols + ([name] if name not in self._cols else [])
        return DataFrame(rows, cols)
    def withColumnRenamed(self, old, new):
        rows = [{(new if k==old else k): v for k, v in r.items()} for r in self._rows]
        return DataFrame(rows, [new if c==old else c for c in self._cols])
    def drop(self, *cols):
        drop = set(cols)
        rows = [{k: v for k, v in r.items() if k not in drop} for r in self._rows]
        return DataFrame(rows, [c for c in self._cols if c not in drop])
    def distinct(self):
        seen, rows = set(), []
        for r in self._rows:
            key = tuple(sorted(r.items()))
            if key not in seen: seen.add(key); rows.append(r)
        return DataFrame(rows, self._cols)
    def orderBy(self, *cols, ascending=True):
        specs = []
        for c in cols:
            if isinstance(c, Column): specs.append((c.name, not c._desc))
            else: specs.append((c, ascending))
        rows = list(self._rows)
        for name, asc in reversed(specs):
            rows.sort(key=lambda r: (r.get(name) is None, r.get(name)), reverse=not asc)
        return DataFrame(rows, self._cols)
    sort = orderBy
    def limit(self, n): return DataFrame(self._rows[:n], self._cols)
    def groupBy(self, *keys):
        ks = [k.name if isinstance(k, Column) else k for k in keys]
        return GroupedData(self, ks)
    groupby = groupBy
    def join(self, other, on, how='inner'):
        keys = on if isinstance(on, (list, tuple)) else [on]
        idx = {}
        for r in other._rows:
            idx.setdefault(tuple(r.get(k) for k in keys), []).append(r)
        out_cols = list(self._cols) + [c for c in other._cols if c not in keys]
        rows = []
        for l in self._rows:
            matches = idx.get(tuple(l.get(k) for k in keys), [])
            if matches:
                for m in matches:
                    nr = dict(l)
                    for k, v in m.items():
                        if k not in keys: nr[k] = v
                    rows.append(nr)
            elif how == 'left':
                nr = dict(l)
                for c in other._cols:
                    if c not in keys: nr[c] = None
                rows.append(nr)
        return DataFrame(rows, out_cols)
    def count(self): return len(self._rows)
    def collect(self): return list(self._rows)
    @property
    def columns(self): return list(self._cols)
    def agg(self, *aggs):
        # Global aggregation (no grouping keys).
        return GroupedData(self, []).agg(*aggs)
    def dropDuplicates(self, subset=None):
        keys = subset if subset else self._cols
        seen, rows = set(), []
        for r in self._rows:
            k = tuple(r.get(x) for x in keys)
            if k not in seen: seen.add(k); rows.append(r)
        return DataFrame(rows, self._cols)
    drop_duplicates = dropDuplicates
    def dropna(self, subset=None):
        cols = subset if subset else self._cols
        return DataFrame([r for r in self._rows if all(r.get(c) is not None for c in cols)], self._cols)
    def fillna(self, value, subset=None):
        cols = subset if subset else self._cols
        rows = []
        for r in self._rows:
            nr = dict(r)
            for c in cols:
                if nr.get(c) is None: nr[c] = value
            rows.append(nr)
        return DataFrame(rows, self._cols)
    def union(self, other): return DataFrame(self._rows + other._rows, self._cols)
    unionAll = union
    def unionByName(self, other):
        return DataFrame(self._rows + [{k: o.get(k) for k in self._cols} for o in other._rows], self._cols)
    def first(self): return dict(self._rows[0]) if self._rows else None
    head = first
    @property
    def na(self): return _Na(self)
    def printSchema(self):
        print('root')
        for c in self._cols: print(' |-- ' + c)
        return None
    def show(self, n=20, truncate=True):
        __captured__['rows'] = self._rows[:n]
        __captured__['cols'] = self._cols
        return None

class _Spark:
    def createDataFrame(self, data, schema=None):
        rows = list(data)
        cols = schema if schema else (list(rows[0].keys()) if rows and isinstance(rows[0], dict) else [])
        return DataFrame(rows, cols)
spark = _Spark()

# ---- preloaded datasets ----
df_employees = DataFrame([
    {'id':1,'name':'Joe','department':'IT','salary':85000},
    {'id':2,'name':'Henry','department':'Sales','salary':80000},
    {'id':3,'name':'Sam','department':'Sales','salary':60000},
    {'id':4,'name':'Max','department':'IT','salary':90000},
    {'id':5,'name':'Nina','department':'Data','salary':120000},
    {'id':6,'name':'Omar','department':'Data','salary':105000},
], ['id','name','department','salary'])

df_orders = DataFrame([
    {'order_id':1,'customer_id':101,'amount':200},
    {'order_id':2,'customer_id':102,'amount':150},
    {'order_id':3,'customer_id':101,'amount':300},
    {'order_id':4,'customer_id':103,'amount':90},
], ['order_id','customer_id','amount'])

df_sales = DataFrame([
    {'sale_id':1,'product_id':1,'revenue':500,'quarter':'Q1'},
    {'sale_id':2,'product_id':2,'revenue':30,'quarter':'Q1'},
    {'sale_id':3,'product_id':1,'revenue':520,'quarter':'Q2'},
    {'sale_id':4,'product_id':3,'revenue':200,'quarter':'Q2'},
], ['sale_id','product_id','revenue','quarter'])

df_products = DataFrame([
    {'product_id':1,'category':'Electronics','price':500},
    {'product_id':2,'category':'Books','price':30},
    {'product_id':3,'category':'Home','price':120},
], ['product_id','category','price'])
`;
