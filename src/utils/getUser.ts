interface User {
  username: string;
  password: string;
  dns: string;
}

export function getUser(): User {
  const data = localStorage.getItem("userLogin")!;

  return JSON.parse(data) as User;
}
