import requests
import json

# Замените на свой URL для отправки POST-запроса
url = "https://example.com/api/login"

# Создайте JSON-объект с логином и паролем
data = {
    "username": "ваш_логин",
    "password": "ваш_пароль"
}

# Преобразуйте данные в JSON-строку
json_data = json.dumps(data)

# Устанавливаем заголовки для запроса
headers = {'Content-Type': 'application/json'}

# Отправляем POST-запрос
response = requests.post(url, data=json_data, headers=headers)

# Проверяем статус ответа
if response.status_code == 200:
    print("Успешно авторизованы!")
    # Далее вы можете обрабатывать ответ, если это необходимо.
else:
    print("Ошибка при авторизации. Статус код:", response.status_code)
    print("Ответ сервера:", response.text)
