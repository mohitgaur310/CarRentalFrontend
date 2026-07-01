import Rating from '../Common/Rating';
import { formatRelativeTime } from '../../utils';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
          {review.user?.name?.[0] || review.name?.[0] || 'U'}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">{review.user?.name || review.name}</h4>
            <span className="text-xs text-gray-400">{formatRelativeTime(review.createdAt)}</span>
          </div>
          <Rating value={review.rating} size="sm" showValue={false} className="mt-1" />
          <p className="text-gray-600 mt-2 text-sm">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
