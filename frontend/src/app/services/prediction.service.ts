import { Injectable } from '@angular/core';
const automl = require('@google-cloud/automl');


const projectId = 'streaming-semilleros';
const computeRegion = 'Global';
const modelId = 'model_peliculas_20210306121832';
@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private automlClient;
  private modelFullId;

  //const inputs;
  constructor() { 
    // Create client for prediction service.
    this.automlClient = new automl.v1beta1.PredictionServiceClient();
    // Get the full path of the model.
    this.modelFullId = this.automlClient.modelPath(projectId, computeRegion, modelId);

    const inputs = [
      {"Action": true},
      {"Adventure": false},
      {"Animation": false},
      {"Biography": true},
      {"Comedy": false},
      {"Crime": false},
      {"Documentary": false},
      {"Drama": true},
      {"Family": false},
      {"Fantasy": true},
      {"Film_Noir": false},
      {"History": "7+"},
      {"Horror": false},
      {"IMDb": 7.3},
      {"Music": false},
      {"Musical": false},
      {"Mystery": false},
      {"News": false},
      {"Reality_TV": false},
      {"Romance": false},
      {"Rotten_Tomatoes": 63},
      {"Runtime": 139},
      {"Sci_Fi": false},
      {"Short": false},
      {"Sport": false},
      {"Talk_Show": false},
      {"Thriller": false},
      {"War": false},
      {"Western": false},
      {"Year": "7+"}
    ];
    this.predict(inputs);
  }

  async predict(inputs) {
    // Set the payload by giving the row values.
    const payload = {
      row: {
        values: inputs,
      },
    };
    const [response] = await this.automlClient.predict({
      name: this.modelFullId,
      payload: payload,
      params: {feature_importance: true},
    });
    console.log('Prediction results:');
    for (const result of response.payload) {
      console.log(`Predicted class name: ${result.displayName}`);
      console.log(`Predicted class score: ${result.tables.score}`);
    }
  }
}
