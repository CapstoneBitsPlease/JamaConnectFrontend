import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import Button from "@atlaskit/button";
import Posts from "../components/Posts"
import Pagination from "../components/Pagination"
import "../styles/pages/ErrorLog.style.sass";

const ErrorLog = () => {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const token = useStoreState((state) => state.accountStore.token);
  const startDateRef = React.createRef();
  const endDateRef = React.createRef();


  const errorTime = () => {
    axios
      .get(
        `http://127.0.0.1:5000/get_logs_range?start_date=${startDateRef.current.value}&end_date=${endDateRef.current.value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {});
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost- postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="syncerror-container">
      <h3>Error Logs</h3>
      <div className="syncerror-input">
        <label htmlFor="start-date">Start Date</label>
        <input
          type="start-date"
          name="start-date"
          id="start-date"
          placeholder="mm/dd/yyyy"
          ref={startDateRef}
        />
        <label htmlFor="end-date">End Date</label>
        <input
          type="end-date"
          name="end-date"
          id="end-date"
          placeholder="mm/dd/yyyy"
          ref={endDateRef}
        />
        <Button
          id="submit"
          appearance="primary"
          type="button"
          onClick={errorTime}
        >
          Submit
        </Button>
      </div>
      <Posts posts={currentPosts} loading={loading}/>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
};

export default ErrorLog;
