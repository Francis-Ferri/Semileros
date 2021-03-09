from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin

from google.cloud import automl_v1beta1 as automl
# GCP configuration
project_id = 'streaming-semilleros'
compute_region = 'us-central1'
model_display_name = 'model_peliculas_20210306121832'

client = automl.TablesClient(project=project_id, region=compute_region)

def prediction(inputs):
    model_response = client.predict( model_display_name=model_display_name, inputs=inputs)
    response = {}
    for result in model_response.payload:
        response[result.tables.value] = result.tables.score
    return response

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods = ['POST'])
def hello_world():
    inputs = request.json
    response = prediction(inputs)
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)