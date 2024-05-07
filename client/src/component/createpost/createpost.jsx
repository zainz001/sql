import "./createpost.css";
import { useState } from "react";
import axios from "axios"; // Import Axios
import { useSelector } from 'react-redux';

const Share = () => {
    const { currentUser } = useSelector(state => state.user);
    const [file, setFile] = useState(null);
    const [error,setError]=useState();
    const [formData, setFormData] = useState({
      discription: '',
      image: null
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "file") {
        setFile(e.target.files[0]);
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("discription", formData.discription); // Corrected spelling
        formDataToSend.append("image", file);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
    
        console.log("FormData to Send:", formDataToSend);
    
        const res = await axios.post("/api/posts", formDataToSend, config);
        const data = await res.data;
    
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    
    
    

    return (
        <div className="share">
        <div className="container">
          <div className="top">
            <div className="left">
              <img src={"/upload/" + currentUser.profilePic} alt="" />
              <input
                type="text"
                name="discription"
                placeholder={`What's on your mind ${currentUser.name}?`}
                onChange={handleChange}
                value={formData.discription} // Bind formData.description instead of formData
              />
            </div>
            <div className="right">
              {file && (
                <img className="file" alt="" src={URL.createObjectURL(file)} />
              )}
            </div>
          </div>
          <hr />
          <div className="bottom">
            <div className="left">
              <input
                type="file"
                id="file"
                name="file" // Add name attribute
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <label htmlFor="file">
                <div className="item">
                  <img src={Image} alt="" />
                  <span>Add Image</span>
                </div>
              </label>
              <div className="item">
                {/* <img src={Map} alt="" />
                <span>Add Place</span> */}
              </div>
              {/*<div className="item">
                 <img src={Friend} alt="" />
                <span>Tag Friends</span>
              </div> */}
            </div>
            <div className="right">
              <button onClick={handleSubmit}>Share</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Share;
