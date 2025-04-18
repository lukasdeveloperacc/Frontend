import React, { useState } from "react";
import { Button } from "./components/Button";
import { Card, CardContent } from "./components/Card";
import ChatWindow from "./components/ChatWindow";
import { ragStream } from "./api/rag";


function App() {
  let base64String = "";

  const [summary, setSummary] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File change event triggered");
    const files = event.target.files;
    if (!files || files.length < 1) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = async () => {
      base64String = (fileReader.result as string).split(',')[1]
      console.log(`base64 : ${base64String?.length}`);
    }
  };

  const handleSummary = async () => {
    const url = "http://localhost:1234/summary/stream";
    try {
      const body = JSON.stringify({ input: { base64_file: base64String } });
      ragStream(url, body, setSummary);
    } catch (err) {
      console.error("🚨 Fetch error:", err);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">논문 요약 및 QA 웹앱</h1>
      <input type="file" onChange={handleFileChange} className="block mb-4" />
      <Button onClick={handleSummary}>요약 시작</Button>

      {summary && (
        <Card className="mt-4">
          <CardContent>
            <h2 className="text-xl font-semibold">요약 결과</h2>
            <p className="mt-2 whitespace-pre-line">{summary}</p>
          </CardContent>
        </Card>
      )}

      <ChatWindow />
    </div >
  )
}

export default App;
