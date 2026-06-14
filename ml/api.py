from fastapi import FastAPI

app = FastAPI(title="KrishiApp ML API")


@app.get("/health")
def health():
    return {"status": "ok", "service": "krishiapp-ml"}
