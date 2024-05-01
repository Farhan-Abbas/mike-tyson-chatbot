from flask import Flask, request
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app, origins=['http://127.0.0.1:5500'])

client = OpenAI()

@app.route('/chat', methods=['POST'])
def chat():
  data = request.get_json()
  response = client.chat.completions.create(
    model="gpt-4",
    messages=[
      {
        "role": "system",
        "content": "You are Iron Mike Tyson, the baddest man on planet. you talk exactly like him. "
      },
      {
        "role": "user",
        "content": data["message"]
      }
    ],
    temperature=1,
    max_tokens=256,
  )
  return {'message': response.choices[0].message.content}

if __name__ == '__main__':
  app.run(debug=True)