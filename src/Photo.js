import React from "react";

const Photo = ({
    alt_description,
    color,
    description,
    links: { download },
    urls: { small: img },
    likes,
    user: {
        name: userName,
        portfolio_url,
        profile_image: { small: userImg },
    },
}) => {
    let newAlt;
    let newDesc;
    if (alt_description) {
        alt_description.length > 43
            ? (newAlt = `${alt_description.slice(0, 43)}...`)
            : (newAlt = alt_description);
    }
    if (description) {
        description.length > 43
            ? (newDesc = `${description.slice(0, 43)}...`)
            : (newDesc = description);
    }
    return (
        <article className="photo" style={{ border: `10px solid ${color}` }}>
            <a href={download}>
                <img
                    className="image"
                    src={img}
                    alt={newAlt || alt_description || newDesc || description}
                />
            </a>
            <div className="photo-info">
                <div>
                    <h4>{userName}</h4>
                    <p className="desc">
                        {newDesc || description || newAlt || alt_description}
                    </p>
                    <p>{likes} likes</p>
                </div>
                <a href={portfolio_url}>
                    <img className="user-img" src={userImg} alt={userName} />
                </a>
            </div>
        </article>
    );
};

export default Photo;
