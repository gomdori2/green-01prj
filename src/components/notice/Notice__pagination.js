import React, { useState } from "react";

const Notice__pagination = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [itemsPerPage, setItemsPerPage] = useState(15); // 페이지당 보여줄 게시글 수 상태로 관리
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("title");

  const handleRowClick = postId => {
    navigate(`/notice/post/${postId}`);
  };

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // 현재 페이지 * 보여줄 페이지 수 = 페이지
  const indexOfLastPost = currentPage * itemsPerPage;
  // 페이지에서 1개 빼기
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearch = () => {
    let filtered = posts;
    if (searchTerm) {
      filtered = posts.filter(post => {
        const searchFields = {
          title: post.title.toLowerCase(),
          titleContent: `${post.title.toLowerCase()} ${post.content.toLowerCase()}`,
          author: post.author.toLowerCase(),
        };
        return searchFields[searchOption].includes(searchTerm.toLowerCase());
      });
    }
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchOptionChange = event => {
    setSearchOption(event.target.value);
  };

  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="notice__pagination">
      {pageNumbers.map(number => (
        <button key={number} onClick={() => setCurrentPage(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Notice__pagination;
