const CLIENT_ID = '1014217551845-c1vrav4beoqgtt4epmc8jdj6b9ocktg7.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCFxY6cYnY98s0HNqbXVXdBWDheIJvRZUI';
const DISCOVERY_DOCS =
["https://analyticsdata.googleapis.com/$discovery/rest?version=v1"];
const SCOPES = "https://www.googleapis.com/auth/analytics.readonly";
function handleAuthClick() {
gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick() {
gapi.auth2.getAuthInstance().signOut();
}
function initClient() {
gapi.client.init({
apiKey: API_KEY,
clientId: CLIENT_ID,
discoveryDocs: DISCOVERY_DOCS,
scope: SCOPES
}).then(() => {
console.log("Google API spreman!");
});
}
gapi.load("client:auth2", initClient);