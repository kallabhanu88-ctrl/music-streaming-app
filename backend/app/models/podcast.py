from app.extensions import db



class Podcast(db.Model):

    __tablename__ = "podcast"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    audio_path = db.Column(db.String(255), nullable=False)