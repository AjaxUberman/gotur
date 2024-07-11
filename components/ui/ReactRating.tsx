import { Rating as ReactRating } from "@smastrom/react-rating";

interface RatingProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<any>>;
}

const Rating: React.FC<RatingProps> = ({ rating, setRating }) => {
  return (
    <ReactRating
      style={{ maxWidth: 100 }}
      value={rating}
      onChange={setRating}
    />
  );
};

export default Rating;
