import React from 'react';
import PropTypes from 'prop-types';

const RatingStars = ({ rating, size = 16 }) => {
    const getStarPercentage = (index) => {
        if (rating >= index + 1) {
            return 100;
        } else if (rating > index && rating < index + 1) {
            return (rating - index) * 100;
        } else {
            return 0;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row',height:"min-content" }}>
            {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} style={{ position: 'relative', width: size, height: size }}>
                    <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                        <path
                            d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                            fill="gray"
                        />
                    </svg>
                    <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ position: 'absolute', top: 0, left: 0, clipPath: `inset(0% ${100 - getStarPercentage(index)}% 0% 0%)` }}
                    >
                        <path
                            d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                            fill="rgb(254,129,45)"
                        />
                    </svg>
                </div>
            ))}
        </div>
    );
};

RatingStars.propTypes = {
    rating: PropTypes.number.isRequired,
    size: PropTypes.number,
};

export default RatingStars;