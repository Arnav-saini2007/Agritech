# KrishiApp / Agritech

A PERN dashboard for agritech workflows.

## What this starter includes

- Blackish blue–purple modern dashboard UI
- React + Vite frontend
- Express backend
- PostgreSQL + Prisma setup
- Separate `ml/` folder for later Python services

## Run the demo

### Backend
```powershell
cd backend
npm install
npm run dev
```

### Frontend
```powershell
cd frontend
npm install
npm run dev
```

### Database
Use your local PostgreSQL database named `agritech`.

Create `backend/.env` from `backend/.env.example`.

## Demo routes

- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/weather`
- `GET /api/mandi`
- `POST /api/crop/analyze`
- `POST /api/chat`

## Later ML stack

For the Python side, keep these separate from the demo app:

- `transformers`
- `torch`
- `torchvision`
- `fastapi`
- `uvicorn`
- `llama-cpp-python` for a local GGUF LLM

Suggested starting models later:

- Small local LLM: `Qwen2.5-1.5B-Instruct` or a smaller Qwen variant
- Vision: `resnet50` or `efficientnet_b0`
- Speech: Whisper small/base for STT

For the demo, no local ML model is imported yet.
