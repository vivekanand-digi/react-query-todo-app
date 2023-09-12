import React from "react";
import { fechPost } from "../api/Post";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fechPost(id),
  });

  if (isLoading) {
    return "loading";
  }

  if (isError) {
    return `Error: ${error.meassage}`;
  }
  return (
    <div>
      <button onClick={() => navigate(`/`)}>Back to List Page</button>
      <h1>{data.title}</h1>
    </div>
  );
};

export default Post;
