import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, loggedInUser, updateBlog, removeBlog }) => {
  const [isShown, setIsShown] = useState(false);

  const handleLikeAction = () => {
    const blogData = {
      ...blog,
      likes: blog.likes + 1,
    };

    updateBlog(blogData);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailStyle = {
    display: isShown ? "" : "none",
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="blogTitle">
        {blog.title} {blog.author}
        <button className="showHide" onClick={() => setIsShown(!isShown)}>
          {isShown ? "hide" : "show"}
        </button>
      </div>
      <div className="blogDetail" style={detailStyle}>
        {blog.url} <br />
        likes: {blog.likes}
        <button className="likeBtn" onClick={handleLikeAction}>
          like
        </button>
        <br />
        {blog.user && blog.user.name ? blog.user.name : ""}
        {blog.user &&
          blog.user.username &&
          loggedInUser &&
          loggedInUser.username === blog.user.username && (
            <>
              <br />
              <button onClick={() => removeBlog(blog)}>remove</button>
            </>
          )}
      </div>
    </div>
  );
};

// blog, loggedInUser, updateBlog, removeBlog
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
