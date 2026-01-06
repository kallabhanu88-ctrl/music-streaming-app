from flask import Blueprint, send_file, jsonify
from flask_jwt_extended import jwt_required
from app.models import Podcast

podcast_bp = Blueprint("podcast", __name__)

# 🔐 Protected: metadata
@podcast_bp.route("/podcasts", methods=["GET"])
@jwt_required()
def get_podcasts():
    podcasts = Podcast.query.all()
    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "stream_url": f"/api/podcast/stream/{p.id}"
        }
        for p in podcasts
    ])

# 🔓 PUBLIC: audio stream
@podcast_bp.route("/stream/<int:podcast_id>", methods=["GET"])
def stream_podcast(podcast_id):
    podcast = Podcast.query.get_or_404(podcast_id)
    return send_file(podcast.audio_path, as_attachment=False)
