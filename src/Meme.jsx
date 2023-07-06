import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazy-load";

const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMemes();
    setupScrollListener();
  }, []);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://meme-api.com/gimme`);
      if (response.data.code == 403) {
        console.log("no meme");
      } else {
        setMemes((prevMemes) => [...prevMemes, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const setupScrollListener = () => {
    window.addEventListener("scroll", handleScroll);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!loading) {
        fetchMemes();
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <InfiniteScroll
        dataLength={memes?.length}
        next={fetchMemes}
        hasMore={true}
        loader={<p className=" text-center my-4">Loading...</p>}
        endMessage={<p>No more memes to load.</p>}
      >
        {memes.map((meme, index) => (
          <div key={index} className="mb-8 border rounded-md">
            <h2 className="text-xl text-center my-4 font-bold mb-4">
              {meme?.title}
            </h2>
            <LazyLoad height={800}>
              <img
                src={meme?.url}
                alt={meme?.title}
                className="mb-4 mx-auto max-w-full h-auto"
              />
            </LazyLoad>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Meme;
