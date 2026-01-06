import TrackList from "../components/TrackList";

const Home = ({ query }) => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">🎶 Music Library</h2>

      <p className="text-gray-400 mt-2 mb-4 text-sm">
        Select a track to play 🎧
      </p>

      <TrackList query={query} />
    </div>
  );
};

export default Home;
