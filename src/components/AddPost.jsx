import React from "react";
import PostForm from "./PostForm";
import { createPost } from "../api/Post";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

const AddPost = () => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleAddPost = (post) => {
    createPostMutation.mutate({
      id: uuidv4(),
      ...post,
    });
  };

  return (
    <div>
      <h2>Add New Post </h2>
      <PostForm onSubmit={handleAddPost} initialValue={{}} />
    </div>
  );
};

export default AddPost;
