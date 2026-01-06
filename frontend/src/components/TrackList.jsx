import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";

const TrackList = ({ query = "" }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch("http://127.0.0.1:5001/api/music/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("access_token");
          window.location.reload(); // go back to login
          return;
        }
        return res.json();
      })
      .then((data) => data && setTracks(data))
      .catch(console.error);
  }, []);

  const filtered = tracks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4 mt-4">
      {filtered.map((track) => (
        <div key={track.id} className="bg-gray-700 p-4 rounded">
          <h3 className="font-bold">{track.title}</h3>
          <p className="text-gray-300">{track.artist}</p>

          {/* STREAM IS NOW PUBLIC */}
          <AudioPlayer
            src={`http://127.0.0.1:5001/api/music/stream/${track.id}`}
          />
        </div>
      ))}
    </div>
  );
};

export default TrackList;
