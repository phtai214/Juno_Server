import * as services from "../services";

// Create a new Review
export const createNewReview = async (req, res) => {
    try {
        const reviewData = req.body;
        const newReview = await services.createReview(reviewData);
        return res.status(201).json(newReview);
    } catch (error) {
        console.error('Error in createNewReview controller:', error);
        return res.status(500).json({ error: 'Failed to create review' });
    }
};

// Get all Reviews
export const fetchAllReviews = async (req, res) => {
    try {
        const reviews = await services.getAllReviews();
        return res.status(200).json(reviews);
    } catch (error) {
        console.error('Error in fetchAllReviews controller:', error);
        return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

export const fetchReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await services.getReviewById(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        return res.status(200).json(review);
    } catch (error) {
        console.error('Error in fetchReviewById controller:', error);
        return res.status(500).json({ error: 'Failed to fetch review' });
    }
};

export const getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await services.getReviewByProductId(productId);

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this product ID' });
        }

        return res.status(200).json(reviews);
    } catch (error) {
        console.error('Error in getReviewsByProductId controller:', error);
        return res.status(500).json({ error: 'Failed to get reviews' });
    }
};

// Update a Review
export const modifyReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const updatedData = req.body;
        const updatedReview = await services.updateReview(reviewId, updatedData);
        return res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Error in modifyReview controller:', error);
        return res.status(500).json({ error: 'Failed to update review' });
    }
};

// Delete a Review
export const removeReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        await services.deleteReview(reviewId);
        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error in removeReview controller:', error);
        return res.status(500).json({ error: 'Failed to delete review' });
    }
};
