from transformers import pipeline
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from chat import ask
from pydantic import BaseModel
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

classifier = pipeline(
    "image-classification",
    model="gianlab/swin-tiny-patch4-window7-224-finetuned-plantdisease"
)

class ChatRequest(BaseModel):
    message: str

class ProfitRequest(BaseModel):
    crop: str
    area: float
    cost_per_acre: float
    yield_per_acre: float
    market_price: float

class SoilRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    ph: float
    moisture: float

@app.post("/chat")
async def chat(req: ChatRequest):
    reply = ask(req.message)

    return {
        "reply": reply
    }

@app.post("/profit")
async def profit(req: ProfitRequest):

    revenue = (
        req.area
        * req.yield_per_acre
        * req.market_price
    )

    total_cost = (
        req.area
        * req.cost_per_acre
    )

    profit = revenue - total_cost

    prompt = f"""
Crop: {req.crop}

Revenue: ₹{revenue}

Cost: ₹{total_cost}

Profit: ₹{profit}

Explain this profit estimate in simple language for a farmer in 3-4 sentences.
"""

    explanation = ask(prompt)

    return {
        "crop": req.crop,
        "revenue": round(revenue, 2),
        "cost": round(total_cost, 2),
        "profit": round(profit, 2),
        "explanation": explanation
    }

@app.post("/soil")
async def soil(req: SoilRequest):

    score = 0

    if 40 <= req.nitrogen <= 120:
        score += 20

    if 20 <= req.phosphorus <= 80:
        score += 20

    if 20 <= req.potassium <= 100:
        score += 20

    if 6.0 <= req.ph <= 7.5:
        score += 20

    if 30 <= req.moisture <= 80:
        score += 20

    if req.ph < 6:
        crop = "Rice"
    elif req.ph < 7:
        crop = "Wheat"
    else:
        crop = "Cotton"

    if score >= 80:
        quality = "Excellent"
    elif score >= 60:
        quality = "Good"
    elif score >= 40:
        quality = "Average"
    else:
        quality = "Poor"

    return {
        "soil_score": score,
        "quality": quality,
        "recommended_crop": crop
    }

@app.post("/predict-disease")
async def predict_disease(file: UploadFile = File(...)):
    image = Image.open(file.file).convert("RGB")

    results = classifier(image)

    top3 = []

    for r in results[:3]:
        top3.append({
            "label": r["label"],
            "confidence": round(r["score"] * 100, 2)
        })

    return {
        "prediction": top3[0]["label"],
        "confidence": top3[0]["confidence"],
        "top_predictions": top3
}