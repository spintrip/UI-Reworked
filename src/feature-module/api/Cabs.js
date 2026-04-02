import serverApiUrl from "./server.js";

/**
 * Checks if cab services are available in a specific city/address.
 */
export const getCabAvailability = async (address, city) => {
    try {
        const response = await fetch(serverApiUrl + 'users/cab-availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address, city }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to check cab availability');
        }
        return await response.json();
    } catch (error) {
        // Suppress console.error here so UI handles it gracefully
        throw error;
    }
};

/**
 * Fetches pricing estimates for all cab categories (Mini, Sedan, SUV, etc.)
 */
export const getBulkEstimates = async (payload) => {
    try {
        const response = await fetch(serverApiUrl + 'users/get-bulk-estimates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch bulk estimates');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getBulkEstimates:', error);
        throw error;
    }
};

/**
 * Initiates a cab booking request.
 */
export const bookCab = async (cabPayload) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Authentication required');

        const response = await fetch(serverApiUrl + 'users/book-cab', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(cabPayload),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to book cab');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in bookCab:', error);
        throw error;
    }
};

/**
 * Initiates the upfront payment for a cab booking.
 */
export const initiateCabPayment = async (amount, bookingId, useReferralCoins = false) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(serverApiUrl + 'users/initiate-cab-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ amount, bookingId, useReferralCoins }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to initiate payment');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in initiateCabPayment:', error);
        throw error;
    }
};

/**
 * Verifies the status of a cab payment.
 */
export const verifyCabPayment = async (bookingId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(serverApiUrl + `users/verify-cab-payment/${bookingId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to verify payment');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in verifyCabPayment:', error);
        throw error;
    }
};

/**
 * Cancels a booking that was not paid for.
 */
export const cancelUnpaidBooking = async (bookingId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(serverApiUrl + 'users/cancel-unpaid-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ bookingId }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error in cancelUnpaidBooking:', error);
        throw error;
    }
};
