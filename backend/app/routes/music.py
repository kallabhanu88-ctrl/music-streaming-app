from flask import Blueprint, request, jsonify, send_file, current_app
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.models.track import Track
import os

music_bp = Blueprint("music", __name__)

@music_bp.route("/tracks", methods=["GET"])
@jwt_required()
def get_tracks():
    tracks = Track.query.all()
    return jsonify([
        {"id": t.id, "title": t.title, "artist": t.artist} for t in tracks
    ])

@music_bp.route("/stream/<int:track_id>", methods=["GET"])
def stream_track(track_id):
    track = Track.query.get_or_404(track_id)
    return send_file(track.file_path, as_attachment=False)

@music_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_track():
    title = request.form.get("title")
    artist = request.form.get("artist")
    file = request.files.get("file")

    if not title or not artist or not file:
        return jsonify({"msg": "Missing fields"}), 400

    upload_folder = current_app.config["UPLOAD_FOLDER"]
    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)

    track = Track(title=title, artist=artist, file_path=file_path)
    db.session.add(track)
    db.session.commit()

    return jsonify({"msg": "Track uploaded successfully", "id": track.id})
