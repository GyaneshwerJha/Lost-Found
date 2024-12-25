import { useState, useEffect, CSSProperties } from "react";
import Navbar from "../components/Navbar";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../config";
import HashLoader from "react-spinners/HashLoader";
import noimg from "../assets/no-image.png";

function Details() {
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const { id } = useParams();

  const override: CSSProperties = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/item/${id}`)
      .then((res) => {
        setItem(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  axios
    .get(`${api}/files/${item.image}`)
    .then((res) => {
      console.log(res);
      setImage(`${api}/files/${item.image}`);
    })
    .catch((error) => {
      console.log(error);
      setImage(noimg);
    });

  return (
    <main id="detailspage">
      <Navbar />
      <section>
        {loading ? (
          <HashLoader
            color="#fdf004"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className="details-card">
            <div className="img-container">
              <img src={image} alt="" />
            </div>

            <div
              className="action-container"
              style={{ textAlign: "center", marginTop: "40px" }} // Added more top margin
            >
              <div
                className="contact-item"
                style={
                  {
                    // marginBottom: "20px", // Space between call and email sections
                    // marginTop: "20px", // Added top margin to individual item
                  }
                }
              >
                <a
                  href={`tel:${item.phoneno}`}
                  style={{
                    backgroundColor: "#fdf004", // Yellow background
                    border: "2px solid #e6c300", // Yellow border
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#000", // Black text
                    fontWeight: "bold",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  <CallIcon /> Call
                </a>
                <p
                  style={{
                    marginTop: "10px", // Space between button and text
                    backgroundColor: "#fdf004", // Yellow background
                    border: "2px solid #e6c300", // Yellow border
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#000", // Black text
                    fontWeight: "bold",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  {item.phoneno || "Phone number not available"}
                </p>
              </div>

              <div
                className="contact-item"
                style={{
                  marginBottom: "20px", // Space between email and other sections
                }}
              >
                <a
                  href={`mailto:${item.email}`}
                  style={{
                    backgroundColor: "#fdf004", // Yellow background
                    border: "2px solid #e6c300", // Yellow border
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#000", // Black text
                    fontWeight: "bold",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  <EmailIcon /> Email
                </a>
                <p
                  style={{
                    marginTop: "10px", // Space between button and text
                    backgroundColor: "#fdf004", // Yellow background
                    border: "2px solid #e6c300", // Yellow border
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#000", // Black text
                    fontWeight: "bold",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  {item.email || "Email not available"}
                </p>
              </div>
            </div>

            <h1>{item.title}</h1>
            <div className="details-container">
              <p>Founder</p>
              <p>{item.name}</p>
            </div>

            {/* <div className="details-container">
            <p>Email</p>
            <p>arjuncvinod@mail.com</p>
          </div>
          <div className="details-container">
            <p>Phone</p>
            <p>8494865475</p>
          </div> */}
            <div className="details-container desc">
              {/* <p>Description</p> */}
              <p>{item.description}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Details;
