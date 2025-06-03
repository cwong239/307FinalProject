from app import create_app
import os
print(f"Port env {os.environ.get('PORT')}")

app = create_app()

if __name__ == "__main__":
  port = int(os.environ.get("PORT", 5000))
  app.run(debug=True, host="0.0.0.0", port=port)
