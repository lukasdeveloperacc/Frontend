type Document = {
  id: string;
  file: File;
  fileName: string;
  uploaded: string;
  owner: string;
};

const backend_url = "http://localhost:3001";

export async function getContacts(): Promise<Document[]> {
  return await fetch(`${backend_url}/documents`).then((res) => res.json());
}
