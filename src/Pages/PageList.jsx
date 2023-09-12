import React from "react";
import AddPost from "../components/AddPost";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePost, fechPosts } from "../api/Post";
import { useNavigate } from "react-router-dom";

const PageList = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fechPosts(),
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (isLoading) {
    return "loading";
  }

  if (isError) {
    return `Error: ${error.message}`;
  }

  const handleDelete = (id) => {
    deletePostMutation.mutate(id);
  };

  return (
    <div>
      <AddPost />
      {posts.map((post) => (
        <div key={post.id}>
          <h5
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {post.title}
          </h5>
          <button onClick={() => navigate(`/post/${post.id}/edit`)}>
            Update
          </button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PageList;
