import React from "react";
import Button from "@atlaskit/button";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log("post per page", postsPerPage);
  console.log("total posts", totalPosts);
  return (
    <div>
      {pageNumbers.map((number) => (
        <Button
          id="paginate"
          appearance="primary"
          type="button"
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </Button>
      ))}
    </div>
  );
};
export default Pagination;
