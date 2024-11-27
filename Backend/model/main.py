from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np
from joblib import load


# Загрузка модели из файла
model_path = r"C:\Users\Lenovo\Desktop\gik-ai\model\lr_model.pkl"
model = load(model_path)

# Инициализация FastAPI
app = FastAPI()

# Описание структуры входных данных
class InputData(BaseModel):
    Gender: int 
    Married: int 
    Dependents: int
    Education: int  
    Self_Employed: int
    ApplicantIncome: int
    CoapplicantIncome: int
    LoanAmount: int
    Loan_Amount_Term: int
    Credit_History: int
    Property_Area: int

@app.get("/")
def root():
    return {"message": "Python сервис для работы с моделью запущен!"}

# Эндпоинт для предсказаний
@app.post("/predict")
def predict(data: InputData):
    try:
        # Преобразование входных данных в массив NumPy
        input_array = np.array([[
            data.Gender,
            data.Married,
            data.Dependents,
            data.Education,
            data.Self_Employed,
            data.ApplicantIncome,
            data.CoapplicantIncome,
            data.LoanAmount,
            data.Loan_Amount_Term,
            data.Credit_History,
            data.Property_Area
        ]])

        # Получение предсказания
        prediction = model.predict(input_array)

        return {"prediction": prediction.tolist()}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка при обработке данных: {str(e)}")