const generateData = async (url: string) => {
  const res = await fetch(`http://localhost:3000/api/character/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.response;
};

const insertDatatoDB = async (url: string, body: object) => {
  const res = await fetch(`http://localhost:3000/api/character/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data.response;
};

export { generateData, insertDatatoDB };
