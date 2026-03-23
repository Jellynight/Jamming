
async function getUserPlaylists() {
  console.log("Fetching user playlists...");

  return await fetch("https://api.spotify.com/v1/me/playlists", {
   method: "GET",
   headers: {
    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    "Content-Type": "application/json",
   },
  })
   .then((res) => res.json())
   .catch((error) => {
    console.error("Error fetching user playlists:", error);
   });
 }

export default getUserPlaylists;