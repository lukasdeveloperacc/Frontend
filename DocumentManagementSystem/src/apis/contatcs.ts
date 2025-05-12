type Contact = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

const backend_url = "http://localhost:3001";

export async function getContacts(): Promise<Contact[]> {
  return await fetch(`${backend_url}/contacts`).then((res) => res.json());
}

export async function postContacts(new_contact: Contact) {
  return await fetch(`${backend_url}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(new_contact),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      throw new Error(e);
    });
}

export async function patchContact(data: Contact) {
  return await fetch(`${backend_url}/contacts/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      throw new Error("Failed to update contact");
    });
}

export async function deleteContact(id: string) {
  return await fetch(`${backend_url}/contacts/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      throw new Error("Failed to delete contact");
    });
}
