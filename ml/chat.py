from transformers import pipeline

chatbot = pipeline(
    "text-generation",
    model="Qwen/Qwen2.5-0.5B-Instruct",
    device_map="auto"
)

def ask(prompt):
    response = chatbot(
        prompt,
        max_new_tokens=150,
        do_sample=True,
        temperature=0.7
    )

    return response[0]["generated_text"]