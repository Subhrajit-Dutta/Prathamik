export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0NGUwZDAwOC03ZTJhLTRlNzYtYTAwYS1mMGU2NWMzMTNlZGIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyMzEwNDAzOCwiZXhwIjoxNzU0NjQwMDM4fQ.xdLFbVeTsBkzKRgeWNa4mK5EY3k1HblNdSFFovmXI48";
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  return roomId;
};