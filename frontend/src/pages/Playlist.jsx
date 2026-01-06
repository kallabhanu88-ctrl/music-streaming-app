import TrackList from "../components/TrackList";

const Playlist = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">📂 Your Playlist</h2>
      <TrackList />
    </div>
  );
};

export default Playlist;
