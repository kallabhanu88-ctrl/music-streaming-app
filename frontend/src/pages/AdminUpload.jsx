import { useState } from "react";

const AdminUpload = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleUpload = async () => {
    if (!title || !artist || !file) {
      setMsg("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:5001/api/music/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });

    const data = await res.json();
    setMsg(data.msg || "Upload done");

    setTitle("");
    setArtist("");
    setFile(null);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Admin Upload</h2>

      <input
        className="block mb-2 p-2 text-black"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="block mb-2 p-2 text-black"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Upload
      </button>

      {msg && <p className="mt-3 text-green-400">{msg}</p>}
    </div>
  );
};

export default AdminUpload;
