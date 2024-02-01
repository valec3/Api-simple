from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

origins = [
    "http://127.0.0.1:5500/client/index.html",
    "http://127.0.0.1:5500/client",
    "http://127.0.0.1:5500/client/",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración de la conexión a la base de datos
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "toor",
    "database": "exa_fnl",
}

# Función para realizar consultas SQL
def ejecutar_consulta(query):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        return data
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {err}")


@app.get("/")
def read_root():
    return {"message": "Bienvenido a tu servidor de FastAPI"}

# Endpoint para obtener todos los registros de una vista específica
@app.get("/reportes/ProductIssueReport")
def obtener_registros():
    query = f"SELECT * FROM ProductIssueReport"
    data = ejecutar_consulta(query)
    return {"data": data}


@app.get("/reportes/CompanyResponseReport")
def obtener_registros():
    query = f"SELECT * FROM CompanyResponseReport"
    data = ejecutar_consulta(query)
    return {"data": data}

@app.get("/reportes/DisputedIssuesByState")
def obtener_registros():
    query = f"SELECT * FROM DisputedIssuesByState"
    data = ejecutar_consulta(query)
    return {"data": data}

@app.get("/reportes/ComplaintsByDate")
def obtener_registros():
    query = f"SELECT * FROM ComplaintsByDate"
    data = ejecutar_consulta(query)
    return {"data": data}


if __name__ == "__main__":
    # Para ejecutar la aplicación con uvicorn
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
