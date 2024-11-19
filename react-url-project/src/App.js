import React, { useState } from "react";
import axios from "axios"; // Move axios import to the top

function App() {
  const [url, setUrl] = useState(""); // State for the URL input
  const [result, setResult] = useState(""); // State for the API response
  const [loading, setLoading] = useState(false); // State for the loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing
  
    if (url) {
      setLoading(true); // Start loading
      setResult(""); // Clear previous result
  
      try {
        // Use backend proxy instead of directly hitting OpenAI API
        const response = await axios.post(
          "http://localhost:5000/api/chat", // Your backend proxy URL
          { url }
        );
  
        // Extract the ChatGPT response
        const chatResponse = response.data.choices[0].message.content;
        setResult(chatResponse); // Update the result state
      } catch (error) {
        console.error("Error details:", error.response || error.message || error);
        setResult("An error occurred while processing your request.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };
  

        // Extract the ChatGPT response
        const chatResponse = response.data.choices[0].message.content;
        setResult(chatResponse); // Update the result state
      } catch (error) {
        console.error("Error:", error);
        setResult("An error occurred while processing your request."); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Submit Your URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          placeholder="Enter your URL here"
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit
        </button>
      </form>
      {/* Show loading message or result */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        result && (
          <div style={{ marginTop: "20px", fontSize: "18px" }}>
            <strong>{result}</strong>
          </div>
        )
      )}
    </div>
  );
}

export default App;
