import abi from "../../ABI/reviews.json";
const { ethers } = require('ethers');

// Contract address and ABI (replace with your actual values)
const contractAddress2 = 'YourContractAddress';
const contractABI2 = abi.abi;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress2, contractABI2, signer);

// Function to submit a review
async function submitReview() {
    const doctorAddress = document.getElementById('doctorAddress').value;
    const comment = document.getElementById('comment').value;
    const rating = parseInt(document.getElementById('rating').value);

    try {
        await contract.submitReview(doctorAddress, comment, rating);
        console.log('Review submitted successfully!');
    } catch (error) {
        console.error('Error submitting review:', error.message);
    }
}

// Function to fetch and display reviews
async function displayReviews() {
    const doctorAddress = document.getElementById('doctorAddress').value;

    try {
        const reviewCount = await contract.getReviewCount(doctorAddress);
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = ''; 

        for (let i = 0; i < reviewCount; i++) {
            const review = await contract.getReview(doctorAddress, i);
            const listItem = document.createElement('li');
            listItem.textContent = `Rating: ${review.rating}, Comment: ${review.comment}`;
            reviewsList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
    }
}
