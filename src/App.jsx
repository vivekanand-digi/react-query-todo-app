import { Route, Routes } from "react-router-dom";
import PageList from "./Pages/PageList";
import Post from "./Pages/Post";
import EditPost from "./Pages/EditPost";

function App() {
  return (
    <div>
      <h1>React Query Todo</h1>
      <Routes>
        <Route path="/" element={<PageList />} />
        <Route path="/Post/:id" element={<Post />} />
        <Route path="/Post/:id/edit" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
