export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0NGUwZDAwOC03ZTJhLTRlNzYtYTAwYS1mMGU2NWMzMTNlZGIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNjk3ODI4MiwiZXhwIjoxNzE3NTgzMDgyfQ.3W2Gox5pYmzJ_VYDRMNxwD22U3KmZACcV1Lexa_u4fM";
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