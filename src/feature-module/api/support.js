import serverApiUrl from "./server.js";

export const userCreateTicket = async (subject, message, status, priority, escalations) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await fetch(serverApiUrl + 'users/support', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ 
                subject: subject, 
                message: message, 
                status: status, 
                priority: priority, 
                escalations: escalations 
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to create support ticket: ${response.status}`);
        }
        const data1 = await response.json();
        return data1;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const replyUserTicket = async (supportId, userId, adminId, senderId, message) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await fetch(serverApiUrl + 'users/support/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ 
                supportId: supportId, 
                userId: userId, 
                adminId: adminId, 
                senderId: senderId, 
                message: message 
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to reply for ticket: ${response.status}`);
        }
        const data1 = await response.json();
        return data1;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getUserSupport = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        var apiUrl = 'users/support';
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
          return response; 
    } catch (error) {
        console.error(error);
    }
};

export const replyUserSupportChat = async (supportId) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await fetch(serverApiUrl + 'users/support/supportChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ 
                supportId: supportId,
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to reply for Support Chat: ${response.status}`);
        }
        const data1 = await response.json();
        return data1;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Host

export const hostCreateTicket = async (subject, message, status, priority, escalations) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await fetch(serverApiUrl + 'host/support', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ 
                subject: subject, 
                message: message, 
                status: status, 
                priority: priority, 
                escalations: escalations 
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to create support ticket: ${response.status}`);
        }
        const data1 = await response.json();
        return data1;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const replyHostTicket = async (supportId, hostId, adminId, senderId, message) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await fetch(serverApiUrl + 'host/support/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ 
                supportId: supportId, 
                hostId: hostId, 
                adminId: adminId, 
                senderId: senderId, 
                message: message 
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to reply for ticket: ${response.status}`);
        }
        const data1 = await response.json();
        return data1;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getHostSupport = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        var apiUrl = 'host/support';
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
          return response; 
    } catch (error) {
        console.error(error);
    }
};

export const replyHostSupportChat = async (supportId) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await fetch(serverApiUrl + 'host/support/supportChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ 
                supportId: supportId,
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to reply for Support Chat: ${response.status}`);
        }
        const data1 = await response.json();
        return data1;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

