import React from "react";
import like from "../../../assets/images/icons/like.svg";
import unlike from "../../../assets/images/icons/unlike.svg";
// images
import "./style.scss";

const UpcomingFeatureds = ({ items, addVote }) => {
  const handleAddVote = (post_id, type) => {
    const data = {
      post_id: post_id,
      vote: type,
    };
    addVote(data);
  };
  return (
    <section className="upcomingFeaturedArea">
      <ul className="upcomingFeaturedItems">
        {items?.data?.map((item) => (
          <li key={item.id} className="upcomingFeaturedWrap">
            <div className="upcomingFeaturedImg">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="upcomingFeaturedContent">
              <div className="upcomingFeatured">
                <span>{item.coming_in}</span>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
              <ul className="upcomingFeaturedLike">
                <li>
                  <button
                    onClick={() => handleAddVote(item.id, 1)}
                    className="like"
                  >
                    <img src={like} alt="like" />
                    {item.up_vote > 1 && (
                      <span className="value">{item.up_vote}</span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleAddVote(item.id, 1)}
                    className="unlike"
                  >
                    <img src={unlike} alt="unlike" />
                    {item.down_vote > 1 && (
                      <span className="value">{item.down_vote}</span>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
      
    </section>
  );
};
export default UpcomingFeatureds;
