from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app) 

# Charger le modèle
model = tf.keras.models.load_model('C:/Users/Amine/Documents/PFA5_ML/mon_modele.keras')

# Paramètres
img_height, img_width = 256, 256

uploads_dir = 'uploads'
os.makedirs(uploads_dir, exist_ok=True)


@app.route('/predict', methods=['POST'])
def predict():
    # Obtenir le fichier image de la requête
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400


    file = request.files['file']
    
    # Sauvegarder temporairement l'image
    img_path = os.path.join(uploads_dir, file.filename)
    file.save(img_path)
    
    
    class_indices_ordered = {
        0:'angry',
        1:'happy',
        2:'sad'
        }

    # Prétraiter l'image
    img = image.load_img(img_path, target_size=(img_height, img_width))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Faire la prédiction
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions)  # Obtenir l'index de la classe prédite
    predicted_class = class_indices_ordered[predicted_class_index]  # Obtenir le nom de la classe
    os.remove(img_path)
    return jsonify({'prediction': predicted_class})
    

if __name__ == '__main__':
    app.run(debug=True)
