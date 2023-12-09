// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract DoctorReviews {
    struct Review {
        address patient;
        string comment;
        uint8 rating;
    }

    mapping(address => Review[]) private doctorReviews;

    event ReviewSubmitted(address indexed doctor, address indexed patient, string comment, uint8 rating);

    modifier validRating(uint8 _rating) {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        _;
    }

    function submitReview(address _doctor, string memory _comment, uint8 _rating)
        external
        validRating(_rating)
    {
        Review memory newReview = Review({
            patient: msg.sender,
            comment: _comment,
            rating: _rating
        });

        doctorReviews[_doctor].push(newReview);

        emit ReviewSubmitted(_doctor, msg.sender, _comment, _rating);
    }

    function getReviewCount(address _doctor) external view returns (uint256) {
        return doctorReviews[_doctor].length;
    }

    function getReview(address _doctor, uint256 _index) external view returns (Review memory) {
        require(_index < doctorReviews[_doctor].length, "Index out of bounds");
        return doctorReviews[_doctor][_index];
    }

    function getReviews(address _doctor) external view returns (Review[] memory) {
        return doctorReviews[_doctor];
    }
}
