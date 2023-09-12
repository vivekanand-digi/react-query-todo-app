import React, { useState } from "react";

const PostForm = ({ onSubmit, initialValue }) => {
  const [post, setPost] = useState({
    title: initialValue.title || "",
  });

  const handleChangeInput = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post);
    setPost({
      title: "",
    });
  };

  const renderField = (label) => (
    <div>
      <label>{label}</label>
      <input
        type="text"
        name={label.toLowerCase()}
        value={post[label.toLowerCase()]}
        onChange={handleChangeInput}
      />
    </div>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderField("Title")}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default PostForm;
