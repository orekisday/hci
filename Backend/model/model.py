from joblib import load

# Укажите полный путь к файлу
model_path = r"C:\Users\Lenovo\Desktop\gik-ai\model\lr_model.pkl"
model = load(model_path)
print(model)