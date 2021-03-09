# GCP configuration
project_id = 'streaming-semilleros'
compute_region = 'us-central1'
model_display_name = 'model_peliculas_20210306121832'


inputs = {"Action": True, "Adventure": False, "Animation": False, "Biography": True, "Comedy": False, "Crime": False, "Documentary": False, "Drama": True, "Family": False, "Fantasy": True, "Film_Noir": False, "History": "7+", "Horror": False, "IMDb": 7.3, "Music": False, "Musical": False, "Mystery": False, "News": False, "Reality_TV": False, "Romance": False, "Rotten_Tomatoes": 63, "Runtime": 139, "Sci_Fi": False, "Short": False, "Sport": False, "Talk_Show": False, "Thriller": False, "War": False, "Western": False, "Year": "7+"}

from google.cloud import automl_v1beta1 as automl

client = automl.TablesClient(project=project_id, region=compute_region)

response = client.predict( model_display_name=model_display_name, inputs=inputs)    

print("Prediction results:")
for result in response.payload:
    print(
        "Predicted class name: {}".format(result.tables.value)
    )
    print("Predicted class score: {}".format(result.tables.score))
