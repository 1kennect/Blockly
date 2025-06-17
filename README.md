# Blockly Accessibility Coding Platform

A framework for an accessible, block-based coding platform for kids, using Blockly, React, Flask, and more.

## Tech Stack
- **Frontend:** React, Blockly, HTML, CSS, JS
- **Backend:** Python, Flask, SQLite
- **Other:** Node.js (tooling), LLM integration (future)

## Features
- Block-based coding (Blockly)
- Accessibility: vision impairment support, ARIA, color contrast, screen reader support, etc.
- REST API backend
- SQLite database
- PWA support (offline-ready)
- LLM integration (placeholder)

## Project Structure
```
Blockly/
├── backend/           # Flask API, Python, SQLite
│   ├── app.py
│   ├── requirements.txt
│   └── ... 
├── frontend/          # React, Blockly, accessibility features
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
```

## Setup

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

## Accessibility & LLM Integration
- Add accessibility features in `frontend/src/components/`.
- LLM integration can be added in backend or as a Node.js microservice.
