export function getUser(): { username: string; password: string } {
  const data = localStorage.getItem("userLogin")!;

  return JSON.parse(data) as { username: string; password: string };
}
