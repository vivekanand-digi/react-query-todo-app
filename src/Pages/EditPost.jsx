import React from "react";
import PostForm from "../components/PostForm";
import { fechPost, updatedPost } from "../api/Post";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fechPost(id),
  });
  const queryClient = useQueryClient();

  const updatedPostMutation = useMutation({
    mutationFn: updatedPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      navigate("/");
    },
  });

  if (isLoading) {
    return "loading";
  }

  if (isError) {
    return `Error: ${error.meassage}`;
  }

  const handleSubmit = (updatedPost) => {
    updatedPostMutation.mutate({ id, ...updatedPost });
  };

  return (
    <div>
      <h1>
        <PostForm onSubmit={handleSubmit} initialValue={post} />
      </h1>
    </div>
  );
};

export default EditPost;
