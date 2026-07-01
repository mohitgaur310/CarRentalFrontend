import ReviewCard from '../../components/Cards/ReviewCard';

const DashboardReviews = () => {
  const reviews = [
    { id: '1', name: 'Rahul M.', rating: 5, comment: 'Great car, well maintained!', createdAt: new Date().toISOString() },
    { id: '2', name: 'Anita D.', rating: 4, comment: 'Good experience, smooth ride.', createdAt: new Date().toISOString() },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
      </div>
    </div>
  );
};

export default DashboardReviews;
