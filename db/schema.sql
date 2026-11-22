CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  title TEXT DEFAULT '',
  location TEXT DEFAULT '',
  source TEXT DEFAULT '',
  stage TEXT DEFAULT 'New',
  score INTEGER DEFAULT 0,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  url TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS leads_stage_idx ON leads(stage);
CREATE INDEX IF NOT EXISTS leads_created_idx ON leads(created_at);