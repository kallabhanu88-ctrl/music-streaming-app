from flask import Flask
from flask_cors import CORS
from app.extensions import db, jwt, bcrypt
from app.routes.auth import auth_bp
from app.routes.music import music_bp
from app.routes.podcast import podcast_bp

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///music.db"
    app.config["JWT_SECRET_KEY"] = "super-secret-key"
    app.config["UPLOAD_FOLDER"] = "uploads"

    CORS(app)

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(music_bp, url_prefix="/api/music")
    app.register_blueprint(podcast_bp, url_prefix="/api/podcast")

    with app.app_context():
        db.create_all()

    return app
