const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');

const DISCOVERY_DOCS = ["https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta", "https://analyticsdata.googleapis.com/$discovery/rest?version=v1"];
const SCOPES = "https://www.googleapis.com/auth/analytics.readonly";
const CLIENT_ID = '899132251042-lpos5uq6u4dcbu2t4g74ahh3b3p152ku.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB5haUY3m_iyJ-TdlZNwbDReZ-oMbILhvg';
const REDIRECT_URI = 'https://filipsm19.github.io/portfolio/'; // Ensure this matches your Google Cloud Console configuration

let tokenClient;

// Initialize the Google API Client
function initClient() {
    gapi.load('client', async () => {
        console.log('Google API client initialized.');
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            gapi.client.setToken({ access_token: accessToken });
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: DISCOVERY_DOCS
            });
            fetchAnalyticsData();
        }
        else {
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
        }
    });
}

// Handle authentication
function handleAuthClick() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI, // Match exactly
        callback: (response) => {
            if (response.access_token) {
                localStorage.setItem('access_token', response.access_token);
                initClient()
                loginBtn.classList.add('hidden');
                logoutBtn.classList.remove('hidden');
            } else {
                console.error('Authentication failed.');
                loginBtn.classList.remove('hidden');
                logoutBtn.classList.add('hidden');
            }
        },
    });

    // Request the access token
    tokenClient.requestAccessToken();
}

// Handle sign-out
function handleSignoutClick() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        google.accounts.oauth2.revoke(accessToken, () => {
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            console.log('User signed out.');

        });
        localStorage.removeItem('access_token');
    }
}
// Load Google API Client on window load
window.onload = async () => {
    initClient();
};
