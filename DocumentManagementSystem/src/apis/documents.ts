type Document = {
  id: string;
  file_name: string;
  drive_url: string;
  uploaded_at: string;
  contact_id: string;
};

const backend_url = "http://localhost:1234";

export async function getDocuments(
  token: string,
  clientId: string | null | undefined
): Promise<{ documents: Document[] }> {
  if (clientId) {
    return await fetch(`${backend_url}/api/documents/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const data = res.json();
      console.log(data);
      return data;
    });
  } else {
    return await fetch(`${backend_url}/api/documents`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const data = res.json();
      console.log(data);
      return data;
    });
  }
}

export async function uploadDocuments(
  token: string,
  formData: FormData,
  clientId: string | undefined
) {
  const res = await fetch(
    `${backend_url}/api/documents/upload-multiple/${clientId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return await res.json();
}
