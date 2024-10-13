from flask import Flask, jsonify
import random

app = Flask(__name__)
count = 0


@app.route("/")
def hello_world():
    data = [
        {
            "name": "1",
            "x": 610,
            "y": 1245,
            "type": "plane"
        },
        {
            "name": "2",
            "x": 583,
            "y": 366,
            "type": "plane"
        },
        {
            "name": "3",
            "x": 872,
            "y": 590,
            "type": "plane"
        },
        {
            "name": "4",
            "x": 632,
            "y": 12820,
            "type": "plane"
        },
        {
            "x": random.randint(1, 999),
            "y": random.randint(1, 1399),
            "type": "human"
        },
        {
            "x": random.randint(1, 999),
            "y": random.randint(1, 1399),
            "type": "human"
        },
        {
            "x": random.randint(1, 999),
            "y": random.randint(1, 1399),
            "type": "human"
        },
        {
            "x": random.randint(1, 999),
            "y": random.randint(1, 1399),
            "type": "human"
        },
        {
            "x": random.randint(1, 999),
            "y": random.randint(1, 1399),
            "type": "human"
        },
        {
            "x": random.randint(1, 999),
            "y": random.randint(1, 1399),
            "type": "human"
        },
        {
            "x": random.randint(1, 999),
            "y": random.randint(1, 1399),
            "type": "human"
        },
        {
            "x": random.randint(1, 999),
            "y": random.randint(1, 1399),
            "type": "human"
        }


    ]
    response = jsonify({'data': data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(debug=True)
